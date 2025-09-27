// // // import React, { useState, useEffect } from 'react';
// // // import { Save, X, Plus, Trash2, Calculator } from 'lucide-react';

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

// // // interface Customer {
// // //   id: string;
// // //   name: string;
// // // }

// // // interface Product {
// // //   id: string;
// // //   name: string;
// // //   price: number;
// // // }

// // // interface BillFormProps {
// // //   bill?: Bill | null;
// // //   onSave: (bill: Omit<Bill, 'id' | 'billNumber'>) => void;
// // //   onCancel: () => void;
// // //   customers: Customer[];
// // //   products: Product[];
// // // }

// // // const BillForm: React.FC<BillFormProps> = ({
// // //   bill,
// // //   onSave,
// // //   onCancel,
// // //   customers,
// // //   products
// // // }) => {
// // //   const [formData, setFormData] = useState({
// // //     customerId: '',
// // //     customerName: '',
// // //     date: new Date().toISOString().split('T')[0],
// // //     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
// // //     items: [] as BillItem[],
// // //     subtotal: 0,
// // //     taxRate: 18,
// // //     taxAmount: 0,
// // //     totalAmount: 0,
// // //     status: 'Draft' as 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled',
// // //     paymentMethod: '',
// // //     notes: ''
// // //   });

// // //   const [errors, setErrors] = useState<{[key: string]: string}>({});

// // //   useEffect(() => {
// // //     if (bill) {
// // //       setFormData({
// // //         customerId: bill.customerId,
// // //         customerName: bill.customerName,
// // //         date: bill.date,
// // //         dueDate: bill.dueDate,
// // //         items: bill.items,
// // //         subtotal: bill.subtotal,
// // //         taxRate: 18,
// // //         taxAmount: bill.taxAmount,
// // //         totalAmount: bill.totalAmount,
// // //         status: bill.status,
// // //         paymentMethod: bill.paymentMethod || '',
// // //         notes: bill.notes || ''
// // //       });
// // //     }
// // //   }, [bill]);

// // //   useEffect(() => {
// // //     calculateTotals();
// // //   }, [formData.items, formData.taxRate]);

// // //   const calculateTotals = () => {
// // //     const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
// // //     const taxAmount = (subtotal * formData.taxRate) / 100;
// // //     const totalAmount = subtotal + taxAmount;

// // //     setFormData(prev => ({
// // //       ...prev,
// // //       subtotal,
// // //       taxAmount,
// // //       totalAmount
// // //     }));
// // //   };

// // //   const handleCustomerChange = (customerId: string) => {
// // //     const customer = customers.find(c => c.id === customerId);
// // //     setFormData({
// // //       ...formData,
// // //       customerId,
// // //       customerName: customer?.name || ''
// // //     });
// // //   };

// // //   const addItem = () => {
// // //     const newItem: BillItem = {
// // //       productId: '',
// // //       productName: '',
// // //       quantity: 1,
// // //       unitPrice: 0,
// // //       total: 0
// // //     };
// // //     setFormData({
// // //       ...formData,
// // //       items: [...formData.items, newItem]
// // //     });
// // //   };

// // //   const updateItem = (index: number, field: keyof BillItem, value: string | number) => {
// // //     const updatedItems = [...formData.items];
    
// // //     if (field === 'productId') {
// // //       const product = products.find(p => p.id === value);
// // //       updatedItems[index] = {
// // //         ...updatedItems[index],
// // //         productId: value as string,
// // //         productName: product?.name || '',
// // //         unitPrice: product?.price || 0
// // //       };
// // //     } else {
// // //       updatedItems[index] = {
// // //         ...updatedItems[index],
// // //         [field]: value
// // //       };
// // //     }

// // //     // Recalculate total for this item
// // //     updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;

// // //     setFormData({
// // //       ...formData,
// // //       items: updatedItems
// // //     });
// // //   };

// // //   const removeItem = (index: number) => {
// // //     const updatedItems = formData.items.filter((_, i) => i !== index);
// // //     setFormData({
// // //       ...formData,
// // //       items: updatedItems
// // //     });
// // //   };

// // //   const validateForm = () => {
// // //     const newErrors: {[key: string]: string} = {};

// // //     if (!formData.customerId) newErrors.customerId = 'Customer is required';
// // //     if (!formData.date) newErrors.date = 'Date is required';
// // //     if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
// // //     if (formData.items.length === 0) newErrors.items = 'At least one item is required';
    
// // //     // Validate items
// // //     formData.items.forEach((item, index) => {
// // //       if (!item.productId) newErrors[`item_${index}_product`] = 'Product is required';
// // //       if (item.quantity <= 0) newErrors[`item_${index}_quantity`] = 'Quantity must be greater than 0';
// // //     });

