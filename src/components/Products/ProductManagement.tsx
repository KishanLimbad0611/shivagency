// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
// import ProductForm from './ProductForm';
// import { useProducts, Product } from '../../hooks/useProducts';
// import { useSuppliers } from '../../hooks/useSuppliers';

// const ProductManagement: React.FC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
//   const { suppliers } = useSuppliers();

//   const categories = ['Paper', 'Writing', 'Notebooks', 'Files', 'Accessories'];

//   const handleAddProduct = async (productData: Omit<Product, 'id' | 'supplier'>) => {
//     try {
//       await addProduct(productData);
//       setShowForm(false);
//     } catch (err) {
//       alert(err instanceof Error ? err.message : 'Failed to add product');
//     }
//   };

//   const handleEditProduct = async (productData: Omit<Product, 'id' | 'supplier'>) => {
//     if (editingProduct) {
//       try {
//         await updateProduct(editingProduct.id, productData);
//         setEditingProduct(null);
//         setShowForm(false);
//       } catch (err) {
//         alert(err instanceof Error ? err.message : 'Failed to update product');
//       }
//     }
//   };

//   const handleDeleteProduct = async (id: string) => {
//     if (confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteProduct(id);
//       } catch (err) {
//         alert(err instanceof Error ? err.message : 'Failed to delete product');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-lg text-gray-600">Loading products...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-lg text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const calculateProfitMargin = (purchase: number, selling: number) => {
//     return ((selling - purchase) / purchase * 100).toFixed(1);
//   };

//   if (showForm) {
//     return (
//       <ProductForm
//         product={editingProduct}
//         onSave={editingProduct ? handleEditProduct : handleAddProduct}
//         onCancel={() => {
//           setShowForm(false);
//           setEditingProduct(null);
//         }}
//         suppliers={suppliers}
//         categories={categories}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//         >
//           <Plus size={20} />
//           <span>Add Product</span>
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products or suppliers..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <div className="relative">
//             <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
//             >
//               <option value="">All Categories</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>

//           <div className="text-sm text-gray-600 flex items-center">
//             Showing {filteredProducts.length} of {products.length} products
//           </div>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Product Details
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Supplier
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Pricing
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Stock
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredProducts.map((product) => (
//                 <tr key={product.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                       <div className="text-sm text-gray-500">{product.description}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                       {product.category}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">{product.supplier}</td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm">
//                       <div>Purchase: ₹{product.purchasePrice}</div>
//                       <div>Selling: ₹{product.sellingPrice}</div>
//                       <div className="text-green-600 font-medium">
//                         Margin: {calculateProfitMargin(product.purchasePrice, product.sellingPrice)}%
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm">
//                       <div className={`font-medium ${product.stock <= product.minStock ? 'text-red-600' : 'text-gray-900'}`}>
//                         Current: {product.stock}
//                       </div>
//                       <div className="text-gray-500">Min: {product.minStock}</div>
//                       {product.stock <= product.minStock && (
//                         <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mt-1">
//                           Low Stock
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => {
//                           setEditingProduct(product);
//                           setShowForm(true);
//                         }}
//                         className="text-blue-600 hover:text-blue-800 p-1 rounded"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteProduct(product.id)}
//                         className="text-red-600 hover:text-red-800 p-1 rounded"
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
//     </div>
//   );
// };

// export default ProductManagement;


// // import React, { useState } from 'react';
// // import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
// // import ProductForm from './ProductForm';

// // interface Product {
// //   id: string;
// //   name: string;
// //   category: string;
// //   supplier: string;
// //   purchasePrice: number;
// //   sellingPrice: number;
// //   stock: number;
// //   minStock: number;
// //   description: string;
// // }

// // const ProductManagement: React.FC = () => {
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedCategory, setSelectedCategory] = useState('');

// //   const [products, setProducts] = useState<Product[]>([
// //     {
// //       id: '1',
// //       name: 'A4 Paper - Premium White',
// //       category: 'Paper',
// //       supplier: 'PaperCorp Ltd',
// //       purchasePrice: 250,
// //       sellingPrice: 300,
// //       stock: 150,
// //       minStock: 20,
// //       description: 'High-quality A4 paper for office use'
// //     },
// //     {
// //       id: '2',
// //       name: 'Blue Gel Pen - 0.7mm',
// //       category: 'Writing',
// //       supplier: 'PenWorld Inc',
// //       purchasePrice: 15,
// //       sellingPrice: 25,
// //       stock: 500,
// //       minStock: 50,
// //       description: 'Smooth writing gel pen'
// //     },
// //     {
// //       id: '3',
// //       name: 'Spiral Notebook - 200 Pages',
// //       category: 'Notebooks',
// //       supplier: 'BookMakers Co',
// //       purchasePrice: 45,
// //       sellingPrice: 65,
// //       stock: 75,
// //       minStock: 30,
// //       description: 'Quality spiral bound notebook'
// //     }
// //   ]);

// //   const categories = ['Paper', 'Writing', 'Notebooks', 'Files', 'Accessories'];

// //   const handleAddProduct = (productData: Omit<Product, 'id'>) => {
// //     const newProduct: Product = {
// //       ...productData,
// //       id: Date.now().toString()
// //     };
// //     setProducts([...products, newProduct]);
// //     setShowForm(false);
// //   };

// //   const handleEditProduct = (productData: Omit<Product, 'id'>) => {
// //     if (editingProduct) {
// //       setProducts(products.map(p => 
// //         p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
// //       ));
// //       setEditingProduct(null);
// //       setShowForm(false);
// //     }
// //   };

// //   const handleDeleteProduct = (id: string) => {
// //     if (confirm('Are you sure you want to delete this product?')) {
// //       setProducts(products.filter(p => p.id !== id));
// //     }
// //   };

// //   const filteredProducts = products.filter(product => {
// //     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
// //     return matchesSearch && matchesCategory;
// //   });

// //   const calculateProfitMargin = (purchase: number, selling: number) => {
// //     return ((selling - purchase) / purchase * 100).toFixed(1);
// //   };

// //   if (showForm) {
// //     return (
// //       <ProductForm
// //         product={editingProduct}
// //         onSave={editingProduct ? handleEditProduct : handleAddProduct}
// //         onCancel={() => {
// //           setShowForm(false);
// //           setEditingProduct(null);
// //         }}
// //         suppliers={['PaperCorp Ltd', 'PenWorld Inc', 'BookMakers Co', 'OfficeMax', 'Stationary Plus']}
// //         categories={categories}
// //       />
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
// //         <button
// //           onClick={() => setShowForm(true)}
// //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// //         >
// //           <Plus size={20} />
// //           <span>Add Product</span>
// //         </button>
// //       </div>

// //       {/* Filters */}
// //       <div className="bg-white rounded-lg shadow-md p-4">
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <div className="relative">
// //             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search products or suppliers..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             />
// //           </div>

// //           <div className="relative">
// //             <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //             <select
// //               value={selectedCategory}
// //               onChange={(e) => setSelectedCategory(e.target.value)}
// //               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
// //             >
// //               <option value="">All Categories</option>
// //               {categories.map(category => (
// //                 <option key={category} value={category}>{category}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="text-sm text-gray-600 flex items-center">
// //             Showing {filteredProducts.length} of {products.length} products
// //           </div>
// //         </div>
// //       </div>

// //       {/* Products Table */}
// //       <div className="bg-white rounded-lg shadow-md overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Product Details
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Category
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Supplier
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Pricing
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Stock
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {filteredProducts.map((product) => (
// //                 <tr key={product.id} className="hover:bg-gray-50">
// //                   <td className="px-6 py-4">
// //                     <div>
// //                       <div className="text-sm font-medium text-gray-900">{product.name}</div>
// //                       <div className="text-sm text-gray-500">{product.description}</div>
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
// //                       {product.category}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-900">{product.supplier}</td>
// //                   <td className="px-6 py-4">
// //                     <div className="text-sm">
// //                       <div>Purchase: ₹{product.purchasePrice}</div>
// //                       <div>Selling: ₹{product.sellingPrice}</div>
// //                       <div className="text-green-600 font-medium">
// //                         Margin: {calculateProfitMargin(product.purchasePrice, product.sellingPrice)}%
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <div className="text-sm">
// //                       <div className={`font-medium ${product.stock <= product.minStock ? 'text-red-600' : 'text-gray-900'}`}>
// //                         Current: {product.stock}
// //                       </div>
// //                       <div className="text-gray-500">Min: {product.minStock}</div>
// //                       {product.stock <= product.minStock && (
// //                         <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mt-1">
// //                           Low Stock
// //                         </span>
// //                       )}
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <div className="flex space-x-2">
// //                       <button
// //                         onClick={() => {
// //                           setEditingProduct(product);
// //                           setShowForm(true);
// //                         }}
// //                         className="text-blue-600 hover:text-blue-800 p-1 rounded"
// //                       >
// //                         <Edit size={16} />
// //                       </button>
// //                       <button
// //                         onClick={() => handleDeleteProduct(product.id)}
// //                         className="text-red-600 hover:text-red-800 p-1 rounded"
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
// //     </div>
// //   );
// // };

// // export default ProductManagement;
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import ProductForm from './ProductForm';
import { useProducts, Product } from '../../hooks/useProducts';
import { useSuppliers } from '../../hooks/useSuppliers';

const ProductManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const { suppliers } = useSuppliers();

  const categories = ['Paper', 'Writing', 'Notebooks', 'Files', 'Accessories'];

  const handleAddProduct = async (productData: Omit<Product, 'id' | 'supplier'>) => {
    try {
      await addProduct(productData);
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  const handleEditProduct = async (productData: Omit<Product, 'id' | 'supplier'>) => {
    if (editingProduct) {
      try {
        await updateProduct(editingProduct.id, productData);
        setEditingProduct(null);
        setShowForm(false);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to update product');
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete product');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading products...</div>
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateProfitMargin = (purchaseWithGST: number, selling: number) => {
    return ((selling - purchaseWithGST) / purchaseWithGST * 100).toFixed(1);
  };

  const calculateDiscount = (mrp: number, selling: number) => {
    return ((mrp - selling) / mrp * 100).toFixed(1);
  };

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={editingProduct ? handleEditProduct : handleAddProduct}
        onCancel={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
        suppliers={suppliers}
        categories={categories}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.supplier}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm space-y-1">
                      <div>Purchase (ex-GST): ₹{product.purchasePriceWithoutGST}</div>
                      <div>Purchase (inc-GST): ₹{product.purchasePriceWithGST}</div>
                      <div>Selling: ₹{product.sellingPrice}</div>
                      <div>MRP: ₹{product.mrp}</div>
                      <div className="text-green-600 font-medium">
                        Margin: {calculateProfitMargin(product.purchasePriceWithGST, product.sellingPrice)}%
                      </div>
                      {product.mrp > product.sellingPrice && (
                        <div className="text-purple-600 font-medium">
                          Discount: {calculateDiscount(product.mrp, product.sellingPrice)}%
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className={`font-medium ${product.stock <= product.minStock ? 'text-red-600' : 'text-gray-900'}`}>
                        Current: {product.stock}
                      </div>
                      <div className="text-gray-500">Min: {product.minStock}</div>
                      {product.stock <= product.minStock && (
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mt-1">
                          Low Stock
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
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
    </div>
  );
};

export default ProductManagement;
