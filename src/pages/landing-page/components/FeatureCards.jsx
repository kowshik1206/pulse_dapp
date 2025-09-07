import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: "Zap",
      title: "One-Click Payments",
      description: "Pay all your bills instantly with a single click. No more juggling multiple payment platforms or remembering due dates.",
      color: "primary",
      delay: 0.1
    },
    {
      id: 2,
      icon: "Clock",
      title: "AutoPay Automation",
      description: "Set up intelligent autopay schedules with customizable limits and frequencies. Never miss a payment again.",
      color: "accent",
      delay: 0.2
    },
    {
      id: 3,
      icon: "Shield",
      title: "Blockchain Security",
      description: "Your transactions are secured by decentralized blockchain technology, ensuring maximum privacy and protection.",
      color: "success",
      delay: 0.3
    },
    {
      id: 4,
      icon: "Wallet",
      title: "Multi-Wallet Support",
      description: "Connect with popular crypto wallets including Aptos, MetaMask, and more for seamless integration.",
      color: "warning",
      delay: 0.4
    },
    {
      id: 5,
      icon: "BarChart3",
      title: "Smart Analytics",
      description: "Track your spending patterns and get insights into your bill payment history with detailed analytics.",
      color: "primary",
      delay: 0.5
    },
    {
      id: 6,
      icon: "Bell",
      title: "Smart Notifications",
      description: "Receive timely alerts for upcoming bills, payment confirmations, and important account updates.",
      color: "accent",
      delay: 0.6
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        icon: "text-primary",
        glow: "glow-primary",
        border: "border-primary/20",
        hover: "hover:border-primary/40"
      },
      accent: {
        icon: "text-accent",
        glow: "glow-accent",
        border: "border-accent/20",
        hover: "hover:border-accent/40"
      },
      success: {
        icon: "text-success",
        glow: "glow-success",
        border: "border-success/20",
        hover: "hover:border-success/40"
      },
      warning: {
        icon: "text-warning",
        glow: "shadow-neo",
        border: "border-warning/20",
        hover: "hover:border-warning/40"
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            Powerful Features for
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Modern Finance
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of bill payment technology with our comprehensive suite of blockchain-powered features.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features?.map((feature) => {
            const colors = getColorClasses(feature?.color);
            
            return (
              <motion.div
                key={feature?.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className={`
                  glass p-8 rounded-2xl border ${colors?.border} ${colors?.hover}
                  transition-all duration-300 cursor-pointer group
                  hover:${colors?.glow}
                `}
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`
                    w-16 h-16 rounded-xl bg-gradient-to-br from-${feature?.color}/20 to-${feature?.color}/10
                    flex items-center justify-center mb-6 ${colors?.glow}
                    group-hover:shadow-lg transition-all duration-300
                  `}
                >
                  <Icon 
                    name={feature?.icon} 
                    size={28} 
                    className={`${colors?.icon} transition-colors duration-300`}
                  />
                </motion.div>
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature?.description}
                  </p>
                </div>
                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 mt-6 text-sm font-medium text-primary"
                >
                  <span>Learn more</span>
                  <Icon name="ArrowRight" size={16} />
                </motion.div>
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to revolutionize your bill payments?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-medium cursor-pointer glow-primary hover:glow-accent transition-all duration-300"
            >
              Start Free Trial
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-border rounded-xl text-foreground font-medium cursor-pointer hover:bg-muted/50 transition-all duration-300"
            >
              View Demo
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;