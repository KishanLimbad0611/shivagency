// import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';

// export interface BillItem {
//   productId: string;
//   productName: string;
//   quantity: number;
//   unitPrice: number;
//   total: number;
// }

// export interface Bill {
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

// export const useBills = () => {
//   const [bills, setBills] = useState<Bill[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchBills = async () => {
//     try {
//       setLoading(true);
//       const { data: billsData, error: billsError } = await supabase
//         .from('bills')
//         .select(`
//           *,
//           customers (
//             name
//           ),
//           bill_items (
//             *,
//             products (
//               name
//             )
//           )
//         `)
//         .order('created_at', { ascending: false });

//       if (billsError) throw billsError;

//       const formattedBills = billsData.map(bill => ({
//         id: bill.id,
//         billNumber: bill.bill_number,
//         customerId: bill.customer_id,
//         customerName: bill.customers?.name || 'Unknown Customer',
//         date: bill.date,
//         dueDate: bill.due_date,
//         items: bill.bill_items.map((item: any) => ({
//           productId: item.product_id,
//           productName: item.products?.name || 'Unknown Product',
//           quantity: item.quantity,
//           unitPrice: item.unit_price,
//           total: item.total
//         })),
//         subtotal: bill.subtotal,
//         taxAmount: bill.tax_amount,
//         totalAmount: bill.total_amount,
//         status: bill.status as 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled',
//         paymentMethod: bill.payment_method,
//         notes: bill.notes
//       }));

//       setBills(formattedBills);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateBillNumber = async () => {
//     const { data, error } = await supabase
//       .from('bills')
//       .select('bill_number')
//       .order('created_at', { ascending: false })
//       .limit(1);

//     if (error) throw error;

//     const currentYear = new Date().getFullYear();
//     let nextNumber = 1;

//     if (data && data.length > 0) {
//       const lastBillNumber = data[0].bill_number;
//       const match = lastBillNumber.match(/INV-(\d{4})-(\d{3})/);
//       if (match && parseInt(match[1]) === currentYear) {
//         nextNumber = parseInt(match[2]) + 1;
//       }
//     }

//     return `INV-${currentYear}-${String(nextNumber).padStart(3, '0')}`;
//   };

//   const addBill = async (billData: Omit<Bill, 'id' | 'billNumber'>) => {
//     try {
//       const billNumber = await generateBillNumber();

//       // Insert bill
//       const { data: billResult, error: billError } = await supabase
//         .from('bills')
//         .insert({
//           bill_number: billNumber,
//           customer_id: billData.customerId,
//           date: billData.date,
//           due_date: billData.dueDate,
//           subtotal: billData.subtotal,
//           tax_amount: billData.taxAmount,
//           total_amount: billData.totalAmount,
//           status: billData.status,
//           payment_method: billData.paymentMethod || null,
//           notes: billData.notes || null
//         })
//         .select()
//         .single();

//       if (billError) throw billError;

//       // Insert bill items
//       const billItems = billData.items.map(item => ({
//         bill_id: billResult.id,
//         product_id: item.productId,
//         quantity: item.quantity,
//         unit_price: item.unitPrice,
//         total: item.total
//       }));

//       const { error: itemsError } = await supabase
//         .from('bill_items')
//         .insert(billItems);

//       if (itemsError) throw itemsError;

//       // Update product stock
//       for (const item of billData.items) {
//         const { data: product, error: productError } = await supabase
//           .from('products')
//           .select('stock')
//           .eq('id', item.productId)
//           .single();

//         if (productError) throw productError;

//         const newStock = product.stock - item.quantity;
//         const { error: updateError } = await supabase
//           .from('products')
//           .update({ stock: newStock })
//           .eq('id', item.productId);

//         if (updateError) throw updateError;
//       }

//       // Update customer outstanding amount
//       const { data: customer, error: customerError } = await supabase
//         .from('customers')
//         .select('outstanding_amount')
//         .eq('id', billData.customerId)
//         .single();

//       if (customerError) throw customerError;

//       const newOutstanding = customer.outstanding_amount + billData.totalAmount;
//       const { error: updateCustomerError } = await supabase
//         .from('customers')
//         .update({ 
//           outstanding_amount: newOutstanding,
//           last_order_date: billData.date
//         })
//         .eq('id', billData.customerId);

//       if (updateCustomerError) throw updateCustomerError;

//       await fetchBills();
//       return billResult;
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to create bill');
//     }
//   };

//   const updateBill = async (id: string, billData: Omit<Bill, 'id' | 'billNumber'>) => {
//     try {
//       // Get original bill to calculate stock adjustments
//       const { data: originalBill, error: originalError } = await supabase
//         .from('bills')
//         .select(`
//           *,
//           bill_items (*)
//         `)
//         .eq('id', id)
//         .single();

