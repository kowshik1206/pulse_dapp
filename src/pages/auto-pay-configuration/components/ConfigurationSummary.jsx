import React from 'react';
import Icon from '../../../components/AppIcon';

const ConfigurationSummary = ({ 
  selectedDate, 
  frequency, 
  paymentLimit, 
  advancedSettings,
  className = '' 
}) => {
  const formatDate = (date) => {
    if (!date) return 'Not selected';
    
    try {
      // Ensure we have a valid Date object
      const dateObj = date instanceof Date ? date : new Date(date);
      
      // Check if date is valid
      if (isNaN(dateObj?.getTime())) {
        return 'Invalid date';
      }
      
      // Try to use Intl.DateFormat with proper error handling
      if (typeof Intl !== 'undefined' && Intl.DateFormat) {
        return new Intl.DateFormat('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })?.format(dateObj);
      } else {
        // Fallback to built-in date methods
        const options = {
          weekday: 'long',
          year: 'numeric', 
          month: 'long',
          day: 'numeric'
        };
        return dateObj?.toLocaleDateString('en-US', options);
      }
    } catch (error) {
      console.warn('Date formatting error:', error);
      // Fallback to simple date string
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj?.toDateString() || 'Invalid date';
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    
    try {
      const numericValue = parseFloat(amount);
      if (isNaN(numericValue)) return '$0.00';
      
      // Try to use Intl.NumberFormat with proper error handling
      if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })?.format(numericValue);
      } else {
        // Fallback to manual formatting
        return `$${numericValue?.toFixed(2)}`;
      }
    } catch (error) {
      console.warn('Currency formatting error:', error);
      // Fallback to simple dollar formatting
      const numericValue = parseFloat(amount) || 0;
      return `$${numericValue?.toFixed(2)}`;
    }
  };

  const getFrequencyLabel = (freq) => {
    switch (freq) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'yearly': return 'Yearly';
      default: return 'Not selected';
    }
  };

  const getNextPaymentDate = () => {
    if (!selectedDate || !frequency) return null;
    
    const nextDate = new Date(selectedDate);
    const today = new Date();
    
    // If selected date is in the past, move to next occurrence
    if (nextDate < today) {
      switch (frequency) {
        case 'monthly':
          nextDate?.setMonth(nextDate?.getMonth() + 1);
          break;
        case 'quarterly':
          nextDate?.setMonth(nextDate?.getMonth() + 3);
          break;
        case 'yearly':
          nextDate?.setFullYear(nextDate?.getFullYear() + 1);
          break;
      }
    }
    
    return nextDate;
  };

  const nextPayment = getNextPaymentDate();
  const isConfigurationComplete = selectedDate && frequency && paymentLimit;

  const summaryItems = [
    {
      icon: 'Calendar',
      label: 'Payment Date',
      value: formatDate(selectedDate),
      color: selectedDate ? 'text-success' : 'text-muted-foreground',
      bgColor: selectedDate ? 'bg-success/10' : 'bg-muted/10',
      borderColor: selectedDate ? 'border-success/20' : 'border-muted/20'
    },
    {
      icon: 'Clock',
      label: 'Frequency',
      value: getFrequencyLabel(frequency),
      color: frequency ? 'text-warning' : 'text-muted-foreground',
      bgColor: frequency ? 'bg-warning/10' : 'bg-muted/10',
      borderColor: frequency ? 'border-warning/20' : 'border-muted/20'
    },
    {
      icon: 'DollarSign',
      label: 'Payment Limit',
      value: formatCurrency(paymentLimit),
      color: paymentLimit ? 'text-accent' : 'text-muted-foreground',
      bgColor: paymentLimit ? 'bg-accent/10' : 'bg-muted/10',
      borderColor: paymentLimit ? 'border-accent/20' : 'border-muted/20'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Configuration Summary Header */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Icon name="FileText" size={16} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">Configuration Summary</h3>
          <p className="text-sm text-muted-foreground">Review your AutoPay settings</p>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryItems?.map((item, index) => (
          <div
            key={index}
            className={`
              glass rounded-xl p-4 border transition-all duration-200
              ${item?.bgColor} ${item?.borderColor}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center border
                ${item?.bgColor} ${item?.borderColor}
              `}>
                <Icon name={item?.icon} size={16} className={item?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                  {item?.label}
                </p>
                <p className={`text-sm font-medium mt-1 truncate ${item?.color}`}>
                  {item?.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Next Payment Preview */}
      {nextPayment && (
        <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon name="CalendarCheck" size={20} className="text-primary" />
            </div>
            
            <div className="flex-1 space-y-2">
              <h4 className="font-heading font-semibold text-foreground">Next Payment</h4>
              <p className="text-lg font-data font-bold text-primary">
                {formatDate(nextPayment)}
              </p>
              <p className="text-sm text-muted-foreground">
                Your first automatic payment will be processed on this date
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                Max Amount
              </div>
              <div className="text-lg font-data font-bold text-accent">
                {formatCurrency(paymentLimit)}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Advanced Settings Summary */}
      {advancedSettings && Object.keys(advancedSettings)?.length > 0 && (
        <div className="glass rounded-xl p-4 border border-accent/20 bg-accent/5">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Settings" size={16} className="text-accent" />
            <h4 className="font-heading font-medium text-foreground">Advanced Settings</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-muted-foreground">Retry Attempts:</span>
              <span className="text-foreground font-medium ml-2">
                {advancedSettings?.retryAttempts || '3'} times
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Notifications:</span>
              <span className="text-foreground font-medium ml-2">
                {advancedSettings?.notificationTiming || '3'} days before
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Email Alerts:</span>
              <span className="text-foreground font-medium ml-2">
                {advancedSettings?.emailNotifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">2FA Required:</span>
              <span className="text-foreground font-medium ml-2">
                {advancedSettings?.require2FA ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Configuration Status */}
      <div className={`
        glass rounded-xl p-4 border transition-all duration-200
        ${isConfigurationComplete 
          ? 'border-success/20 bg-success/5' :'border-warning/20 bg-warning/5'
        }
      `}>
        <div className="flex items-center space-x-3">
          <Icon 
            name={isConfigurationComplete ? "CheckCircle" : "AlertCircle"} 
            size={20} 
            className={isConfigurationComplete ? "text-success" : "text-warning"}
          />
          <div>
            <h4 className="font-heading font-medium text-foreground">
              {isConfigurationComplete ? 'Configuration Complete' : 'Configuration Incomplete'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {isConfigurationComplete 
                ? 'Your AutoPay settings are ready to be saved' :'Please complete all required fields to enable AutoPay'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationSummary;