import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AutoPayModal = ({ isOpen, onClose, bill, onSave }) => {
  const [formData, setFormData] = useState({
    frequency: 'monthly',
    maxAmount: bill?.amount || 0,
    startDate: new Date()?.toISOString()?.split('T')?.[0],
    endDate: ''
  });

  const frequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const handleSave = () => {
    onSave(bill?.id, formData);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-strong rounded-2xl border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <Icon name="Repeat" size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-foreground">
                      Setup AutoPay
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {bill?.provider}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Bill Info */}
                <div className="glass rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Current Amount</span>
                    <span className="text-lg font-bold text-foreground font-data">
                      ${bill?.amount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Next Due Date</span>
                    <span className="text-sm text-foreground">
                      {new Date(bill?.dueDate)?.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <Select
                    label="Payment Frequency"
                    description="How often should payments be made?"
                    options={frequencyOptions}
                    value={formData?.frequency}
                    onChange={(value) => handleInputChange('frequency', value)}
                  />

                  <Input
                    label="Maximum Payment Limit"
                    type="number"
                    description="Set a maximum amount for automatic payments"
                    value={formData?.maxAmount}
                    onChange={(e) => handleInputChange('maxAmount', parseFloat(e?.target?.value))}
                    min="0"
                    step="0.01"
                  />

                  <Input
                    label="Start Date"
                    type="date"
                    description="When should AutoPay begin?"
                    value={formData?.startDate}
                    onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                  />

                  <Input
                    label="End Date (Optional)"
                    type="date"
                    description="Leave empty for indefinite AutoPay"
                    value={formData?.endDate}
                    onChange={(e) => handleInputChange('endDate', e?.target?.value)}
                  />
                </div>

                {/* Security Notice */}
                <div className="glass rounded-xl p-4 border border-warning/30 bg-warning/5">
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={20} className="text-warning mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        Security Notice
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        AutoPay will be processed securely through your connected wallet. 
                        You can modify or cancel these settings at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex space-x-3 p-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  iconName="Check"
                  iconPosition="left"
                  className="flex-1 glow-primary"
                >
                  Enable AutoPay
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AutoPayModal;