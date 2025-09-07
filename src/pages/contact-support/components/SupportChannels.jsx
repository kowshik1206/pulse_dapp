import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SupportChannels = () => {
  const supportChannels = [
    {
      id: 'live-chat',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: 'MessageCircle',
      status: 'online',
      responseTime: 'Usually responds in 2-5 minutes',
      availability: '24/7 Available',
      action: 'Start Chat',
      color: 'success'
    },
    {
      id: 'email-support',
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: 'Mail',
      status: 'available',
      responseTime: 'Usually responds within 24 hours',
      availability: 'Business Hours',
      action: 'Send Email',
      color: 'primary'
    },
    {
      id: 'community-forum',
      title: 'Community Forum',
      description: 'Connect with other users and experts',
      icon: 'Users',
      status: 'active',
      responseTime: 'Community driven responses',
      availability: 'Always Active',
      action: 'Visit Forum',
      color: 'accent'
    },
    {
      id: 'video-call',
      title: 'Video Support',
      description: 'Schedule a one-on-one session',
      icon: 'Video',
      status: 'by-appointment',
      responseTime: 'Available for premium users',
      availability: 'Mon-Fri 9AM-6PM EST',
      action: 'Schedule Call',
      color: 'warning'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-success';
      case 'available':
        return 'text-primary';
      case 'active':
        return 'text-accent';
      case 'by-appointment':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success pulse-neon';
      case 'available':
        return 'bg-primary';
      case 'active':
        return 'bg-accent';
      case 'by-appointment':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  const handleChannelAction = (channelId) => {
    // Mock actions for different support channels
    switch (channelId) {
      case 'live-chat': alert('Live chat feature coming soon! Please use the contact form for now.');
        break;
      case 'email-support':
        window.location.href = 'mailto:support@pulsedapp.com?subject=Support Request';
        break;
      case 'community-forum':
        alert('Community forum will be available soon!');
        break;
      case 'video-call': alert('Video support scheduling coming soon!');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Choose Your Support Channel
        </h2>
        <p className="text-muted-foreground">
          Multiple ways to get the help you need
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportChannels?.map((channel, index) => (
          <motion.div
            key={channel?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl bg-${channel?.color}/20 flex items-center justify-center`}>
                  <Icon name={channel?.icon} size={24} className={`text-${channel?.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {channel?.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusDot(channel?.status)}`} />
                    <span className={`text-xs font-caption ${getStatusColor(channel?.status)}`}>
                      {channel?.status?.replace('-', ' ')?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-4">
              {channel?.description}
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {channel?.responseTime}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {channel?.availability}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => handleChannelAction(channel?.id)}
              iconName="ArrowRight"
              iconPosition="right"
              className="hover:glow-primary"
            >
              {channel?.action}
            </Button>
          </motion.div>
        ))}
      </div>
      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-strong rounded-2xl p-6 border border-error/30"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Emergency Support
            </h3>
            <p className="text-sm text-muted-foreground">
              For critical issues affecting your funds or security
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="destructive"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            onClick={() => alert('Emergency hotline: +1-800-PULSE-911')}
          >
            Emergency Hotline
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Shield"
            iconPosition="left"
            onClick={() => alert('Security team will be contacted immediately')}
          >
            Report Security Issue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SupportChannels;