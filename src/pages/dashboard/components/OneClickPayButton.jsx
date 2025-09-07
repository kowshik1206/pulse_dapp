import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Button from '../../../components/ui/Button';

const OneClickPayButton = ({ pendingBills, onOneClickPay, disabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (disabled || isProcessing) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onOneClickPay();
      setIsProcessing(false);
    }, 2000);
  };

  const totalAmount = pendingBills?.reduce((sum, bill) => sum + bill?.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <div className="glass-strong rounded-2xl p-6 border border-primary/30 glow-primary">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-1">
              One-Click Pay All
            </h3>
            <p className="text-muted-foreground text-sm">
              Pay all {pendingBills?.length} pending bills instantly
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-foreground font-data">
              ${totalAmount?.toFixed(2)}
            </p>
          </div>
        </div>

        <Button
          variant="default"
          size="lg"
          iconName={isProcessing ? "Loader2" : "Zap"}
          iconPosition="left"
          onClick={handleClick}
          disabled={disabled || isProcessing}
          loading={isProcessing}
          fullWidth
          className="glow-primary text-lg font-semibold"
        >
          {isProcessing ? 'Processing Payment...' : 'Pay All Bills Now'}
        </Button>

        {disabled && (
          <p className="text-center text-muted-foreground text-xs mt-2">
            No pending bills to pay
          </p>
        )}
      </div>
      {/* Animated particles effect */}
      {!disabled && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OneClickPayButton;