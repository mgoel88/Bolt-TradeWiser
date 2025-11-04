import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-[#0A2E50] mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <div>
            <p className="text-gray-600 mb-4">
              <strong>Last Updated:</strong> October 30, 2025
            </p>
            <p className="text-gray-700 leading-relaxed">
              Mfarm Ventures Private Limited ("TradeWiser™", "we", "us", or "our") operates tradewiser.in. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-4">1.1 Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Name, phone number, and email address</li>
              <li>Business name and address</li>
              <li>GST number (if applicable)</li>
              <li>Trading preferences and commodity interests</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-6">1.2 Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you access our platform, we automatically collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Location data (with your permission)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Facilitating connections between traders</li>
              <li>Providing price quotes and market information</li>
              <li>Sending trade-related communications via WhatsApp, SMS, or email</li>
              <li>Improving our platform and services</li>
              <li>Complying with legal obligations</li>
              <li>Preventing fraud and ensuring platform security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Other Traders:</strong> To facilitate trade connections (name, business details, contact information)</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist in platform operations</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, 
              we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">5. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under Indian data protection laws, you have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Object to certain data processing activities</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, contact us at <a href="mailto:support@tradewiser.in" className="text-[#B88A3D] hover:underline">support@tradewiser.in</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience. You can control cookie 
              preferences through your browser settings. Disabling cookies may limit some platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">7. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform may contain links to third-party websites (e.g., WhatsApp). We are not responsible for 
              the privacy practices of these external sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
              personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated 
              "Last Updated" date. Continued use of the platform constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">10. Contact Us</h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-2">
              <p className="text-gray-700"><strong>Mfarm Ventures Private Limited</strong></p>
              <p className="text-gray-700">624-625, Third Floor, Gali Ghanteshwar, Katra Neel, Chandni Chowk, Delhi 110006</p>
              <p className="text-gray-700">Email: <a href="mailto:support@tradewiser.in" className="text-[#B88A3D] hover:underline">support@tradewiser.in</a></p>
              <p className="text-gray-700">Phone: <a href="tel:+917982985895" className="text-[#B88A3D] hover:underline">+91 79829 85895</a></p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
