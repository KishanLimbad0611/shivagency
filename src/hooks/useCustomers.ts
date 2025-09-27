// import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';

// export interface Customer {
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

// export const useCustomers = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCustomers = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('customers')
//         .select('*')
//         .order('name');

//       if (error) throw error;

//       const formattedCustomers = data.map(customer => ({
//         id: customer.id,
//         name: customer.name,
//         contactPerson: customer.contact_person,
//         email: customer.email,
//         phone: customer.phone,
//         address: customer.address,
//         city: customer.city,
//         state: customer.state,
//         pincode: customer.pincode,
//         gstNumber: customer.gst_number || '',
//         customerType: customer.customer_type as 'Retailer' | 'Wholesaler' | 'Institution' | 'Individual',
//         creditLimit: customer.credit_limit,
//         outstandingAmount: customer.outstanding_amount,
//         status: customer.status as 'Active' | 'Inactive',
//         lastOrderDate: customer.last_order_date
//       }));

//       setCustomers(formattedCustomers);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addCustomer = async (customerData: Omit<Customer, 'id'>) => {
//     try {
//       const { data, error } = await supabase
//         .from('customers')
//         .insert({
//           name: customerData.name,
//           contact_person: customerData.contactPerson,
//           email: customerData.email,
//           phone: customerData.phone,
//           address: customerData.address,
//           city: customerData.city,
//           state: customerData.state,
//           pincode: customerData.pincode,
//           gst_number: customerData.gstNumber || null,
//           customer_type: customerData.customerType,
//           credit_limit: customerData.creditLimit,
//           outstanding_amount: customerData.outstandingAmount,
//           status: customerData.status,
//           last_order_date: customerData.lastOrderDate || null
//         })
//         .select()
//         .single();

//       if (error) throw error;

//       await fetchCustomers();
//       return data;
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to add customer');
//     }
//   };

//   const updateCustomer = async (id: string, customerData: Omit<Customer, 'id'>) => {
//     try {
//       const { error } = await supabase
//         .from('customers')
//         .update({
//           name: customerData.name,
//           contact_person: customerData.contactPerson,
//           email: customerData.email,
//           phone: customerData.phone,
//           address: customerData.address,
//           city: customerData.city,
//           state: customerData.state,
//           pincode: customerData.pincode,
//           gst_number: customerData.gstNumber || null,
//           customer_type: customerData.customerType,
//           credit_limit: customerData.creditLimit,
//           outstanding_amount: customerData.outstandingAmount,
//           status: customerData.status,
//           last_order_date: customerData.lastOrderDate || null
//         })
//         .eq('id', id);

//       if (error) throw error;

//       await fetchCustomers();
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to update customer');
//     }
//   };

//   const deleteCustomer = async (id: string) => {
//     try {
//       const { error } = await supabase
//         .from('customers')
//         .delete()
//         .eq('id', id);

//       if (error) throw error;

//       await fetchCustomers();
//     } catch (err) {
//       throw new Error(err instanceof Error ? err.message : 'Failed to delete customer');
//     }
//   };

//   return {
//     customers,
//     loading,
//     error,
//     addCustomer,
//     updateCustomer,
//     deleteCustomer,
//     refetch: fetchCustomers
//   };
// };
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Customer {
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

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');

      if (error) throw error;

      const formattedCustomers = data.map(customer => ({
        id: customer.id,
        name: customer.name,
        contactPerson: customer.contact_person,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        gstNumber: customer.gst_number || '',
        customerType: customer.customer_type as 'Retailer' | 'Wholesaler' | 'Institution' | 'Individual',
        creditLimit: customer.credit_limit,
        outstandingAmount: customer.outstanding_amount,
        status: customer.status as 'Active' | 'Inactive',
        lastOrderDate: customer.last_order_date
      }));

      setCustomers(formattedCustomers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (customerData: Omit<Customer, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert({
          name: customerData.name,
          contact_person: customerData.contactPerson,
          email: customerData.email,
          phone: customerData.phone,
          address: customerData.address,
          city: customerData.city,
          state: customerData.state,
          pincode: customerData.pincode,
          gst_number: customerData.gstNumber || null,
          customer_type: customerData.customerType,
          credit_limit: customerData.creditLimit,
          outstanding_amount: customerData.outstandingAmount,
          status: customerData.status,
          last_order_date: customerData.lastOrderDate || null
        })
        .select()
        .single();

      if (error) throw error;

      await fetchCustomers();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add customer');
    }
  };

  const updateCustomer = async (id: string, customerData: Omit<Customer, 'id'>) => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({
          name: customerData.name,
          contact_person: customerData.contactPerson,
          email: customerData.email,
          phone: customerData.phone,
          address: customerData.address,
          city: customerData.city,
          state: customerData.state,
          pincode: customerData.pincode,
          gst_number: customerData.gstNumber || null,
          customer_type: customerData.customerType,
          credit_limit: customerData.creditLimit,
          outstanding_amount: customerData.outstandingAmount,
          status: customerData.status,
          last_order_date: customerData.lastOrderDate || null
        })
        .eq('id', id);

      if (error) throw error;

      await fetchCustomers();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update customer');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer: async (id: string) => {
      try {
        const { error } = await supabase
          .from('customers')
          .delete()
          .eq('id', id);

        if (error) throw error;

        await fetchCustomers();
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Failed to delete customer');
      }
    },
    refetch: fetchCustomers
  };
};