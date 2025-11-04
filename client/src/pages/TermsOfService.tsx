import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-[#0A2E50] mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <div>
            <p className="text-gray-600 mb-4">
              <strong>Last Updated:</strong> October 30, 2025
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of the TradeWiser™ platform operated by 
              Mfarm Ventures Private Limited (CIN: U51909DL2021PTC389391). By accessing or using our services, 
              you agree to be bound by these Terms.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">1. Service Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TradeWiser™ is a digital platform that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provides price information for agricultural commodities</li>
              <li>Facilitates connections between buyers and sellers</li>
              <li>Offers market intelligence and trading support</li>
              <li>Connects users with verified counterparties</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Important:</strong> We are an information and connection platform, not a commodity exchange. 
              We do not handle physical commodities, execute trades, or process payments directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">2. User Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use TradeWiser™, you must:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into contracts</li>
              <li>Be engaged in legitimate agricultural commodity trading</li>
              <li>Comply with all applicable laws and regulations in India</li>
              <li>Provide accurate and complete information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">3. User Responsibilities</h2>
            
            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-4">3.1 Account Security</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are responsible for maintaining the confidentiality of your account information and for all 
              activities under your account.
            </p>

            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-4">3.2 Accurate Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must provide accurate, current, and complete information about yourself and your trading requirements.
            </p>

            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-4">3.3 Prohibited Activities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree NOT to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide false or misleading information</li>
              <li>Engage in fraudulent activities</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to the platform</li>
              <li>Use the platform for illegal commodity trading</li>
              <li>Manipulate prices or engage in market manipulation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">4. Trading and Transactions</h2>
            
            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-4">4.1 Platform Role</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              TradeWiser™ acts solely as an intermediary to connect traders. All trade agreements, negotiations, 
              quality verification, payments, and deliveries are conducted directly between parties.
            </p>

            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-4">4.2 No Guarantee</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not guarantee:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>The accuracy of price information</li>
              <li>The quality of commodities</li>
              <li>The reliability of counterparties</li>
              <li>The completion of any transaction</li>
              <li>The resolution of disputes between parties</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-4">4.3 Due Diligence</h3>
            <p className="text-gray-700 leading-relaxed">
              Users are responsible for conducting their own due diligence, including verifying counterparty credentials, 
              commodity quality, payment terms, and delivery arrangements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">5. Fees and Payments</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Currently, TradeWiser™ offers free basic services. We reserve the right to introduce fees for premium 
              features in the future. Any fee changes will be communicated with at least 30 days' notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, features, and functionality on TradeWiser™ (including but not limited to text, graphics, 
              logos, icons, images, and software) are owned by Mfarm Ventures Private Limited and protected by 
              Indian and international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-700 leading-relaxed">
              "TradeWiser™" and the TradeWiser logo are trademarks of Mfarm Ventures Private Limited. 
              Unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by Indian law:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>TradeWiser™ is provided "as is" without warranties of any kind</li>
              <li>We are not liable for any direct, indirect, incidental, or consequential damages</li>
              <li>We are not responsible for losses arising from trade disputes, fraud, or counterparty default</li>
              <li>Our total liability shall not exceed the fees paid by you (if any) in the past 12 months</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">8. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless Mfarm Ventures Private Limited, its directors, officers, 
              employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) 
              arising from your use of the platform or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">9. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-4">9.1 Governing Law</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive 
              jurisdiction of courts in Delhi, India.
            </p>

            <h3 className="text-xl font-semibold text-[#0A2E50] mb-3 mt-4">9.2 Arbitration</h3>
            <p className="text-gray-700 leading-relaxed">
              Any dispute arising from these Terms shall first be attempted to be resolved through good faith 
              negotiations. If unresolved within 30 days, disputes may be referred to arbitration under the 
              Arbitration and Conciliation Act, 1996.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">10. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your access to TradeWiser™ at any time, without notice, 
              for conduct that we believe:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Violates these Terms</li>
              <li>Is harmful to other users or the platform</li>
              <li>Exposes us to legal liability</li>
              <li>Is fraudulent or illegal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may modify these Terms at any time. Changes will be posted on this page with an updated 
              "Last Updated" date. Continued use of the platform after changes constitutes acceptance of the 
              revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">12. Compliance with Indian Laws</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users must comply with all applicable Indian laws, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Essential Commodities Act, 1955</li>
              <li>Agricultural Produce Market Committee (APMC) regulations</li>
              <li>Goods and Services Tax (GST) Act, 2017</li>
              <li>Information Technology Act, 2000</li>
              <li>Consumer Protection Act, 2019</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2E50] mb-4">13. Contact Information</h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-2">
              <p className="text-gray-700"><strong>Mfarm Ventures Private Limited</strong></p>
              <p className="text-gray-700">CIN: U51909DL2021PTC389391</p>
              <p className="text-gray-700">GST: 07AAPCM1496E1ZC</p>
              <p className="text-gray-700 mt-4">624-625, Third Floor, Gali Ghanteshwar, Katra Neel, Chandni Chowk, Delhi 110006</p>
              <p className="text-gray-700">Email: <a href="mailto:support@tradewiser.in" className="text-[#B88A3D] hover:underline">support@tradewiser.in</a></p>
              <p className="text-gray-700">Phone: <a href="tel:+917982985895" className="text-[#B88A3D] hover:underline">+91 79829 85895</a></p>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Acknowledgment:</strong> By using TradeWiser™, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
