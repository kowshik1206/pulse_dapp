import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "AutoPay", path: "/auto-pay-configuration" },
      { label: "Wallet Connect", path: "/wallet-connection" },
      { label: "Support", path: "/contact-support" }
    ],
    company: [
      { label: "About Us", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Blog", path: "#" },
      { label: "Press Kit", path: "#" }
    ],
    resources: [
      { label: "Documentation", path: "#" },
      { label: "API Reference", path: "#" },
      { label: "Community", path: "#" },
      { label: "Help Center", path: "#" }
    ],
    legal: [
      { label: "Privacy Policy", path: "#" },
      { label: "Terms of Service", path: "#" },
      { label: "Cookie Policy", path: "#" },
      { label: "Security", path: "#" }
    ]
  };

  const socialLinks = [
    {
      name: "Twitter",
      icon: "Twitter",
      url: "https://twitter.com",
      color: "hover:text-blue-400"
    },
    {
      name: "Discord",
      icon: "MessageCircle",
      url: "https://discord.com",
      color: "hover:text-indigo-400"
    },
    {
      name: "Telegram",
      icon: "Send",
      url: "https://telegram.org",
      color: "hover:text-blue-500"
    },
    {
      name: "GitHub",
      icon: "Github",
      url: "https://github.com",
      color: "hover:text-gray-300"
    },
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: "https://linkedin.com",
      color: "hover:text-blue-600"
    }
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-gradient-to-t from-background via-muted/10 to-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <Link to="/landing-page" className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-primary group-hover:glow-accent transition-all duration-300">
                    <Icon name="Zap" size={24} className="text-white" />
                  </div>
                </div>
                <span className="text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                  Pulse DApp
                </span>
              </Link>
              
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                The future of decentralized bill payments. Automate, secure, and simplify your financial life with cutting-edge blockchain technology.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks?.map((social) => (
                  <motion.a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-10 h-10 rounded-lg bg-muted/50 border border-border
                      flex items-center justify-center text-muted-foreground
                      transition-all duration-300 ${social?.color}
                      hover:border-primary/30 hover:bg-primary/10
                    `}
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Product Links */}
              <motion.div variants={itemVariants}>
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Product
                </h3>
                <ul className="space-y-3">
                  {footerLinks?.product?.map((link) => (
                    <li key={link?.label}>
                      <Link
                        to={link?.path}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company Links */}
              <motion.div variants={itemVariants}>
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerLinks?.company?.map((link) => (
                    <li key={link?.label}>
                      <a
                        href={link?.path}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources Links */}
              <motion.div variants={itemVariants}>
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks?.resources?.map((link) => (
                    <li key={link?.label}>
                      <a
                        href={link?.path}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal Links */}
              <motion.div variants={itemVariants}>
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Legal
                </h3>
                <ul className="space-y-3">
                  {footerLinks?.legal?.map((link) => (
                    <li key={link?.label}>
                      <a
                        href={link?.path}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Stay Updated
              </h3>
              <p className="text-muted-foreground text-sm">
                Get the latest updates on new features and blockchain innovations.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-muted/50 rounded-lg border border-border overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none w-64"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-6 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© {currentYear} Pulse DApp. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-success" />
                <span>Secured by blockchain</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>All systems operational</span>
              </div>
              <span>•</span>
              <span>Version 2.1.0</span>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Background Decorations */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-10 right-10 w-8 h-8 border border-accent/20 rounded-full hidden lg:block"
      />
    </footer>
  );
};

export default Footer;