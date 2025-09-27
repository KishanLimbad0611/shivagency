// import React, { useState, useEffect } from 'react';
// import { Save, X } from 'lucide-react';
// import { Supplier } from '../../hooks/useSuppliers';
// import { useCompanies } from '../../hooks/useCompanies';

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   supplierId: string;
//   companyId: string;
//   purchasePriceWithoutGST: number;
//   purchasePriceWithGST: number;
//   sellingPrice: number;
//   mrp: number;
//   stock: number;
//   minStock: number;
//   description: string;
// }

// interface ProductFormProps {
//   product?: Product | null;
//   onSave: (product: Omit<Product, 'id' | 'supplier'>) => void;
//   onCancel: () => void;
//   suppliers: Supplier[];
//   categories: string[];
// }

// const ProductForm: React.FC<ProductFormProps> = ({
//   product,
//   onSave,
//   onCancel,
//   suppliers,
//   categories
// }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     supplierId: '',
//     companyId: '',
//     purchasePrice: 0,
//     includesGST: false,
//     gstRate: 18, // Default 18% GST, now configurable
//     sellingPrice: 0,
//     mrp: 0,
//     stock: 0,
//     minStock: 0,
//     description: ''
//   });

//   const [errors, setErrors] = useState<{[key: string]: string}>({});
//   const { companies } = useCompanies();

//   useEffect(() => {
//     if (product) {
//       // When editing, determine which price to show and checkbox state
//       const hasGSTDifference = product.purchasePriceWithGST !== product.purchasePriceWithoutGST;
      
//       // Calculate GST rate from existing data
//       let calculatedGSTRate = 18; // default
//       if (hasGSTDifference && product.purchasePriceWithoutGST > 0) {
//         calculatedGSTRate = Math.round(((product.purchasePriceWithGST - product.purchasePriceWithoutGST) / product.purchasePriceWithoutGST) * 100);
//       }
      
//       setFormData({
//         name: product.name,
//         category: product.category,
//         supplierId: product.supplierId,
//         companyId: 
//         purchasePrice: hasGSTDifference ? product.purchasePriceWithGST : product.purchasePriceWithoutGST,
//         includesGST: hasGSTDifference,
//         gstRate: calculatedGSTRate,
//         sellingPrice: product.sellingPrice,
//         mrp: product.mrp,
//         stock: product.stock,
//         minStock: product.minStock,
//         description: product.description
//       });
//     }
//   }, [product]);

//   // Calculate GST values
//   const calculateGSTValues = () => {
//     const gstRateDecimal = formData.gstRate / 100;
    
//     if (formData.includesGST) {
//       // If price includes GST, calculate price without GST
//       const withoutGST = formData.purchasePrice / (1 + gstRateDecimal);
//       return {
//         withoutGST: parseFloat(withoutGST.toFixed(2)),
//         withGST: formData.purchasePrice,
//         gstAmount: parseFloat((formData.purchasePrice - withoutGST).toFixed(2))
//       };
//     } else {
//       // If price doesn't include GST, calculate price with GST
//       const withGST = formData.purchasePrice * (1 + gstRateDecimal);
//       return {
//         withoutGST: formData.purchasePrice,
//         withGST: parseFloat(withGST.toFixed(2)),
//         gstAmount: parseFloat((withGST - formData.purchasePrice).toFixed(2))
//       };
//     }
//   };

//   const gstValues = calculateGSTValues();

//   const validateForm = () => {
//     const newErrors: {[key: string]: string} = {};

//     if (!formData.name.trim()) newErrors.name = 'Product name is required';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.supplierId) newErrors.supplierId = 'Supplier is required';
//     if (formData.purchasePrice <= 0) newErrors.purchasePrice = 'Purchase price must be greater than 0';
//     if (formData.gstRate < 0 || formData.gstRate > 100) newErrors.gstRate = 'GST rate must be between 0 and 100';
//     if (formData.sellingPrice <= 0) newErrors.sellingPrice = 'Selling price must be greater than 0';
//     if (formData.mrp <= 0) newErrors.mrp = 'MRP must be greater than 0';
//     if (formData.mrp < formData.sellingPrice) {
//       newErrors.mrp = 'MRP should be greater than or equal to selling price';
//     }
//     if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
//     if (formData.minStock < 0) newErrors.minStock = 'Minimum stock cannot be negative';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Convert form data to the expected format
//       const productData = {
//         name: formData.name,
//         category: formData.category,
//         supplierId: formData.supplierId,
//         purchasePriceWithoutGST: gstValues.withoutGST,
//         purchasePriceWithGST: gstValues.withGST,
//         sellingPrice: formData.sellingPrice,
//         mrp: formData.mrp,
//         stock: formData.stock,
//         minStock: formData.minStock,
//         description: formData.description
//       };
//       onSave(productData);
//     }
//   };

//   const calculateProfitMargin = () => {
//     if (gstValues.withGST > 0 && formData.sellingPrice > gstValues.withGST) {
//       return ((formData.sellingPrice - gstValues.withGST) / gstValues.withGST * 100).toFixed(1);
//     }
//     return '0.0';
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">
//           {product ? 'Edit Product' : 'Add New Product'}
//         </h1>
//         <button
//           onClick={onCancel}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Product Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Name *
//             </label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                 errors.name ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter product name"
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Category *
//             </label>
//             <select
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                 errors.category ? 'border-red-500' : 'border-gray-300'
//               }`}
//             >
//               <option value="">Select Category</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//             {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
//           </div>

//           {/* Supplier */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Supplier *
//             </label>
//             <select
//               value={formData.supplierId}
//               onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                 errors.supplierId ? 'border-red-500' : 'border-gray-300'
//               }`}
//             >
//               <option value="">Select Supplier</option>
//               {suppliers.map(supplier => (
//                 <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
//               ))}
//             </select>
//             {errors.supplierId && <p className="text-red-500 text-sm mt-1">{errors.supplierId}</p>}
//           </div>

