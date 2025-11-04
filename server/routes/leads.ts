import { Router } from 'express';
import { db } from '../db';
import { google } from 'googleapis';
import axios from 'axios';

const router = Router();

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || './google-credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// WhatsApp Meta API setup
const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// WhatsApp message templates
const getWhatsAppTemplate = (serviceType: string, data: any): string => {
  const templates = {
    trading: `नमस्ते ${data.name}! 🙏\n\nTradeWiser™ में आपका स्वागत है!\n\nहमें आपकी ${data.commodity} की ${data.trade_type === 'buy' ? 'खरीद' : 'बिक्री'} inquiry मिली है।\n\n📦 Quantity: ${data.quantity}\n📍 Location: ${data.location}\n${data.target_price ? `💰 Target Price: ${data.target_price}\n` : ''}\nहमारी टीम 30 मिनट में आपसे WhatsApp पर संपर्क करेगी।\n\nधन्यवाद!\nTradeWiser™ - Commodity to Capital\n📞 +91 7982985895\n🌐 https://tradewiser.in`,
    
    market_prices: `नमस्ते ${data.name}! 🙏\n\n${data.commodity} की latest market prices के लिए धन्यवाद!\n\n📍 Location: ${data.location}\n${data.quality_grade ? `⭐ Quality: ${data.quality_grade}\n` : ''}\nहमारी टीम आपको detailed price information WhatsApp पर भेजेगी।\n\nTradeWiser™\n📞 +91 7982985895\n🌐 https://tradewiser.in`,
    
    warehousing: `नमस्ते ${data.name}! 🙏\n\nWarehousing inquiry के लिए धन्यवाद!\n\n📦 ${data.commodity} - ${data.quantity}\n⏱️ Duration: ${data.duration}\n📍 Location: ${data.location}\n\nहमारी टीम जल्द ही warehousing options के साथ संपर्क करेगी।\n\nTradeWiser™\n📞 +91 7982985895\n🌐 https://tradewiser.in`,
    
    quality_check: `नमस्ते ${data.name}! 🙏\n\nQuality check request के लिए धन्यवाद!\n\n📦 ${data.commodity} - ${data.quantity}\n📍 Location: ${data.location}\n${data.inspection_type ? `🔍 Type: ${data.inspection_type}\n` : ''}\nहमारी टीम inspection schedule करने के लिए संपर्क करेगी।\n\nTradeWiser™\n📞 +91 7982985895\n🌐 https://tradewiser.in`
  };

  return templates[serviceType] || templates.trading;
};

// Format phone number for WhatsApp (ensure it starts with country code)
const formatPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If it's a 10-digit Indian number, add 91
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  
  return cleaned;
};

// POST /api/leads - Create new lead
router.post('/leads', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service_type,
      commodity,
      quantity,
      location,
      trade_type,
      quality_grade,
      duration,
      inspection_type,
      target_price
    } = req.body;

    // Validate required fields
    if (!name || !phone || !service_type) {
      return res.status(400).json({
        success: false,
        error: 'Name, phone, and service type are required'
      });
    }

    // 1. Save to database
    const result = await db.query(
      `INSERT INTO leads (
        name, phone, email, service_type, commodity, quantity, location,
        trade_type, quality_grade, duration, inspection_type, target_price
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, created_at`,
      [
        name, phone, email, service_type, commodity, quantity, location,
        trade_type, quality_grade, duration, inspection_type, target_price
      ]
    );

    const leadId = result.rows[0].id;
    const createdAt = result.rows[0].created_at;

    let whatsappSent = false;
    let sheetsSynced = false;

    // 2. Send to Google Sheets
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:K',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            new Date(createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            name,
            phone,
            email || '',
            service_type,
            commodity || '',
            quantity || '',
            location || '',
            trade_type || quality_grade || duration || inspection_type || '',
            'new',
            ''
          ]]
        }
      });
      sheetsSynced = true;
      console.log('✓ Lead synced to Google Sheets');
    } catch (error) {
      console.error('✗ Error syncing to Google Sheets:', error.message);
    }

    // 3. Send WhatsApp message
    try {
      const whatsappMessage = getWhatsAppTemplate(service_type, {
        name,
        commodity,
        quantity,
        location,
        trade_type,
        quality_grade,
        duration,
        inspection_type,
        target_price
      });

      const formattedPhone = formatPhoneNumber(phone);

      await axios.post(
        `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: { body: whatsappMessage }
        },
        {
          headers: {
            'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      whatsappSent = true;
      console.log(`✓ WhatsApp message sent to ${formattedPhone}`);
    } catch (error) {
      console.error('✗ Error sending WhatsApp message:', error.response?.data || error.message);
    }

    // 4. Update lead status
    await db.query(
      'UPDATE leads SET whatsapp_sent = $1, sheets_synced = $2 WHERE id = $3',
      [whatsappSent, sheetsSynced, leadId]
    );

    res.json({
      success: true,
      lead_id: leadId,
      whatsapp_sent: whatsappSent,
      sheets_synced: sheetsSynced,
      message: 'Lead captured successfully! We will contact you within 30 minutes.'
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lead. Please try again or call us at +91 7982985895.'
    });
  }
});

// GET /api/leads - Get all leads (for admin dashboard)
router.get('/leads', async (req, res) => {
  try {
    const { service_type, status, limit = 50 } = req.query;

    let query = 'SELECT * FROM leads WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (service_type) {
      query += ` AND service_type = $${paramIndex}`;
      params.push(service_type);
      paramIndex++;
    }

    if (status) {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex}`;
    params.push(limit);

    const result = await db.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      leads: result.rows
    });

  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads'
    });
  }
});

// GET /api/leads/stats - Get lead statistics
router.get('/leads/stats', async (req, res) => {
  try {
    const stats = await db.query(`
      SELECT 
        COUNT(*) as total_leads,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as leads_today,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as leads_this_week,
        COUNT(*) FILTER (WHERE service_type = 'trading') as trading_leads,
        COUNT(*) FILTER (WHERE service_type = 'market_prices') as pricing_leads,
        COUNT(*) FILTER (WHERE service_type = 'warehousing') as warehousing_leads,
        COUNT(*) FILTER (WHERE service_type = 'quality_check') as quality_check_leads,
        COUNT(*) FILTER (WHERE status = 'new') as new_leads,
        COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
        COUNT(*) FILTER (WHERE status = 'converted') as converted_leads,
        COUNT(*) FILTER (WHERE whatsapp_sent = true) as whatsapp_success_rate,
        COUNT(*) FILTER (WHERE sheets_synced = true) as sheets_success_rate
      FROM leads
    `);

    res.json({
      success: true,
      stats: stats.rows[0]
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

// PUT /api/leads/:id - Update lead status
router.put('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const result = await db.query(
      'UPDATE leads SET status = COALESCE($1, status), notes = COALESCE($2, notes), updated_at = NOW() WHERE id = $3 RETURNING *',
      [status, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.json({
      success: true,
      lead: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update lead'
    });
  }
});

export default router;
