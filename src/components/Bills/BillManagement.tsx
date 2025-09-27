// // // import React, { useState } from 'react';
// // // import { Plus, Eye, Edit, Trash2, Search, Filter, Download, FileText, Calendar } from 'lucide-react';
// // // import BillForm from './BillForm';

// // // interface BillItem {
// // //   productId: string;
// // //   productName: string;
// // //   quantity: number;
// // //   unitPrice: number;
// // //   total: number;
// // // }

// // // interface Bill {
// // //   id: string;
// // //   billNumber: string;
// // //   customerId: string;
// // //   customerName: string;
// // //   date: string;
// // //   dueDate: string;
// // //   items: BillItem[];
// // //   subtotal: number;
// // //   taxAmount: number;
// // //   totalAmount: number;
// // //   status: 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
// // //   paymentMethod?: string;
// // //   notes?: string;
// // // }

// // // const BillManagement: React.FC = () => {
// // //   const [showForm, setShowForm] = useState(false);
// // //   const [editingBill, setEditingBill] = useState<Bill | null>(null);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [statusFilter, setStatusFilter] = useState('');
// // //   const [dateRange, setDateRange] = useState('');

// // //   const [bills, setBills] = useState<Bill[]>([
// // //     {
// // //       id: '1',
// // //       billNumber: 'INV-2025-001',
// // //       customerId: '1',
// // //       customerName: 'ABC School',
// // //       date: '2025-01-08',
// // //       dueDate: '2025-02-07',
// // //       items: [
// // //         { productId: '1', productName: 'A4 Paper - Premium White', quantity: 50, unitPrice: 300, total: 15000 },
// // //         { productId: '2', productName: 'Blue Gel Pen - 0.7mm', quantity: 18, unitPrice: 25, total: 450 }
// // //       ],
// // //       subtotal: 15450,
// // //       taxAmount: 2781,
// // //       totalAmount: 18231,
// // //       status: 'Pending',
// // //       paymentMethod: 'Credit',
// // //       notes: 'Bulk order for new academic year'
// // //     },
// // //     {
// // //       id: '2',
// // //       billNumber: 'INV-2025-002',
// // //       customerId: '2',
// // //       customerName: 'XYZ Office Supplies',
// // //       date: '2025-01-07',
// // //       dueDate: '2025-01-22',
// // //       items: [
// // //         { productId: '3', productName: 'Spiral Notebook - 200 Pages', quantity: 100, unitPrice: 65, total: 6500 },
// // //         { productId: '2', productName: 'Blue Gel Pen - 0.7mm', quantity: 50, unitPrice: 25, total: 1250 }
// // //       ],
// // //       subtotal: 7750,
// // //       taxAmount: 1395,
// // //       totalAmount: 9145,
// // //       status: 'Paid',
// // //       paymentMethod: 'UPI',
// // //       notes: 'Regular monthly order'
// // //     },
// // //     {
// // //       id: '3',
// // //       billNumber: 'INV-2025-003',
// // //       customerId: '3',
// // //       customerName: 'Smart Stationers',
// // //       date: '2025-01-05',
// // //       dueDate: '2025-01-20',
// // //       items: [
// // //         { productId: '1', productName: 'A4 Paper - Premium White', quantity: 200, unitPrice: 280, total: 56000 }
// // //       ],
// // //       subtotal: 56000,
// // //       taxAmount: 10080,
// // //       totalAmount: 66080,
// // //       status: 'Overdue',
// // //       paymentMethod: 'Credit',
// // //       notes: 'Wholesale rate applied'
// // //     }
// // //   ]);

// // //   // Sample data for form
// // //   const customers = [
// // //     { id: '1', name: 'ABC School' },
// // //     { id: '2', name: 'XYZ Office Supplies' },
// // //     { id: '3', name: 'Smart Stationers' }
// // //   ];

// // //   const products = [
// // //     { id: '1', name: 'A4 Paper - Premium White', price: 300 },
// // //     { id: '2', name: 'Blue Gel Pen - 0.7mm', price: 25 },
// // //     { id: '3', name: 'Spiral Notebook - 200 Pages', price: 65 }
// // //   ];

// // //   const handleAddBill = (billData: Omit<Bill, 'id' | 'billNumber'>) => {
// // //     const billNumber = `INV-2025-${String(bills.length + 1).padStart(3, '0')}`;
// // //     const newBill: Bill = {
// // //       ...billData,
// // //       id: Date.now().toString(),
// // //       billNumber
// // //     };
// // //     setBills([...bills, newBill]);
// // //     setShowForm(false);
// // //   };

// // //   const handleEditBill = (billData: Omit<Bill, 'id' | 'billNumber'>) => {
// // //     if (editingBill) {
// // //       setBills(bills.map(b => 
// // //         b.id === editingBill.id ? { 
// // //           ...billData, 
// // //           id: editingBill.id,
// // //           billNumber: editingBill.billNumber 
// // //         } : b
// // //       ));
// // //       setEditingBill(null);
// // //       setShowForm(false);
// // //     }
// // //   };

// // //   const handleDeleteBill = (id: string) => {
// // //     if (confirm('Are you sure you want to delete this bill?')) {
// // //       setBills(bills.filter(b => b.id !== id));
// // //     }
// // //   };

// // //   const getStatusColor = (status: string) => {
// // //     switch (status) {
// // //       case 'Paid': return 'bg-green-100 text-green-800';
// // //       case 'Pending': return 'bg-yellow-100 text-yellow-800';
// // //       case 'Overdue': return 'bg-red-100 text-red-800';
// // //       case 'Draft': return 'bg-gray-100 text-gray-800';
// // //       case 'Cancelled': return 'bg-gray-100 text-gray-600';
// // //       default: return 'bg-gray-100 text-gray-800';
// // //     }
// // //   };

// // //   const filteredBills = bills.filter(bill => {
// // //     const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //                          bill.customerName.toLowerCase().includes(searchTerm.toLowerCase());
// // //     const matchesStatus = statusFilter === '' || bill.status === statusFilter;
    
// // //     let matchesDate = true;
// // //     if (dateRange) {
// // //       const billDate = new Date(bill.date);
// // //       const today = new Date();
// // //       switch (dateRange) {
// // //         case 'today':
// // //           matchesDate = billDate.toDateString() === today.toDateString();
// // //           break;
// // //         case 'week':
// // //           const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
// // //           matchesDate = billDate >= weekAgo;
// // //           break;
// // //         case 'month':
// // //           const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
// // //           matchesDate = billDate >= monthAgo;
// // //           break;
// // //       }
// // //     }
    
// // //     return matchesSearch && matchesStatus && matchesDate;
// // //   });

// // //   const handleViewBill = (bill: Bill) => {
// // //     // Generate a simple print-friendly view
// // //     const printWindow = window.open('', '_blank');
// // //     if (printWindow) {
// // //       printWindow.document.write(`
// // //         <html>
// // //           <head>
// // //             <title>Invoice ${bill.billNumber}</title>
// // //             <style>
// // //               body { font-family: Arial, sans-serif; margin: 20px; }
// // //               .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
// // //               .details { display: flex; justify-content: space-between; margin-bottom: 20px; }
// // //               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
// // //               th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
// // //               th { background-color: #f2f2f2; }
// // //               .total { text-align: right; font-weight: bold; }
// // //               .notes { margin-top: 20px; }
// // //             </style>
// // //           </head>
// // //           <body>
// // //             <div class="header">
// // //               <h1>INVOICE</h1>
// // //               <h2>StationeryPro</h2>
// // //               <p>Invoice #: ${bill.billNumber}</p>
// // //             </div>
// // //             <div class="details">
// // //               <div>
// // //                 <strong>Bill To:</strong><br>
// // //                 ${bill.customerName}
// // //               </div>
// // //               <div>
// // //                 <strong>Date:</strong> ${new Date(bill.date).toLocaleDateString()}<br>
// // //                 <strong>Due Date:</strong> ${new Date(bill.dueDate).toLocaleDateString()}<br>
// // //                 <strong>Status:</strong> ${bill.status}
// // //               </div>
// // //             </div>
// // //             <table>
// // //               <thead>
// // //                 <tr>
// // //                   <th>Item</th>
// // //                   <th>Quantity</th>
// // //                   <th>Unit Price</th>
// // //                   <th>Total</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 ${bill.items.map(item => `
// // //                   <tr>
// // //                     <td>${item.productName}</td>
// // //                     <td>${item.quantity}</td>
// // //                     <td>₹${item.unitPrice}</td>
// // //                     <td>₹${item.total}</td>
// // //                   </tr>
// // //                 `).join('')}
// // //               </tbody>
// // //             </table>
// // //             <div class="total">
// // //               <p>Subtotal: ₹${bill.subtotal}</p>
// // //               <p>Tax: ₹${bill.taxAmount}</p>
// // //               <h3>Total: ₹${bill.totalAmount}</h3>
// // //             </div>
// // //             ${bill.notes ? `<div class="notes"><strong>Notes:</strong> ${bill.notes}</div>` : ''}
// // //           </body>
// // //         </html>
// // //       `);
// // //       printWindow.document.close();
// // //       printWindow.print();
// // //     }
// // //   };

// // //   if (showForm) {
// // //     return (
// // //       <BillForm
// // //         bill={editingBill}
// // //         onSave={editingBill ? handleEditBill : handleAddBill}
// // //         onCancel={() => {
// // //           setShowForm(false);
// // //           setEditingBill(null);
// // //         }}
// // //         customers={customers}
// // //         products={products}
// // //       />
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="flex items-center justify-between">
// // //         <h1 className="text-2xl font-bold text-gray-800">Bills & Invoices</h1>
// // //         <button
// // //           onClick={() => setShowForm(true)}
// // //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// // //         >
// // //           <Plus size={20} />
// // //           <span>Create Bill</span>
// // //         </button>
// // //       </div>

// // //       {/* Summary Cards */}
// // //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // //         <div className="bg-white rounded-lg shadow-md p-6">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-600">Total Bills</p>
// // //               <p className="text-2xl font-bold text-gray-900">{bills.length}</p>
// // //             </div>
// // //             <FileText className="w-8 h-8 text-blue-500" />
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-lg shadow-md p-6">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-600">Total Amount</p>
// // //               <p className="text-2xl font-bold text-gray-900">
// // //                 ₹{bills.reduce((sum, bill) => sum + bill.totalAmount, 0).toLocaleString()}
// // //               </p>
// // //             </div>
// // //             <Download className="w-8 h-8 text-green-500" />
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-lg shadow-md p-6">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-600">Pending</p>
// // //               <p className="text-2xl font-bold text-yellow-600">
// // //                 {bills.filter(b => b.status === 'Pending').length}
// // //               </p>
// // //             </div>
// // //             <Calendar className="w-8 h-8 text-yellow-500" />
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-lg shadow-md p-6">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-600">Overdue</p>
// // //               <p className="text-2xl font-bold text-red-600">
// // //                 {bills.filter(b => b.status === 'Overdue').length}
// // //               </p>
// // //             </div>
// // //             <Calendar className="w-8 h-8 text-red-500" />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Filters */}
// // //       <div className="bg-white rounded-lg shadow-md p-4">
// // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //           <div className="relative">
// // //             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // //             <input
// // //               type="text"
// // //               placeholder="Search by bill number or customer..."
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //             />
// // //           </div>

// // //           <div className="relative">
// // //             <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // //             <select
// // //               value={statusFilter}
// // //               onChange={(e) => setStatusFilter(e.target.value)}
// // //               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
// // //             >
// // //               <option value="">All Status</option>
// // //               <option value="Draft">Draft</option>
// // //               <option value="Pending">Pending</option>
// // //               <option value="Paid">Paid</option>
// // //               <option value="Overdue">Overdue</option>
// // //               <option value="Cancelled">Cancelled</option>
// // //             </select>
// // //           </div>

// // //           <select
// // //             value={dateRange}
// // //             onChange={(e) => setDateRange(e.target.value)}
// // //             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //           >
// // //             <option value="">All Dates</option>
// // //             <option value="today">Today</option>
// // //             <option value="week">This Week</option>
// // //             <option value="month">This Month</option>
// // //           </select>

// // //           <div className="text-sm text-gray-600 flex items-center">
// // //             Showing {filteredBills.length} of {bills.length} bills
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Bills Table */}
// // //       <div className="bg-white rounded-lg shadow-md overflow-hidden">
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full">
// // //             <thead className="bg-gray-50">
// // //               <tr>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Bill Details
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Customer
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Amount
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Status
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Dates
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Actions
// // //                 </th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white divide-y divide-gray-200">
// // //               {filteredBills.map((bill) => (
// // //                 <tr key={bill.id} className="hover:bg-gray-50">
// // //                   <td className="px-6 py-4">
// // //                     <div>
// // //                       <div className="text-sm font-medium text-gray-900">{bill.billNumber}</div>
// // //                       <div className="text-sm text-gray-500">{bill.items.length} items</div>
// // //                     </div>
// // //                   </td>
// // //                   <td className="px-6 py-4">
// // //                     <div className="text-sm font-medium text-gray-900">{bill.customerName}</div>
// // //                     <div className="text-sm text-gray-500">{bill.paymentMethod}</div>
// // //                   </td>
// // //                   <td className="px-6 py-4">
// // //                     <div className="text-sm">
// // //                       <div className="font-medium text-gray-900">₹{bill.totalAmount.toLocaleString()}</div>
// // //                       <div className="text-gray-500">Subtotal: ₹{bill.subtotal.toLocaleString()}</div>
// // //                     </div>
// // //                   </td>
// // //                   <td className="px-6 py-4">
// // //                     <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bill.status)}`}>
// // //                       {bill.status}
// // //                     </span>
// // //                   </td>
// // //                   <td className="px-6 py-4 text-sm text-gray-500">
// // //                     <div>Date: {new Date(bill.date).toLocaleDateString()}</div>
// // //                     <div>Due: {new Date(bill.dueDate).toLocaleDateString()}</div>
// // //                   </td>
// // //                   <td className="px-6 py-4">
// // //                     <div className="flex space-x-2">
// // //                       <button
// // //                         onClick={() => handleViewBill(bill)}
// // //                         className="text-blue-600 hover:text-blue-800 p-1 rounded"
// // //                         title="View/Print Bill"
// // //                       >
// // //                         <Eye size={16} />
// // //                       </button>
// // //                       <button
// // //                         onClick={() => {
// // //                           setEditingBill(bill);
// // //                           setShowForm(true);
// // //                         }}
// // //                         className="text-green-600 hover:text-green-800 p-1 rounded"
// // //                         title="Edit Bill"
// // //                       >
// // //                         <Edit size={16} />
// // //                       </button>
// // //                       <button
// // //                         onClick={() => handleDeleteBill(bill.id)}
// // //                         className="text-red-600 hover:text-red-800 p-1 rounded"
// // //                         title="Delete Bill"
// // //                       >
// // //                         <Trash2 size={16} />
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       {filteredBills.length === 0 && (
// // //         <div className="text-center py-12">
// // //           <p className="text-gray-500">No bills found matching your criteria.</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default BillManagement;
// // import React, { useState, useEffect } from 'react';
// // import { Plus, Eye, Edit, Trash2, Search, Filter, Download, FileText, Calendar, X, Calculator } from 'lucide-react';

// // interface BillItem {
// //   productId: string;
// //   productName: string;
// //   quantity: number;
// //   unitPrice: number;
// //   total: number;
// // }

// // interface Bill {
// //   id: string;
// //   billNumber: string;
// //   customerId: string;
// //   customerName: string;
// //   date: string;
// //   dueDate: string;
// //   items: BillItem[];
// //   subtotal: number;
// //   taxAmount: number;
// //   totalAmount: number;
// //   status: 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
// //   paymentMethod?: string;
// //   notes?: string;
// // }

// // interface Customer {
// //   id: string;
// //   name: string;
// // }

// // interface Product {
// //   id: string;
// //   name: string;
// //   price: number;
// // }

// // interface BillManagementProps {
// //   bills?: Bill[];
// //   customers?: Customer[];
// //   products?: Product[];
// //   onBillsChange?: (bills: Bill[]) => void;
// //   onAddBill?: (bill: Omit<Bill, 'id' | 'billNumber'>) => void;
// //   onUpdateBill?: (id: string, bill: Omit<Bill, 'id' | 'billNumber'>) => void;
// //   onDeleteBill?: (id: string) => void;
// //   loading?: boolean;
// // }

// // // Separate BillForm component for modularity
// // const BillForm: React.FC<{
// //   bill?: Bill | null;
// //   onSave: (bill: Omit<Bill, 'id' | 'billNumber'>) => void;
// //   onCancel: () => void;
// //   customers: Customer[];
// //   products: Product[];
// // }> = ({ bill, onSave, onCancel, customers, products }) => {
// //   const [formData, setFormData] = useState({
// //     customerId: '',
// //     customerName: '',
// //     date: new Date().toISOString().split('T')[0],
// //     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
// //     items: [] as BillItem[],
// //     subtotal: 0,
// //     taxRate: 18,
// //     taxAmount: 0,
// //     totalAmount: 0,
// //     status: 'Draft' as 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled',
// //     paymentMethod: '',
// //     notes: ''
// //   });

// //   const [errors, setErrors] = useState<{[key: string]: string}>({});

// //   useEffect(() => {
// //     if (bill) {
// //       setFormData({
// //         customerId: bill.customerId,
// //         customerName: bill.customerName,
// //         date: bill.date,
// //         dueDate: bill.dueDate,
// //         items: bill.items,
// //         subtotal: bill.subtotal,
// //         taxRate: 18,
// //         taxAmount: bill.taxAmount,
// //         totalAmount: bill.totalAmount,
// //         status: bill.status,
// //         paymentMethod: bill.paymentMethod || '',
// //         notes: bill.notes || ''
// //       });
// //     }
// //   }, [bill]);

// //   useEffect(() => {
// //     calculateTotals();
// //   }, [formData.items, formData.taxRate]);

// //   const calculateTotals = () => {
// //     const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
// //     const taxAmount = (subtotal * formData.taxRate) / 100;
// //     const totalAmount = subtotal + taxAmount;

// //     setFormData(prev => ({
// //       ...prev,
// //       subtotal,
// //       taxAmount,
// //       totalAmount
// //     }));
// //   };

// //   const handleCustomerChange = (customerId: string) => {
// //     const customer = customers.find(c => c.id === customerId);
// //     setFormData({
// //       ...formData,
// //       customerId,
// //       customerName: customer?.name || ''
// //     });
// //   };

// //   const addItem = () => {
// //     const newItem: BillItem = {
// //       productId: '',
// //       productName: '',
// //       quantity: 1,
// //       unitPrice: 0,
// //       total: 0
// //     };
// //     setFormData({
// //       ...formData,
// //       items: [...formData.items, newItem]
// //     });
// //   };

// //   const updateItem = (index: number, field: keyof BillItem, value: string | number) => {
// //     const updatedItems = [...formData.items];
    
// //     if (field === 'productId') {
// //       const product = products.find(p => p.id === value);
// //       updatedItems[index] = {
// //         ...updatedItems[index],
// //         productId: value as string,
// //         productName: product?.name || '',
// //         unitPrice: product?.price || 0
// //       };
// //     } else {
// //       updatedItems[index] = {
// //         ...updatedItems[index],
// //         [field]: value
// //       };
// //     }

// //     updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;

// //     setFormData({
// //       ...formData,
// //       items: updatedItems
// //     });
// //   };

// //   const removeItem = (index: number) => {
// //     const updatedItems = formData.items.filter((_, i) => i !== index);
// //     setFormData({
// //       ...formData,
// //       items: updatedItems
// //     });
// //   };

// //   const validateForm = () => {
// //     const newErrors: {[key: string]: string} = {};

// //     if (!formData.customerId) newErrors.customerId = 'Customer is required';
// //     if (!formData.date) newErrors.date = 'Date is required';
// //     if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
// //     if (formData.items.length === 0) newErrors.items = 'At least one item is required';
    
// //     formData.items.forEach((item, index) => {
// //       if (!item.productId) newErrors[`item_${index}_product`] = 'Product is required';
// //       if (item.quantity <= 0) newErrors[`item_${index}_quantity`] = 'Quantity must be greater than 0';
// //     });

// //     if (new Date(formData.dueDate) < new Date(formData.date)) {
// //       newErrors.dueDate = 'Due date must be after bill date';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (validateForm()) {
// //       onSave({
// //         customerId: formData.customerId,
// //         customerName: formData.customerName,
// //         date: formData.date,
// //         dueDate: formData.dueDate,
// //         items: formData.items,
// //         subtotal: formData.subtotal,
// //         taxAmount: formData.taxAmount,
// //         totalAmount: formData.totalAmount,
// //         status: formData.status,
// //         paymentMethod: formData.paymentMethod,
// //         notes: formData.notes
// //       });
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-2xl font-bold text-gray-800">
// //           {bill ? 'Edit Bill' : 'Create New Bill'}
// //         </h1>
// //         <button
// //           onClick={onCancel}
// //           className="text-gray-500 hover:text-gray-700"
// //         >
// //           <X size={24} />
// //         </button>
// //       </div>

// //       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
// //         {/* Bill Header */}
// //         <div className="mb-8">
// //           <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Information</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Customer *
// //               </label>
// //               <select
// //                 value={formData.customerId}
// //                 onChange={(e) => handleCustomerChange(e.target.value)}
// //                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// //                   errors.customerId ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               >
// //                 <option value="">Select Customer</option>
// //                 {customers.map(customer => (
// //                   <option key={customer.id} value={customer.id}>{customer.name}</option>
// //                 ))}
// //               </select>
// //               {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Bill Date *
// //               </label>
// //               <input
// //                 type="date"
// //                 value={formData.date}
// //                 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
// //                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// //                   errors.date ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               />
// //               {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Due Date *
// //               </label>
// //               <input
// //                 type="date"
// //                 value={formData.dueDate}
// //                 onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
// //                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// //                   errors.dueDate ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               />
// //               {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Status
// //               </label>
// //               <select
// //                 value={formData.status}
// //                 onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               >
// //                 <option value="Draft">Draft</option>
// //                 <option value="Pending">Pending</option>
// //                 <option value="Paid">Paid</option>
// //                 <option value="Overdue">Overdue</option>
// //                 <option value="Cancelled">Cancelled</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Items Section */}
// //         <div className="mb-8">
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-lg font-semibold text-gray-800">Items</h2>
// //             <button
// //               type="button"
// //               onClick={addItem}
// //               className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm transition-colors"
// //             >
// //               <Plus size={16} />
// //               <span>Add Item</span>
// //             </button>
// //           </div>

// //           {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}

// //           <div className="space-y-4">
// //             {formData.items.map((item, index) => (
// //               <div key={index} className="border border-gray-200 rounded-lg p-4">
// //                 <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
// //                   <div className="md:col-span-2">
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Product *
// //                     </label>
// //                     <select
// //                       value={item.productId}
// //                       onChange={(e) => updateItem(index, 'productId', e.target.value)}
// //                       className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// //                         errors[`item_${index}_product`] ? 'border-red-500' : 'border-gray-300'
// //                       }`}
// //                     >
// //                       <option value="">Select Product</option>
// //                       {products.map(product => (
// //                         <option key={product.id} value={product.id}>
// //                           {product.name} - ₹{product.price}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     {errors[`item_${index}_product`] && (
// //                       <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_product`]}</p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Quantity *
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={item.quantity}
// //                       onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
// //                       className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// //                         errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-gray-300'
// //                       }`}
// //                       min="1"
// //                     />
// //                     {errors[`item_${index}_quantity`] && (
// //                       <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_quantity`]}</p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Unit Price (₹)
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={item.unitPrice}
// //                       onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       step="0.01"
// //                     />
// //                   </div>

// //                   <div className="flex items-end justify-between">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Total
// //                       </label>
// //                       <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium">
// //                         ₹{item.total.toLocaleString()}
// //                       </div>
// //                     </div>
// //                     <button
// //                       type="button"
// //                       onClick={() => removeItem(index)}
// //                       className="text-red-600 hover:text-red-800 p-1 rounded mb-2"
// //                     >
// //                       <Trash2 size={16} />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Totals Section */}
// //         <div className="mb-8">
// //           <div className="bg-gray-50 rounded-lg p-4">
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="text-lg font-semibold text-gray-800">Bill Summary</h3>
// //               <Calculator className="w-5 h-5 text-gray-500" />
// //             </div>
            
// //             <div className="space-y-3">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-gray-700">Subtotal:</span>
// //                 <span className="font-medium">₹{formData.subtotal.toLocaleString()}</span>
// //               </div>
              
// //               <div className="flex justify-between items-center">
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-gray-700">Tax Rate:</span>
// //                   <input
// //                     type="number"
// //                     value={formData.taxRate}
// //                     onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
// //                     className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
// //                     step="0.1"
// //                     min="0"
// //                     max="100"
// //                   />
// //                   <span className="text-gray-700">%</span>
// //                 </div>
// //                 <span className="font-medium">₹{formData.taxAmount.toLocaleString()}</span>
// //               </div>
              
// //               <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-200">
// //                 <span>Total Amount:</span>
// //                 <span>₹{formData.totalAmount.toLocaleString()}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Payment and Notes */}
// //         <div className="mb-8">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Payment Method
// //               </label>
// //               <select
// //                 value={formData.paymentMethod}
// //                 onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               >
// //                 <option value="">Select Payment Method</option>
// //                 <option value="Cash">Cash</option>
// //                 <option value="Credit">Credit</option>
// //                 <option value="UPI">UPI</option>
// //                 <option value="Bank Transfer">Bank Transfer</option>
// //                 <option value="Cheque">Cheque</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="mt-6">
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Notes
// //             </label>
// //             <textarea
// //               value={formData.notes}
// //               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
// //               rows={3}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               placeholder="Additional notes or terms..."
// //             />
// //           </div>
// //         </div>

// //         {/* Form Actions */}
// //         <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
// //           <button
// //             type="button"
// //             onClick={onCancel}
// //             className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="submit"
// //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// //           >
// //             <FileText size={18} />
// //             <span>{bill ? 'Update Bill' : 'Create Bill'}</span>
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // const BillManagement: React.FC<BillManagementProps> = ({
// //   bills = [],
// //   customers = [],
// //   products = [],
// //   onBillsChange,
// //   onAddBill,
// //   onUpdateBill,
// //   onDeleteBill,
// //   loading = false
// // }) => {
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingBill, setEditingBill] = useState<Bill | null>(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('');
// //   const [dateRange, setDateRange] = useState('');

// //   const handleAddBill = async (billData: Omit<Bill, 'id' | 'billNumber'>) => {
// //     try {
// //       if (onAddBill) {
// //         await onAddBill(billData);
// //       } else {
// //         // Fallback: generate bill number and add to local state
// //         const billNumber = `INV-${new Date().getFullYear()}-${String(bills.length + 1).padStart(3, '0')}`;
// //         const newBill: Bill = {
// //           ...billData,
// //           id: Date.now().toString(),
// //           billNumber
// //         };
// //         if (onBillsChange) {
// //           onBillsChange([...bills, newBill]);
// //         }
// //       }
// //       setShowForm(false);
// //     } catch (error) {
// //       console.error('Error adding bill:', error);
// //       alert('Failed to create bill. Please try again.');
// //     }
// //   };

// //   const handleEditBill = async (billData: Omit<Bill, 'id' | 'billNumber'>) => {
// //     if (editingBill) {
// //       try {
// //         if (onUpdateBill) {
// //           await onUpdateBill(editingBill.id, billData);
// //         } else {
// //           // Fallback: update local state
// //           const updatedBills = bills.map(b => 
// //             b.id === editingBill.id ? { 
// //               ...billData, 
// //               id: editingBill.id,
// //               billNumber: editingBill.billNumber 
// //             } : b
// //           );
// //           if (onBillsChange) {
// //             onBillsChange(updatedBills);
// //           }
// //         }
// //         setEditingBill(null);
// //         setShowForm(false);
// //       } catch (error) {
// //         console.error('Error updating bill:', error);
// //         alert('Failed to update bill. Please try again.');
// //       }
// //     }
// //   };

// //   const handleDeleteBill = async (id: string) => {
// //     if (confirm('Are you sure you want to delete this bill?')) {
// //       try {
// //         if (onDeleteBill) {
// //           await onDeleteBill(id);
// //         } else {
// //           // Fallback: remove from local state
// //           const updatedBills = bills.filter(b => b.id !== id);
// //           if (onBillsChange) {
// //             onBillsChange(updatedBills);
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error deleting bill:', error);
// //         alert('Failed to delete bill. Please try again.');
// //       }
// //     }
// //   };

// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case 'Paid': return 'bg-green-100 text-green-800';
// //       case 'Pending': return 'bg-yellow-100 text-yellow-800';
// //       case 'Overdue': return 'bg-red-100 text-red-800';
// //       case 'Draft': return 'bg-gray-100 text-gray-800';
// //       case 'Cancelled': return 'bg-gray-100 text-gray-600';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const filteredBills = bills.filter(bill => {
// //     const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          bill.customerName.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesStatus = statusFilter === '' || bill.status === statusFilter;
    
// //     let matchesDate = true;
// //     if (dateRange) {
// //       const billDate = new Date(bill.date);
// //       const today = new Date();
// //       switch (dateRange) {
// //         case 'today':
// //           matchesDate = billDate.toDateString() === today.toDateString();
// //           break;
// //         case 'week':
// //           const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
// //           matchesDate = billDate >= weekAgo;
// //           break;
// //         case 'month':
// //           const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
// //           matchesDate = billDate >= monthAgo;
// //           break;
// //       }
// //     }
    
// //     return matchesSearch && matchesStatus && matchesDate;
// //   });

// //   const handleViewBill = (bill: Bill) => {
// //     const printWindow = window.open('', '_blank');
// //     if (printWindow) {
// //       printWindow.document.write(`
// //         <html>
// //           <head>
// //             <title>Invoice ${bill.billNumber}</title>
// //             <style>
// //               body { font-family: Arial, sans-serif; margin: 20px; }
// //               .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
// //               .details { display: flex; justify-content: space-between; margin-bottom: 20px; }
// //               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
// //               th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
// //               th { background-color: #f2f2f2; }
// //               .total { text-align: right; font-weight: bold; }
// //               .notes { margin-top: 20px; }
// //             </style>
// //           </head>
// //           <body>
// //             <div class="header">
// //               <h1>INVOICE</h1>
// //               <h2>StationeryPro</h2>
// //               <p>Invoice #: ${bill.billNumber}</p>
// //             </div>
// //             <div class="details">
// //               <div>
// //                 <strong>Bill To:</strong><br>
// //                 ${bill.customerName}
// //               </div>
// //               <div>
// //                 <strong>Date:</strong> ${new Date(bill.date).toLocaleDateString()}<br>
// //                 <strong>Due Date:</strong> ${new Date(bill.dueDate).toLocaleDateString()}<br>
// //                 <strong>Status:</strong> ${bill.status}
// //               </div>
// //             </div>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>Item</th>
// //                   <th>Quantity</th>
// //                   <th>Unit Price</th>
// //                   <th>Total</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 ${bill.items.map(item => `
// //                   <tr>
// //                     <td>${item.productName}</td>
// //                     <td>${item.quantity}</td>
// //                     <td>₹${item.unitPrice}</td>
// //                     <td>₹${item.total}</td>
// //                   </tr>
// //                 `).join('')}
// //               </tbody>
// //             </table>
// //             <div class="total">
// //               <p>Subtotal: ₹${bill.subtotal}</p>
// //               <p>Tax: ₹${bill.taxAmount}</p>
// //               <h3>Total: ₹${bill.totalAmount}</h3>
// //             </div>
// //             ${bill.notes ? `<div class="notes"><strong>Notes:</strong> ${bill.notes}</div>` : ''}
// //           </body>
// //         </html>
// //       `);
// //       printWindow.document.close();
// //       printWindow.print();
// //     }
// //   };

// //   if (showForm) {
// //     return (
// //       <BillForm
// //         bill={editingBill}
// //         onSave={editingBill ? handleEditBill : handleAddBill}
// //         onCancel={() => {
// //           setShowForm(false);
// //           setEditingBill(null);
// //         }}
// //         customers={customers}
// //         products={products}
// //       />
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
// //           <p className="mt-4 text-gray-600">Loading bills...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-2xl font-bold text-gray-800">Bills & Invoices</h1>
// //         <button
// //           onClick={() => setShowForm(true)}
// //           disabled={customers.length === 0 || products.length === 0}
// //           className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// //         >
// //           <Plus size={20} />
// //           <span>Create Bill</span>
// //         </button>
// //       </div>

// //       {customers.length === 0 || products.length === 0 ? (
// //         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
// //           <p className="text-yellow-800">
// //             Please ensure you have customers and products configured before creating bills.
// //           </p>
// //         </div>
// //       ) : null}

// //       {/* Summary Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-600">Total Bills</p>
// //               <p className="text-2xl font-bold text-gray-900">{bills.length}</p>
// //             </div>
// //             <FileText className="w-8 h-8 text-blue-500" />
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-600">Total Amount</p>
// //               <p className="text-2xl font-bold text-gray-900">
// //                 ₹{bills.reduce((sum, bill) => sum + bill.totalAmount, 0).toLocaleString()}
// //               </p>
// //             </div>
// //             <Download className="w-8 h-8 text-green-500" />
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-600">Pending</p>
// //               <p className="text-2xl font-bold text-yellow-600">
// //                 {bills.filter(b => b.status === 'Pending').length}
// //               </p>
// //             </div>
// //             <Calendar className="w-8 h-8 text-yellow-500" />
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-600">Overdue</p>
// //               <p className="text-2xl font-bold text-red-600">
// //                 {bills.filter(b => b.status === 'Overdue').length}
// //               </p>
// //             </div>
// //             <Calendar className="w-8 h-8 text-red-500" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Filters */}
// //       <div className="bg-white rounded-lg shadow-md p-4">
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //           <div className="relative">
// //             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search by bill number or customer..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             />
// //           </div>

// //           <div className="relative">
// //             <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
// //             >
// //               <option value="">All Status</option>
// //               <option value="Draft">Draft</option>
// //               <option value="Pending">Pending</option>
// //               <option value="Paid">Paid</option>
// //               <option value="Overdue">Overdue</option>
// //               <option value="Cancelled">Cancelled</option>
// //             </select>
// //           </div>

// //           <select
// //             value={dateRange}
// //             onChange={(e) => setDateRange(e.target.value)}
// //             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //           >
// //             <option value="">All Dates</option>
// //             <option value="today">Today</option>
// //             <option value="week">This Week</option>
// //             <option value="month">This Month</option>
// //           </select>

// //           <div className="text-sm text-gray-600 flex items-center">
// //             Showing {filteredBills.length} of {bills.length} bills
// //           </div>
// //         </div>
// //       </div>

// //       {/* Bills Table */}
// //       <div className="bg-white rounded-lg shadow-md overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Bill Details
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Customer
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Amount
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Status
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Dates
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {filteredBills.map((bill) => (
// //                 <tr key={bill.id} className="hover:bg-gray-50">
// //                   <td className="px-6 py-4">
// //                     <div>
// //                       <div className="text-sm font-medium text-gray-900">{bill.billNumber}</div>
// //                       <div className="text-sm text-gray-500">{bill.items.length} items</div>
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <div className="text-sm font-medium text-gray-900">{bill.customerName}</div>
// //                     <div className="text-sm text-gray-500">{bill.paymentMethod}</div>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <div className="text-sm">
// //                       <div className="font-medium text-gray-900">₹{bill.totalAmount.toLocaleString()}</div>
// //                       <div className="text-gray-500">Subtotal: ₹{bill.subtotal.toLocaleString()}</div>
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bill.status)}`}>
// //                       {bill.status}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-500">
// //                     <div>Date: {new Date(bill.date).toLocaleDateString()}</div>
// //                     <div>Due: {new Date(bill.dueDate).toLocaleDateString()}</div>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <div className="flex space-x-2">
// //                       <button
// //                         onClick={() => handleViewBill(bill)}
// //                         className="text-blue-600 hover:text-blue-800 p-1 rounded"
// //                         title="View/Print Bill"
// //                       >
// //                         <Eye size={16} />
// //                       </button>
// //                       <button
// //                         onClick={() => {
// //                           setEditingBill(bill);
// //                           setShowForm(true);
// //                         }}
// //                         className="text-green-600 hover:text-green-800 p-1 rounded"
// //                         title="Edit Bill"
// //                       >
// //                         <Edit size={16} />
// //                       </button>
// //                       <button
// //                         onClick={() => handleDeleteBill(bill.id)}
// //                         className="text-red-600 hover:text-red-800 p-1 rounded"
// //                         title="Delete Bill"
// //                       >
// //                         <Trash2 size={16} />
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {filteredBills.length === 0 && bills.length > 0 && (
// //         <div className="text-center py-12">
// //           <p className="text-gray-500">No bills found matching your criteria.</p>
// //         </div>
// //       )}

// //       {bills.length === 0 && (
// //         <div className="text-center py-12 bg-white rounded-lg shadow-md">
// //           <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
// //           <h3 className="text-lg font-medium text-gray-900 mb-2">No Bills Found</h3>
// //           <p className="text-gray-500 mb-6">
// //             {customers.length === 0 || products.length === 0 
// //               ? "Configure customers and products first to create bills." 
// //               : "Create your first bill to get started."}
// //           </p>
// //           {customers.length > 0 && products.length > 0 && (
// //             <button
// //               onClick={() => setShowForm(true)}
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
// //             >
// //               Create First Bill
// //             </button>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BillManagement;
        
// import React, { useState } from 'react';
// import { Plus, Eye, Edit, Trash2, Search, Filter, Download, FileText, Calendar, AlertCircle } from 'lucide-react';
// import BillForm from './BillForm';
// import { useBills } from '../../hooks/useBills';
// import { useCustomers } from '../../hooks/useCustomers';
// import { useProducts } from '../../hooks/useProducts';

// const BillManagement: React.FC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingBill, setEditingBill] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [dateRange, setDateRange] = useState('');

//   const { 
//     bills, 
//     loading: billsLoading, 
//     error: billsError, 
//     addBill, 
//     updateBill, 
//     deleteBill 
//   } = useBills();

//   const { 
//     customers, 
//     loading: customersLoading, 
//     error: customersError 
//   } = useCustomers();

//   const { 
//     products, 
//     loading: productsLoading, 
//     error: productsError 
//   } = useProducts();

//   const handleAddBill = async (billData: any) => {
//     try {
//       await addBill(billData);
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error adding bill:', error);
//       alert('Failed to create bill. Please try again.');
//     }
//   };

//   const handleEditBill = async (billData: any) => {
//     if (editingBill) {
//       try {
//         await updateBill(editingBill.id, billData);
//         setEditingBill(null);
//         setShowForm(false);
//       } catch (error) {
//         console.error('Error updating bill:', error);
//         alert('Failed to update bill. Please try again.');
//       }
//     }
//   };

//   const handleDeleteBill = async (id: string) => {
//     if (confirm('Are you sure you want to delete this bill? This will restore the product stock.')) {
//       try {
//         await deleteBill(id);
//       } catch (error) {
//         console.error('Error deleting bill:', error);
//         alert('Failed to delete bill. Please try again.');
//       }
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Paid': return 'bg-green-100 text-green-800';
//       case 'Pending': return 'bg-yellow-100 text-yellow-800';
//       case 'Overdue': return 'bg-red-100 text-red-800';
//       case 'Draft': return 'bg-gray-100 text-gray-800';
//       case 'Cancelled': return 'bg-gray-100 text-gray-600';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const filteredBills = bills.filter((bill: { billNumber: string; customerName: string; status: string; date: string | number | Date; }) => {
//     const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          bill.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === '' || bill.status === statusFilter;
    
//     let matchesDate = true;
//     if (dateRange) {
//       const billDate = new Date(bill.date);
//       const today = new Date();
//       switch (dateRange) {
//         case 'today':
//           matchesDate = billDate.toDateString() === today.toDateString();
//           break;
//         case 'week':
//           const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
//           matchesDate = billDate >= weekAgo;
//           break;
//         case 'month':
//           const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
//           matchesDate = billDate >= monthAgo;
//           break;
//       }
//     }
    
//     return matchesSearch && matchesStatus && matchesDate;
//   });

//   const handleViewBill = (bill: any) => {
//     // Generate a simple print-friendly view
//     const printWindow = window.open('', '_blank');
//     if (printWindow) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Invoice ${bill.billNumber}</title>
//             <style>
//               body { font-family: Arial, sans-serif; margin: 20px; }
//               .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
//               .details { display: flex; justify-content: space-between; margin-bottom: 20px; }
//               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//               th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//               th { background-color: #f2f2f2; }
//               .total { text-align: right; font-weight: bold; }
//               .notes { margin-top: 20px; }
//             </style>
//           </head>
//           <body>
//             <div class="header">
//               <h1>INVOICE</h1>
//               <h2>StationeryPro</h2>
//               <p>Invoice #: ${bill.billNumber}</p>
//             </div>
//             <div class="details">
//               <div>
//                 <strong>Bill To:</strong><br>
//                 ${bill.customerName}
//               </div>
//               <div>
//                 <strong>Date:</strong> ${new Date(bill.date).toLocaleDateString()}<br>
//                 <strong>Due Date:</strong> ${new Date(bill.dueDate).toLocaleDateString()}<br>
//                 <strong>Status:</strong> ${bill.status}
//               </div>
//             </div>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Item</th>
//                   <th>Quantity</th>
//                   <th>Unit Price</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${bill.items.map((item: any) => `
//                   <tr>
//                     <td>${item.productName}</td>
//                     <td>${item.quantity}</td>
//                     <td>₹${item.unitPrice.toLocaleString()}</td>
//                     <td>₹${item.total.toLocaleString()}</td>
//                   </tr>
//                 `).join('')}
//               </tbody>
//             </table>
//             <div class="total">
//               <p>Subtotal: ₹${bill.subtotal.toLocaleString()}</p>
//               <p>Tax: ₹${bill.taxAmount.toLocaleString()}</p>
//               <h3>Total: ₹${bill.totalAmount.toLocaleString()}</h3>
//             </div>
//             ${bill.notes ? `<div class="notes"><strong>Notes:</strong> ${bill.notes}</div>` : ''}
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.print();
//     }
//   };

//   // // Loading state
//   // if (billsLoading || customersLoading || productsLoading) {
//   //   return (
//   //     <div className="flex items-center justify-center h-64">
//   //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//   //     </div>
//   //   );
//   // }

//   // Error state
//   if (billsError || customersError || productsError) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
//           <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Data</h3>
//           <p className="mt-1 text-sm text-gray-500">
//             {billsError || customersError || productsError}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (showForm) {
//     return (
//       <BillForm
//         bill={editingBill}
//         onSave={editingBill ? handleEditBill : handleAddBill}
//         onCancel={() => {
//           setShowForm(false);
//           setEditingBill(null);
//         }}
//         customers={customers.map(c => ({ id: c.id, name: c.name }))}
//         products={products.map(p => ({ id: p.id, name: p.name, price: p.sellingPrice }))}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Bills & Invoices</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//           disabled={customers.length === 0 || products.length === 0}
//         >
//           <Plus size={20} />
//           <span>Create Bill</span>
//         </button>
//       </div>

//       {/* Warning for missing data */}
//       {(customers.length === 0 || products.length === 0) && (
//         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <AlertCircle className="h-5 w-5 text-yellow-400" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-yellow-700">
//                 {customers.length === 0 && products.length === 0 
//                   ? 'You need to add customers and products before creating bills.'
//                   : customers.length === 0
//                   ? 'You need to add customers before creating bills.'
//                   : 'You need to add products before creating bills.'
//                 }
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Bills</p>
//               <p className="text-2xl font-bold text-gray-900">{bills.length}</p>
//             </div>
//             <FileText className="w-8 h-8 text-blue-500" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Amount</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ₹{bills.reduce((sum, bill) => sum + bill.totalAmount, 0).toLocaleString()}
//               </p>
//             </div>
//             <Download className="w-8 h-8 text-green-500" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Pending</p>
//               <p className="text-2xl font-bold text-yellow-600">
//                 {bills.filter(b => b.status === 'Pending').length}
//               </p>
//             </div>
//             <Calendar className="w-8 h-8 text-yellow-500" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Overdue</p>
//               <p className="text-2xl font-bold text-red-600">
//                 {bills.filter(b => b.status === 'Overdue').length}
//               </p>
//             </div>
//             <Calendar className="w-8 h-8 text-red-500" />
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by bill number or customer..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <div className="relative">
//             <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
//             >
//               <option value="">All Status</option>
//               <option value="Draft">Draft</option>
//               <option value="Pending">Pending</option>
//               <option value="Paid">Paid</option>
//               <option value="Overdue">Overdue</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>

//           <select
//             value={dateRange}
//             onChange={(e) => setDateRange(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Dates</option>
//             <option value="today">Today</option>
//             <option value="week">This Week</option>
//             <option value="month">This Month</option>
//           </select>

//           <div className="text-sm text-gray-600 flex items-center">
//             Showing {filteredBills.length} of {bills.length} bills
//           </div>
//         </div>
//       </div>

//       {/* Bills Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Bill Details
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Customer
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Dates
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredBills.map((bill) => (
//                 <tr key={bill.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">{bill.billNumber}</div>
//                       <div className="text-sm text-gray-500">{bill.items.length} items</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-medium text-gray-900">{bill.customerName}</div>
//                     <div className="text-sm text-gray-500">{bill.paymentMethod}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm">
//                       <div className="font-medium text-gray-900">₹{bill.totalAmount.toLocaleString()}</div>
//                       <div className="text-gray-500">Subtotal: ₹{bill.subtotal.toLocaleString()}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bill.status)}`}>
//                       {bill.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div>Date: {new Date(bill.date).toLocaleDateString()}</div>
//                     <div>Due: {new Date(bill.dueDate).toLocaleDateString()}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleViewBill(bill)}
//                         className="text-blue-600 hover:text-blue-800 p-1 rounded"
//                         title="View/Print Bill"
//                       >
//                         <Eye size={16} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setEditingBill(bill);
//                           setShowForm(true);
//                         }}
//                         className="text-green-600 hover:text-green-800 p-1 rounded"
//                         title="Edit Bill"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteBill(bill.id)}
//                         className="text-red-600 hover:text-red-800 p-1 rounded"
//                         title="Delete Bill"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {filteredBills.length === 0 && bills.length > 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No bills found matching your criteria.</p>
//         </div>
//       )}

//       {bills.length === 0 && (
//         <div className="text-center py-12">
//           <FileText className="mx-auto h-12 w-12 text-gray-400" />
//           <h3 className="mt-2 text-sm font-medium text-gray-900">No bills yet</h3>
//           <p className="mt-1 text-sm text-gray-500">
//             Get started by creating your first bill.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BillManagement;



// ///=======================================

///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Search, Filter, Download, FileText, Calendar, AlertCircle, ClipboardList } from 'lucide-react';
import BillForm from './BillForm';
import { useBills } from '../../hooks/useBills';
import { useCustomers } from '../../hooks/useCustomers';
import { useProducts } from '../../hooks/useProducts';
import { useTenders, useTenderProducts } from '../../hooks/useTenders';

const BillManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBill, setEditingBill] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tenderFilter, setTenderFilter] = useState('');
  const [dateRange, setDateRange] = useState('');

  const { 
    bills, 
    loading: billsLoading, 
    error: billsError, 
    addBill, 
    updateBill, 
    deleteBill 
  } = useBills();

  const { 
    customers, 
    loading: customersLoading, 
    error: customersError 
  } = useCustomers();

  const { 
    products, 
    loading: productsLoading, 
    error: productsError 
  } = useProducts();

  const { 
    tenders, 
    loading: tendersLoading, 
    error: tendersError 
  } = useTenders();

  const { 
    tenderProducts 
  } = useTenderProducts();

  const handleAddBill = async (billData: any) => {
    try {
      await addBill(billData);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding bill:', error);
      alert('Failed to create bill. Please try again.');
    }
  };

  const handleEditBill = async (billData: any) => {
    if (editingBill) {
      try {
        await updateBill(editingBill.id, billData);
        setEditingBill(null);
        setShowForm(false);
      } catch (error) {
        console.error('Error updating bill:', error);
        alert('Failed to update bill. Please try again.');
      }
    }
  };

  const handleDeleteBill = async (id: string) => {
    if (confirm('Are you sure you want to delete this bill? This will restore the product stock.')) {
      try {
        await deleteBill(id);
      } catch (error) {
        console.error('Error deleting bill:', error);
        alert('Failed to delete bill. Please try again.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || bill.status === statusFilter;
    const matchesTender = tenderFilter === '' || bill.tenderId === tenderFilter;
    
    let matchesDate = true;
    if (dateRange) {
      const billDate = new Date(bill.date);
      const today = new Date();
      switch (dateRange) {
        case 'today':
          matchesDate = billDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = billDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = billDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesTender && matchesDate;
  });

  const handleViewBill = (bill: any) => {
    // Generate a simple print-friendly view
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice ${bill.billNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
              .details { display: flex; justify-content: space-between; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total { text-align: right; font-weight: bold; }
              .notes { margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>INVOICE</h1>
              <h2>StationeryPro</h2>
              <p>Invoice #: ${bill.billNumber}</p>
            </div>
            <div class="details">
              <div>
                <strong>Bill To:</strong><br>
                ${bill.customerName}
              </div>
              <div>
                <strong>Date:</strong> ${new Date(bill.date).toLocaleDateString()}<br>
                <strong>Due Date:</strong> ${new Date(bill.dueDate).toLocaleDateString()}<br>
                <strong>Status:</strong> ${bill.status}
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${bill.items.map((item: any) => `
                  <tr>
                    <td>${item.productName}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.unitPrice.toLocaleString()}</td>
                    <td>₹${item.total.toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total">
              <p>Subtotal: ₹${bill.subtotal.toLocaleString()}</p>
              <p>Tax: ₹${bill.taxAmount.toLocaleString()}</p>
              <h3>Total: ₹${bill.totalAmount.toLocaleString()}</h3>
            </div>
            ${bill.notes ? `<div class="notes"><strong>Notes:</strong> ${bill.notes}</div>` : ''}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Loading state
  if (billsLoading || customersLoading || productsLoading || tendersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state
  if (billsError || customersError || productsError || tendersError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Data</h3>
          <p className="mt-1 text-sm text-gray-500">
            {billsError || customersError || productsError || tendersError}
          </p>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <BillForm
        bill={editingBill}
        onSave={editingBill ? handleEditBill : handleAddBill}
        onCancel={() => {
          setShowForm(false);
          setEditingBill(null);
        }}
        customers={customers}
  products={products.map(p => ({ ...p, price: (p as any).price ?? 0 }))}
        tenders={tenders}
        tenderProducts={tenderProducts}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Bills & Invoices</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          disabled={customers.length === 0 || products.length === 0}
        >
          <Plus size={20} />
          <span>Create Bill</span>
        </button>
      </div>

      {/* Warning for missing data */}
      {(customers.length === 0 || products.length === 0) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {customers.length === 0 && products.length === 0 
                  ? 'You need to add customers and products before creating bills.'
                  : customers.length === 0
                  ? 'You need to add customers before creating bills.'
                  : 'You need to add products before creating bills.'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bills</p>
              <p className="text-2xl font-bold text-gray-900">{bills.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{bills.reduce((sum, bill) => sum + bill.totalAmount, 0).toLocaleString()}
              </p>
            </div>
            <Download className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {bills.filter(b => b.status === 'Pending').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {bills.filter(b => b.status === 'Overdue').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by bill number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="relative">
            <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={tenderFilter}
              onChange={(e) => setTenderFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Tenders</option>
              {tenders.map(tender => (
                <option key={tender.id} value={tender.id}>
                  {tender.name} ({tender.tenderNumber})
                </option>
              ))}
            </select>
          </div>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredBills.length} of {bills.length} bills
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{bill.billNumber}</div>
                      <div className="text-sm text-gray-500">{bill.items.length} items</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{bill.customerName}</div>
                    <div className="text-sm text-gray-500">{bill.paymentMethod}</div>
                    {bill.tenderName && (
                      <div className="text-sm text-blue-600">Tender: {bill.tenderName}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">₹{bill.totalAmount.toLocaleString()}</div>
                      <div className="text-gray-500">Subtotal: ₹{bill.subtotal.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>Date: {new Date(bill.date).toLocaleDateString()}</div>
                    <div>Due: {new Date(bill.dueDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewBill(bill)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="View/Print Bill"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingBill(bill);
                          setShowForm(true);
                        }}
                        className="text-green-600 hover:text-green-800 p-1 rounded"
                        title="Edit Bill"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteBill(bill.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                        title="Delete Bill"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBills.length === 0 && bills.length > 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No bills found matching your criteria.</p>
        </div>
      )}

      {bills.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bills yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first bill.
          </p>
        </div>
      )}
    </div>
  );
};

export default BillManagement;