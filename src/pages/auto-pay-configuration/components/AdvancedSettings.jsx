import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AdvancedSettings = ({ settings, onSettingsChange, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const retryOptions = [
    { value: '1', label: '1 attempt', description: 'Try once, then stop' },
    { value: '2', label: '2 attempts', description: 'Retry once after 24 hours' },
    { value: '3', label: '3 attempts', description: 'Retry twice with 24-hour intervals' },
    { value: '5', label: '5 attempts', description: 'Maximum retry attempts over 5 days' }
  ];

  const notificationOptions = [
    { value: '1', label: '1 day before', description: 'Get notified 24 hours in advance' },
    { value: '3', label: '3 days before', description: 'Get notified 72 hours in advance' },
    { value: '7', label: '1 week before', description: 'Get notified 7 days in advance' },
    { value: '14', label: '2 weeks before', description: 'Get notified 14 days in advance' }
  ];

  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Advanced Settings Header */}
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between p-4 glass rounded-xl border border-border hover:border-primary/50 transition-all duration-200 hover:glow-primary"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Icon name="Settings" size={16} className="text-accent" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-semibold text-foreground">Advanced Settings</h3>
            <p className="text-sm text-muted-foreground">Configure retry attempts and notifications</p>
          </div>
        </div>
        
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Advanced Settings Content */}
      {isExpanded && (
        <div className="space-y-6 animate-slide-in">
          {/* Retry Settings */}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-warning/10 border border-warning/20 flex items-center justify-center">
                <Icon name="RotateCcw" size={16} className="text-warning" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">Payment Retry</h4>
                <p className="text-sm text-muted-foreground">What to do if a payment fails</p>
              </div>
            </div>

            <Select
              label="Retry Attempts"
              description="Number of times to retry failed payments"
              options={retryOptions}
              value={settings?.retryAttempts || '3'}
              onChange={(value) => handleSettingChange('retryAttempts', value)}
              className="mt-4"
            />

            <div className="space-y-3">
              <Checkbox
                label="Notify on retry attempts"
                description="Get notified when payment retries are attempted"
                checked={settings?.notifyOnRetry || false}
                onChange={(e) => handleSettingChange('notifyOnRetry', e?.target?.checked)}
              />

              <Checkbox
                label="Auto-disable after max retries"
                description="Automatically disable AutoPay if all retry attempts fail"
                checked={settings?.autoDisableOnFailure || true}
                onChange={(e) => handleSettingChange('autoDisableOnFailure', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Icon name="Bell" size={16} className="text-accent" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">Notifications</h4>
                <p className="text-sm text-muted-foreground">Stay informed about your payments</p>
              </div>
            </div>

            <Select
              label="Advance Notice"
              description="When to notify you before payments"
              options={notificationOptions}
              value={settings?.notificationTiming || '3'}
              onChange={(value) => handleSettingChange('notificationTiming', value)}
              className="mt-4"
            />

            <div className="space-y-3">
              <Checkbox
                label="Email notifications"
                description="Receive payment notifications via email"
                checked={settings?.emailNotifications || true}
                onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
              />

              <Checkbox
                label="SMS notifications"
                description="Receive payment notifications via SMS"
                checked={settings?.smsNotifications || false}
                onChange={(e) => handleSettingChange('smsNotifications', e?.target?.checked)}
              />

              <Checkbox
                label="In-app notifications"
                description="Show payment notifications in the app"
                checked={settings?.inAppNotifications || true}
                onChange={(e) => handleSettingChange('inAppNotifications', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Security Settings */}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-success" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">Security</h4>
                <p className="text-sm text-muted-foreground">Additional security measures</p>
              </div>
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Require confirmation for large payments"
                description="Ask for confirmation when payment exceeds 80% of limit"
                checked={settings?.requireConfirmation || true}
                onChange={(e) => handleSettingChange('requireConfirmation', e?.target?.checked)}
              />

              <Checkbox
                label="Pause AutoPay on suspicious activity"
                description="Automatically pause if unusual payment patterns detected"
                checked={settings?.pauseOnSuspiciousActivity || true}
                onChange={(e) => handleSettingChange('pauseOnSuspiciousActivity', e?.target?.checked)}
              />

              <Checkbox
                label="Two-factor authentication"
                description="Require 2FA for AutoPay configuration changes"
                checked={settings?.require2FA || false}
                onChange={(e) => handleSettingChange('require2FA', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Settings Summary */}
          <div className="glass rounded-xl p-4 border border-primary/20 bg-primary/5">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-heading font-medium text-foreground">Settings Summary</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Retry failed payments up to {settings?.retryAttempts || '3'} times</p>
                  <p>• Notify {settings?.notificationTiming || '3'} days before payments</p>
                  <p>• {settings?.emailNotifications ? 'Email' : 'No email'} and {settings?.smsNotifications ? 'SMS' : 'no SMS'} notifications enabled</p>
                  <p>• {settings?.require2FA ? 'Two-factor authentication required' : 'Standard authentication'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;