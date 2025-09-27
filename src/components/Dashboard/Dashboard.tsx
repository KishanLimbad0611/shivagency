import React from 'react';
import { Package, Users, FileText, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Products',
      value: '1,245',
      change: '+12%',
      changeType: 'increase',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Suppliers',
      value: '87',
      change: '+5%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Sales',
      value: '₹2,45,670',
      change: '+18%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Bills',
      value: '23',
      change: '-8%',
      changeType: 'decrease',
      icon: FileText,
      color: 'bg-orange-500'
    }
  ];

  const lowStockItems = [
    { name: 'A4 Paper - Premium', stock: 5, minStock: 20 },
    { name: 'Blue Gel Pens', stock: 12, minStock: 50 },
    { name: 'Spiral Notebooks', stock: 8, minStock: 30 },
    { name: 'Staplers - Heavy Duty', stock: 3, minStock: 15 },
  ];

  const recentTransactions = [
    { id: '001', customer: 'ABC School', amount: '₹15,450', date: '2025-01-08', status: 'Paid' },
    { id: '002', customer: 'XYZ Office', amount: '₹8,750', date: '2025-01-08', status: 'Pending' },
    { id: '003', customer: 'DEF College', amount: '₹22,100', date: '2025-01-07', status: 'Paid' },
    { id: '004', customer: 'GHI Corp', amount: '₹5,680', date: '2025-01-07', status: 'Overdue' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Low Stock Alert</h2>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Current: {item.stock} | Min: {item.minStock}</p>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  Low Stock
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">{transaction.customer}</p>
                  <p className="text-sm text-gray-600">Invoice #{transaction.id}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{transaction.amount}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : transaction.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;