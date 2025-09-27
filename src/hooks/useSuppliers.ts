import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Supplier {
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
  paymentTerms: string;
  creditLimit: number;
  status: 'Active' | 'Inactive';
}

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');

      if (error) throw error;

      const formattedSuppliers = data.map(supplier => ({
        id: supplier.id,
        name: supplier.name,
        contactPerson: supplier.contact_person,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        city: supplier.city,
        state: supplier.state,
        pincode: supplier.pincode,
        gstNumber: supplier.gst_number || '',
        paymentTerms: supplier.payment_terms,
        creditLimit: supplier.credit_limit,
        status: supplier.status as 'Active' | 'Inactive'
      }));

      setSuppliers(formattedSuppliers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addSupplier = async (supplierData: Omit<Supplier, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .insert({
          name: supplierData.name,
          contact_person: supplierData.contactPerson,
          email: supplierData.email,
          phone: supplierData.phone,
          address: supplierData.address,
          city: supplierData.city,
          state: supplierData.state,
          pincode: supplierData.pincode,
          gst_number: supplierData.gstNumber || null,
          payment_terms: supplierData.paymentTerms,
          credit_limit: supplierData.creditLimit,
          status: supplierData.status
        })
        .select()
        .single();

      if (error) throw error;

      await fetchSuppliers();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add supplier');
    }
  };

  const updateSupplier = async (id: string, supplierData: Omit<Supplier, 'id'>) => {
    try {
      const { error } = await supabase
        .from('suppliers')
        .update({
          name: supplierData.name,
          contact_person: supplierData.contactPerson,
          email: supplierData.email,
          phone: supplierData.phone,
          address: supplierData.address,
          city: supplierData.city,
          state: supplierData.state,
          pincode: supplierData.pincode,
          gst_number: supplierData.gstNumber || null,
          payment_terms: supplierData.paymentTerms,
          credit_limit: supplierData.creditLimit,
          status: supplierData.status
        })
        .eq('id', id);

      if (error) throw error;

      await fetchSuppliers();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update supplier');
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchSuppliers();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete supplier');
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return {
    suppliers,
    loading,
    error,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    refetch: fetchSuppliers
  };
};