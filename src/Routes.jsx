import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContactSupport from './pages/contact-support';
import LandingPage from './pages/landing-page';
import Dashboard from './pages/dashboard';
import WalletConnection from './pages/wallet-connection';
import AutoPayConfiguration from './pages/auto-pay-configuration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/contact-support" element={<ContactSupport />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet-connection" element={<WalletConnection />} />
        <Route path="/auto-pay-configuration" element={<AutoPayConfiguration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;