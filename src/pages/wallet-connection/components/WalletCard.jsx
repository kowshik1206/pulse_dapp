import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WalletCard = ({ wallet, onConnect, isConnecting, connectedWallet }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isConnected = connectedWallet === wallet?.id;
  const isCurrentlyConnecting = isConnecting === wallet?.id;

  const handleConnect = () => {
    if (!isConnected && !isCurrentlyConnecting) {
      onConnect(wallet?.id);
    }
  };

  return (
    <motion.div
      className={`
        relative p-6 rounded-2xl glass border transition-all duration-300 cursor-pointer
        ${isConnected ? 'border-success glow-success' : 'border-border hover:border-primary/50'}
        ${isHovered && !isConnected ? 'glow-primary' : ''}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleConnect}
    >
      {/* Connection Status Indicator */}
      {isConnected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center glow-success">
          <Icon name="Check" size={14} className="text-background" />
        </div>
      )}
      {/* Wallet Logo */}
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
          <Image 
            src={wallet?.logo} 
            alt={`${wallet?.name} logo`}
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>
      {/* Wallet Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          {wallet?.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {wallet?.description}
        </p>
        
        {/* Features */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {wallet?.features?.map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs font-caption bg-muted/30 text-muted-foreground rounded-lg border border-border"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
      {/* Security Badges */}
      <div className="flex justify-center space-x-2 mb-4">
        {wallet?.securityBadges?.map((badge, index) => (
          <div 
            key={index}
            className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success text-xs rounded-lg border border-success/20"
          >
            <Icon name="Shield" size={12} />
            <span>{badge}</span>
          </div>
        ))}
      </div>
      {/* Connection Button */}
      <Button
        variant={isConnected ? "success" : "default"}
        fullWidth
        loading={isCurrentlyConnecting}
        disabled={isCurrentlyConnecting}
        iconName={isConnected ? "Check" : "Wallet"}
        iconPosition="left"
        className={`
          ${isConnected ? 'glow-success' : 'glow-primary'}
          transition-all duration-300
        `}
      >
        {isConnected ? 'Connected' : isCurrentlyConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
      {/* Compatibility Info */}
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground">
          Compatible with {wallet?.compatibility?.join(', ')}
        </p>
      </div>
    </motion.div>
  );
};

export default WalletCard;