// // //     if (new Date(formData.dueDate) < new Date(formData.date)) {
// // //       newErrors.dueDate = 'Due date must be after bill date';
// // //     }

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (validateForm()) {
// // //       onSave({
// // //         customerId: formData.customerId,
// // //         customerName: formData.customerName,
// // //         date: formData.date,
// // //         dueDate: formData.dueDate,
// // //         items: formData.items,
// // //         subtotal: formData.subtotal,
// // //         taxAmount: formData.taxAmount,
// // //         totalAmount: formData.totalAmount,
// // //         status: formData.status,
// // //         paymentMethod: formData.paymentMethod,
// // //         notes: formData.notes
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="flex items-center justify-between">
// // //         <h1 className="text-2xl font-bold text-gray-800">
// // //           {bill ? 'Edit Bill' : 'Create New Bill'}
// // //         </h1>
// // //         <button
// // //           onClick={onCancel}
// // //           className="text-gray-500 hover:text-gray-700"
// // //         >
// // //           <X size={24} />
// // //         </button>
// // //       </div>

// // //       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
// // //         {/* Bill Header */}
// // //         <div className="mb-8">
// // //           <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Information</h2>
// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Customer *
// // //               </label>
// // //               <select
// // //                 value={formData.customerId}
// // //                 onChange={(e) => handleCustomerChange(e.target.value)}
// // //                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                   errors.customerId ? 'border-red-500' : 'border-gray-300'
// // //                 }`}
// // //               >
// // //                 <option value="">Select Customer</option>
// // //                 {customers.map(customer => (
// // //                   <option key={customer.id} value={customer.id}>{customer.name}</option>
// // //                 ))}
// // //               </select>
// // //               {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Bill Date *
// // //               </label>
// // //               <input
// // //                 type="date"
// // //                 value={formData.date}
// // //                 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
// // //                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                   errors.date ? 'border-red-500' : 'border-gray-300'
// // //                 }`}
// // //               />
// // //               {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Due Date *
// // //               </label>
// // //               <input
// // //                 type="date"
// // //                 value={formData.dueDate}
// // //                 onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
// // //                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                   errors.dueDate ? 'border-red-500' : 'border-gray-300'
// // //                 }`}
// // //               />
// // //               {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Status
// // //               </label>
// // //               <select
// // //                 value={formData.status}
// // //                 onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //               >
// // //                 <option value="Draft">Draft</option>
// // //                 <option value="Pending">Pending</option>
// // //                 <option value="Paid">Paid</option>
// // //                 <option value="Overdue">Overdue</option>
// // //                 <option value="Cancelled">Cancelled</option>
// // //               </select>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Items Section */}
// // //         <div className="mb-8">
// // //           <div className="flex items-center justify-between mb-4">
// // //             <h2 className="text-lg font-semibold text-gray-800">Items</h2>
// // //             <button
// // //               type="button"
// // //               onClick={addItem}
// // //               className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm transition-colors"
// // //             >
// // //               <Plus size={16} />
// // //               <span>Add Item</span>
// // //             </button>
// // //           </div>

// // //           {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}

// // //           <div className="space-y-4">
// // //             {formData.items.map((item, index) => (
// // //               <div key={index} className="border border-gray-200 rounded-lg p-4">
// // //                 <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
// // //                   <div className="md:col-span-2">
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Product *
// // //                     </label>
// // //                     <select
// // //                       value={item.productId}
// // //                       onChange={(e) => updateItem(index, 'productId', e.target.value)}
// // //                       className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                         errors[`item_${index}_product`] ? 'border-red-500' : 'border-gray-300'
// // //                       }`}
// // //                     >
// // //                       <option value="">Select Product</option>
// // //                       {products.map(product => (
// // //                         <option key={product.id} value={product.id}>
// // //                           {product.name} - ₹{product.price}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                     {errors[`item_${index}_product`] && (
// // //                       <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_product`]}</p>
// // //                     )}
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Quantity *
// // //                     </label>
// // //                     <input
// // //                       type="number"
// // //                       value={item.quantity}
// // //                       onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
// // //                       className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                         errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-gray-300'
// // //                       }`}
// // //                       min="1"
// // //                     />
// // //                     {errors[`item_${index}_quantity`] && (
// // //                       <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_quantity`]}</p>
// // //                     )}
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Unit Price (₹)
// // //                     </label>
// // //                     <input
// // //                       type="number"
// // //                       value={item.unitPrice}
// // //                       onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
// // //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //                       step="0.01"
// // //                     />
// // //                   </div>

// // //                   <div className="flex items-end justify-between">
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                         Total
// // //                       </label>
// // //                       <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium">
// // //                         ₹{item.total.toLocaleString()}
// // //                       </div>
// // //                     </div>
// // //                     <button
// // //                       type="button"
// // //                       onClick={() => removeItem(index)}
// // //                       className="text-red-600 hover:text-red-800 p-1 rounded mb-2"
// // //                     >
// // //                       <Trash2 size={16} />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Totals Section */}
// // //         <div className="mb-8">
// // //           <div className="bg-gray-50 rounded-lg p-4">
// // //             <div className="flex items-center justify-between mb-4">
// // //               <h3 className="text-lg font-semibold text-gray-800">Bill Summary</h3>
// // //               <Calculator className="w-5 h-5 text-gray-500" />
// // //             </div>
            
// // //             <div className="space-y-3">
// // //               <div className="flex justify-between items-center">
// // //                 <span className="text-gray-700">Subtotal:</span>
// // //                 <span className="font-medium">₹{formData.subtotal.toLocaleString()}</span>
// // //               </div>
              
// // //               <div className="flex justify-between items-center">
// // //                 <div className="flex items-center space-x-2">
// // //                   <span className="text-gray-700">Tax Rate:</span>
// // //                   <input
// // //                     type="number"
// // //                     value={formData.taxRate}
// // //                     onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
// // //                     className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
// // //                     step="0.1"
// // //                     min="0"
// // //                     max="100"
// // //                   />
// // //                   <span className="text-gray-700">%</span>
// // //                 </div>
// // //                 <span className="font-medium">₹{formData.taxAmount.toLocaleString()}</span>
// // //               </div>
              
// // //               <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-200">
// // //                 <span>Total Amount:</span>
// // //                 <span>₹{formData.totalAmount.toLocaleString()}</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Payment and Notes */}
// // //         <div className="mb-8">
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Payment Method
// // //               </label>
// // //               <select
// // //                 value={formData.paymentMethod}
// // //                 onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //               >
// // //                 <option value="">Select Payment Method</option>
// // //                 <option value="Cash">Cash</option>
// // //                 <option value="Credit">Credit</option>
// // //                 <option value="UPI">UPI</option>
// // //                 <option value="Bank Transfer">Bank Transfer</option>
// // //                 <option value="Cheque">Cheque</option>
// // //               </select>
// // //             </div>
// // //           </div>

// // //           <div className="mt-6">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Notes
// // //             </label>
// // //             <textarea
// // //               value={formData.notes}
// // //               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
// // //               rows={3}
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //               placeholder="Additional notes or terms..."
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Form Actions */}
// // //         <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
// // //           <button
// // //             type="button"
// // //             onClick={onCancel}
// // //             className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
// // //           >
// // //             Cancel
// // //           </button>
// // //           <button
// // //             type="submit"
// // //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// // //           >
// // //             <Save size={18} />
// // //             <span>{bill ? 'Update Bill' : 'Create Bill'}</span>
// // //           </button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default BillForm;

