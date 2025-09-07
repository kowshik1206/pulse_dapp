import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const faqData = [
    {
      id: 'wallet-connection',
      category: 'Wallet & Connection',
      question: 'How do I connect my Aptos wallet to Pulse DApp?',
      answer: `To connect your Aptos wallet:\n\n1. Click on "Wallet Connect" in the navigation menu\n2. Select your preferred Aptos wallet (Petra, Martian, etc.)\n3. Approve the connection request in your wallet\n4. Once connected, you'll see a green "Connected" status\n\nSupported wallets include Petra Wallet, Martian Wallet, and Pontem Wallet. Make sure you have the latest version installed.`
    },
    {
      id: 'payment-processing',category: 'Payments',question: 'How does the payment processing work?',
      answer: `Pulse DApp processes payments through smart contracts on the Aptos blockchain:\n\n• One-Click Pay: Instantly pay all pending bills with a single transaction\n• Individual Payments: Pay bills one by one as needed\n• Transaction fees are minimal (typically &lt; $0.01)\n• All payments are recorded on-chain for transparency\n• You'll receive confirmation within 2-3 seconds\n\nPayments are processed in APT tokens, with automatic conversion rates displayed.`
    },
    {
      id: 'autopay-setup',
      category: 'AutoPay',
      question: 'How do I set up AutoPay for my bills?',
      answer: `Setting up AutoPay is simple:\n\n1. Navigate to the AutoPay Configuration page\n2. Select the bills you want to automate\n3. Choose your payment frequency (Monthly/Quarterly/Yearly)\n4. Set a maximum payment limit for security\n5. Pick your preferred payment date\n6. Confirm and activate\n\nAutoPay uses smart contracts to execute payments automatically. You can modify or cancel anytime.`
    },
    {
      id: 'security-measures',
      category: 'Security',
      question: 'What security measures protect my funds?',
      answer: `Pulse DApp implements multiple security layers:\n\n• Smart contract audits by leading security firms\n• Multi-signature wallet support\n• Maximum payment limits to prevent large unauthorized transactions\n• Real-time transaction monitoring\n• Encrypted communication protocols\n• No private keys stored on our servers\n\nYour wallet remains in your control at all times. We never have access to your private keys.`
    },
    {
      id: 'supported-bills',
      category: 'Bill Management',
      question: 'What types of bills can I pay through Pulse DApp?',
      answer: `Currently supported bill categories:\n\n• Utilities (Electricity, Water, Gas)\n• Internet & Telecommunications\n• Streaming Services (Netflix, Spotify, etc.)\n• Insurance Premiums\n• Subscription Services\n• Credit Card Payments\n\nWe're continuously adding new service providers. If you don't see your biller, contact support to request integration.`
    },
    {
      id: 'transaction-fees',
      category: 'Fees & Costs',
      question: 'What are the transaction fees?',
      answer: `Pulse DApp fee structure:\n\n• Platform Fee: 0.5% per transaction (capped at $5)\n• Network Fee: Standard Aptos gas fees (~$0.001)\n• No monthly subscription fees\n• No setup fees for AutoPay\n• No cancellation fees\n\nBulk payments (One-Click Pay) receive a 20% discount on platform fees.`
    },
    {
      id: 'troubleshooting',
      category: 'Troubleshooting',
      question: 'My transaction failed. What should I do?',
      answer: `If your transaction fails:\n\n1. Check your wallet balance (ensure sufficient APT)\n2. Verify network connectivity\n3. Try refreshing the page and reconnecting wallet\n4. Check if the service provider is experiencing downtime\n5. Review transaction details for errors\n\nIf the issue persists, contact our support team with your transaction hash for immediate assistance.`
    },
    {
      id: 'mobile-support',
      category: 'Technical',
      question: 'Is Pulse DApp available on mobile devices?',
      answer: `Yes! Pulse DApp is fully responsive:\n\n• Works on all modern mobile browsers\n• Optimized for iOS Safari and Android Chrome\n• Touch-friendly interface design\n• Mobile wallet integration support\n• Offline transaction queuing (coming soon)\n\nFor the best experience, we recommend using the latest version of your mobile browser.`
    }
  ];

  const toggleItem = (itemId) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems?.has(itemId)) {
      newOpenItems?.delete(itemId);
    } else {
      newOpenItems?.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const categories = [...new Set(faqData.map(item => item.category))];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Find quick answers to common questions about Pulse DApp
        </p>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories?.map((category) => (
          <div
            key={category}
            className="px-3 py-1 bg-muted/30 rounded-full text-xs font-caption text-muted-foreground"
          >
            {category}
          </div>
        ))}
      </div>
      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData?.map((item, index) => (
          <motion.div
            key={item?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="glass rounded-2xl border border-border overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item?.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/20 transition-colors duration-150"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <span className="text-xs font-caption text-primary bg-primary/20 px-2 py-1 rounded-md">
                    {item?.category}
                  </span>
                </div>
                <h3 className="text-foreground font-heading font-medium">
                  {item?.question}
                </h3>
              </div>
              <motion.div
                animate={{ rotate: openItems?.has(item?.id) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openItems?.has(item?.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 border-t border-border/50">
                    <div className="pt-4">
                      {item?.answer?.split('\n')?.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-muted-foreground text-sm leading-relaxed mb-2 last:mb-0"
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      {/* Still Need Help */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center glass-strong rounded-2xl p-8"
      >
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="HelpCircle" size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          Still Need Help?
        </h3>
        <p className="text-muted-foreground mb-6">
          Can't find what you're looking for? Our support team is here to help you 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-150 glow-primary"
          >
            Contact Support
          </button>
          <button
            onClick={() => alert('Knowledge base coming soon!')}
            className="px-6 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted/20 transition-colors duration-150"
          >
            Browse Knowledge Base
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQSection;