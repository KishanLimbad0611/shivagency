import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, TrendingUp, TrendingDown, Package } from 'lucide-react';

interface InventoryItem {
  id: string;
  productName: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  avgMonthlyUsage: number;
  lastRestocked: string;
  supplier: string;
  unitCost: number;
  totalValue: number;
  location: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Overstock';
}

const InventoryManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      productName: 'A4 Paper - Premium White',
      category: 'Paper',
      currentStock: 150,
      minStock: 20,
      maxStock: 500,
      avgMonthlyUsage: 200,
      lastRestocked: '2025-01-05',
      supplier: 'PaperCorp Ltd',
      unitCost: 250,
      totalValue: 37500,
      location: 'Warehouse A-1',
      status: 'In Stock'
    },
    {
      id: '2',
      productName: 'Blue Gel Pen - 0.7mm',
      category: 'Writing',
      currentStock: 12,
      minStock: 50,
      maxStock: 1000,
      avgMonthlyUsage: 300,
      lastRestocked: '2024-12-20',
      supplier: 'PenWorld Inc',
      unitCost: 15,
      totalValue: 180,
      location: 'Shelf B-2',
      status: 'Low Stock'
    },
    {
      id: '3',
      productName: 'Spiral Notebook - 200 Pages',
      category: 'Notebooks',
      currentStock: 8,
      minStock: 30,
      maxStock: 200,
      avgMonthlyUsage: 100,
      lastRestocked: '2024-12-15',
      supplier: 'BookMakers Co',
      unitCost: 45,
      totalValue: 360,
      location: 'Shelf C-1',
      status: 'Low Stock'
    },
    {
      id: '4',
      productName: 'Stapler - Heavy Duty',
      category: 'Accessories',
      currentStock: 0,
      minStock: 15,
      maxStock: 100,
      avgMonthlyUsage: 25,
      lastRestocked: '2024-11-30',
      supplier: 'OfficeMax',
      unitCost: 450,
      totalValue: 0,
      location: 'Shelf D-3',
      status: 'Out of Stock'
    },
    {
      id: '5',
      productName: 'Correction Tape',
      category: 'Writing',
      currentStock: 250,
      minStock: 50,
      maxStock: 200,
      avgMonthlyUsage: 80,
      lastRestocked: '2025-01-01',
      supplier: 'PenWorld Inc',
      unitCost: 35,
      totalValue: 8750,
      location: 'Shelf B-3',
      status: 'Overstock'
    }
  ]);

  const categories = ['Paper', 'Writing', 'Notebooks', 'Files', 'Accessories'];
  const statuses = ['In Stock', 'Low Stock', 'Out of Stock', 'Overstock'];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Overstock': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100;
    return Math.min(percentage, 100);
  };

  const getTotalValue = () => {
    return inventory.reduce((sum, item) => sum + item.totalValue, 0);
  };

  const getStockAlerts = () => {
    return {
      lowStock: inventory.filter(item => item.status === 'Low Stock').length,
      outOfStock: inventory.filter(item => item.status === 'Out of Stock').length,
      overstock: inventory.filter(item => item.status === 'Overstock').length
    };
  };

  const alerts = getStockAlerts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <div className="text-sm text-gray-600">
          Total Inventory Value: ₹{getTotalValue().toLocaleString()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-yellow-600">{alerts.lowStock}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{alerts.outOfStock}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overstock Items</p>
              <p className="text-2xl font-bold text-blue-600">{alerts.overstock}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredInventory.length} of {inventory.length} items
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage & Restock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value & Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                      <div className="text-sm text-gray-500">{item.supplier}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current: {item.currentStock}</span>
                        <span>Max: {item.maxStock}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.currentStock <= item.minStock 
                              ? 'bg-red-500' 
                              : item.currentStock > item.maxStock 
                              ? 'bg-blue-500'
                              : 'bg-green-500'
                          }`}
                          style={{ 
                            width: `${getStockLevel(item.currentStock, item.minStock, item.maxStock)}%` 
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: {item.minStock}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div>Monthly Usage: {item.avgMonthlyUsage}</div>
                      <div className="text-gray-500">
                        Last Restocked: {new Date(item.lastRestocked).toLocaleDateString()}
                      </div>
                      {item.avgMonthlyUsage > 0 && item.currentStock > 0 && (
                        <div className="text-gray-500 mt-1">
                          Est. {Math.ceil(item.currentStock / (item.avgMonthlyUsage / 30))} days left
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium">₹{item.totalValue.toLocaleString()}</div>
                      <div className="text-gray-500">Unit: ₹{item.unitCost}</div>
                      <div className="text-gray-500 mt-1">{item.location}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No inventory items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;