// // import React, { useState, useEffect } from 'react';
// // import { Save, X, Plus, Trash2, Calculator } from 'lucide-react';

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

// // interface BillFormProps {
// //   bill?: Bill | null;
// //   onSave: (bill: Omit<Bill, 'id' | 'billNumber'>) => void;
// //   onCancel: () => void;
// //   customers: Customer[];
// //   products: Product[];
// //   tenders?: { id: string; name: string; }[];
// //   tenderProducts?: { id: string; localizedName: string; tenderPrice: number; productId: string; }[];
// // }

// // const BillForm: React.FC<BillFormProps> = ({
// //   bill,
// //   onSave,
// //   onCancel,
// //   customers,
// //   products
// // }) => {
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

// //     // Recalculate total for this item
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
    
// //     // Validate items
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
// //             <Save size={18} />
// //             <span>{bill ? 'Update Bill' : 'Create Bill'}</span>
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default BillForm;
// import React, { useState, useEffect } from 'react';
// import { Save, X, Plus, Trash2, Calculator } from 'lucide-react';

// interface BillItem {
//   productId: string;
//   productName: string;
//   quantity: number;
//   unitPrice: number;
//   total: number;
// }

// interface Bill {
//   id: string;
//   billNumber: string;
//   customerId: string;
//   customerName: string;
//   tenderId?: string;
//   tenderName?: string;
//   date: string;
//   dueDate: string;
//   items: BillItem[];
//   subtotal: number;
//   taxAmount: number;
//   totalAmount: number;
//   status: 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
//   paymentMethod?: string;
//   notes?: string;
// }

// interface Customer {
//   id: string;
//   name: string;
// }

// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// interface Tender {
//   id: string;
//   name: string;
//   tenderNumber: string;
//   status: string;
// }

// interface TenderProduct {
//   id: string;
//   productId: string;
//   localizedName: string;
//   tenderPrice: number;
//   productName: string;
// }

// interface BillFormProps {
//   bill?: Bill | null;
//   onSave: (bill: Omit<Bill, 'id' | 'billNumber'>) => void;
//   onCancel: () => void;
//   customers: Customer[];
//   products: Product[];
//   tenders?: Tender[];
//   tenderProducts?: TenderProduct[];
// }

// const BillForm: React.FC<BillFormProps> = ({
//   bill,
//   onSave,
//   onCancel,
//   customers,
//   products,
//   tenders = [],
//   tenderProducts = []
// }) => {
//   const [formData, setFormData] = useState({
//     customerId: '',
//     customerName: '',
//     tenderId: '',
//     tenderName: '',
//     date: new Date().toISOString().split('T')[0],
//     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//     items: [] as BillItem[],
//     subtotal: 0,
//     taxRate: 18,
//     taxAmount: 0,
//     totalAmount: 0,
//     status: 'Draft' as 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled',
//     paymentMethod: '',
//     notes: ''
//   });

//   const [errors, setErrors] = useState<{[key: string]: string}>({});
//   const [availableProducts, setAvailableProducts] = useState<(Product | TenderProduct)[]>([]);

//   useEffect(() => {
//     if (bill) {
//       setFormData({
//         customerId: bill.customerId,
//         customerName: bill.customerName,
//         tenderId: bill.tenderId || '',
//         tenderName: bill.tenderName || '',
//         date: bill.date,
//         dueDate: bill.dueDate,
//         items: bill.items,
//         subtotal: bill.subtotal,
//         taxRate: 18,
//         taxAmount: bill.taxAmount,
//         totalAmount: bill.totalAmount,
//         status: bill.status,
//         paymentMethod: bill.paymentMethod || '',
//         notes: bill.notes || ''
//       });
//     }
//   }, [bill]);

//   useEffect(() => {
//     calculateTotals();
//   }, [formData.items, formData.taxRate]);

//   useEffect(() => {
//     updateAvailableProducts();
//   }, [formData.tenderId, tenders, tenderProducts, products]);

