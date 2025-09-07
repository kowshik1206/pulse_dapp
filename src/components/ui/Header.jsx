import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check wallet connection status from localStorage or context
    const walletStatus = localStorage.getItem('walletConnected');
    setIsWalletConnected(walletStatus === 'true');
  }, []);

  const navigationItems = [
    {
      label: 'Home',
      path: '/landing-page',
      icon: 'Home',
      authRequired: false
    },
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      authRequired: true
    },
    {
      label: 'AutoPay',
      path: '/auto-pay-configuration',
      icon: 'Zap',
      authRequired: true
    },
    {
      label: 'Wallet Connect',
      path: '/wallet-connection',
      icon: 'Wallet',
      authRequired: false
    },
    {
      label: 'Contact',
      path: '/contact-support',
      icon: 'MessageCircle',
      authRequired: false
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleWalletConnect = () => {
    // Simulate wallet connection
    setIsWalletConnected(!isWalletConnected);
    localStorage.setItem('walletConnected', (!isWalletConnected)?.toString());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 glass-strong border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 pr-6">
          {/* Logo */}
          <Link 
            to="/landing-page" 
            className="flex items-center space-x-3 pl-6 hover:opacity-80 transition-opacity duration-150"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-primary">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
            </div>
            <span className="text-xl font-heading font-bold text-foreground">
              Pulse DApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => {
              const isActive = isActiveRoute(item?.path);
              const canAccess = !item?.authRequired || isWalletConnected;
              
              return (
                <Link
                  key={item?.path}
                  to={canAccess ? item?.path : '/wallet-connection'}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                    ${isActive 
                      ? 'bg-primary text-primary-foreground glow-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                    ${!canAccess ? 'opacity-60' : 'hover:scale-102'}
                  `}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Wallet Status & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Wallet Status Indicator */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isWalletConnected ? 'bg-success pulse-neon' : 'bg-warning'}`} />
              <span className="text-xs font-caption text-muted-foreground">
                {isWalletConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 glass-strong border-b border-border animate-slide-in">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => {
                const isActive = isActiveRoute(item?.path);
                const canAccess = !item?.authRequired || isWalletConnected;
                
                return (
                  <Link
                    key={item?.path}
                    to={canAccess ? item?.path : '/wallet-connection'}
                    onClick={closeMobileMenu}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150
                      ${isActive 
                        ? 'bg-primary text-primary-foreground glow-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                      ${!canAccess ? 'opacity-60' : ''}
                    `}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                    {!canAccess && (
                      <Icon name="Lock" size={14} className="ml-auto" />
                    )}
                  </Link>
                );
              })}
              
              {/* Mobile Wallet Status */}
              <div className="flex items-center justify-between px-4 py-3 mt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isWalletConnected ? 'bg-success pulse-neon' : 'bg-warning'}`} />
                  <span className="text-xs font-caption text-muted-foreground">
                    Wallet {isWalletConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWalletConnect}
                  className="text-xs"
                >
                  {isWalletConnected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;