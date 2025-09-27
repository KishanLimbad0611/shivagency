// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Search, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
// import SellerForm from './SellerForm';

// interface Seller {
//   id: string;
//   name: string;
//   contactPerson: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
//   gstNumber: string;
//   customerType: 'Retailer' | 'Wholesaler' | 'Institution' | 'Individual';
//   creditLimit: number;
//   outstandingAmount: number;
//   status: 'Active' | 'Inactive';
//   lastOrderDate?: string;
// }

// const SellerManagement: React.FC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedType, setSelectedType] = useState('');

//   const [sellers, setSellers] = useState<Seller[]>([
//     {
//       id: '1',
//       name: 'ABC School',
//       contactPerson: 'Principal Mrs. Gupta',
//       email: 'principal@abcschool.edu',
//       phone: '+91-9876543210',
//       address: '123 Education Lane',
//       city: 'Mumbai',
//       state: 'Maharashtra',
//       pincode: '400001',
//       gstNumber: '27ABCDE1234F1Z5',
//       customerType: 'Institution',
//       creditLimit: 200000,
//       outstandingAmount: 15450,
//       status: 'Active',
//       lastOrderDate: '2025-01-05'
//     },
//     {
//       id: '2',
//       name: 'XYZ Office Supplies',
//       contactPerson: 'Rakesh Mehta',
//       email: 'rakesh@xyzoffice.com',
//       phone: '+91-9876543211',
//       address: '456 Business District',
//       city: 'Delhi',
//       state: 'Delhi',
//       pincode: '110001',
//       gstNumber: '07FGHIJ5678K2L6',
//       customerType: 'Retailer',
//       creditLimit: 100000,
//       outstandingAmount: 8750,
//       status: 'Active',
//       lastOrderDate: '2025-01-07'
//     },
//     {
//       id: '3',
//       name: 'Smart Stationers',
//       contactPerson: 'Priya Sharma',
//       email: 'priya@smartstationers.com',
//       phone: '+91-9876543212',
//       address: '789 Market Area',
//       city: 'Pune',
//       state: 'Maharashtra',
//       pincode: '411001',
//       gstNumber: '27MNOPQ9012R3S7',
//       customerType: 'Wholesaler',
//       creditLimit: 500000,
//       outstandingAmount: 22100,
//       status: 'Active',
//       lastOrderDate: '2025-01-06'
//     }
//   ]);

//   const customerTypes = ['Retailer', 'Wholesaler', 'Institution', 'Individual'];

//   const handleAddSeller = (sellerData: Omit<Seller, 'id'>) => {
//     const newSeller: Seller = {
//       ...sellerData,
//       id: Date.now().toString()
//     };
//     setSellers([...sellers, newSeller]);
//     setShowForm(false);
//   };

//   const handleEditSeller = (sellerData: Omit<Seller, 'id'>) => {
//     if (editingSeller) {
//       setSellers(sellers.map(s => 
//         s.id === editingSeller.id ? { ...sellerData, id: editingSeller.id } : s
//       ));
//       setEditingSeller(null);
//       setShowForm(false);
//     }
//   };

//   const handleDeleteSeller = (id: string) => {
//     if (confirm('Are you sure you want to delete this customer?')) {
//       setSellers(sellers.filter(s => s.id !== id));
//     }
//   };

//   const filteredSellers = sellers.filter(seller => {
//     const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          seller.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          seller.city.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = selectedType === '' || seller.customerType === selectedType;
//     return matchesSearch && matchesType;
//   });

//   const getCreditStatusColor = (outstanding: number, limit: number) => {
//     const percentage = (outstanding / limit) * 100;
//     if (percentage >= 90) return 'text-red-600 bg-red-100';
//     if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
//     return 'text-green-600 bg-green-100';
//   };

//   if (showForm) {
//     return (
//       <SellerForm
//         seller={editingSeller}
//         onSave={editingSeller ? handleEditSeller : handleAddSeller}
//         onCancel={() => {
//           setShowForm(false);
//           setEditingSeller(null);
//         }}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//         >
//           <Plus size={20} />
//           <span>Add Customer</span>
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search customers..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <select
//             value={selectedType}
//             onChange={(e) => setSelectedType(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Customer Types</option>
//             {customerTypes.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>

//           <div className="text-sm text-gray-600 flex items-center">
//             Showing {filteredSellers.length} of {sellers.length} customers
//           </div>
//         </div>
//       </div>

//       {/* Sellers Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {filteredSellers.map((seller) => (
//           <div key={seller.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">{seller.name}</h3>
//                   <p className="text-sm text-gray-600">{seller.contactPerson}</p>
//                   <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
//                     {seller.customerType}
//                   </span>
//                 </div>
//                 <div className="text-right">
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     seller.status === 'Active' 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-red-100 text-red-800'
//                   }`}>
//                     {seller.status}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-2 text-sm text-gray-600 mb-4">
//                 <div className="flex items-center space-x-2">
//                   <Phone size={14} />
//                   <span>{seller.phone}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Mail size={14} />
//                   <span>{seller.email}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <MapPin size={14} />
//                   <span>{seller.city}, {seller.state}</span>
//                 </div>
//               </div>

//               {/* Credit Information */}
//               <div className="bg-gray-50 rounded-lg p-3 mb-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-gray-700">Credit Information</span>
//                   <CreditCard size={14} className="text-gray-500" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-2 text-xs">
//                   <div>
//                     <span className="text-gray-500">Outstanding:</span>
//                     <div className={`font-medium px-2 py-1 rounded ${getCreditStatusColor(seller.outstandingAmount, seller.creditLimit)}`}>
//                       ₹{seller.outstandingAmount.toLocaleString()}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Credit Limit:</span>
//                     <div className="font-medium">₹{seller.creditLimit.toLocaleString()}</div>
//                   </div>
//                 </div>
//                 <div className="mt-2">
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>Credit Utilization</span>
//                     <span>{((seller.outstandingAmount / seller.creditLimit) * 100).toFixed(1)}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//                     <div 
//                       className={`h-2 rounded-full ${
//                         (seller.outstandingAmount / seller.creditLimit) >= 0.9 
//                           ? 'bg-red-500' 
//                           : (seller.outstandingAmount / seller.creditLimit) >= 0.7 
//                           ? 'bg-yellow-500' 
//                           : 'bg-green-500'
//                       }`}
//                       style={{ width: `${Math.min((seller.outstandingAmount / seller.creditLimit) * 100, 100)}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>

//               {seller.lastOrderDate && (
//                 <div className="text-xs text-gray-500 mb-4">
//                   Last Order: {new Date(seller.lastOrderDate).toLocaleDateString()}
//                 </div>
//               )}

//               <div className="flex items-center justify-end space-x-2">
//                 <button
//                   onClick={() => {
//                     setEditingSeller(seller);
//                     setShowForm(true);
//                   }}
//                   className="text-blue-600 hover:text-blue-800 p-1 rounded"
//                 >
//                   <Edit size={16} />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteSeller(seller.id)}
//                   className="text-red-600 hover:text-red-800 p-1 rounded"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredSellers.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No customers found matching your search criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SellerManagement;
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { useCustomers, Customer } from '../../hooks/useCustomers';
import CustomerForm from './SellerForm';

const CustomerManagement: React.FC = () => {
  const { customers, loading, error, addCustomer, updateCustomer, deleteCustomer, refetch } = useCustomers();
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const customerTypes = ['Retailer', 'Wholesaler', 'Institution', 'Individual'];

  useEffect(() => {
    refetch();
  }, []);

  const handleAddCustomer = async (customerData: Omit<Customer, 'id'>) => {
    try {
      await addCustomer(customerData);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add customer:', err);
    }
  };

  const handleEditCustomer = async (customerData: Omit<Customer, 'id'>) => {
    if (editingCustomer) {
      try {
        await updateCustomer(editingCustomer.id, customerData);
        setEditingCustomer(null);
        setShowForm(false);
      } catch (err) {
        console.error('Failed to update customer:', err);
      }
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
      } catch (err) {
        console.error('Failed to delete customer:', err);
      }
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || customer.customerType === selectedType;
    return matchesSearch && matchesType;
  });

  const getCreditStatusColor = (outstanding: number, limit: number) => {
    const percentage = (outstanding / limit) * 100;
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading customers...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error loading customers</h3>
        <p className="text-red-600 text-sm mt-1">{error}</p>
        <button 
          onClick={refetch}
          className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (showForm) {
    return (
      <CustomerForm
        customer={editingCustomer}
        onSave={editingCustomer ? handleEditCustomer : handleAddCustomer}
        onCancel={() => {
          setShowForm(false);
          setEditingCustomer(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Customer Types</option>
            {customerTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{customer.name}</h3>
                  <p className="text-sm text-gray-600">{customer.contactPerson}</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
                    {customer.customerType}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    customer.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Phone size={14} />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={14} />
                  <span>{customer.city}, {customer.state}</span>
                </div>
              </div>

              {/* Credit Information */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Credit Information</span>
                  <CreditCard size={14} className="text-gray-500" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Outstanding:</span>
                    <div className={`font-medium px-2 py-1 rounded ${getCreditStatusColor(customer.outstandingAmount, customer.creditLimit)}`}>
                      ₹{customer.outstandingAmount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Credit Limit:</span>
                    <div className="font-medium">₹{customer.creditLimit.toLocaleString()}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Credit Utilization</span>
                    <span>{((customer.outstandingAmount / customer.creditLimit) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        (customer.outstandingAmount / customer.creditLimit) >= 0.9 
                          ? 'bg-red-500' 
                          : (customer.outstandingAmount / customer.creditLimit) >= 0.7 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((customer.outstandingAmount / customer.creditLimit) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {customer.lastOrderDate && (
                <div className="text-xs text-gray-500 mb-4">
                  Last Order: {new Date(customer.lastOrderDate).toLocaleDateString()}
                </div>
              )}

              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => {
                    setEditingCustomer(customer);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="text-red-600 hover:text-red-800 p-1 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No customers found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;