//   const updateAvailableProducts = () => {
//     if (formData.tenderId) {
//       // Show tender products with localized names and tender prices
//       const tenderProductsList = tenderProducts.filter(tp => {
//         const tender = tenders.find(t => t.id === formData.tenderId);
//         return tender && tp.productId; // Filter by tender if needed
//       });
//       setAvailableProducts(tenderProductsList);
//     } else {
//       // Show regular products
//       setAvailableProducts(products);
//     }
//   };

//   const calculateTotals = () => {
//     const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
//     const taxAmount = (subtotal * formData.taxRate) / 100;
//     const totalAmount = subtotal + taxAmount;

//     setFormData(prev => ({
//       ...prev,
//       subtotal,
//       taxAmount,
//       totalAmount
//     }));
//   };

//   const handleCustomerChange = (customerId: string) => {
//     const customer = customers.find(c => c.id === customerId);
//     setFormData({
//       ...formData,
//       customerId,
//       customerName: customer?.name || ''
//     });
//   };

//   const handleTenderChange = (tenderId: string) => {
//     const tender = tenders.find(t => t.id === tenderId);
//     setFormData({
//       ...formData,
//       tenderId,
//       tenderName: tender?.name || '',
//       items: [] // Clear items when tender changes
//     });
//   };

//   const addItem = () => {
//     const newItem: BillItem = {
//       productId: '',
//       productName: '',
//       quantity: 1,
//       unitPrice: 0,
//       total: 0
//     };
//     setFormData({
//       ...formData,
//       items: [...formData.items, newItem]
//     });
//   };

//   const updateItem = (index: number, field: keyof BillItem, value: string | number) => {
//     const updatedItems = [...formData.items];
    
//     if (field === 'productId') {
//       if (formData.tenderId) {
//         // Using tender products
//         const tenderProduct = availableProducts.find(p => p.id === value) as TenderProduct;
//         updatedItems[index] = {
//           ...updatedItems[index],
//           productId: value as string,
//           productName: tenderProduct?.localizedName || '',
//           unitPrice: tenderProduct?.tenderPrice || 0
//         };
//       } else {
//         // Using regular products
//         const product = availableProducts.find(p => p.id === value) as Product;
//         updatedItems[index] = {
//           ...updatedItems[index],
//           productId: value as string,
//           productName: product?.name || '',
//           unitPrice: product?.price || 0
//         };
//       }
//     } else {
//       updatedItems[index] = {
//         ...updatedItems[index],
//         [field]: value
//       };
//     }

//     // Recalculate total for this item
//     updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;

//     setFormData({
//       ...formData,
//       items: updatedItems
//     });
//   };

//   const removeItem = (index: number) => {
//     const updatedItems = formData.items.filter((_, i) => i !== index);
//     setFormData({
//       ...formData,
//       items: updatedItems
//     });
//   };

//   const validateForm = () => {
//     const newErrors: {[key: string]: string} = {};

//     if (!formData.customerId) newErrors.customerId = 'Customer is required';
//     if (!formData.date) newErrors.date = 'Date is required';
//     if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
//     if (formData.items.length === 0) newErrors.items = 'At least one item is required';
    
//     // Validate items
//     formData.items.forEach((item, index) => {
//       if (!item.productId) newErrors[`item_${index}_product`] = 'Product is required';
//       if (item.quantity <= 0) newErrors[`item_${index}_quantity`] = 'Quantity must be greater than 0';
//     });

//     if (new Date(formData.dueDate) < new Date(formData.date)) {
//       newErrors.dueDate = 'Due date must be after bill date';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSave({
//         customerId: formData.customerId,
//         customerName: formData.customerName,
//         tenderId: formData.tenderId || undefined,
//         tenderName: formData.tenderName || undefined,
//         date: formData.date,
//         dueDate: formData.dueDate,
//         items: formData.items,
//         subtotal: formData.subtotal,
//         taxAmount: formData.taxAmount,
//         totalAmount: formData.totalAmount,
//         status: formData.status,
//         paymentMethod: formData.paymentMethod,
//         notes: formData.notes
//       });
//     }
//   };

//   const getProductDisplayInfo = (product: Product | TenderProduct) => {
//     if ('localizedName' in product) {
//       // Tender product
//       return {
//         name: product.localizedName,
//         price: product.tenderPrice,
//         subtitle: `Original: ${product.productName}`
//       };
//     } else {
//       // Regular product
//       return {
//         name: product.name,
//         price: product.price,
//         subtitle: null
//       };
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">
//           {bill ? 'Edit Bill' : 'Create New Bill'}
//         </h1>
//         <button
//           onClick={onCancel}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         {/* Bill Header */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Customer *
//               </label>
//               <select
//                 value={formData.customerId}
//                 onChange={(e) => handleCustomerChange(e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.customerId ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               >
//                 <option value="">Select Customer</option>
//                 {customers.map(customer => (
//                   <option key={customer.id} value={customer.id}>{customer.name}</option>
//                 ))}
//               </select>
//               {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Tender (Optional)
//               </label>
//               <select
//                 value={formData.tenderId}
//                 onChange={(e) => handleTenderChange(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">No Tender - Regular Products</option>
//                 {tenders.filter(t => t.status === 'Active').map(tender => (
//                   <option key={tender.id} value={tender.id}>
//                     {tender.name} ({tender.tenderNumber})
//                   </option>
//                 ))}
//               </select>
//               {formData.tenderId && (
//                 <p className="text-sm text-blue-600 mt-1">
//                   Using tender pricing and localized names
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Bill Date *
//               </label>
//               <input
//                 type="date"
//                 value={formData.date}
//                 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.date ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Due Date *
//               </label>
//               <input
//                 type="date"
//                 value={formData.dueDate}
//                 onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.dueDate ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Status
//               </label>
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="Draft">Draft</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Paid">Paid</option>
//                 <option value="Overdue">Overdue</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Items Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-800">Items</h2>
//             <button
//               type="button"
//               onClick={addItem}
//               className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm transition-colors"
//             >
//               <Plus size={16} />
//               <span>Add Item</span>
//             </button>
//           </div>

