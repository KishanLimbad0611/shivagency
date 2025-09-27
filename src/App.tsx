import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import ProductManagement from './components/Products/ProductManagement';
import SupplierManagement from './components/Suppliers/SupplierManagement';
import SellerManagement from './components/Sellers/SellerManagement';
import TenderManagement from './components/Tenders/TenderManagement';
import BillManagement from './components/Bills/BillManagement';
import InventoryManagement from './components/Inventory/InventoryManagement';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductManagement />;
      case 'suppliers':
        return <SupplierManagement />;
      case 'sellers':
        return <SellerManagement />;
      case 'tenders':
        return <TenderManagement />;
      case 'bills':
        return <BillManagement />;
      case 'inventory':
        return <InventoryManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;