//       if (originalError) throw originalError;

//       // Update bill
//       const { error: billError } = await supabase
//         .from('bills')
//         .update({
//           customer_id: billData.customerId,
//           date: billData.date,
//           due_date: billData.dueDate,
//           subtotal: billData.subtotal,
//           tax_amount: billData.taxAmount,
//           total_amount: billData.totalAmount,
//           status: billData.status,
//           payment_method: billData.paymentMethod || null,
//           notes: billData.notes || null
//         })
//         .eq('id', id);

//       if (billError) throw billError;

//       // Delete existing bill items
//       const { error: deleteItemsError } = await supabase
//         .from('bill_items')
//         .delete()
//         .eq('bill_id', id);

//       if (deleteItemsError) throw deleteItemsError;

//       // Restore stock from original items
//       for (const item of originalBill.bill_items) {
//         const { data: product, error: productError } = await supabase
//           .from('products')
//           .select('stock')
//           .eq('id', item.product_id)
//           .single();

//         if (productError) throw productError;

//         const restoredStock = product.stock + item.quantity;
//         const { error: updateError } = await supabase
//           .from('products')
//           .update({ stock: restoredStock })
//           .eq('id', item.product_id);

//         if (updateError) throw updateError;
//       }

//       // Insert new bill items
//       const billItems = billData.items.map(item => ({
//         bill_id: id,
//         product_id: item.productId,
//         quantity: item.quantity,
//         unit_price: item.unitPrice,
//         total: item.total
//       }));

//       const { error: itemsError } = await supabase
//         .from('bill_items')
//         .insert(billItems);

//       if (itemsError) throw itemsError;

//       // Update stock with new quantities
//       for (const item of billData.items) {
//         const { data: product, error: productError } = await supabase
//           .from('products')
//           .select('stock')
//           .eq('id', item.productId)
//           .single();

//         if (productError) throw productError;

//         const newStock = product.stock - item.quantity;
//         const { error: updateError } = await supabase
//           .from('products')
//           .update({ stock: newStock })
//           .eq('id', item.productId);

//         if (updateError) throw updateError;
//       }

//       await fetchBills();
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to update bill');
//     }
//   };

//   const deleteBill = async (id: string) => {
//     try {
//       // Get bill items to restore stock
//       const { data: billItems, error: itemsError } = await supabase
//         .from('bill_items')
//         .select('*')
//         .eq('bill_id', id);

//       if (itemsError) throw itemsError;

//       // Restore stock
//       for (const item of billItems) {
//         const { data: product, error: productError } = await supabase
//           .from('products')
//           .select('stock')
//           .eq('id', item.product_id)
//           .single();

//         if (productError) throw productError;

//         const restoredStock = product.stock + item.quantity;
//         const { error: updateError } = await supabase
//           .from('products')
//           .update({ stock: restoredStock })
//           .eq('id', item.product_id);

//         if (updateError) throw updateError;
//       }

//       // Delete bill (items will be deleted by cascade)
//       const { error } = await supabase
//         .from('bills')
//         .delete()
//         .eq('id', id);

//       if (error) throw error;

//       await fetchBills();
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to delete bill');
//     }
//   };

//   useEffect(() => {
//     fetchBills();
//   }, []);

//   return {
//     bills,
//     loading,
//     error,
//     addBill,
//     updateBill,
//     deleteBill,
//     refetch: fetchBills
//   };
// };

//////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface BillItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Bill {
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

