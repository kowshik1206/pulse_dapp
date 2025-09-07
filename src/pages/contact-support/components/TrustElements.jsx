import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustElements = () => {
  const trustMetrics = [
    {
      id: 'response-time',
      icon: 'Clock',
      title: 'Average Response Time',
      value: '< 2 hours',
      description: 'We respond to 95% of inquiries within 2 hours',
      color: 'success'
    },
    {
      id: 'satisfaction',
      icon: 'Star',
      title: 'Customer Satisfaction',
      value: '4.9/5.0',
      description: 'Based on 2,847 support interactions',
      color: 'warning'
    },
    {
      id: 'resolution',
      icon: 'CheckCircle',
      title: 'First Contact Resolution',
      value: '87%',
      description: 'Issues resolved on first contact',
      color: 'primary'
    },
    {
      id: 'availability',
      icon: 'Shield',
      title: 'Support Availability',
      value: '24/7',
      description: 'Round-the-clock assistance',
      color: 'accent'
    }
  ];

  const teamMembers = [
    {
      id: 'sarah-chen',
      name: 'Sarah Chen',
      role: 'Lead Support Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      specialties: ['Wallet Integration', 'Payment Issues'],
      experience: '5+ years in DeFi support'
    },
    {
      id: 'marcus-rodriguez',
      name: 'Marcus Rodriguez',
      role: 'Technical Support Specialist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      specialties: ['AutoPay Configuration', 'Smart Contracts'],
      experience: '3+ years in blockchain tech'
    },
    {
      id: 'emily-watson',
      name: 'Emily Watson',
      role: 'Customer Success Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      specialties: ['Account Management', 'Feature Guidance'],
      experience: '4+ years in fintech support'
    }
  ];

  const certifications = [
    {
      id: 'security-audit',
      title: 'Security Audited',
      description: 'Smart contracts audited by CertiK',
      icon: 'Shield',
      verified: true
    },
    {
      id: 'compliance',
      title: 'Regulatory Compliance',
      description: 'Compliant with financial regulations',
      icon: 'FileCheck',
      verified: true
    },
    {
      id: 'encryption',
      title: 'End-to-End Encryption',
      description: 'All communications encrypted',
      icon: 'Lock',
      verified: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {trustMetrics?.map((metric, index) => (
          <motion.div
            key={metric?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass rounded-xl p-4 text-center"
          >
            <div className={`w-10 h-10 bg-${metric?.color}/20 rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <Icon name={metric?.icon} size={20} className={`text-${metric?.color}`} />
            </div>
            <div className={`text-2xl font-heading font-bold text-${metric?.color} mb-1`}>
              {metric?.value}
            </div>
            <div className="text-xs font-medium text-foreground mb-1">
              {metric?.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {metric?.description}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Support Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-strong rounded-2xl p-6"
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            Meet Our Support Team
          </h3>
          <p className="text-muted-foreground">
            Experienced professionals ready to help you succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers?.map((member, index) => (
            <motion.div
              key={member?.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary/30">
                <img
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-1">
                {member?.name}
              </h4>
              <p className="text-sm text-primary mb-2">
                {member?.role}
              </p>
              <div className="text-xs text-muted-foreground mb-2">
                {member?.experience}
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {member?.specialties?.map((specialty) => (
                  <span
                    key={specialty}
                    className="text-xs bg-muted/30 text-muted-foreground px-2 py-1 rounded-md"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Security & Compliance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="glass rounded-2xl p-6"
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            Security & Trust
          </h3>
          <p className="text-muted-foreground">
            Your security and privacy are our top priorities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications?.map((cert, index) => (
            <motion.div
              key={cert?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg"
            >
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={cert?.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {cert?.title}
                  </h4>
                  {cert?.verified && (
                    <Icon name="CheckCircle" size={14} className="text-success" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Response Time Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="glass-strong rounded-2xl p-6 border border-primary/30"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center glow-primary">
            <Icon name="Zap" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground">
              Our Support Promise
            </h3>
            <p className="text-sm text-muted-foreground">
              Guaranteed response times for all support channels
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={16} className="text-success" />
            <span className="text-muted-foreground">Live Chat:</span>
            <span className="text-foreground font-medium">&lt; 5 minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-primary" />
            <span className="text-muted-foreground">Email Support:</span>
            <span className="text-foreground font-medium">&lt; 2 hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-error" />
            <span className="text-muted-foreground">Emergency:</span>
            <span className="text-foreground font-medium">Immediate</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-accent" />
            <span className="text-muted-foreground">Community:</span>
            <span className="text-foreground font-medium">&lt; 1 hour</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrustElements;