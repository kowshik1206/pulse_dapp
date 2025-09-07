import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ConnectionBenefits = () => {
  const [expandedBenefit, setExpandedBenefit] = useState(null);

  const benefits = [
    {
      id: 'security',
      icon: 'Shield',
      title: 'Enhanced Security',
      description: 'Blockchain-based authentication with military-grade encryption',
      details: `Your wallet connection uses advanced cryptographic protocols to ensure maximum security. All transactions are verified on the blockchain, providing immutable proof of payment and preventing unauthorized access to your funds.`
    },
    {
      id: 'automation',
      icon: 'Zap',
      title: 'Smart Automation',
      description: 'Set up recurring payments with intelligent scheduling',
      details: `Enable AutoPay functionality to automatically handle your recurring bills. Our smart contracts execute payments precisely when due, ensuring you never miss a payment while maintaining full control over your funds.`
    },
    {
      id: 'transparency',
      icon: 'Eye',
      title: 'Full Transparency',
      description: 'Track all transactions on the blockchain ledger',
      details: `Every payment is recorded on the blockchain, providing complete transparency and auditability. View detailed transaction history, payment confirmations, and smart contract interactions in real-time.`
    },
    {
      id: 'control',
      icon: 'Settings',
      title: 'Complete Control',
      description: 'Maintain full custody of your digital assets',
      details: `Your funds remain in your wallet at all times. We never hold or custody your assets - payments are executed directly from your wallet using secure smart contracts that you can audit and verify.`
    }
  ];

  const toggleExpanded = (benefitId) => {
    setExpandedBenefit(expandedBenefit === benefitId ? null : benefitId);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          Why Connect Your Wallet?
        </h3>
        <p className="text-muted-foreground">
          Unlock the full potential of decentralized bill payments
        </p>
      </div>
      <div className="space-y-3">
        {benefits?.map((benefit) => (
          <motion.div
            key={benefit?.id}
            className="glass rounded-2xl border border-border overflow-hidden"
            layout
          >
            <div
              className="p-4 cursor-pointer hover:bg-muted/10 transition-colors duration-200"
              onClick={() => toggleExpanded(benefit?.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
                    <Icon name={benefit?.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-foreground">
                      {benefit?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {benefit?.description}
                    </p>
                  </div>
                </div>
                <Icon 
                  name={expandedBenefit === benefit?.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-muted-foreground transition-transform duration-200" 
                />
              </div>
            </div>

            <AnimatePresence>
              {expandedBenefit === benefit?.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border"
                >
                  <div className="p-4 pt-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit?.details}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionBenefits;