import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Phone, Mail, MapPin } from 'lucide-react';
import SupplierForm from './SupplierForm';
import { useSuppliers, Supplier } from '../../hooks/useSuppliers';

const SupplierManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { suppliers, loading, error, addSupplier, updateSupplier, deleteSupplier } = useSuppliers();

  const handleAddSupplier = async (supplierData: Omit<Supplier, 'id'>) => {
    try {
      await addSupplier(supplierData);
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add supplier');
    }
  };

  const handleEditSupplier = async (supplierData: Omit<Supplier, 'id'>) => {
    if (editingSupplier) {
      try {
        await updateSupplier(editingSupplier.id, supplierData);
        setEditingSupplier(null);
        setShowForm(false);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to update supplier');
      }
    }
  };

  const handleDeleteSupplier = async (id: string) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      try {
        await deleteSupplier(id);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete supplier');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading suppliers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return (
      <SupplierForm
        supplier={editingSupplier}
        onSave={editingSupplier ? handleEditSupplier : handleAddSupplier}
        onCancel={() => {
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Supplier Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Supplier</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search suppliers by name, contact person, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{supplier.name}</h3>
                  <p className="text-sm text-gray-600">{supplier.contactPerson}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  supplier.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {supplier.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone size={14} />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={14} />
                  <span>{supplier.city}, {supplier.state}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Payment Terms:</span>
                    <div className="font-medium">{supplier.paymentTerms}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Credit Limit:</span>
                    <div className="font-medium">₹{supplier.creditLimit.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 mt-4">
                <button
                  onClick={() => {
                    setEditingSupplier(supplier);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteSupplier(supplier.id)}
                  className="text-red-600 hover:text-red-800 p-1 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No suppliers found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;

// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Search, Phone, Mail, MapPin } from 'lucide-react';
// import SupplierForm from './SupplierForm';

// interface Supplier {
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
//   paymentTerms: string;
//   creditLimit: number;
//   status: 'Active' | 'Inactive';
// }

// const SupplierManagement: React.FC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const [suppliers, setSuppliers] = useState<Supplier[]>([
//     {
//       id: '1',
//       name: 'PaperCorp Ltd',
//       contactPerson: 'Rajesh Kumar',
//       email: 'rajesh@papercorp.com',
//       phone: '+91-9876543210',
//       address: '123 Industrial Area',
//       city: 'Mumbai',
//       state: 'Maharashtra',
//       pincode: '400001',
//       gstNumber: '27ABCDE1234F1Z5',
//       paymentTerms: '30 Days',
//       creditLimit: 100000,
//       status: 'Active'
//     },
//     {
//       id: '2',
//       name: 'PenWorld Inc',
//       contactPerson: 'Priya Sharma',
//       email: 'priya@penworld.com',
//       phone: '+91-9876543211',
//       address: '456 Market Street',
//       city: 'Delhi',
//       state: 'Delhi',
//       pincode: '110001',
//       gstNumber: '07FGHIJ5678K2L6',
//       paymentTerms: '15 Days',
//       creditLimit: 75000,
//       status: 'Active'
//     },
//     {
//       id: '3',
//       name: 'BookMakers Co',
//       contactPerson: 'Amit Singh',
//       email: 'amit@bookmakers.com',
//       phone: '+91-9876543212',
//       address: '789 Book Colony',
//       city: 'Pune',
//       state: 'Maharashtra',
//       pincode: '411001',
//       gstNumber: '27MNOPQ9012R3S7',
//       paymentTerms: '45 Days',
//       creditLimit: 150000,
//       status: 'Active'
//     }
//   ]);

//   const handleAddSupplier = (supplierData: Omit<Supplier, 'id'>) => {
//     const newSupplier: Supplier = {
//       ...supplierData,
//       id: Date.now().toString()
//     };
//     setSuppliers([...suppliers, newSupplier]);
//     setShowForm(false);
//   };

//   const handleEditSupplier = (supplierData: Omit<Supplier, 'id'>) => {
//     if (editingSupplier) {
//       setSuppliers(suppliers.map(s => 
//         s.id === editingSupplier.id ? { ...supplierData, id: editingSupplier.id } : s
//       ));
//       setEditingSupplier(null);
//       setShowForm(false);
//     }
//   };

//   const handleDeleteSupplier = (id: string) => {
//     if (confirm('Are you sure you want to delete this supplier?')) {
//       setSuppliers(suppliers.filter(s => s.id !== id));
//     }
//   };

//   const filteredSuppliers = suppliers.filter(supplier =>
//     supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     supplier.city.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (showForm) {
//     return (
//       <SupplierForm
//         supplier={editingSupplier}
//         onSave={editingSupplier ? handleEditSupplier : handleAddSupplier}
//         onCancel={() => {
//           setShowForm(false);
//           setEditingSupplier(null);
//         }}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Supplier Management</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//         >
//           <Plus size={20} />
//           <span>Add Supplier</span>
//         </button>
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search suppliers by name, contact person, or city..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       {/* Suppliers Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredSuppliers.map((supplier) => (
//           <div key={supplier.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">{supplier.name}</h3>
//                   <p className="text-sm text-gray-600">{supplier.contactPerson}</p>
//                 </div>
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                   supplier.status === 'Active' 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-red-100 text-red-800'
//                 }`}>
//                   {supplier.status}
//                 </span>
//               </div>

//               <div className="space-y-2 text-sm text-gray-600">
//                 <div className="flex items-center space-x-2">
//                   <Phone size={14} />
//                   <span>{supplier.phone}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Mail size={14} />
//                   <span>{supplier.email}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <MapPin size={14} />
//                   <span>{supplier.city}, {supplier.state}</span>
//                 </div>
//               </div>

//               <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                 <div className="grid grid-cols-2 gap-2 text-xs">
//                   <div>
//                     <span className="text-gray-500">Payment Terms:</span>
//                     <div className="font-medium">{supplier.paymentTerms}</div>
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Credit Limit:</span>
//                     <div className="font-medium">₹{supplier.creditLimit.toLocaleString()}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-end space-x-2 mt-4">
//                 <button
//                   onClick={() => {
//                     setEditingSupplier(supplier);
//                     setShowForm(true);
//                   }}
//                   className="text-blue-600 hover:text-blue-800 p-1 rounded"
//                 >
//                   <Edit size={16} />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteSupplier(supplier.id)}
//                   className="text-red-600 hover:text-red-800 p-1 rounded"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredSuppliers.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No suppliers found matching your search criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SupplierManagement;