//           {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}

//           {availableProducts.length === 0 && formData.tenderId && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//               <p className="text-yellow-800 text-sm">
//                 No products found for the selected tender. Please add products to this tender first.
//               </p>
//             </div>
//           )}

//           <div className="space-y-4">
//             {formData.items.map((item, index) => (
//               <div key={index} className="border border-gray-200 rounded-lg p-4">
//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Product *
//                     </label>
//                     <select
//                       value={item.productId}
//                       onChange={(e) => updateItem(index, 'productId', e.target.value)}
//                       className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                         errors[`item_${index}_product`] ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                     >
//                       <option value="">Select Product</option>
//                       {availableProducts.map(product => {
//                         const displayInfo = getProductDisplayInfo(product);
//                         return (
//                           <option key={product.id} value={product.id}>
//                             {displayInfo.name} - ₹{displayInfo.price}
//                           </option>
//                         );
//                       })}
//                     </select>
//                     {errors[`item_${index}_product`] && (
//                       <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_product`]}</p>
//                     )}
//                     {item.productId && formData.tenderId && (
//                       <p className="text-xs text-gray-500 mt-1">
//                         {getProductDisplayInfo(availableProducts.find(p => p.id === item.productId)!).subtitle}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Quantity *
//                     </label>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
//                       className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                         errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       min="1"
//                     />
//                     {errors[`item_${index}_quantity`] && (
//                       <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_quantity`]}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Unit Price (₹)
//                     </label>
//                     <input
//                       type="number"
//                       value={item.unitPrice}
//                       onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       step="0.01"
//                       disabled={formData.tenderId !== ''} // Disable if tender is selected
//                     />
//                     {formData.tenderId && (
//                       <p className="text-xs text-blue-600 mt-1">Tender price applied</p>
//                     )}
//                   </div>

//                   <div className="flex items-end justify-between">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Total
//                       </label>
//                       <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium">
//                         ₹{item.total.toLocaleString()}
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeItem(index)}
//                       className="text-red-600 hover:text-red-800 p-1 rounded mb-2"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Totals Section */}
//         <div className="mb-8">
//           <div className="bg-gray-50 rounded-lg p-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Bill Summary</h3>
//               <Calculator className="w-5 h-5 text-gray-500" />
//             </div>
            
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-700">Subtotal:</span>
//                 <span className="font-medium">₹{formData.subtotal.toLocaleString()}</span>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-700">Tax Rate:</span>
//                   <input
//                     type="number"
//                     value={formData.taxRate}
//                     onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
//                     className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
//                     step="0.1"
//                     min="0"
//                     max="100"
//                   />
//                   <span className="text-gray-700">%</span>
//                 </div>
//                 <span className="font-medium">₹{formData.taxAmount.toLocaleString()}</span>
//               </div>
              
//               <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-200">
//                 <span>Total Amount:</span>
//                 <span>₹{formData.totalAmount.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Payment and Notes */}
//         <div className="mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Payment Method
//               </label>
//               <select
//                 value={formData.paymentMethod}
//                 onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Select Payment Method</option>
//                 <option value="Cash">Cash</option>
//                 <option value="Credit">Credit</option>
//                 <option value="UPI">UPI</option>
//                 <option value="Bank Transfer">Bank Transfer</option>
//                 <option value="Cheque">Cheque</option>
//               </select>
//             </div>
//           </div>

//           <div className="mt-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Notes
//             </label>
//             <textarea
//               value={formData.notes}
//               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Additional notes or terms..."
//             />
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//           >
//             <Save size={18} />
//             <span>{bill ? 'Update Bill' : 'Create Bill'}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )};
//================================+++++++++++++++++++++++++++++++++++++++++++++====
// import React, { useState, useEffect } from 'react';
// import { Save, X, Plus, Trash2, Calculator } from 'lucide-react';

// interface BillItem {
//   productId: string;
//   productName: string;
//   quantity: number;
//   unitPrice: number;
//   total: number;
// }

// interface Bill {
//   id: string;
//   billNumber: string;
//   customerId: string;
//   customerName: string;
//   date: string;
//   dueDate: string;
//   items: BillItem[];
//   subtotal: number;
//   taxAmount: number;
//   totalAmount: number;
//   status: 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
//   paymentMethod?: string;
//   notes?: string;
// }

// interface Customer {
//   id: string;
//   name: string;
// }

// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// interface BillFormProps {
//   bill?: Bill | null;
//   onSave: (bill: Omit<Bill, 'id' | 'billNumber'>) => void;
//   onCancel: () => void;
//   customers: Customer[];
//   products: Product[];
//   tenders?: { id: string; name: string; }[];
//   tenderProducts?: { id: string; localizedName: string; tenderPrice: number; productId: string; }[];
// }

