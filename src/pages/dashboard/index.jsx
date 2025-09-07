import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BillCard from './components/BillCard';
import FilterBar from './components/FilterBar';
import OneClickPayButton from './components/OneClickPayButton';
import NotificationsPanel from './components/NotificationsPanel';
import WalkingAnimation from './components/WalkingAnimation';
import AutoPayModal from './components/AutoPayModal';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAutoPayModalOpen, setIsAutoPayModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Mock data initialization
  useEffect(() => {
    // Check wallet connection
    const walletConnected = localStorage.getItem('walletConnected');
    if (walletConnected !== 'true') {
      navigate('/wallet-connection');
      return;
    }

    // Initialize mock bills data
    const mockBills = [
      {
        id: 1,
        provider: "Electric Company",
        accountNumber: "****1234",
        amount: 125.50,
        dueDate: "2025-01-15",
        status: "Pending"
      },
      {
        id: 2,
        provider: "Water Utility",
        accountNumber: "****5678",
        amount: 89.25,
        dueDate: "2025-01-18",
        status: "Pending"
      },
      {
        id: 3,
        provider: "Internet Provider",
        accountNumber: "****9012",
        amount: 79.99,
        dueDate: "2025-01-20",
        status: "AutoPay Enabled"
      },
      {
        id: 4,
        provider: "Gas Company",
        accountNumber: "****3456",
        amount: 156.75,
        dueDate: "2024-12-28",
        status: "Pending"
      },
      {
        id: 5,
        provider: "Phone Service",
        accountNumber: "****7890",
        amount: 65.00,
        dueDate: "2024-12-30",
        status: "Paid"
      },
      {
        id: 6,
        provider: "Insurance",
        accountNumber: "****2468",
        amount: 245.00,
        dueDate: "2025-01-25",
        status: "AutoPay Enabled"
      },
      {
        id: 7,
        provider: "Credit Card",
        accountNumber: "****1357",
        amount: 320.45,
        dueDate: "2025-01-12",
        status: "Pending"
      },
      {
        id: 8,
        provider: "Mortgage",
        accountNumber: "****9753",
        amount: 1850.00,
        dueDate: "2025-01-01",
        status: "Paid"
      }
    ];

    // Initialize mock notifications
    const mockNotifications = [
      {
        id: 1,
        type: "overdue",
        priority: "high",
        title: "Overdue Payment",
        message: "Gas Company bill is 8 days overdue",
        amount: 156.75,
        time: "2 hours ago"
      },
      {
        id: 2,
        type: "upcoming",
        priority: "medium",
        title: "Payment Due Soon",
        message: "Electric Company bill due in 3 days",
        amount: 125.50,
        time: "4 hours ago"
      },
      {
        id: 3,
        type: "upcoming",
        priority: "medium",
        title: "Payment Due Soon",
        message: "Credit Card payment due in 6 days",
        amount: 320.45,
        time: "6 hours ago"
      },
      {
        id: 4,
        type: "paid",
        priority: "low",
        title: "Payment Successful",
        message: "Phone Service bill paid successfully",
        amount: 65.00,
        time: "1 day ago"
      },
      {
        id: 5,
        type: "upcoming",
        priority: "low",
        title: "AutoPay Scheduled",
        message: "Internet Provider payment scheduled for Jan 20",
        amount: 79.99,
        time: "2 days ago"
      }
    ];

    setBills(mockBills);
    setNotifications(mockNotifications);
  }, [navigate]);

  // Filter bills based on active filter
  const filteredBills = bills?.filter(bill => {
    switch (activeFilter) {
      case 'pending':
        return bill?.status === 'Pending';
      case 'paid':
        return bill?.status === 'Paid';
      case 'autopay':
        return bill?.status === 'AutoPay Enabled';
      default:
        return true;
    }
  });

  // Calculate bill counts for filter bar
  const billCounts = {
    all: bills?.length,
    pending: bills?.filter(bill => bill?.status === 'Pending')?.length,
    paid: bills?.filter(bill => bill?.status === 'Paid')?.length,
    autopay: bills?.filter(bill => bill?.status === 'AutoPay Enabled')?.length
  };

  // Get pending bills for one-click pay
  const pendingBills = bills?.filter(bill => bill?.status === 'Pending');

  // Handle individual bill payment
  const handlePayNow = (billId) => {
    setBills(prevBills =>
      prevBills?.map(bill =>
        bill?.id === billId ? { ...bill, status: 'Paid' } : bill
      )
    );

    // Add success notification
    const bill = bills?.find(b => b?.id === billId);
    const newNotification = {
      id: Date.now(),
      type: "paid",
      priority: "low",
      title: "Payment Successful",
      message: `${bill?.provider} bill paid successfully`,
      amount: bill?.amount,
      time: "Just now"
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Handle one-click pay all
  const handleOneClickPay = () => {
    setBills(prevBills =>
      prevBills?.map(bill =>
        bill?.status === 'Pending' ? { ...bill, status: 'Paid' } : bill
      )
    );

    // Add success notification
    const totalAmount = pendingBills?.reduce((sum, bill) => sum + bill?.amount, 0);
    const newNotification = {
      id: Date.now(),
      type: "paid",
      priority: "low",
      title: "Bulk Payment Successful",
      message: `${pendingBills?.length} bills paid successfully`,
      amount: totalAmount,
      time: "Just now"
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Handle enable AutoPay
  const handleEnableAutoPay = (billId) => {
    const bill = bills?.find(b => b?.id === billId);
    setSelectedBill(bill);
    setIsAutoPayModalOpen(true);
  };

  // Handle AutoPay save
  const handleAutoPaySave = (billId, autoPayData) => {
    setBills(prevBills =>
      prevBills?.map(bill =>
        bill?.id === billId ? { ...bill, status: 'AutoPay Enabled', autoPayData } : bill
      )
    );

    // Add success notification
    const bill = bills?.find(b => b?.id === billId);
    const newNotification = {
      id: Date.now(),
      type: "upcoming",
      priority: "low",
      title: "AutoPay Enabled",
      message: `AutoPay enabled for ${bill?.provider}`,
      amount: bill?.amount,
      time: "Just now"
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <WalkingAnimation />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Welcome to Your{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage all your bills in one place with intelligent automation and one-click payments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* One-Click Pay Section */}
              {pendingBills?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <OneClickPayButton
                    pendingBills={pendingBills}
                    onOneClickPay={handleOneClickPay}
                    disabled={pendingBills?.length === 0}
                  />
                </motion.div>
              )}

              {/* Filter Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FilterBar
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  billCounts={billCounts}
                />
              </motion.div>

              {/* Bills Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {filteredBills?.length === 0 ? (
                  <div className="glass rounded-2xl p-12 text-center border border-border">
                    <Icon name="FileText" size={64} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                      No Bills Found
                    </h3>
                    <p className="text-muted-foreground">
                      {activeFilter === 'all' ?'You have no bills to display.' 
                        : `No ${activeFilter} bills found.`
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBills?.map((bill, index) => (
                      <motion.div
                        key={bill?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <BillCard
                          bill={bill}
                          onPayNow={handlePayNow}
                          onEnableAutoPay={handleEnableAutoPay}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-24"
              >
                <NotificationsPanel notifications={notifications} />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      {/* AutoPay Modal */}
      <AutoPayModal
        isOpen={isAutoPayModalOpen}
        onClose={() => setIsAutoPayModalOpen(false)}
        bill={selectedBill}
        onSave={handleAutoPaySave}
      />
    </div>
  );
};

export default Dashboard;