export const useBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const { data: billsData, error: billsError } = await supabase
        .from('bills')
        .select(`
          *,
          customers (
            name
          ),
          bill_items (
            *,
            products (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (billsError) throw billsError;

      const formattedBills = billsData.map(bill => ({
        id: bill.id,
        billNumber: bill.bill_number,
        customerId: bill.customer_id,
        customerName: bill.customers?.name || 'Unknown Customer',
        date: bill.date,
        dueDate: bill.due_date,
        items: bill.bill_items.map((item: any) => ({
          productId: item.product_id,
          productName: item.products?.name || 'Unknown Product',
          quantity: item.quantity,
          unitPrice: item.unit_price,
          total: item.total
        })),
        subtotal: bill.subtotal,
        taxAmount: bill.tax_amount,
        totalAmount: bill.total_amount,
        status: bill.status as 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled',
        paymentMethod: bill.payment_method,
        notes: bill.notes
      }));

      setBills(formattedBills);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generateBillNumber = async () => {
    const { data, error } = await supabase
      .from('bills')
      .select('bill_number')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    const currentYear = new Date().getFullYear();
    let nextNumber = 1;

    if (data && data.length > 0) {
      const lastBillNumber = data[0].bill_number;
      const match = lastBillNumber.match(/INV-(\d{4})-(\d{3})/);
      if (match && parseInt(match[1]) === currentYear) {
        nextNumber = parseInt(match[2]) + 1;
      }
    }

    return `INV-${currentYear}-${String(nextNumber).padStart(3, '0')}`;
  };

  const addBill = async (billData: Omit<Bill, 'id' | 'billNumber'>) => {
    try {
      const billNumber = await generateBillNumber();

      // Insert bill
      const { data: billResult, error: billError } = await supabase
        .from('bills')
        .insert({
          bill_number: billNumber,
          customer_id: billData.customerId,
          date: billData.date,
          due_date: billData.dueDate,
          subtotal: billData.subtotal,
          tax_amount: billData.taxAmount,
          total_amount: billData.totalAmount,
          status: billData.status,
          payment_method: billData.paymentMethod || null,
          notes: billData.notes || null
        })
        .select()
        .single();

      if (billError) throw billError;

      // Insert bill items
      const billItems = billData.items.map(item => ({
        bill_id: billResult.id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total: item.total
      }));

      const { error: itemsError } = await supabase
        .from('bill_items')
        .insert(billItems);

      if (itemsError) throw itemsError;

      // Update product stock
      for (const item of billData.items) {
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.productId)
          .single();

        if (productError) throw productError;

        const newStock = product.stock - item.quantity;
        const { error: updateError } = await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.productId);

        if (updateError) throw updateError;
      }

      // Update customer outstanding amount
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('outstanding_amount')
        .eq('id', billData.customerId)
        .single();

      if (customerError) throw customerError;

      const newOutstanding = customer.outstanding_amount + billData.totalAmount;
      const { error: updateCustomerError } = await supabase
        .from('customers')
        .update({ 
          outstanding_amount: newOutstanding,
          last_order_date: billData.date
        })
        .eq('id', billData.customerId);

      if (updateCustomerError) throw updateCustomerError;

      await fetchBills();
      return billResult;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create bill');
    }
  };

  const updateBill = async (id: string, billData: Omit<Bill, 'id' | 'billNumber'>) => {
    try {
      // Get original bill to calculate stock adjustments
      const { data: originalBill, error: originalError } = await supabase
        .from('bills')
        .select(`
          *,
          bill_items (*)
        `)
        .eq('id', id)
        .single();

      if (originalError) throw originalError;

      // Update bill
      const { error: billError } = await supabase
        .from('bills')
        .update({
          customer_id: billData.customerId,
          date: billData.date,
          due_date: billData.dueDate,
          subtotal: billData.subtotal,
          tax_amount: billData.taxAmount,
          total_amount: billData.totalAmount,
          status: billData.status,
          payment_method: billData.paymentMethod || null,
          notes: billData.notes || null
        })
        .eq('id', id);

      if (billError) throw billError;

      // Delete existing bill items
      const { error: deleteItemsError } = await supabase
        .from('bill_items')
        .delete()
        .eq('bill_id', id);

      if (deleteItemsError) throw deleteItemsError;

      // Restore stock from original items
      for (const item of originalBill.bill_items) {
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.product_id)
          .single();

        if (productError) throw productError;

        const restoredStock = product.stock + item.quantity;
        const { error: updateError } = await supabase
          .from('products')
          .update({ stock: restoredStock })
          .eq('id', item.product_id);

        if (updateError) throw updateError;
      }

      // Insert new bill items
      const billItems = billData.items.map(item => ({
        bill_id: id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total: item.total
      }));

      const { error: itemsError } = await supabase
        .from('bill_items')
        .insert(billItems);

      if (itemsError) throw itemsError;

      // Update stock with new quantities
      for (const item of billData.items) {
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.productId)
          .single();

        if (productError) throw productError;

        const newStock = product.stock - item.quantity;
        const { error: updateError } = await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.productId);

        if (updateError) throw updateError;
      }

      await fetchBills();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update bill');
    }
  };

  const deleteBill = async (id: string) => {
    try {
      // Get bill items to restore stock
      const { data: billItems, error: itemsError } = await supabase
        .from('bill_items')
        .select('*')
        .eq('bill_id', id);

      if (itemsError) throw itemsError;

      // Restore stock
      for (const item of billItems) {
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.product_id)
          .single();

        if (productError) throw productError;

        const restoredStock = product.stock + item.quantity;
        const { error: updateError } = await supabase
          .from('products')
          .update({ stock: restoredStock })
          .eq('id', item.product_id);

        if (updateError) throw updateError;
      }

      // Delete bill (items will be deleted by cascade)
      const { error } = await supabase
        .from('bills')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchBills();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete bill');
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return {
    bills,
    loading,
    error,
    addBill,
    updateBill,
    deleteBill,
    refetch: fetchBills
  };
};