// const BillForm: React.FC<BillFormProps> = ({
//   bill,
//   onSave,
//   onCancel,
//   customers,
//   products
// }) => {
//   const [formData, setFormData] = useState({
//     customerId: '',
//     customerName: '',
//     date: new Date().toISOString().split('T')[0],
//     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//     items: [] as BillItem[],
//     subtotal: 0,
//     taxRate: 18,
//     taxAmount: 0,
//     totalAmount: 0,
//     status: 'Draft' as 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled',
//     paymentMethod: '',
//     notes: ''
//   });

//   const [errors, setErrors] = useState<{[key: string]: string}>({});

//   useEffect(() => {
//     if (bill) {
//       setFormData({
//         customerId: bill.customerId,
//         customerName: bill.customerName,
//         date: bill.date,
//         dueDate: bill.dueDate,
//         items: bill.items,
//         subtotal: bill.subtotal,
//         taxRate: 18,
//         taxAmount: bill.taxAmount,
//         totalAmount: bill.totalAmount,
//         status: bill.status,
//         paymentMethod: bill.paymentMethod || '',
//         notes: bill.notes || ''
//       });
//     }
//   }, [bill]);

//   useEffect(() => {
//     calculateTotals();
//   }, [formData.items, formData.taxRate]);

//   const calculateTotals = () => {
//     const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
//     const taxAmount = (subtotal * formData.taxRate) / 100;
//     const totalAmount = subtotal + taxAmount;

//     setFormData(prev => ({
//       ...prev,
//       subtotal,
//       taxAmount,
//       totalAmount
//     }));
//   };

//   const handleCustomerChange = (customerId: string) => {
//     const customer = customers.find(c => c.id === customerId);
//     setFormData({
//       ...formData,
//       customerId,
//       customerName: customer?.name || ''
//     });
//   };

//   const addItem = () => {
//     const newItem: BillItem = {
//       productId: '',
//       productName: '',
//       quantity: 1,
//       unitPrice: 0,
//       total: 0
//     };
//     setFormData({
//       ...formData,
//       items: [...formData.items, newItem]
//     });
//   };

//   const updateItem = (index: number, field: keyof BillItem, value: string | number) => {
//     const updatedItems = [...formData.items];
    
//     if (field === 'productId') {
//       const product = products.find(p => p.id === value);
//       updatedItems[index] = {
//         ...updatedItems[index],
//         productId: value as string,
//         productName: product?.name || '',
//         unitPrice: product?.price || 0
//       };
//     } else {
//       updatedItems[index] = {
//         ...updatedItems[index],
//         [field]: value
//       };
//     }

//     // Recalculate total for this item
//     updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;

//     setFormData({
//       ...formData,
//       items: updatedItems
//     });
//   };

//   const removeItem = (index: number) => {
//     const updatedItems = formData.items.filter((_, i) => i !== index);
//     setFormData({
//       ...formData,
//       items: updatedItems
//     });
//   };

//   const validateForm = () => {
//     const newErrors: {[key: string]: string} = {};

//     if (!formData.customerId) newErrors.customerId = 'Customer is required';
//     if (!formData.date) newErrors.date = 'Date is required';
//     if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
//     if (formData.items.length === 0) newErrors.items = 'At least one item is required';
    
//     // Validate items
//     formData.items.forEach((item, index) => {
//       if (!item.productId) newErrors[`item_${index}_product`] = 'Product is required';
//       if (item.quantity <= 0) newErrors[`item_${index}_quantity`] = 'Quantity must be greater than 0';
//     });

//     if (new Date(formData.dueDate) < new Date(formData.date)) {
//       newErrors.dueDate = 'Due date must be after bill date';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSave({
//         customerId: formData.customerId,
//         customerName: formData.customerName,
//         date: formData.date,
//         dueDate: formData.dueDate,
//         items: formData.items,
//         subtotal: formData.subtotal,
//         taxAmount: formData.taxAmount,
//         totalAmount: formData.totalAmount,
//         status: formData.status,
//         paymentMethod: formData.paymentMethod,
//         notes: formData.notes
//       });
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">
//           {bill ? 'Edit Bill' : 'Create New Bill'}
//         </h1>
//         <button
//           onClick={onCancel}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
//         {/* Bill Header */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Customer *
//               </label>
//               <select
//                 value={formData.customerId}
//                 onChange={(e) => handleCustomerChange(e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.customerId ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               >
//                 <option value="">Select Customer</option>
//                 {customers.map(customer => (
//                   <option key={customer.id} value={customer.id}>{customer.name}</option>
//                 ))}
//               </select>
//               {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Bill Date *
//               </label>
//               <input
//                 type="date"
//                 value={formData.date}
//                 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.date ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Due Date *
//               </label>
//               <input
//                 type="date"
//                 value={formData.dueDate}
//                 onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.dueDate ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Status
//               </label>
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="Draft">Draft</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Paid">Paid</option>
//                 <option value="Overdue">Overdue</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Items Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-800">Items</h2>
//             <button
//               type="button"
//               onClick={addItem}
//               className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm transition-colors"
//             >
//               <Plus size={16} />
//               <span>Add Item</span>
//             </button>
//           </div>

//           {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}

//           <div className="space-y-4">
//             {formData.items.map((item, index) => (
//               <div key={index} className="border border-gray-200 rounded-lg p-4">
//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Product *
//                     </label>
//                     <select
//                       value={item.productId}
//                       onChange={(e) => updateItem(index, 'productId', e.target.value)}
//                       className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                         errors[`item_${index}_product`] ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                     >
//                       <option value="">Select Product</option>
//                       {products.map(product => (
//                         <option key={product.id} value={product.id}>
//                           {product.name} - ₹{product.price}
//                         </option>
//                       ))}
//                     </select>
//                     {errors[`item_${index}_product`] && (
//                       <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_product`]}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Quantity *
//                     </label>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
//                       className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                         errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       min="1"
//                     />
//                     {errors[`item_${index}_quantity`] && (
//                       <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_quantity`]}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Unit Price (₹)
//                     </label>
//                     <input
//                       type="number"
//                       value={item.unitPrice}
//                       onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       step="0.01"
//                     />
//                   </div>

//                   <div className="flex items-end justify-between">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Total
//                       </label>
//                       <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium">
//                         ₹{item.total.toLocaleString()}
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeItem(index)}
//                       className="text-red-600 hover:text-red-800 p-1 rounded mb-2"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Totals Section */}
//         <div className="mb-8">
//           <div className="bg-gray-50 rounded-lg p-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Bill Summary</h3>
//               <Calculator className="w-5 h-5 text-gray-500" />
//             </div>
            
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-700">Subtotal:</span>
//                 <span className="font-medium">₹{formData.subtotal.toLocaleString()}</span>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-700">Tax Rate:</span>
//                   <input
//                     type="number"
//                     value={formData.taxRate}
//                     onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
//                     className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
//                     step="0.1"
//                     min="0"
//                     max="100"
//                   />
//                   <span className="text-gray-700">%</span>
//                 </div>
//                 <span className="font-medium">₹{formData.taxAmount.toLocaleString()}</span>
//               </div>
              
//               <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-200">
//                 <span>Total Amount:</span>
//                 <span>₹{formData.totalAmount.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Payment and Notes */}
//         <div className="mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Payment Method
//               </label>
//               <select
//                 value={formData.paymentMethod}
//                 onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Select Payment Method</option>
//                 <option value="Cash">Cash</option>
//                 <option value="Credit">Credit</option>
//                 <option value="UPI">UPI</option>
//                 <option value="Bank Transfer">Bank Transfer</option>
//                 <option value="Cheque">Cheque</option>
//               </select>
//             </div>
//           </div>

//           <div className="mt-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Notes
//             </label>
//             <textarea
//               value={formData.notes}
//               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Additional notes or terms..."
//             />
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//           >
//             <Save size={18} />
//             <span>{bill ? 'Update Bill' : 'Create Bill'}</span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BillForm;

///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, Calculator } from 'lucide-react';

interface BillItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Bill {
  id: string;
  billNumber: string;
  customerId: string;
  customerName: string;
  tenderId?: string;
  tenderName?: string;
  date: string;
  dueDate: string;
  items: BillItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
  paymentMethod?: string;
  notes?: string;
}

interface Customer {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Tender {
  id: string;
  name: string;
  status: string;
}

interface TenderProduct {
  id: string;
  productId: string;
  localizedName: string;
  tenderPrice: number;
  quantityLimit?: number;
}

interface BillFormProps {
  bill?: Bill | null;
  onSave: (bill: Omit<Bill, 'id' | 'billNumber'>) => void;
  onCancel: () => void;
  customers: Customer[];
  products: Product[];
  tenders?: Tender[];
  tenderProducts?: TenderProduct[];
}

const BillForm: React.FC<BillFormProps> = ({
  bill,
  onSave,
  onCancel,
  customers,
  products,
  tenders = [],
  tenderProducts = []
}) => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    tenderId: '',
    tenderName: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [] as BillItem[],
    subtotal: 0,
    taxRate: 18,
    taxAmount: 0,
    totalAmount: 0,
    status: 'Draft' as 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled',
    paymentMethod: '',
    notes: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Get available products based on tender selection
  const getAvailableProducts = () => {
    if (formData.tenderId) {
      // Filter tender products for the selected tender
      return tenderProducts.filter(tp => tp.id === formData.tenderId || 
        tenderProducts.some(product => product.productId === tp.productId));
    }
    return products;
  };

  // Get product info (price, name) based on tender selection
  const getProductInfo = (productId: string) => {
    if (formData.tenderId) {
      const tenderProduct = tenderProducts.find(tp => tp.productId === productId);
      if (tenderProduct) {
        return {
          name: tenderProduct.localizedName,
          price: tenderProduct.tenderPrice,
          quantityLimit: tenderProduct.quantityLimit
        };
      }
    }
    
    const regularProduct = products.find(p => p.id === productId);
    return {
      name: regularProduct?.name || '',
      price: regularProduct?.price || 0,
      quantityLimit: undefined
    };
  };

  useEffect(() => {
    if (bill) {
      setFormData({
        customerId: bill.customerId,
        customerName: bill.customerName,
        tenderId: bill.tenderId || '',
        tenderName: bill.tenderName || '',
        date: bill.date,
        dueDate: bill.dueDate,
        items: bill.items,
        subtotal: bill.subtotal,
        taxRate: 18,
        taxAmount: bill.taxAmount,
        totalAmount: bill.totalAmount,
        status: bill.status,
        paymentMethod: bill.paymentMethod || '',
        notes: bill.notes || ''
      });
    }
  }, [bill]);

