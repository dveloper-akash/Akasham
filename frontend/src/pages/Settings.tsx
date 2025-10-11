// src/pages/SettingsPage.tsx
import React, { useState } from 'react';
import GeneralSettings from '../components/General';
import Transactions from '../components/Transactions';
import Help from '../components/Help';
import BackNav from '../components/BackNav';

const TABS = [
  { key: 'general', label: 'General' },
  { key: 'transactions', label: 'Transactions' },
  { key: 'help', label: 'Help' },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings/>;
      case 'transactions':
        return <Transactions />;
      case 'help':
        return <Help />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex-col flex w-full">
        <BackNav name="Settings" redirect='/editor/home' />
      <nav className="flex  bg-white   sticky top-0 z-10">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`px-5 py-2 font-medium text-center sm:text-lg text-sm border-b-2 transition-colors duration-200 ${
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="p-4 h-full overflow-y-auto custom-scroll sm:p-6">{renderTabContent()}</div>
    </div>
  );
};

export default SettingsPage;
