import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WalletCard from './components/WalletCard';
import ConnectionBenefits from './components/ConnectionBenefits';
import ConnectionGuide from './components/ConnectionGuide';
import SecurityBadges from './components/SecurityBadges';
import ConnectionStatus from './components/ConnectionStatus';

const WalletConnection = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  // Mock wallet data
  const supportedWallets = [
    {
      id: 'aptos',
      name: 'Aptos Wallet',
      description: 'Official Aptos blockchain wallet with advanced security features',
      logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop&crop=center',
      features: ['Multi-sig Support', 'Hardware Integration', 'DeFi Ready'],
      securityBadges: ['Audited', 'Open Source'],
      compatibility: ['Web', 'Mobile', 'Hardware']
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Popular Ethereum wallet with cross-chain compatibility',
      logo: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop&crop=center',
      features: ['Cross-chain', 'Browser Extension', 'Mobile App'],
      securityBadges: ['Verified', 'Trusted'],
      compatibility: ['Ethereum', 'BSC', 'Polygon']
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Universal protocol for connecting multiple wallet types',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center',
      features: ['Universal', 'QR Connect', '200+ Wallets'],
      securityBadges: ['Protocol', 'Decentralized'],
      compatibility: ['iOS', 'Android', 'Desktop']
    }
  ];

  useEffect(() => {
    // Check for existing wallet connection
    const savedWallet = localStorage.getItem('connectedWallet');
    const savedAddress = localStorage.getItem('walletAddress');
    
    if (savedWallet && savedAddress) {
      const wallet = supportedWallets?.find(w => w?.id === savedWallet);
      setConnectedWallet(wallet);
      setWalletAddress(savedAddress);
    }
  }, []);

  const handleWalletConnect = async (walletId) => {
    setIsConnecting(walletId);
    
    // Simulate connection process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const wallet = supportedWallets?.find(w => w?.id === walletId);
      const mockAddress = `0x${Math.random()?.toString(16)?.substr(2, 40)}`;
      
      setConnectedWallet(wallet);
      setWalletAddress(mockAddress);
      
      // Save to localStorage
      localStorage.setItem('connectedWallet', walletId);
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('walletConnected', 'true');
      
      // Show success and redirect after delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
    setWalletAddress('');
    localStorage.removeItem('connectedWallet');
    localStorage.removeItem('walletAddress');
    localStorage.setItem('walletConnected', 'false');
  };

  const isConnected = !!connectedWallet;

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 mb-4">
            <Icon name="Wallet" size={16} />
            <span className="text-sm font-caption">Secure Connection</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Connect Your{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Wallet
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Securely connect your blockchain wallet to unlock the full potential of decentralized bill payments
          </p>

          {!isConnected && (
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowGuide(!showGuide)}
                iconName="HelpCircle"
                iconPosition="left"
              >
                How It Works
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          )}
        </motion.div>

        {/* Connection Status */}
        <ConnectionStatus
          isConnected={isConnected}
          connectedWallet={connectedWallet}
          onDisconnect={handleDisconnect}
          walletAddress={walletAddress}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Connection Guide */}
            {showGuide && !isConnected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <ConnectionGuide />
              </motion.div>
            )}

            {/* Wallet Options */}
            {!isConnected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                  Choose Your Wallet
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {supportedWallets?.map((wallet) => (
                    <WalletCard
                      key={wallet?.id}
                      wallet={wallet}
                      onConnect={handleWalletConnect}
                      isConnecting={isConnecting}
                      connectedWallet={connectedWallet?.id}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Connected State Actions */}
            {isConnected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <div className="glass rounded-2xl p-8 border border-border">
                  <Icon name="CheckCircle" size={64} className="text-success mx-auto mb-4" />
                  <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                    You're All Set!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Your wallet is connected and ready for secure bill payments
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button
                      variant="default"
                      onClick={() => navigate('/dashboard')}
                      iconName="LayoutDashboard"
                      iconPosition="left"
                      className="glow-primary"
                    >
                      Go to Dashboard
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => navigate('/auto-pay-configuration')}
                      iconName="Zap"
                      iconPosition="left"
                    >
                      Setup AutoPay
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Security Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SecurityBadges />
            </motion.div>

            {/* Connection Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ConnectionBenefits />
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="glass rounded-2xl p-6 border border-border max-w-2xl mx-auto">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Need Help?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our support team is available 24/7 to assist with wallet connections
              </p>
              
              <Button
                variant="outline"
                onClick={() => navigate('/contact-support')}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Contact Support
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WalletConnection;