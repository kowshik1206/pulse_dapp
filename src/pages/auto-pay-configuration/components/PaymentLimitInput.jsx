import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PaymentLimitInput = ({ value, onChange, className = '' }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (value) {
      setDisplayValue(formatCurrency(value));
    }
  }, [value]);

  const formatCurrency = (amount) => {
    if (!amount) return '';
    const numericValue = parseFloat(amount);
    if (isNaN(numericValue)) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(numericValue);
  };

  const parseCurrency = (formattedValue) => {
    if (!formattedValue) return '';
    return formattedValue?.replace(/[$,]/g, '');
  };

  const validateAmount = (amount) => {
    const numericValue = parseFloat(amount);
    
    if (isNaN(numericValue) || numericValue <= 0) {
      setIsValid(false);
      setValidationMessage('Please enter a valid amount greater than $0');
      return false;
    }
    
    if (numericValue < 1) {
      setIsValid(false);
      setValidationMessage('Minimum payment limit is $1.00');
      return false;
    }
    
    if (numericValue > 10000) {
      setIsValid(false);
      setValidationMessage('Maximum payment limit is $10,000.00');
      return false;
    }
    
    setIsValid(true);
    setValidationMessage('');
    return true;
  };

  const handleInputChange = (e) => {
    const inputValue = e?.target?.value;
    const numericValue = parseCurrency(inputValue);
    
    // Allow only numbers and decimal points
    if (!/^\d*\.?\d*$/?.test(numericValue)) {
      return;
    }
    
    setDisplayValue(inputValue);
    
    if (numericValue) {
      const isValidAmount = validateAmount(numericValue);
      if (isValidAmount) {
        onChange(numericValue);
      }
    } else {
      onChange('');
      setIsValid(true);
      setValidationMessage('');
    }
  };

  const handleBlur = () => {
    if (displayValue && isValid) {
      const numericValue = parseCurrency(displayValue);
      setDisplayValue(formatCurrency(numericValue));
    }
  };

  const handleFocus = () => {
    if (displayValue) {
      const numericValue = parseCurrency(displayValue);
      setDisplayValue(numericValue);
    }
  };

  const getValidationColor = () => {
    if (!displayValue) return 'text-muted-foreground';
    return isValid ? 'text-success' : 'text-error';
  };

  const getValidationIcon = () => {
    if (!displayValue) return 'DollarSign';
    return isValid ? 'CheckCircle' : 'AlertCircle';
  };

  const suggestedAmounts = [50, 100, 250, 500, 1000];

  const handleSuggestedAmount = (amount) => {
    const formattedAmount = formatCurrency(amount);
    setDisplayValue(formattedAmount);
    onChange(amount?.toString());
    validateAmount(amount?.toString());
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Payment Limit Input */}
      <div className="relative">
        <Input
          label="Maximum Payment Limit"
          type="text"
          placeholder="$0.00"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          error={!isValid ? validationMessage : ''}
          description="Set a maximum amount for automatic payments as a safety measure"
          required
          className="pl-12"
        />
        
        {/* Currency Icon */}
        <div className="absolute left-3 top-9 flex items-center">
          <Icon 
            name={getValidationIcon()} 
            size={18} 
            className={getValidationColor()}
          />
        </div>
      </div>
      {/* Suggested Amounts */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Quick Select</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {suggestedAmounts?.map((amount) => (
            <button
              key={amount}
              onClick={() => handleSuggestedAmount(amount)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                glass border border-border hover:border-primary/50
                hover:bg-primary/10 hover:text-primary hover:glow-primary
                ${value === amount?.toString() ? 'bg-primary text-primary-foreground glow-primary' : 'text-muted-foreground'}
              `}
            >
              {formatCurrency(amount)}
            </button>
          ))}
        </div>
      </div>
      {/* Safety Information */}
      <div className="glass rounded-xl p-4 border border-warning/20 bg-warning/5">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-warning/10 border border-warning/20 flex items-center justify-center flex-shrink-0">
            <Icon name="Shield" size={16} className="text-warning" />
          </div>
          
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-foreground">
              Safety Feature
            </h4>
            <p className="text-sm text-muted-foreground">
              This limit prevents any single automatic payment from exceeding your specified amount. 
              You can modify this limit anytime in your AutoPay settings.
            </p>
            
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={14} className="text-success" />
                <span className="text-xs font-caption text-success">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Edit" size={14} className="text-accent" />
                <span className="text-xs font-caption text-accent">Editable</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Bell" size={14} className="text-warning" />
                <span className="text-xs font-caption text-warning">Notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Current Limit Display */}
      {isValid && value && (
        <div className="glass rounded-lg p-3 border border-success/20 bg-success/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Payment Limit Set</span>
            </div>
            <span className="text-lg font-data font-bold text-success">
              {formatCurrency(value)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentLimitInput;