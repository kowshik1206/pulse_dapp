import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      icon: "Shield",
      title: "Blockchain Security",
      description: "256-bit encryption",
      status: "Verified",
      color: "success"
    },
    {
      id: 2,
      icon: "Lock",
      title: "Decentralized Protocol",
      description: "Zero single point of failure",
      status: "Certified",
      color: "primary"
    },
    {
      id: 3,
      icon: "Wallet",
      title: "Multi-Wallet Compatible",
      description: "Aptos, MetaMask, WalletConnect",
      status: "Integrated",
      color: "accent"
    },
    {
      id: 4,
      icon: "Globe",
      title: "Global Network",
      description: "Available worldwide",
      status: "Active",
      color: "warning"
    },
    {
      id: 5,
      icon: "Users",
      title: "Community Driven",
      description: "10,000+ active users",
      status: "Growing",
      color: "success"
    },
    {
      id: 6,
      icon: "Zap",
      title: "Lightning Fast",
      description: "Sub-second transactions",
      status: "Optimized",
      color: "primary"
    }
  ];

  const walletLogos = [
    {
      name: "Aptos",
      logo: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop&crop=center",
      description: "Native Aptos integration"
    },
    {
      name: "MetaMask",
      logo: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop&crop=center",
      description: "Ethereum ecosystem support"
    },
    {
      name: "WalletConnect",
      logo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop&crop=center",
      description: "Universal wallet protocol"
    },
    {
      name: "Phantom",
      logo: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop&crop=center",
      description: "Solana wallet integration"
    }
  ];

  const stats = [
    {
      value: "99.9%",
      label: "Uptime",
      icon: "TrendingUp"
    },
    {
      value: "$50M+",
      label: "Processed",
      icon: "DollarSign"
    },
    {
      value: "10K+",
      label: "Users",
      icon: "Users"
    },
    {
      value: "24/7",
      label: "Support",
      icon: "Clock"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "text-primary border-primary/20 bg-primary/10",
      accent: "text-accent border-accent/20 bg-accent/10",
      success: "text-success border-success/20 bg-success/10",
      warning: "text-warning border-warning/20 bg-warning/10"
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-success via-primary to-accent bg-clip-text text-transparent">
              {" "}Thousands
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built on industry-leading security standards and trusted by crypto enthusiasts worldwide.
          </p>
        </motion.div>

        {/* Trust Badges Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {trustBadges?.map((badge, index) => (
            <motion.div
              key={badge?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${getColorClasses(badge?.color)} border transition-all duration-300
                  group-hover:scale-110
                `}>
                  <Icon name={badge?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-semibold text-foreground">
                      {badge?.title}
                    </h3>
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${getColorClasses(badge?.color)} border
                    `}>
                      {badge?.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {badge?.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Wallet Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-heading font-bold text-center text-foreground mb-8">
            Compatible Wallets
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {walletLogos?.map((wallet, index) => (
              <motion.div
                key={wallet?.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Icon name="Wallet" size={24} className="text-white" />
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {wallet?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {wallet?.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong p-8 rounded-2xl border border-border"
        >
          <h3 className="text-2xl font-heading font-bold text-center text-foreground mb-8">
            Platform Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <motion.div
                key={stat?.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name={stat?.icon} size={20} className="text-primary" />
                </div>
                <div className="text-3xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {stat?.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat?.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full border border-success/20">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              Audited by leading blockchain security firms
            </span>
            <Icon name="CheckCircle" size={16} className="text-success" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;