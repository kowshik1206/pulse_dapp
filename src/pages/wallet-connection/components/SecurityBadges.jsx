import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      id: 'encryption',
      icon: 'Lock',
      title: 'End-to-End Encryption',
      description: 'Military-grade AES-256 encryption',
      color: 'success'
    },
    {
      id: 'blockchain',
      icon: 'Link',
      title: 'Blockchain Verified',
      description: 'Immutable transaction records',
      color: 'primary'
    },
    {
      id: 'audit',
      icon: 'ShieldCheck',
      title: 'Security Audited',
      description: 'Third-party security verification',
      color: 'accent'
    },
    {
      id: 'compliance',
      icon: 'Award',
      title: 'Regulatory Compliant',
      description: 'Meets industry standards',
      color: 'warning'
    }
  ];

  const certifications = [
    {
      name: 'SOC 2 Type II',
      issuer: 'AICPA',
      year: '2024'
    },
    {
      name: 'ISO 27001',
      issuer: 'ISO',
      year: '2024'
    },
    {
      name: 'PCI DSS Level 1',
      issuer: 'PCI SSC',
      year: '2024'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          Security & Trust
        </h3>
        <p className="text-muted-foreground">
          Your security is our top priority
        </p>
      </div>
      {/* Security Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <motion.div
            key={feature?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass rounded-2xl p-4 border border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-start space-x-3">
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center border
                ${feature?.color === 'success' ? 'bg-success/10 border-success/20 text-success' : ''}
                ${feature?.color === 'primary' ? 'bg-primary/10 border-primary/20 text-primary' : ''}
                ${feature?.color === 'accent' ? 'bg-accent/10 border-accent/20 text-accent' : ''}
                ${feature?.color === 'warning' ? 'bg-warning/10 border-warning/20 text-warning' : ''}
              `}>
                <Icon name={feature?.icon} size={20} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-heading font-medium text-foreground text-sm mb-1">
                  {feature?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Certifications */}
      <div className="glass rounded-2xl p-4 border border-border">
        <h4 className="font-heading font-medium text-foreground mb-3 text-center">
          Industry Certifications
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {certifications?.map((cert, index) => (
            <motion.div
              key={cert?.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="text-center p-3 bg-muted/20 rounded-xl border border-border"
            >
              <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-primary/30">
                <Icon name="Award" size={16} className="text-primary" />
              </div>
              
              <h5 className="text-xs font-caption font-medium text-foreground mb-1">
                {cert?.name}
              </h5>
              
              <p className="text-xs text-muted-foreground">
                {cert?.issuer} • {cert?.year}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="flex justify-center space-x-6">
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-success mb-1">
            99.9%
          </div>
          <p className="text-xs text-muted-foreground">Uptime</p>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            256-bit
          </div>
          <p className="text-xs text-muted-foreground">Encryption</p>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-accent mb-1">
            24/7
          </div>
          <p className="text-xs text-muted-foreground">Monitoring</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;