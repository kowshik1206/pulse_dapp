import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillCard = ({ bill, onPayNow, onEnableAutoPay }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-success/20 text-success border-success/30';
      case 'Pending':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'AutoPay Enabled':
        return 'bg-accent/20 text-accent border-accent/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getProviderIcon = (provider) => {
    const iconMap = {
      'Electric Company': 'Zap',
      'Water Utility': 'Droplets',
      'Internet Provider': 'Wifi',
      'Gas Company': 'Flame',
      'Phone Service': 'Phone',
      'Insurance': 'Shield',
      'Credit Card': 'CreditCard',
      'Mortgage': 'Home'
    };
    return iconMap?.[provider] || 'FileText';
  };

  const isOverdue = new Date(bill.dueDate) < new Date() && bill?.status === 'Pending';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`glass rounded-2xl p-6 border transition-all duration-300 hover:shadow-neo ${
        isOverdue ? 'border-error/50 glow-error' : 'border-border hover:border-primary/30'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-primary">
            <Icon name={getProviderIcon(bill?.provider)} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-lg">
              {bill?.provider}
            </h3>
            <p className="text-sm text-muted-foreground font-caption">
              Account: {bill?.accountNumber}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bill?.status)}`}>
          {bill?.status}
        </div>
      </div>
      {/* Amount and Due Date */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Amount Due</span>
          <span className="text-2xl font-bold text-foreground font-data">
            ${bill?.amount?.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Due Date</span>
          <div className="flex items-center space-x-2">
            {isOverdue && (
              <Icon name="AlertTriangle" size={16} className="text-error" />
            )}
            <span className={`text-sm font-medium ${isOverdue ? 'text-error' : 'text-foreground'}`}>
              {new Date(bill.dueDate)?.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3">
        {bill?.status === 'Pending' && (
          <Button
            variant="default"
            size="sm"
            iconName="CreditCard"
            iconPosition="left"
            onClick={() => onPayNow(bill?.id)}
            className="flex-1"
          >
            Pay Now
          </Button>
        )}
        {bill?.status !== 'AutoPay Enabled' && (
          <Button
            variant="outline"
            size="sm"
            iconName="Repeat"
            iconPosition="left"
            onClick={() => onEnableAutoPay(bill?.id)}
            className="flex-1"
          >
            AutoPay
          </Button>
        )}
        {bill?.status === 'Paid' && (
          <div className="flex-1 flex items-center justify-center space-x-2 py-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">Paid</span>
          </div>
        )}
        {bill?.status === 'AutoPay Enabled' && (
          <div className="flex-1 flex items-center justify-center space-x-2 py-2">
            <Icon name="Repeat" size={16} className="text-accent" />
            <span className="text-sm text-accent font-medium">Auto Scheduled</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BillCard;