// {/* Company */}
// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Company *
//   </label>
//   <select
//     value={formData.companyId}
//     onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
//     className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//       errors.companyId ? 'border-red-500' : 'border-gray-300'
//     }`}
//   >
//     <option value="">Select Company</option>
//     {companies.map(company => (
//       <option key={company.id} value={company.id}>{company.name}</option>
//     ))}
//   </select>
//   {errors.companyId && <p className="text-red-500 text-sm mt-1">{errors.companyId}</p>}
// </div>
//           {/* GST Rate */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               GST Rate (%) *
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               max="100"
//               value={formData.gstRate}
//               onChange={(e) => setFormData({ ...formData, gstRate: parseFloat(e.target.value) || 0 })}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                 errors.gstRate ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="18.00"
//             />
//             {errors.gstRate && <p className="text-red-500 text-sm mt-1">{errors.gstRate}</p>}
//           </div>

//           {/* Purchase Price with GST Checkbox */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Purchase Price (₹) *
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={formData.purchasePrice}
//                   onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="0.00"
//                 />
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     id="includesGST"
//                     checked={formData.includesGST}
//                     onChange={(e) => setFormData({ ...formData, includesGST: e.target.checked })}
//                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <label htmlFor="includesGST" className="text-sm text-gray-700">
//                     Price includes GST
//                   </label>
//                 </div>
//                 {errors.purchasePrice && <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>}
//               </div>
              
//               {/* GST Breakdown - Only show when price doesn't include GST */}
//               {formData.purchasePrice > 0 && !formData.includesGST && (
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <h4 className="text-sm font-medium text-blue-900 mb-2">Price with GST Breakdown</h4>
//                   <div className="space-y-1 text-sm">
//                     <div className="flex justify-between">
//                       <span>Base Price:</span>
//                       <span>₹{gstValues.withoutGST}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>GST ({formData.gstRate}%):</span>
//                       <span>₹{gstValues.gstAmount}</span>
//                     </div>
//                     <div className="flex justify-between font-medium border-t border-blue-200 pt-1">
//                       <span>Total with GST:</span>
//                       <span>₹{gstValues.withGST}</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Selling Price */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Selling Price (₹) *
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               value={formData.sellingPrice}
//               onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                 errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="0.00"
//             />
//             {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>}
//             {gstValues.withGST > 0 && formData.sellingPrice > gstValues.withGST && (
//               <p className="text-green-600 text-sm mt-1">
//                 Profit Margin: {calculateProfitMargin()}%
//               </p>
//             )}
//           </div>

//           {/* MRP */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               MRP (₹) *
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               value={formData.mrp}
//               onChange={(e) => setFormData({ ...formData, mrp: parseFloat(e.target.value) || 0 })}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                 errors.mrp ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="0.00"
//             />
//             {errors.mrp && <p className="text-red-500 text-sm mt-1">{errors.mrp}</p>}
//             {formData.mrp > 0 && formData.sellingPrice > 0 && formData.mrp > formData.sellingPrice && (
//               <p className="text-purple-600 text-sm mt-1">
//                 Discount: {(((formData.mrp - formData.sellingPrice) / formData.mrp) * 100).toFixed(1)}%
//               </p>
//             )}
//           </div>

//           {/* Current Stock */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Current Stock
//             </label>
//             <input
//               type="number"
//               value={formData.stock}
//               onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                 errors.stock ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="0"
//             />
//             {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
//           </div>

//           {/* Minimum Stock */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Minimum Stock Level
//             </label>
//             <input
//               type="number"
//               value={formData.minStock}
//               onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                 errors.minStock ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="0"
//             />
//             {errors.minStock && <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Description
//           </label>
//           <textarea
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             rows={3}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Enter product description"
//           />
//         </div>

//         {/* Form Actions */}
//         <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
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
//             <span>{product ? 'Update Product' : 'Add Product'}</span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;

// // import React, { useState, useEffect } from 'react';
// // import { Save, X } from 'lucide-react';
// // import { Supplier } from '../../hooks/useSuppliers';

// // interface Product {
// //   id: string;
// //   name: string;
// //   category: string;
// //   supplierId: string;
// //   purchasePriceWithoutGST: number;
// //   purchasePriceWithGST: number;
// //   sellingPrice: number;
// //   mrp: number;
// //   stock: number;
// //   minStock: number;
// //   description: string;
// // }

// // interface ProductFormProps {
// //   product?: Product | null;
// //   onSave: (product: Omit<Product, 'id' | 'supplier'>) => void;
// //   onCancel: () => void;
// //   suppliers: Supplier[];
// //   categories: string[];
// // }

// // const ProductForm: React.FC<ProductFormProps> = ({
// //   product,
// //   onSave,
// //   onCancel,
// //   suppliers,
// //   categories
// // }) => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     category: '',
// //     supplierId: '',
// //     purchasePrice: 0, // Single purchase price field
// //     includesGST: false, // Checkbox state
// //     sellingPrice: 0,
// //     mrp: 0,
// //     stock: 0,
// //     minStock: 0,
// //     description: ''
// //   });

// //   const [errors, setErrors] = useState<{ [key: string]: string }>({});

// //   useEffect(() => {
// //     if (product) {
// //       // When editing, determine which price to show and checkbox state
// //       const hasGSTDifference = product.purchasePriceWithGST !== product.purchasePriceWithoutGST;

// //       setFormData({
// //         name: product.name,
// //         category: product.category,
// //         supplierId: product.supplierId,
// //         purchasePrice: hasGSTDifference ? product.purchasePriceWithGST : product.purchasePriceWithoutGST,
// //         includesGST: hasGSTDifference,
// //         sellingPrice: product.sellingPrice,
// //         mrp: product.mrp,
// //         stock: product.stock,
// //         minStock: product.minStock,
// //         description: product.description
// //       });
// //     }
// //   }, [product]);

// //   // Calculate GST values
// //   const calculateGSTValues = () => {
// //     const gstRate = 0.18; // 18% GST - you can make this configurable

// //     if (formData.includesGST) {
// //       // If price includes GST, calculate price without GST
// //       const withoutGST = formData.purchasePrice / (1 + gstRate);
// //       return {
// //         withoutGST: parseFloat(withoutGST.toFixed(2)),
// //         withGST: formData.purchasePrice,
// //         gstAmount: parseFloat((formData.purchasePrice - withoutGST).toFixed(2))
// //       };
// //     } else {
// //       // If price doesn't include GST, calculate price with GST
// //       const withGST = formData.purchasePrice * (1 + gstRate);
// //       return {
// //         withoutGST: formData.purchasePrice,
// //         withGST: parseFloat(withGST.toFixed(2)),
// //         gstAmount: parseFloat((withGST - formData.purchasePrice).toFixed(2))
// //       };
// //     }
// //   };

// //   const gstValues = calculateGSTValues();

// //   const validateForm = () => {
// //     const newErrors: { [key: string]: string } = {};

// //     if (!formData.name.trim()) newErrors.name = 'Product name is required';
// //     if (!formData.category) newErrors.category = 'Category is required';
// //     if (!formData.supplierId) newErrors.supplierId = 'Supplier is required';
// //     if (formData.purchasePrice <= 0) newErrors.purchasePrice = 'Purchase price must be greater than 0';
// //     if (formData.sellingPrice <= 0) newErrors.sellingPrice = 'Selling price must be greater than 0';
// //     if (formData.mrp <= 0) newErrors.mrp = 'MRP must be greater than 0';
// //     if (formData.mrp < formData.sellingPrice) {
// //       newErrors.mrp = 'MRP should be greater than or equal to selling price';
// //     }
// //     if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
// //     if (formData.minStock < 0) newErrors.minStock = 'Minimum stock cannot be negative';

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (validateForm()) {
// //       // Convert form data to the expected format
// //       const productData = {
// //         name: formData.name,
// //         category: formData.category,
// //         supplierId: formData.supplierId,
// //         purchasePriceWithoutGST: gstValues.withoutGST,
// //         purchasePriceWithGST: gstValues.withGST,
// //         sellingPrice: formData.sellingPrice,
// //         mrp: formData.mrp,
// //         stock: formData.stock,
// //         minStock: formData.minStock,
// //         description: formData.description
// //       };
// //       onSave(productData);
// //     }
// //   };

// //   const calculateProfitMargin = () => {
// //     if (gstValues.withGST > 0 && formData.sellingPrice > gstValues.withGST) {
// //       return ((formData.sellingPrice - gstValues.withGST) / gstValues.withGST * 100).toFixed(1);
// //     }
// //     return '0.0';
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-2xl font-bold text-gray-800">
// //           {product ? 'Edit Product' : 'Add New Product'}
// //         </h1>
// //         <button
// //           onClick={onCancel}
// //           className="text-gray-500 hover:text-gray-700"
// //         >
// //           <X size={24} />
// //         </button>
// //       </div>

// //       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* Product Name */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Product Name *
// //             </label>
// //             <input
// //               type="text"
// //               value={formData.name}
// //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               placeholder="Enter product name"
// //             />
// //             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
// //           </div>

// //           {/* Category */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Category *
// //             </label>
// //             <select
// //               value={formData.category}
// //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //             >
// //               <option value="">Select Category</option>
// //               {categories.map(category => (
// //                 <option key={category} value={category}>{category}</option>
// //               ))}
// //             </select>
// //             {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
// //           </div>

// //           {/* Supplier */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Supplier *
// //             </label>
// //             <select
// //               value={formData.supplierId}
// //               onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
// //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.supplierId ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //             >
// //               <option value="">Select Supplier</option>
// //               {suppliers.map(supplier => (
// //                 <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
// //               ))}
// //             </select>
// //             {errors.supplierId && <p className="text-red-500 text-sm mt-1">{errors.supplierId}</p>}
// //           </div>

// //           {/* MRP */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               MRP (₹) *
// //             </label>
// //             <input
// //               type="number"
// //               step="0.01"
// //               value={formData.mrp}
// //               onChange={(e) => setFormData({ ...formData, mrp: parseFloat(e.target.value) || 0 })}
// //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.mrp ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               placeholder="0.00"
// //             />
// //             {errors.mrp && <p className="text-red-500 text-sm mt-1">{errors.mrp}</p>}
// //             {formData.mrp > 0 && formData.sellingPrice > 0 && formData.mrp > formData.sellingPrice && (
// //               <p className="text-purple-600 text-sm mt-1">
// //                 Discount: {(((formData.mrp - formData.sellingPrice) / formData.mrp) * 100).toFixed(1)}%
// //               </p>
// //             )}
// //           </div>

// //           {/* Purchase Price with GST Checkbox */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Purchase Price (₹) *
// //             </label>
// //             <div className="space-y-2">
// //               <input
// //                 type="number"
// //                 step="0.01"
// //                 value={formData.purchasePrice}
// //                 onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })}
// //                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
// //                   }`}
// //                 placeholder="0.00"
// //               />
// //               <div className="flex items-center space-x-2">
// //                 <input
// //                   type="checkbox"
// //                   id="includesGST"
// //                   checked={formData.includesGST}
// //                   onChange={(e) => setFormData({ ...formData, includesGST: e.target.checked })}
// //                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
// //                 />
// //                 <label htmlFor="includesGST" className="text-sm text-gray-700">
// //                   Price includes GST
// //                 </label>
// //               </div>
// //             </div>
// //             {errors.purchasePrice && <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>}

// //             {/* GST Breakdown */}
// //             {formData.purchasePrice > 0 && (
// //               <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
// //                 <div className="flex justify-between">
// //                   <span>Price without GST:</span>
// //                   <span>₹{gstValues.withoutGST}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span>GST Amount (18%):</span>
// //                   <span>₹{gstValues.gstAmount}</span>
// //                 </div>
// //                 <div className="flex justify-between font-medium">
// //                   <span>Price with GST:</span>
// //                   <span>₹{gstValues.withGST}</span>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Selling Price */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Selling Price (₹) *
// //             </label>
// //             <input
// //               type="number"
// //               step="0.01"
// //               value={formData.sellingPrice}
// //               onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
// //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               placeholder="0.00"
// //             />
// //             {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>}
// //             {gstValues.withGST > 0 && formData.sellingPrice > gstValues.withGST && (
// //               <p className="text-green-600 text-sm mt-1">
// //                 Profit Margin: {calculateProfitMargin()}%
// //               </p>
// //             )}
// //           </div>

// //           {/* Current Stock */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Current Stock
// //             </label>
// //             <input
// //               type="number"
// //               value={formData.stock}
// //               onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
// //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.stock ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               placeholder="0"
// //             />
// //             {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
// //           </div>

// //           {/* Minimum Stock */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Minimum Stock Level
// //             </label>
// //             <input
// //               type="number"
// //               value={formData.minStock}
// //               onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
// //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.minStock ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               placeholder="0"
// //             />
// //             {errors.minStock && <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>}
// //           </div>
// //         </div>

// //         {/* Description */}
// //         <div className="mt-6">
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Description
// //           </label>
// //           <textarea
// //             value={formData.description}
// //             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //             rows={3}
// //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             placeholder="Enter product description"
// //           />
// //         </div>

// //         {/* Form Actions */}
// //         <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
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
// //             <span>{product ? 'Update Product' : 'Add Product'}</span>
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ProductForm;

// // // import React, { useState, useEffect } from 'react';
// // // import { Save, X } from 'lucide-react';
// // // import { Supplier } from '../../hooks/useSuppliers';

// // // interface Product {
// // //   id: string;
// // //   name: string;
// // //   category: string;
// // //   supplierId: string;
// // //   purchasePriceWithoutGST: number;
// // //   purchasePriceWithGST: number;
// // //   sellingPrice: number;
// // //   mrp: number;
// // //   stock: number;
// // //   minStock: number;
// // //   description: string;
// // // }

// // // interface ProductFormProps {
// // //   product?: Product | null;
// // //   onSave: (product: Omit<Product, 'id' | 'supplier'>) => void;
// // //   onCancel: () => void;
// // //   suppliers: Supplier[];
// // //   categories: string[];
// // // }

// // // const ProductForm: React.FC<ProductFormProps> = ({
// // //   product,
// // //   onSave,
// // //   onCancel,
// // //   suppliers,
// // //   categories
// // // }) => {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     category: '',
// // //     supplierId: '',
// // //     purchasePriceWithoutGST: 0,
// // //     purchasePriceWithGST: 0,
// // //     sellingPrice: 0,
// // //     mrp: 0,
// // //     stock: 0,
// // //     minStock: 0,
// // //     description: ''
// // //   });

// // //   const [errors, setErrors] = useState<{[key: string]: string}>({});

// // //   useEffect(() => {
// // //     if (product) {
// // //       setFormData({
// // //         name: product.name,
// // //         category: product.category,
// // //         supplierId: product.supplierId,
// // //         purchasePriceWithoutGST: product.purchasePriceWithoutGST,
// // //         purchasePriceWithGST: product.purchasePriceWithGST,
// // //         sellingPrice: product.sellingPrice,
// // //         mrp: product.mrp,
// // //         stock: product.stock,
// // //         minStock: product.minStock,
// // //         description: product.description
// // //       });
// // //     }
// // //   }, [product]);

// // //   const validateForm = () => {
// // //     const newErrors: {[key: string]: string} = {};

// // //     if (!formData.name.trim()) newErrors.name = 'Product name is required';
// // //     if (!formData.category) newErrors.category = 'Category is required';
// // //     if (!formData.supplierId) newErrors.supplierId = 'Supplier is required';
// // //     if (formData.purchasePriceWithoutGST <= 0) newErrors.purchasePriceWithoutGST = 'Purchase price without GST must be greater than 0';
// // //     if (formData.purchasePriceWithGST <= 0) newErrors.purchasePriceWithGST = 'Purchase price with GST must be greater than 0';
// // //     if (formData.purchasePriceWithGST < formData.purchasePriceWithoutGST) {
// // //       newErrors.purchasePriceWithGST = 'Purchase price with GST must be greater than or equal to price without GST';
// // //     }
// // //     if (formData.sellingPrice <= 0) newErrors.sellingPrice = 'Selling price must be greater than 0';
// // //     if (formData.mrp <= 0) newErrors.mrp = 'MRP must be greater than 0';
// // //     if (formData.mrp < formData.sellingPrice) {
// // //       newErrors.mrp = 'MRP should be greater than or equal to selling price';
// // //     }
// // //     if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
// // //     if (formData.minStock < 0) newErrors.minStock = 'Minimum stock cannot be negative';

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (validateForm()) {
// // //       onSave(formData);
// // //     }
// // //   };

// // //   const calculateProfitMargin = () => {
// // //     if (formData.purchasePriceWithGST > 0 && formData.sellingPrice > formData.purchasePriceWithGST) {
// // //       return ((formData.sellingPrice - formData.purchasePriceWithGST) / formData.purchasePriceWithGST * 100).toFixed(1);
// // //     }
// // //     return '0.0';
// // //   };

// // //   const calculateGSTAmount = () => {
// // //     return (formData.purchasePriceWithGST - formData.purchasePriceWithoutGST).toFixed(2);
// // //   };

// // //   const calculateGSTPercentage = () => {
// // //     if (formData.purchasePriceWithoutGST > 0) {
// // //       return (((formData.purchasePriceWithGST - formData.purchasePriceWithoutGST) / formData.purchasePriceWithoutGST) * 100).toFixed(1);
// // //     }
// // //     return '0.0';
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="flex items-center justify-between">
// // //         <h1 className="text-2xl font-bold text-gray-800">
// // //           {product ? 'Edit Product' : 'Add New Product'}
// // //         </h1>
// // //         <button
// // //           onClick={onCancel}
// // //           className="text-gray-500 hover:text-gray-700"
// // //         >
// // //           <X size={24} />
// // //         </button>
// // //       </div>

// // //       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {/* Product Name */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Product Name *
// // //             </label>
// // //             <input
// // //               type="text"
// // //               value={formData.name}
// // //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.name ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="Enter product name"
// // //             />
// // //             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
// // //           </div>

// // //           {/* Category */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Category *
// // //             </label>
// // //             <select
// // //               value={formData.category}
// // //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.category ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //             >
// // //               <option value="">Select Category</option>
// // //               {categories.map(category => (
// // //                 <option key={category} value={category}>{category}</option>
// // //               ))}
// // //             </select>
// // //             {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
// // //           </div>

// // //           {/* Supplier */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Supplier *
// // //             </label>
// // //             <select
// // //               value={formData.supplierId}
// // //               onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.supplierId ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //             >
// // //               <option value="">Select Supplier</option>
// // //               {suppliers.map(supplier => (
// // //                 <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
// // //               ))}
// // //             </select>
// // //             {errors.supplierId && <p className="text-red-500 text-sm mt-1">{errors.supplierId}</p>}
// // //           </div>

// // //           {/* Purchase Price without GST */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Purchase Price without GST (₹) *
// // //             </label>
// // //             <input
// // //               type="number"
// // //               step="0.01"
// // //               value={formData.purchasePriceWithoutGST}
// // //               onChange={(e) => setFormData({ ...formData, purchasePriceWithoutGST: parseFloat(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.purchasePriceWithoutGST ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0.00"
// // //             />
// // //             {errors.purchasePriceWithoutGST && <p className="text-red-500 text-sm mt-1">{errors.purchasePriceWithoutGST}</p>}
// // //           </div>

// // //           {/* Purchase Price with GST */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Purchase Price with GST (₹) *
// // //             </label>
// // //             <input
// // //               type="number"
// // //               step="0.01"
// // //               value={formData.purchasePriceWithGST}
// // //               onChange={(e) => setFormData({ ...formData, purchasePriceWithGST: parseFloat(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.purchasePriceWithGST ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0.00"
// // //             />
// // //             {errors.purchasePriceWithGST && <p className="text-red-500 text-sm mt-1">{errors.purchasePriceWithGST}</p>}
// // //             {formData.purchasePriceWithoutGST > 0 && formData.purchasePriceWithGST > formData.purchasePriceWithoutGST && (
// // //               <p className="text-blue-600 text-sm mt-1">
// // //                 GST Amount: ₹{calculateGSTAmount()} ({calculateGSTPercentage()}%)
// // //               </p>
// // //             )}
// // //           </div>

// // //           {/* Selling Price */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Selling Price (₹) *
// // //             </label>
// // //             <input
// // //               type="number"
// // //               step="0.01"
// // //               value={formData.sellingPrice}
// // //               onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0.00"
// // //             />
// // //             {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>}
// // //             {formData.purchasePriceWithGST > 0 && formData.sellingPrice > formData.purchasePriceWithGST && (
// // //               <p className="text-green-600 text-sm mt-1">
// // //                 Profit Margin: {calculateProfitMargin()}%
// // //               </p>
// // //             )}
// // //           </div>

// // //           {/* MRP */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               MRP (₹) *
// // //             </label>
// // //             <input
// // //               type="number"
// // //               step="0.01"
// // //               value={formData.mrp}
// // //               onChange={(e) => setFormData({ ...formData, mrp: parseFloat(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.mrp ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0.00"
// // //             />
// // //             {errors.mrp && <p className="text-red-500 text-sm mt-1">{errors.mrp}</p>}
// // //             {formData.mrp > 0 && formData.sellingPrice > 0 && formData.mrp > formData.sellingPrice && (
// // //               <p className="text-purple-600 text-sm mt-1">
// // //                 Discount: {(((formData.mrp - formData.sellingPrice) / formData.mrp) * 100).toFixed(1)}%
// // //               </p>
// // //             )}
// // //           </div>

// // //           {/* Current Stock */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Current Stock
// // //             </label>
// // //             <input
// // //               type="number"
// // //               value={formData.stock}
// // //               onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.stock ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0"
// // //             />
// // //             {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
// // //           </div>

// // //           {/* Minimum Stock */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Minimum Stock Level
// // //             </label>
// // //             <input
// // //               type="number"
// // //               value={formData.minStock}
// // //               onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.minStock ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0"
// // //             />
// // //             {errors.minStock && <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>}
// // //           </div>
// // //         </div>

// // //         {/* Description */}
// // //         <div className="mt-6">
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             Description
// // //           </label>
// // //           <textarea
// // //             value={formData.description}
// // //             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // //             rows={3}
// // //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //             placeholder="Enter product description"
// // //           />
// // //         </div>

// // //         {/* Form Actions */}
// // //         <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
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
// // //             <span>{product ? 'Update Product' : 'Add Product'}</span>
// // //           </button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default ProductForm;

// // // import React, { useState, useEffect } from 'react';
// // // import { Save, X } from 'lucide-react';
// // // import { Supplier } from '../../hooks/useSuppliers';

// // // interface Product {
// // //   id: string;
// // //   name: string;
// // //   category: string;
// // //   supplierId: string;
// // //   purchasePrice: number;
// // //   sellingPrice: number;
// // //   stock: number;
// // //   minStock: number;
// // //   description: string;
// // // }

// // // interface ProductFormProps {
// // //   product?: Product | null;
// // //   onSave: (product: Omit<Product, 'id' | 'supplier'>) => void;
// // //   onCancel: () => void;
// // //   suppliers: Supplier[];
// // //   categories: string[];
// // // }

// // // const ProductForm: React.FC<ProductFormProps> = ({
// // //   product,
// // //   onSave,
// // //   onCancel,
// // //   suppliers,
// // //   categories
// // // }) => {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     category: '',
// // //     supplierId: '',
// // //     purchasePrice: 0,
// // //     sellingPrice: 0,
// // //     stock: 0,
// // //     minStock: 0,
// // //     description: ''
// // //   });

// // //   const [errors, setErrors] = useState<{[key: string]: string}>({});

// // //   useEffect(() => {
// // //     if (product) {
// // //       setFormData({
// // //         name: product.name,
// // //         category: product.category,
// // //         supplierId: product.supplierId,
// // //         purchasePrice: product.purchasePrice,
// // //         sellingPrice: product.sellingPrice,
// // //         stock: product.stock,
// // //         minStock: product.minStock,
// // //         description: product.description
// // //       });
// // //     }
// // //   }, [product]);

// // //   const validateForm = () => {
// // //     const newErrors: {[key: string]: string} = {};

// // //     if (!formData.name.trim()) newErrors.name = 'Product name is required';
// // //     if (!formData.category) newErrors.category = 'Category is required';
// // //     if (!formData.supplierId) newErrors.supplierId = 'Supplier is required';
// // //     if (formData.purchasePrice <= 0) newErrors.purchasePrice = 'Purchase price must be greater than 0';
// // //     if (formData.sellingPrice <= 0) newErrors.sellingPrice = 'Selling price must be greater than 0';
// // //     if (formData.sellingPrice <= formData.purchasePrice) {
// // //       newErrors.sellingPrice = 'Selling price must be greater than purchase price';
// // //     }
// // //     if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
// // //     if (formData.minStock < 0) newErrors.minStock = 'Minimum stock cannot be negative';

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (validateForm()) {
// // //       onSave(formData);
// // //     }
// // //   };

// // //   const calculateProfitMargin = () => {
// // //     if (formData.purchasePrice > 0 && formData.sellingPrice > formData.purchasePrice) {
// // //       return ((formData.sellingPrice - formData.purchasePrice) / formData.purchasePrice * 100).toFixed(1);
// // //     }
// // //     return '0.0';
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="flex items-center justify-between">
// // //         <h1 className="text-2xl font-bold text-gray-800">
// // //           {product ? 'Edit Product' : 'Add New Product'}
// // //         </h1>
// // //         <button
// // //           onClick={onCancel}
// // //           className="text-gray-500 hover:text-gray-700"
// // //         >
// // //           <X size={24} />
// // //         </button>
// // //       </div>

// // //       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {/* Product Name */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Product Name *
// // //             </label>
// // //             <input
// // //               type="text"
// // //               value={formData.name}
// // //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.name ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="Enter product name"
// // //             />
// // //             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
// // //           </div>

// // //           {/* Category */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Category *
// // //             </label>
// // //             <select
// // //               value={formData.category}
// // //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.category ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //             >
// // //               <option value="">Select Category</option>
// // //               {categories.map(category => (
// // //                 <option key={category} value={category}>{category}</option>
// // //               ))}
// // //             </select>
// // //             {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
// // //           </div>

// // //           {/* Supplier */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Supplier *
// // //             </label>
// // //             <select
// // //               value={formData.supplierId}
// // //               onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.supplierId ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //             >
// // //               <option value="">Select Supplier</option>
// // //               {suppliers.map(supplier => (
// // //                 <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
// // //               ))}
// // //             </select>
// // //             {errors.supplierId && <p className="text-red-500 text-sm mt-1">{errors.supplierId}</p>}
// // //           </div>

// // //           {/* Purchase Price */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Purchase Price (₹) *
// // //             </label>
// // //             <input
// // //               type="number"
// // //               step="0.01"
// // //               value={formData.purchasePrice}
// // //               onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0.00"
// // //             />
// // //             {errors.purchasePrice && <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>}
// // //           </div>

// // //           {/* Selling Price */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Selling Price (₹) *
// // //             </label>
// // //             <input
// // //               type="number"
// // //               step="0.01"
// // //               value={formData.sellingPrice}
// // //               onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0.00"
// // //             />
// // //             {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>}
// // //             {formData.purchasePrice > 0 && formData.sellingPrice > formData.purchasePrice && (
// // //               <p className="text-green-600 text-sm mt-1">
// // //                 Profit Margin: {calculateProfitMargin()}%
// // //               </p>
// // //             )}
// // //           </div>

// // //           {/* Current Stock */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Current Stock
// // //             </label>
// // //             <input
// // //               type="number"
// // //               value={formData.stock}
// // //               onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.stock ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0"
// // //             />
// // //             {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
// // //           </div>

// // //           {/* Minimum Stock */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Minimum Stock Level
// // //             </label>
// // //             <input
// // //               type="number"
// // //               value={formData.minStock}
// // //               onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
// // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // //                 errors.minStock ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="0"
// // //             />
// // //             {errors.minStock && <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>}
// // //           </div>
// // //         </div>

// // //         {/* Description */}
// // //         <div className="mt-6">
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             Description
// // //           </label>
// // //           <textarea
// // //             value={formData.description}
// // //             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // //             rows={3}
// // //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //             placeholder="Enter product description"
// // //           />
// // //         </div>

// // //         {/* Form Actions */}
// // //         <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
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
// // //             <span>{product ? 'Update Product' : 'Add Product'}</span>
// // //           </button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default ProductForm;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { Save, X } from 'lucide-react';

// // // // interface Product {
// // // //   id: string;
// // // //   name: string;
// // // //   category: string;
// // // //   supplier: string;
// // // //   purchasePrice: number;
// // // //   sellingPrice: number;
// // // //   stock: number;
// // // //   minStock: number;
// // // //   description: string;
// // // // }

// // // // interface ProductFormProps {
// // // //   product?: Product | null;
// // // //   onSave: (product: Omit<Product, 'id'>) => void;
// // // //   onCancel: () => void;
// // // //   suppliers: string[];
// // // //   categories: string[];
// // // // }

// // // // const ProductForm: React.FC<ProductFormProps> = ({
// // // //   product,
// // // //   onSave,
// // // //   onCancel,
// // // //   suppliers,
// // // //   categories
// // // // }) => {
// // // //   const [formData, setFormData] = useState({
// // // //     name: '',
// // // //     category: '',
// // // //     supplier: '',
// // // //     purchasePrice: 0,
// // // //     sellingPrice: 0,
// // // //     stock: 0,
// // // //     minStock: 0,
// // // //     description: ''
// // // //   });

// // // //   const [errors, setErrors] = useState<{[key: string]: string}>({});

// // // //   useEffect(() => {
// // // //     if (product) {
// // // //       setFormData({
// // // //         name: product.name,
// // // //         category: product.category,
// // // //         supplier: product.supplier,
// // // //         purchasePrice: product.purchasePrice,
// // // //         sellingPrice: product.sellingPrice,
// // // //         stock: product.stock,
// // // //         minStock: product.minStock,
// // // //         description: product.description
// // // //       });
// // // //     }
// // // //   }, [product]);

// // // //   const validateForm = () => {
// // // //     const newErrors: {[key: string]: string} = {};

// // // //     if (!formData.name.trim()) newErrors.name = 'Product name is required';
// // // //     if (!formData.category) newErrors.category = 'Category is required';
// // // //     if (!formData.supplier) newErrors.supplier = 'Supplier is required';
// // // //     if (formData.purchasePrice <= 0) newErrors.purchasePrice = 'Purchase price must be greater than 0';
// // // //     if (formData.sellingPrice <= 0) newErrors.sellingPrice = 'Selling price must be greater than 0';
// // // //     if (formData.sellingPrice <= formData.purchasePrice) {
// // // //       newErrors.sellingPrice = 'Selling price must be greater than purchase price';
// // // //     }
// // // //     if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
// // // //     if (formData.minStock < 0) newErrors.minStock = 'Minimum stock cannot be negative';

// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const handleSubmit = (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (validateForm()) {
// // // //       onSave(formData);
// // // //     }
// // // //   };

// // // //   const calculateProfitMargin = () => {
// // // //     if (formData.purchasePrice > 0 && formData.sellingPrice > formData.purchasePrice) {
// // // //       return ((formData.sellingPrice - formData.purchasePrice) / formData.purchasePrice * 100).toFixed(1);
// // // //     }
// // // //     return '0.0';
// // // //   };

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <div className="flex items-center justify-between">
// // // //         <h1 className="text-2xl font-bold text-gray-800">
// // // //           {product ? 'Edit Product' : 'Add New Product'}
// // // //         </h1>
// // // //         <button
// // // //           onClick={onCancel}
// // // //           className="text-gray-500 hover:text-gray-700"
// // // //         >
// // // //           <X size={24} />
// // // //         </button>
// // // //       </div>

// // // //       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //           {/* Product Name */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Product Name *
// // // //             </label>
// // // //             <input
// // // //               type="text"
// // // //               value={formData.name}
// // // //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // // //                 errors.name ? 'border-red-500' : 'border-gray-300'
// // // //               }`}
// // // //               placeholder="Enter product name"
// // // //             />
// // // //             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
// // // //           </div>

// // // //           {/* Category */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Category *
// // // //             </label>
// // // //             <select
// // // //               value={formData.category}
// // // //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // // //                 errors.category ? 'border-red-500' : 'border-gray-300'
// // // //               }`}
// // // //             >
// // // //               <option value="">Select Category</option>
// // // //               {categories.map(category => (
// // // //                 <option key={category} value={category}>{category}</option>
// // // //               ))}
// // // //             </select>
// // // //             {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
// // // //           </div>

// // // //           {/* Supplier */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Supplier *
// // // //             </label>
// // // //             <select
// // // //               value={formData.supplier}
// // // //               onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
// // // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // // //                 errors.supplier ? 'border-red-500' : 'border-gray-300'
// // // //               }`}
// // // //             >
// // // //               <option value="">Select Supplier</option>
// // // //               {suppliers.map(supplier => (
// // // //                 <option key={supplier} value={supplier}>{supplier}</option>
// // // //               ))}
// // // //             </select>
// // // //             {errors.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>}
// // // //           </div>

// // // //           {/* Purchase Price */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Purchase Price (₹) *
// // // //             </label>
// // // //             <input
// // // //               type="number"
// // // //               step="0.01"
// // // //               value={formData.purchasePrice}
// // // //               onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })}
// // // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // // //                 errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
// // // //               }`}
// // // //               placeholder="0.00"
// // // //             />
// // // //             {errors.purchasePrice && <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>}
// // // //           </div>

// // // //           {/* Selling Price */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Selling Price (₹) *
// // // //             </label>
// // // //             <input
// // // //               type="number"
// // // //               step="0.01"
// // // //               value={formData.sellingPrice}
// // // //               onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
// // // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // // //                 errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
// // // //               }`}
// // // //               placeholder="0.00"
// // // //             />
// // // //             {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>}
// // // //             {formData.purchasePrice > 0 && formData.sellingPrice > formData.purchasePrice && (
// // // //               <p className="text-green-600 text-sm mt-1">
// // // //                 Profit Margin: {calculateProfitMargin()}%
// // // //               </p>
// // // //             )}
// // // //           </div>

// // // //           {/* Current Stock */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Current Stock
// // // //             </label>
// // // //             <input
// // // //               type="number"
// // // //               value={formData.stock}
// // // //               onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
// // // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // // //                 errors.stock ? 'border-red-500' : 'border-gray-300'
// // // //               }`}
// // // //               placeholder="0"
// // // //             />
// // // //             {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
// // // //           </div>

// // // //           {/* Minimum Stock */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Minimum Stock Level
// // // //             </label>
// // // //             <input
// // // //               type="number"
// // // //               value={formData.minStock}
// // // //               onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
// // // //               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
// // // //                 errors.minStock ? 'border-red-500' : 'border-gray-300'
// // // //               }`}
// // // //               placeholder="0"
// // // //             />
// // // //             {errors.minStock && <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>}
// // // //           </div>
// // // //         </div>

// // // //         {/* Description */}
// // // //         <div className="mt-6">
// // // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //             Description
// // // //           </label>
// // // //           <textarea
// // // //             value={formData.description}
// // // //             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // // //             rows={3}
// // // //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //             placeholder="Enter product description"
// // // //           />
// // // //         </div>

// // // //         {/* Form Actions */}
// // // //         <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
// // // //           <button
// // // //             type="button"
// // // //             onClick={onCancel}
// // // //             className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
// // // //           >
// // // //             Cancel
// // // //           </button>
// // // //           <button
// // // //             type="submit"
// // // //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// // // //           >
// // // //             <Save size={18} />
// // // //             <span>{product ? 'Update Product' : 'Add Product'}</span>
// // // //           </button>
// // // //         </div>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProductForm;
import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Supplier } from '../../hooks/useSuppliers';
import { useCompanies } from '../../hooks/useCompanies';

interface Product {
  id: string;
  name: string;
  category: string;
  supplierId: string;
  companyId: string;
  purchasePriceWithoutGST: number;
  purchasePriceWithGST: number;
  sellingPrice: number;
  mrp: number;
  stock: number;
  minStock: number;
  description: string;
}

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Omit<Product, 'id' | 'supplier' | 'company'>) => void;
  onCancel: () => void;
  suppliers: Supplier[];
  categories: string[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel,
  suppliers,
  categories
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    supplierId: '',
    companyId: '',
    purchasePrice: 0,
    includesGST: false,
    gstRate: 18, // Default 18% GST, now configurable
    sellingPrice: 0,
    mrp: 0,
    stock: 0,
    minStock: 0,
    description: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { companies } = useCompanies();

  useEffect(() => {
    if (product) {
      // When editing, determine which price to show and checkbox state
      const hasGSTDifference = product.purchasePriceWithGST !== product.purchasePriceWithoutGST;
      
      // Calculate GST rate from existing data
      let calculatedGSTRate = 18; // default
      if (hasGSTDifference && product.purchasePriceWithoutGST > 0) {
        calculatedGSTRate = Math.round(((product.purchasePriceWithGST - product.purchasePriceWithoutGST) / product.purchasePriceWithoutGST) * 100);
      }
      
      setFormData({
        name: product.name,
        category: product.category,
        supplierId: product.supplierId,
        companyId: product.companyId,
        purchasePrice: hasGSTDifference ? product.purchasePriceWithGST : product.purchasePriceWithoutGST,
        includesGST: hasGSTDifference,
        gstRate: calculatedGSTRate,
        sellingPrice: product.sellingPrice,
        mrp: product.mrp,
        stock: product.stock,
        minStock: product.minStock,
        description: product.description
      });
    }
  }, [product]);

  // Calculate GST values
  const calculateGSTValues = () => {
    const gstRateDecimal = formData.gstRate / 100;
    
    if (formData.includesGST) {
      // If price includes GST, calculate price without GST
      const withoutGST = formData.purchasePrice / (1 + gstRateDecimal);
      return {
        withoutGST: parseFloat(withoutGST.toFixed(2)),
        withGST: formData.purchasePrice,
        gstAmount: parseFloat((formData.purchasePrice - withoutGST).toFixed(2))
      };
    } else {
      // If price doesn't include GST, calculate price with GST
      const withGST = formData.purchasePrice * (1 + gstRateDecimal);
      return {
        withoutGST: formData.purchasePrice,
        withGST: parseFloat(withGST.toFixed(2)),
        gstAmount: parseFloat((withGST - formData.purchasePrice).toFixed(2))
      };
    }
  };

  const gstValues = calculateGSTValues();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.supplierId) newErrors.supplierId = 'Supplier is required';
    if (!formData.companyId) newErrors.companyId = 'Company is required';
    if (formData.purchasePrice <= 0) newErrors.purchasePrice = 'Purchase price must be greater than 0';
    if (formData.gstRate < 0 || formData.gstRate > 100) newErrors.gstRate = 'GST rate must be between 0 and 100';
    if (formData.sellingPrice <= 0) newErrors.sellingPrice = 'Selling price must be greater than 0';
    if (formData.mrp <= 0) newErrors.mrp = 'MRP must be greater than 0';
    if (formData.mrp < formData.sellingPrice) {
      newErrors.mrp = 'MRP should be greater than or equal to selling price';
    }
    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
    if (formData.minStock < 0) newErrors.minStock = 'Minimum stock cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert form data to the expected format
      const productData = {
        name: formData.name,
        category: formData.category,
        supplierId: formData.supplierId,
        companyId: formData.companyId,
        purchasePriceWithoutGST: gstValues.withoutGST,
        purchasePriceWithGST: gstValues.withGST,
        sellingPrice: formData.sellingPrice,
        mrp: formData.mrp,
        stock: formData.stock,
        minStock: formData.minStock,
        description: formData.description
      };
      onSave(productData);
    }
  };

  const calculateProfitMargin = () => {
    if (gstValues.withGST > 0 && formData.sellingPrice > gstValues.withGST) {
      return ((formData.sellingPrice - gstValues.withGST) / gstValues.withGST * 100).toFixed(1);
    }
    return '0.0';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          {product ? 'Edit Product' : 'Add New Product'}
        </h1>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Supplier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier *
            </label>
            <select
              value={formData.supplierId}
              onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.supplierId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
              ))}
            </select>
            {errors.supplierId && <p className="text-red-500 text-sm mt-1">{errors.supplierId}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company *
            </label>
            <select
              value={formData.companyId}
              onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.companyId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Company</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
            {errors.companyId && <p className="text-red-500 text-sm mt-1">{errors.companyId}</p>}
          </div>

          {/* GST Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GST Rate (%) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.gstRate}
              onChange={(e) => setFormData({ ...formData, gstRate: parseFloat(e.target.value) || 0 })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.gstRate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="18.00"
            />
            {errors.gstRate && <p className="text-red-500 text-sm mt-1">{errors.gstRate}</p>}
          </div>

          {/* Purchase Price with GST Checkbox */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Price (₹) *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <input
                  type="number"
                  step="0.01"
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includesGST"
                    checked={formData.includesGST}
                    onChange={(e) => setFormData({ ...formData, includesGST: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="includesGST" className="text-sm text-gray-700">
                    Price includes GST
                  </label>
                </div>
                {errors.purchasePrice && <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>}
              </div>
              
              {/* GST Breakdown - Only show when price doesn't include GST */}
              {formData.purchasePrice > 0 && !formData.includesGST && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Price with GST Breakdown</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>₹{gstValues.withoutGST}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST ({formData.gstRate}%):</span>
                      <span>₹{gstValues.gstAmount}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-blue-200 pt-1">
                      <span>Total with GST:</span>
                      <span>₹{gstValues.withGST}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selling Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selling Price (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.sellingPrice}
              onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>}
            {gstValues.withGST > 0 && formData.sellingPrice > gstValues.withGST && (
              <p className="text-green-600 text-sm mt-1">
                Profit Margin: {calculateProfitMargin()}%
              </p>
            )}
          </div>

          {/* MRP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MRP (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.mrp}
              onChange={(e) => setFormData({ ...formData, mrp: parseFloat(e.target.value) || 0 })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.mrp ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.mrp && <p className="text-red-500 text-sm mt-1">{errors.mrp}</p>}
            {formData.mrp > 0 && formData.sellingPrice > 0 && formData.mrp > formData.sellingPrice && (
              <p className="text-purple-600 text-sm mt-1">
                Discount: {(((formData.mrp - formData.sellingPrice) / formData.mrp) * 100).toFixed(1)}%
              </p>
            )}
          </div>

          {/* Current Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Stock
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.stock ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>

          {/* Minimum Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Stock Level
            </label>
            <input
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.minStock ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.minStock && <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product description"
          />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
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
            <span>{product ? 'Update Product' : 'Add Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
