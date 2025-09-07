import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FrequencySelector = ({ value, onChange, className = '' }) => {
  const frequencyOptions = [
    {
      value: 'monthly',
      label: 'Monthly',
      description: 'Payment will be processed every month on the selected date'
    },
    {
      value: 'quarterly',
      label: 'Quarterly',
      description: 'Payment will be processed every 3 months on the selected date'
    },
    {
      value: 'yearly',
      label: 'Yearly',
      description: 'Payment will be processed once a year on the selected date'
    }
  ];

  const getFrequencyIcon = (frequency) => {
    switch (frequency) {
      case 'monthly':
        return 'Calendar';
      case 'quarterly':
        return 'CalendarDays';
      case 'yearly':
        return 'CalendarRange';
      default:
        return 'Clock';
    }
  };

  const getFrequencyDetails = (frequency) => {
    switch (frequency) {
      case 'monthly':
        return {
          interval: '30 days',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'quarterly':
        return {
          interval: '90 days',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
      case 'yearly':
        return {
          interval: '365 days',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20'
        };
      default:
        return {
          interval: '',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20'
        };
    }
  };

  const selectedFrequency = frequencyOptions?.find(option => option?.value === value);
  const frequencyDetails = getFrequencyDetails(value);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Frequency Selection */}
      <div className="space-y-2">
        <Select
          label="Payment Frequency"
          description="Choose how often you want to make automatic payments"
          options={frequencyOptions}
          value={value}
          onChange={onChange}
          placeholder="Select payment frequency"
          required
        />
      </div>
      {/* Frequency Details Card */}
      {value && (
        <div className={`
          glass rounded-xl p-4 border transition-all duration-300
          ${frequencyDetails?.bgColor} ${frequencyDetails?.borderColor}
        `}>
          <div className="flex items-start space-x-3">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center
              ${frequencyDetails?.bgColor} ${frequencyDetails?.borderColor} border
            `}>
              <Icon 
                name={getFrequencyIcon(value)} 
                size={20} 
                className={frequencyDetails?.color}
              />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-semibold text-foreground">
                  {selectedFrequency?.label} Payments
                </h4>
                <span className={`
                  text-xs font-caption px-2 py-1 rounded-full
                  ${frequencyDetails?.bgColor} ${frequencyDetails?.color}
                `}>
                  Every {frequencyDetails?.interval}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {selectedFrequency?.description}
              </p>
              
              {/* Payment Schedule Preview */}
              <div className="flex items-center space-x-2 pt-2">
                <Icon name="Info" size={14} className="text-muted-foreground" />
                <span className="text-xs font-caption text-muted-foreground">
                  Next payment will be scheduled based on your selected date
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Frequency Benefits */}
      {value && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="glass rounded-lg p-3 text-center">
            <Icon name="Shield" size={16} className="text-success mx-auto mb-1" />
            <span className="text-xs font-caption text-muted-foreground">Secure</span>
          </div>
          <div className="glass rounded-lg p-3 text-center">
            <Icon name="Zap" size={16} className="text-warning mx-auto mb-1" />
            <span className="text-xs font-caption text-muted-foreground">Automated</span>
          </div>
          <div className="glass rounded-lg p-3 text-center">
            <Icon name="Bell" size={16} className="text-accent mx-auto mb-1" />
            <span className="text-xs font-caption text-muted-foreground">Notifications</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrequencySelector;