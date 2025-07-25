// src/App.js

import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Policies from './pages/Policies';
import Quotes from './pages/Quotes';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <Customers />;
      case 'policies':
        return <Policies />;
      case 'quotes':
        return <Quotes />;
      case 'payments':
        return <Payments />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="ml-64 flex-1">
        <Header activeTab={activeTab} />
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

export default App;