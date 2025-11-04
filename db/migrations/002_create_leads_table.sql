-- Create leads table for multi-service lead capture
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('trading', 'market_prices', 'warehousing', 'quality_check')),
    commodity VARCHAR(100),
    quantity VARCHAR(50),
    location VARCHAR(255),
    trade_type VARCHAR(10) CHECK (trade_type IN ('buy', 'sell', NULL)),
    quality_grade VARCHAR(50),
    duration VARCHAR(50),
    inspection_type VARCHAR(100),
    target_price VARCHAR(50),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    whatsapp_sent BOOLEAN DEFAULT FALSE,
    sheets_synced BOOLEAN DEFAULT FALSE,
    notes TEXT,
    source VARCHAR(50) DEFAULT 'website'
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_service_type ON leads(service_type);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
