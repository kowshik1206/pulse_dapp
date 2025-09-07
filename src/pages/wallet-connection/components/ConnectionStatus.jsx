import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConnectionStatus = ({ isConnected, connectedWallet, onDisconnect, walletAddress }) => {
  if (!isConnected) return null;

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-success glow-success mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center border border-success/20">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-1">
              Wallet Connected Successfully
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{connectedWallet?.name || 'Unknown Wallet'}</span>
              <span>•</span>
              <span className="font-caption">{formatAddress(walletAddress)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full pulse-neon" />
            <span className="text-xs font-caption text-success">Active</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onDisconnect}
            iconName="LogOut"
            iconPosition="left"
          >
            Disconnect
          </Button>
        </div>
      </div>
      {/* Connection Details */}
      <div className="mt-4 pt-4 border-t border-success/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-heading font-semibold text-success mb-1">
              Active
            </div>
            <p className="text-xs text-muted-foreground">Connection Status</p>
          </div>
          
          <div>
            <div className="text-lg font-heading font-semibold text-foreground mb-1">
              {new Date()?.toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">Connected Since</p>
          </div>
          
          <div>
            <div className="text-lg font-heading font-semibold text-primary mb-1">
              Mainnet
            </div>
            <p className="text-xs text-muted-foreground">Network</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectionStatus;