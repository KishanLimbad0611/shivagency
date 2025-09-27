// import React, { useState, useEffect } from 'react';
// import { Save, X } from 'lucide-react';

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

// interface SellerFormProps {
//   seller?: Seller | null;
//   onSave: (seller: Omit<Seller, 'id'>) => void;
//   onCancel: () => void;
// }

// const SellerForm: React.FC<SellerFormProps> = ({ seller, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     contactPerson: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     gstNumber: '',
//     customerType: 'Retailer' as 'Retailer' | 'Wholesaler' | 'Institution' | 'Individual',
//     creditLimit: 0,
//     outstandingAmount: 0,
//     status: 'Active' as 'Active' | 'Inactive',
//     lastOrderDate: undefined as string | undefined
//   });

//   const [errors, setErrors] = useState<{[key: string]: string}>({});

//   const customerTypes: ('Retailer' | 'Wholesaler' | 'Institution' | 'Individual')[] = 
//     ['Retailer', 'Wholesaler', 'Institution', 'Individual'];

//   const indianStates = [
//     'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 
//     'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
//     'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
//     'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
//   ];

//   useEffect(() => {
//     if (seller) {
//       setFormData({
//         name: seller.name,
//         contactPerson: seller.contactPerson,
//         email: seller.email,
//         phone: seller.phone,
//         address: seller.address,
//         city: seller.city,
//         state: seller.state,
//         pincode: seller.pincode,
//         gstNumber: seller.gstNumber,
//         customerType: seller.customerType,
//         creditLimit: seller.creditLimit,
//         outstandingAmount: seller.outstandingAmount,
//         status: seller.status,
//         lastOrderDate: seller.lastOrderDate
//       });
//     }
//   }, [seller]);

//   const validateForm = () => {
//     const newErrors: {[key: string]: string} = {};

//     if (!formData.name.trim()) newErrors.name = 'Customer name is required';
//     if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Phone validation
//     const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!phoneRegex.test(formData.phone)) {
//       newErrors.phone = 'Please enter a valid phone number';
//     }

//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.city.trim()) newErrors.city = 'City is required';
//     if (!formData.state) newErrors.state = 'State is required';
    
//     // Pincode validation
//     const pincodeRegex = /^\d{6}$/;
//     if (!formData.pincode.trim()) {
//       newErrors.pincode = 'Pincode is required';
//     } else if (!pincodeRegex.test(formData.pincode)) {
//       newErrors.pincode = 'Please enter a valid 6-digit pincode';
//     }

//     // GST validation (optional but if provided should be valid)
//     if (formData.gstNumber.trim()) {
//       const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
//       if (!gstRegex.test(formData.gstNumber)) {
//         newErrors.gstNumber = 'Please enter a valid GST number';
//       }
//     }

//     if (formData.creditLimit < 0) newErrors.creditLimit = 'Credit limit cannot be negative';
//     if (formData.outstandingAmount < 0) newErrors.outstandingAmount = 'Outstanding amount cannot be negative';
    
//     if (formData.outstandingAmount > formData.creditLimit) {
//       newErrors.outstandingAmount = 'Outstanding amount cannot exceed credit limit';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSave(formData);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">
//           {seller ? 'Edit Customer' : 'Add New Customer'}
//         </h1>
//         <button
//           onClick={onCancel}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
//         {/* Basic Information */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Customer Name *
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter customer name"
//               />
//               {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Contact Person *
//               </label>
//               <input
//                 type="text"
//                 value={formData.contactPerson}
//                 onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.contactPerson ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter contact person name"
//               />
//               {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email *
//               </label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter email address"
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number *
//               </label>
//               <input
//                 type="text"
//                 value={formData.phone}
//                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.phone ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter phone number"
//               />
//               {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Customer Type *
//               </label>
//               <select
//                 value={formData.customerType}
//                 onChange={(e) => setFormData({ ...formData, customerType: e.target.value as any })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 {customerTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Status
//               </label>
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Address Information */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h2>
//           <div className="grid grid-cols-1 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Address *
//               </label>
//               <textarea
//                 value={formData.address}
//                 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                 rows={3}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.address ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter full address"
//               />
//               {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   City *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.city}
//                   onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.city ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter city"
//                 />
//                 {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   State *
//                 </label>
//                 <select
//                   value={formData.state}
//                   onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.state ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 >
//                   <option value="">Select State</option>
//                   {indianStates.map(state => (
//                     <option key={state} value={state}>{state}</option>
//                   ))}
//                 </select>
//                 {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Pincode *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.pincode}
//                   onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.pincode ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter pincode"
//                 />
//                 {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Financial Information */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Financial Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 GST Number
//               </label>
//               <input
//                 type="text"
//                 value={formData.gstNumber}
//                 onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.gstNumber ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="22AAAAA0000A1Z5"
//               />
//               {errors.gstNumber && <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Credit Limit (₹)
//               </label>
//               <input
//                 type="number"
//                 value={formData.creditLimit}
//                 onChange={(e) => setFormData({ ...formData, creditLimit: parseFloat(e.target.value) || 0 })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.creditLimit ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="0"
//               />
//               {errors.creditLimit && <p className="text-red-500 text-sm mt-1">{errors.creditLimit}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Outstanding Amount (₹)
//               </label>
//               <input
//                 type="number"
//                 value={formData.outstandingAmount}
//                 onChange={(e) => setFormData({ ...formData, outstandingAmount: parseFloat(e.target.value) || 0 })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.outstandingAmount ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="0"
//               />
//               {errors.outstandingAmount && <p className="text-red-500 text-sm mt-1">{errors.outstandingAmount}</p>}
//               {formData.creditLimit > 0 && formData.outstandingAmount > 0 && (
//                 <p className="text-sm text-gray-600 mt-1">
//                   Credit Utilization: {((formData.outstandingAmount / formData.creditLimit) * 100).toFixed(1)}%
//                 </p>
//               )}
//             </div>
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
//             <span>{seller ? 'Update Customer' : 'Add Customer'}</span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SellerForm;

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber: string;
  customerType: 'Retailer' | 'Wholesaler' | 'Institution' | 'Individual';
  creditLimit: number;
  outstandingAmount: number;
  status: 'Active' | 'Inactive';
  lastOrderDate?: string;
}

interface CustomerFormProps {
  customer?: Customer | null;
  onSave: (customer: Omit<Customer, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    customerType: 'Retailer' as 'Retailer' | 'Wholesaler' | 'Institution' | 'Individual',
    creditLimit: 0,
    outstandingAmount: 0,
    status: 'Active' as 'Active' | 'Inactive',
    lastOrderDate: undefined as string | undefined
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [saving, setSaving] = useState(false);

  const customerTypes: ('Retailer' | 'Wholesaler' | 'Institution' | 'Individual')[] = 
    ['Retailer', 'Wholesaler', 'Institution', 'Individual'];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        contactPerson: customer.contactPerson,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        gstNumber: customer.gstNumber,
        customerType: customer.customerType,
        creditLimit: customer.creditLimit,
        outstandingAmount: customer.outstandingAmount,
        status: customer.status,
        lastOrderDate: customer.lastOrderDate
      });
    }
  }, [customer]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) newErrors.name = 'Customer name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    // Pincode validation
    const pincodeRegex = /^\d{6}$/;
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    // GST validation (optional but if provided should be valid)
    if (formData.gstNumber.trim()) {
      const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
      if (!gstRegex.test(formData.gstNumber)) {
        newErrors.gstNumber = 'Please enter a valid GST number';
      }
    }

    if (formData.creditLimit < 0) newErrors.creditLimit = 'Credit limit cannot be negative';
    if (formData.outstandingAmount < 0) newErrors.outstandingAmount = 'Outstanding amount cannot be negative';
    
    if (formData.outstandingAmount > formData.creditLimit) {
      newErrors.outstandingAmount = 'Outstanding amount cannot exceed credit limit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSaving(true);
      try {
        await onSave(formData);
      } catch (error) {
        console.error('Error saving customer:', error);
        // You might want to show an error message to the user here
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          {customer ? 'Edit Customer' : 'Add New Customer'}
        </h1>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
          disabled={saving}
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Basic Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter customer name"
                disabled={saving}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person *
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter contact person name"
                disabled={saving}
              />
              {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
                disabled={saving}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter phone number"
                disabled={saving}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Type *
              </label>
              <select
                value={formData.customerType}
                onChange={(e) => setFormData({ ...formData, customerType: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={saving}
              >
                {customerTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={saving}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter full address"
                disabled={saving}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter city"
                  disabled={saving}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={saving}
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.pincode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter pincode"
                  disabled={saving}
                />
                {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Financial Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Number
              </label>
              <input
                type="text"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.gstNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="22AAAAA0000A1Z5"
                disabled={saving}
              />
              {errors.gstNumber && <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credit Limit (₹)
              </label>
              <input
                type="number"
                value={formData.creditLimit}
                onChange={(e) => setFormData({ ...formData, creditLimit: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.creditLimit ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                disabled={saving}
              />
              {errors.creditLimit && <p className="text-red-500 text-sm mt-1">{errors.creditLimit}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Outstanding Amount (₹)
              </label>
              <input
                type="number"
                value={formData.outstandingAmount}
                onChange={(e) => setFormData({ ...formData, outstandingAmount: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.outstandingAmount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                disabled={saving}
              />
              {errors.outstandingAmount && <p className="text-red-500 text-sm mt-1">{errors.outstandingAmount}</p>}
              {formData.creditLimit > 0 && formData.outstandingAmount > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Credit Utilization: {((formData.outstandingAmount / formData.creditLimit) * 100).toFixed(1)}%
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={saving}
          >
            <Save size={18} />
            <span>
              {saving 
                ? (customer ? 'Updating...' : 'Adding...') 
                : (customer ? 'Update Customer' : 'Add Customer')
              }
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;