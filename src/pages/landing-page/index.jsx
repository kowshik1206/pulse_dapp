import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeatureCards from './components/FeatureCards';
import TrustSignals from './components/TrustSignals';
import Footer from './components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Pulse DApp - The Future of Decentralized Bill Payments</title>
        <meta 
          name="description" 
          content="Automate, secure, and simplify your financial life with blockchain technology. One-click payments, autopay automation, and multi-wallet support." 
        />
        <meta name="keywords" content="blockchain, bill payments, cryptocurrency, DeFi, autopay, decentralized finance" />
        <meta property="og:title" content="Pulse DApp - Decentralized Bill Payment Platform" />
        <meta property="og:description" content="The future of bill payments is here. Experience blockchain-powered automation and security." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pulse DApp - Decentralized Bill Payments" />
        <meta name="twitter:description" content="Automate your bills with blockchain technology" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Feature Cards Section */}
          <FeatureCards />

          {/* Trust Signals Section */}
          <TrustSignals />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;