import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactForm from './components/ContactForm';
import SupportChannels from './components/SupportChannels';
import FAQSection from './components/FAQSection';
import TrustElements from './components/TrustElements';
import Icon from '../../components/AppIcon';

const ContactSupport = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Support - Pulse DApp | Get Help with Decentralized Payments</title>
        <meta 
          name="description" 
          content="Get expert support for Pulse DApp. Contact our team via live chat, email, or community forum. Find answers to common questions about wallet connection, payments, and AutoPay." 
        />
        <meta name="keywords" content="pulse dapp support, contact help, wallet connection, payment issues, autopay configuration, blockchain support" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center glow-primary">
                  <Icon name="Headphones" size={32} className="text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                We're Here to{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Help You
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Get expert support for your decentralized payment needs. Our team is available 24/7 to help you with wallet connections, payments, AutoPay setup, and any technical issues.
              </p>
            </motion.div>

            {/* Trust Elements */}
            <TrustElements />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div id="contact-form">
                <ContactForm />
              </div>

              {/* Support Channels */}
              <div>
                <SupportChannels />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/5">
          <div className="max-w-4xl mx-auto px-6">
            <FAQSection />
          </div>
        </section>

        {/* Additional Help Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
                Additional Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="BookOpen" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Documentation
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Comprehensive guides and API documentation for developers and advanced users.
                  </p>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-150">
                    Browse Docs →
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Youtube" size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Video Tutorials
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Step-by-step video guides covering wallet setup, payments, and AutoPay configuration.
                  </p>
                  <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-150">
                    Watch Videos →
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="MessageSquare" size={24} className="text-success" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Community Forum
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Connect with other users, share experiences, and get community-driven support.
                  </p>
                  <button className="text-success hover:text-success/80 text-sm font-medium transition-colors duration-150">
                    Join Community →
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-white" />
                </div>
                <span className="text-xl font-heading font-bold text-foreground">
                  Pulse DApp
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Revolutionizing bill payments through blockchain technology. Secure, automated, and decentralized payment solutions for the modern world.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'Github', 'Discord', 'Telegram']?.map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-muted/30 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-150"
                  >
                    <Icon name={social} size={18} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors duration-150">Help Center</button></li>
                <li><button className="hover:text-foreground transition-colors duration-150">Contact Us</button></li>
                <li><button className="hover:text-foreground transition-colors duration-150">Bug Reports</button></li>
                <li><button className="hover:text-foreground transition-colors duration-150">Feature Requests</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors duration-150">Privacy Policy</button></li>
                <li><button className="hover:text-foreground transition-colors duration-150">Terms of Service</button></li>
                <li><button className="hover:text-foreground transition-colors duration-150">Cookie Policy</button></li>
                <li><button className="hover:text-foreground transition-colors duration-150">Disclaimer</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Pulse DApp. All rights reserved. Built with ❤️ for the decentralized future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactSupport;