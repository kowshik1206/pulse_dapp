import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CalendarPicker from './components/CalendarPicker';
import FrequencySelector from './components/FrequencySelector';
import PaymentLimitInput from './components/PaymentLimitInput';
import AdvancedSettings from './components/AdvancedSettings';
import ConfigurationSummary from './components/ConfigurationSummary';

const AutoPayConfiguration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get bill data from navigation state
  const billData = location?.state?.billData || {
    id: 'default',
    serviceName: 'Selected Service',
    amount: 0
  };

  // Configuration state
  const [selectedDate, setSelectedDate] = useState(null);
  const [frequency, setFrequency] = useState('');
  const [paymentLimit, setPaymentLimit] = useState('');
  const [advancedSettings, setAdvancedSettings] = useState({
    retryAttempts: '3',
    notifyOnRetry: true,
    autoDisableOnFailure: true,
    notificationTiming: '3',
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    requireConfirmation: true,
    pauseOnSuspiciousActivity: true,
    require2FA: false
  });

  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setSaveLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Load existing configuration if available
  useEffect(() => {
    const existingConfig = localStorage.getItem(`autopay_${billData?.id}`);
    if (existingConfig) {
      try {
        const config = JSON.parse(existingConfig);
        setSelectedDate(config?.selectedDate ? new Date(config.selectedDate) : null);
        setFrequency(config?.frequency || '');
        setPaymentLimit(config?.paymentLimit || '');
        setAdvancedSettings(prev => ({
          retryAttempts: '3',
          notifyOnRetry: true,
          autoDisableOnFailure: true,
          notificationTiming: '3',
          emailNotifications: true,
          smsNotifications: false,
          inAppNotifications: true,
          requireConfirmation: true,
          pauseOnSuspiciousActivity: true,
          require2FA: false,
          ...config?.advancedSettings
        }));
      } catch (error) {
        console.error('Error loading existing configuration:', error);
      }
    }
  }, [billData?.id]);

  const steps = [
    { id: 1, title: 'Payment Date', icon: 'Calendar', description: 'Choose when to pay' },
    { id: 2, title: 'Frequency', icon: 'Clock', description: 'Set payment schedule' },
    { id: 3, title: 'Payment Limit', icon: 'DollarSign', description: 'Set maximum amount' },
    { id: 4, title: 'Advanced Settings', icon: 'Settings', description: 'Configure options' },
    { id: 5, title: 'Review', icon: 'FileText', description: 'Confirm settings' }
  ];

  // Memoize validation results without setting state during render
  const validationResult = useMemo(() => {
    const errors = {};
    
    if (!selectedDate) {
      errors.date = 'Please select a payment date';
    }
    
    if (!frequency) {
      errors.frequency = 'Please select a payment frequency';
    }
    
    if (!paymentLimit || parseFloat(paymentLimit) <= 0) {
      errors.paymentLimit = 'Please enter a valid payment limit';
    }
    
    return {
      errors,
      isValid: Object.keys(errors)?.length === 0
    };
  }, [selectedDate, frequency, paymentLimit]);

  // Separate validation function that updates state (for form submission)
  const validateAndSetErrors = useCallback(() => {
    setValidationErrors(validationResult?.errors);
    return validationResult?.isValid;
  }, [validationResult]);

  const handleSaveConfiguration = async () => {
    if (!validateAndSetErrors()) {
      return;
    }

    setSaveLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const configuration = {
        billId: billData?.id,
        selectedDate: selectedDate?.toISOString(),
        frequency,
        paymentLimit,
        advancedSettings,
        createdAt: new Date()?.toISOString(),
        isActive: true
      };
      
      // Save to localStorage
      localStorage.setItem(`autopay_${billData?.id}`, JSON.stringify(configuration));
      
      // Update bill status in dashboard data
      const dashboardData = JSON.parse(localStorage.getItem('dashboardData') || '{}');
      if (dashboardData?.bills) {
        const billIndex = dashboardData?.bills?.findIndex(bill => bill?.id === billData?.id);
        if (billIndex !== -1) {
          dashboardData.bills[billIndex].autoPayEnabled = true;
          dashboardData.bills[billIndex].status = 'AutoPay Enabled';
          localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
        }
      }
      
      // Navigate back to dashboard with success message
      navigate('/dashboard', { 
        state: { 
          message: `AutoPay successfully configured for ${billData?.serviceName}`,
          type: 'success'
        }
      });
      
    } catch (error) {
      console.error('Error saving configuration:', error);
      setValidationErrors({ general: 'Failed to save configuration. Please try again.' });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const nextStep = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const isStepComplete = (stepNumber) => {
    switch (stepNumber) {
      case 1: return selectedDate !== null;
      case 2: return frequency !== '';
      case 3: return paymentLimit !== '' && parseFloat(paymentLimit) > 0;
      case 4: return true; // Advanced settings are optional
      case 5: return selectedDate && frequency && paymentLimit;
      default: return false;
    }
  };

  const canProceedToNext = () => {
    return isStepComplete(currentStep);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CalendarPicker
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            className="max-w-md mx-auto"
          />
        );
      case 2:
        return (
          <FrequencySelector
            value={frequency}
            onChange={setFrequency}
            className="max-w-md mx-auto"
          />
        );
      case 3:
        return (
          <PaymentLimitInput
            value={paymentLimit}
            onChange={setPaymentLimit}
            className="max-w-md mx-auto"
          />
        );
      case 4:
        return (
          <AdvancedSettings
            settings={advancedSettings}
            onSettingsChange={setAdvancedSettings}
            className="max-w-2xl mx-auto"
          />
        );
      case 5:
        return (
          <ConfigurationSummary
            selectedDate={selectedDate}
            frequency={frequency}
            paymentLimit={paymentLimit}
            advancedSettings={advancedSettings}
            className="max-w-2xl mx-auto"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden glass-strong rounded-2xl border border-border shadow-neo-lg"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  AutoPay Configuration
                </h1>
                <p className="text-muted-foreground">
                  Set up automatic payments for {billData?.serviceName}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="hover:bg-error/10 hover:text-error"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              {steps?.map((step, index) => (
                <React.Fragment key={step?.id}>
                  <button
                    onClick={() => goToStep(step?.id)}
                    className={`
                      flex flex-col items-center space-y-2 p-2 rounded-lg transition-all duration-200
                      ${currentStep === step?.id 
                        ? 'text-primary' 
                        : isStepComplete(step?.id)
                          ? 'text-success hover:text-success/80' :'text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200
                      ${currentStep === step?.id
                        ? 'border-primary bg-primary/10 glow-primary'
                        : isStepComplete(step?.id)
                          ? 'border-success bg-success/10' :'border-muted'
                      }
                    `}>
                      <Icon 
                        name={isStepComplete(step?.id) && currentStep !== step?.id ? "Check" : step?.icon} 
                        size={16} 
                      />
                    </div>
                    <div className="text-center hidden sm:block">
                      <div className="text-xs font-caption font-medium">{step?.title}</div>
                      <div className="text-xs text-muted-foreground">{step?.description}</div>
                    </div>
                  </button>
                  
                  {index < steps?.length - 1 && (
                    <div className={`
                      flex-1 h-0.5 mx-2 transition-all duration-200
                      ${isStepComplete(step?.id) ? 'bg-success' : 'bg-muted'}
                    `} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Validation Errors */}
            {Object.keys(validationErrors)?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 glass rounded-xl border border-error/20 bg-error/5"
              >
                <div className="flex items-start space-x-3">
                  <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-heading font-medium text-error">Please fix the following errors:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {Object.values(validationErrors)?.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {steps?.length}
              </span>
              <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(currentStep / steps?.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>

              {currentStep < steps?.length ? (
                <Button
                  variant="default"
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleSaveConfiguration}
                  loading={isLoading}
                  disabled={!validationResult?.isValid}
                  iconName="Save"
                  iconPosition="left"
                  className="glow-primary"
                >
                  Save AutoPay Settings
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AutoPayConfiguration;