  useEffect(() => {
    calculateTotals();
  }, [formData.items, formData.taxRate]);

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const totalAmount = subtotal + taxAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      totalAmount
    }));
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData({
      ...formData,
      customerId,
      customerName: customer?.name || ''
    });
  };

  const handleTenderChange = (tenderId: string) => {
    const tender = tenders.find(t => t.id === tenderId);
    
    // Clear existing items when switching tenders to avoid conflicts
    setFormData({
      ...formData,
      tenderId,
      tenderName: tender?.name || '',
      items: [] // Clear items to avoid confusion with different pricing
    });
  };

  const addItem = () => {
    const newItem: BillItem = {
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    });
  };

  const updateItem = (index: number, field: keyof BillItem, value: string | number) => {
    const updatedItems = [...formData.items];
    
    if (field === 'productId') {
      const productInfo = getProductInfo(value as string);
      updatedItems[index] = {
        ...updatedItems[index],
        productId: value as string,
        productName: productInfo.name,
        unitPrice: productInfo.price
      };
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value
      };
    }

    // Recalculate total for this item
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;

    setFormData({
      ...formData,
      items: updatedItems
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: updatedItems
    });
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.customerId) newErrors.customerId = 'Customer is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (formData.items.length === 0) newErrors.items = 'At least one item is required';
    
    // Validate items
    formData.items.forEach((item, index) => {
      if (!item.productId) newErrors[`item_${index}_product`] = 'Product is required';
      if (item.quantity <= 0) newErrors[`item_${index}_quantity`] = 'Quantity must be greater than 0';
      
      // Check quantity limits for tender products
      if (formData.tenderId) {
        const tenderProduct = tenderProducts.find(tp => tp.productId === item.productId);
        if (tenderProduct?.quantityLimit && item.quantity > tenderProduct.quantityLimit) {
          newErrors[`item_${index}_quantity`] = `Quantity cannot exceed ${tenderProduct.quantityLimit}`;
        }
      }
    });

    if (new Date(formData.dueDate) < new Date(formData.date)) {
      newErrors.dueDate = 'Due date must be after bill date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        customerId: formData.customerId,
        customerName: formData.customerName,
        tenderId: formData.tenderId || undefined,
        tenderName: formData.tenderName || undefined,
        date: formData.date,
        dueDate: formData.dueDate,
        items: formData.items,
        subtotal: formData.subtotal,
        taxAmount: formData.taxAmount,
        totalAmount: formData.totalAmount,
        status: formData.status,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          {bill ? 'Edit Bill' : 'Create New Bill'}
        </h1>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Bill Header */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer *
              </label>
              <select
                value={formData.customerId}
                onChange={(e) => handleCustomerChange(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.customerId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
              {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tender (Optional)
              </label>
              <select
                value={formData.tenderId}
                onChange={(e) => handleTenderChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Tender (Optional)</option>
                {tenders.filter(tender => tender.status === 'Active').map(tender => (
                  <option key={tender.id} value={tender.id}>{tender.name}</option>
                ))}
              </select>
              {formData.tenderId && (
                <p className="text-sm text-blue-600 mt-1">
                  Using tender pricing and localized product names
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.dueDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm transition-colors"
            >
              <Plus size={16} />
              <span>Add Item</span>
            </button>
          </div>

          {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}

          <div className="space-y-4">
            {formData.items.map((item, index) => {
              const availableProducts = getAvailableProducts();
              const tenderProduct = formData.tenderId ? 
                tenderProducts.find(tp => tp.productId === item.productId) : null;

              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product *
                      </label>
                      <select
                        value={item.productId}
                        onChange={(e) => updateItem(index, 'productId', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[`item_${index}_product`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Product</option>
                        {formData.tenderId ? (
                          // Show tender products with localized names and tender prices
                          tenderProducts.map(tenderProduct => (
                            <option key={tenderProduct.productId} value={tenderProduct.productId}>
                              {tenderProduct.localizedName} - ₹{tenderProduct.tenderPrice}
                              {tenderProduct.quantityLimit && ` (Max: ${tenderProduct.quantityLimit})`}
                            </option>
                          ))
                        ) : (
                          // Show regular products
                          products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - ₹{product.price}
                            </option>
                          ))
                        )}
                      </select>
                      {errors[`item_${index}_product`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_product`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity *
                        {tenderProduct?.quantityLimit && (
                          <span className="text-xs text-blue-600 ml-1">
                            (Max: {tenderProduct.quantityLimit})
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        min="1"
                        max={tenderProduct?.quantityLimit || undefined}
                      />
                      {errors[`item_${index}_quantity`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_quantity`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit Price (₹)
                        {formData.tenderId && <span className="text-xs text-blue-600 ml-1">(Tender Price)</span>}
                      </label>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        step="0.01"
                        readOnly={!!formData.tenderId} // Make read-only when tender is selected
                      />
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total
                        </label>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium">
                          ₹{item.total.toLocaleString()}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800 p-1 rounded mb-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Totals Section */}
        <div className="mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Bill Summary</h3>
              <Calculator className="w-5 h-5 text-gray-500" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-medium">₹{formData.subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Tax Rate:</span>
                  <input
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  <span className="text-gray-700">%</span>
                </div>
                <span className="font-medium">₹{formData.taxAmount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-200">
                <span>Total Amount:</span>
                <span>₹{formData.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment and Notes */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional notes or terms..."
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Save size={18} />
            <span>{bill ? 'Update Bill' : 'Create Bill'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillForm;