// import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';

// export interface Product {
//   id: string;
//   name: string;
//   category: string;
//   supplier: string;
//   supplierId: string;
//   purchasePrice: number;
//   sellingPrice: number;
//   stock: number;
//   minStock: number;
//   description: string;
// }

// export const useProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('products')
//         .select(`
//           *,
//           suppliers (
//             name
//           )
//         `)
//         .order('name');

//       if (error) throw error;

//       const formattedProducts = data.map(product => ({
//         id: product.id,
//         name: product.name,
//         category: product.category,
//         supplier: product.suppliers?.name || 'Unknown Supplier',
//         supplierId: product.supplier_id,
//         purchasePrice: product.purchase_price,
//         sellingPrice: product.selling_price,
//         stock: product.stock,
//         minStock: product.min_stock,
//         description: product.description || ''
//       }));

//       setProducts(formattedProducts);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addProduct = async (productData: Omit<Product, 'id' | 'supplier'>) => {
//     try {
//       const { data, error } = await supabase
//         .from('products')
//         .insert({
//           name: productData.name,
//           category: productData.category,
//           supplier_id: productData.supplierId,
//           purchase_price: productData.purchasePrice,
//           selling_price: productData.sellingPrice,
//           stock: productData.stock,
//           min_stock: productData.minStock,
//           description: productData.description || null
//         })
//         .select()
//         .single();

//       if (error) throw error;

//       await fetchProducts();
//       return data;
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to add product');
//     }
//   };

//   const updateProduct = async (id: string, productData: Omit<Product, 'id' | 'supplier'>) => {
//     try {
//       const { error } = await supabase
//         .from('products')
//         .update({
//           name: productData.name,
//           category: productData.category,
//           supplier_id: productData.supplierId,
//           purchase_price: productData.purchasePrice,
//           selling_price: productData.sellingPrice,
//           stock: productData.stock,
//           min_stock: productData.minStock,
//           description: productData.description || null
//         })
//         .eq('id', id);

//       if (error) throw error;

//       await fetchProducts();
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to update product');
//     }
//   };

//   const deleteProduct = async (id: string) => {
//     try {
//       const { error } = await supabase
//         .from('products')
//         .delete()
//         .eq('id', id);

//       if (error) throw error;

//       await fetchProducts();
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to delete product');
//     }
//   };

//   const updateStock = async (id: string, newStock: number) => {
//     try {
//       const { error } = await supabase
//         .from('products')
//         .update({ stock: newStock })
//         .eq('id', id);

//       if (error) throw error;

//       await fetchProducts();
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to update stock');
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return {
//     products,
//     loading,
//     error,
//     addProduct,
//     updateProduct,
//     deleteProduct,
//     updateStock,
//     refetch: fetchProducts
//   };
// };
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  category: string;
  supplier: string;
  supplierId: string;
  company: string; // Add company name
  companyId: string; // Add company ID
  purchasePriceWithoutGST: number;
  purchasePriceWithGST: number;
  sellingPrice: number;
  mrp: number;
  stock: number;
  minStock: number;
  description: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          suppliers (
            name
          )
        `)
        .order('name', { ascending: true });

      if (error) throw error;

      const formattedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        supplier: product.suppliers?.name || 'Unknown Supplier',
        supplierId: product.supplier_id,
        company: product.companies?.name || 'Unknown Company',
        companyId: product.company_id,
        purchasePriceWithoutGST: product.purchase_price_without_gst,
        purchasePriceWithGST: product.purchase_price_with_gst,
        sellingPrice: product.selling_price,
        mrp: product.mrp,
        stock: product.stock,
        minStock: product.min_stock,
        description: product.description || ''
      }));

      setProducts(formattedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'supplier' | 'company'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          category: productData.category,
          supplier_id: productData.supplierId,
          company_id: productData.companyId,
          purchase_price_without_gst: productData.purchasePriceWithoutGST,
          purchase_price_with_gst: productData.purchasePriceWithGST,
          selling_price: productData.sellingPrice,
          mrp: productData.mrp,
          stock: productData.stock,
          min_stock: productData.minStock,
          description: productData.description || null
        })
        .select()
        .single();

      if (error) throw error;

      await fetchProducts();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  const updateProduct = async (id: string, productData: Omit<Product, 'id' | 'supplier' | 'company'>) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: productData.name,
          category: productData.category,
          supplier_id: productData.supplierId,
          company_id: productData.companyId,
          purchase_price_without_gst: productData.purchasePriceWithoutGST,
          purchase_price_with_gst: productData.purchasePriceWithGST,
          selling_price: productData.sellingPrice,
          mrp: productData.mrp,
          stock: productData.stock,
          min_stock: productData.minStock,
          description: productData.description || null
        })
        .eq('id', id);

      if (error) throw error;

      await fetchProducts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update product');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchProducts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const updateStock = async (id: string, newStock: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', id);

      if (error) throw error;

      await fetchProducts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update stock');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    refetch: fetchProducts
  };
};
