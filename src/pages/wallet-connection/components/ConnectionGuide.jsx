import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ConnectionGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Choose Your Wallet',
      description: 'Select from our supported wallet providers',
      icon: 'Wallet',
      details: 'We support multiple wallet providers including Aptos, MetaMask, and WalletConnect. Choose the one you prefer or already have installed.'
    },
    {
      id: 2,
      title: 'Authorize Connection',
      description: 'Approve the connection request in your wallet',
      icon: 'Key',
      details: 'Your wallet will prompt you to authorize the connection. This allows Pulse DApp to interact with your wallet for payment processing.'
    },
    {
      id: 3,
      title: 'Verify Identity',
      description: 'Complete the secure verification process',
      icon: 'ShieldCheck',
      details: 'A quick verification ensures the security of your connection and enables all payment features including AutoPay functionality.'
    },
    {
      id: 4,
      title: 'Start Paying Bills',
      description: 'Begin managing your bills with blockchain technology',
      icon: 'Zap',
      details: 'Once connected, you can view all your bills, make instant payments, and set up automated recurring payments with full blockchain security.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          How It Works
        </h3>
        <p className="text-muted-foreground">
          Connect your wallet in 4 simple steps
        </p>
      </div>
      {/* Step Navigation */}
      <div className="flex justify-center space-x-2 mb-6">
        {steps?.map((step, index) => (
          <button
            key={step?.id}
            onClick={() => setCurrentStep(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${currentStep === index 
                ? 'bg-primary glow-primary' :'bg-muted hover:bg-primary/50'
              }
            `}
          />
        ))}
      </div>
      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-2xl p-6 border border-border"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30 flex-shrink-0">
            <Icon name={steps?.[currentStep]?.icon} size={24} className="text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-caption text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
                Step {steps?.[currentStep]?.id}
              </span>
            </div>
            
            <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
              {steps?.[currentStep]?.title}
            </h4>
            
            <p className="text-muted-foreground mb-3">
              {steps?.[currentStep]?.description}
            </p>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {steps?.[currentStep]?.details}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${currentStep === 0 
                ? 'text-muted-foreground cursor-not-allowed' 
                : 'text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon name="ChevronLeft" size={16} />
            <span>Previous</span>
          </button>

          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {steps?.length}
          </span>

          <button
            onClick={() => setCurrentStep(Math.min(steps?.length - 1, currentStep + 1))}
            disabled={currentStep === steps?.length - 1}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${currentStep === steps?.length - 1 
                ? 'text-muted-foreground cursor-not-allowed' 
                : 'text-foreground hover:bg-muted/50'
              }
            `}
          >
            <span>Next</span>
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </motion.div>
      {/* Auto-advance indicator */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Steps auto-advance every 5 seconds or click to navigate manually
        </p>
      </div>
    </div>
  );
};

export default ConnectionGuide;