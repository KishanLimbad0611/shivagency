import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Tender {
  id: string;
  name: string;
  description: string;
  tenderNumber: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive' | 'Completed' | 'Cancelled';
  totalValue: number;
  notes: string;
}

export interface TenderProduct {
  id: string;
  tenderId: string;
  productId: string;
  productName: string;
  localizedName: string;
  tenderPrice: number;
  quantityLimit?: number;
  notes: string;
}

export const useTenders = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tenders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTenders = data.map(tender => ({
        id: tender.id,
        name: tender.name,
        description: tender.description || '',
        tenderNumber: tender.tender_number,
        clientName: tender.client_name,
        startDate: tender.start_date,
        endDate: tender.end_date,
        status: tender.status as 'Active' | 'Inactive' | 'Completed' | 'Cancelled',
        totalValue: tender.total_value,
        notes: tender.notes || ''
      }));

      setTenders(formattedTenders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addTender = async (tenderData: Omit<Tender, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tenders')
        .insert({
          name: tenderData.name,
          description: tenderData.description || null,
          tender_number: tenderData.tenderNumber,
          client_name: tenderData.clientName,
          start_date: tenderData.startDate,
          end_date: tenderData.endDate,
          status: tenderData.status,
          total_value: tenderData.totalValue,
          notes: tenderData.notes || null
        })
        .select()
        .single();

      if (error) throw error;

      await fetchTenders();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add tender');
    }
  };

  const updateTender = async (id: string, tenderData: Omit<Tender, 'id'>) => {
    try {
      const { error } = await supabase
        .from('tenders')
        .update({
          name: tenderData.name,
          description: tenderData.description || null,
          tender_number: tenderData.tenderNumber,
          client_name: tenderData.clientName,
          start_date: tenderData.startDate,
          end_date: tenderData.endDate,
          status: tenderData.status,
          total_value: tenderData.totalValue,
          notes: tenderData.notes || null
        })
        .eq('id', id);

      if (error) throw error;

      await fetchTenders();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update tender');
    }
  };

  const deleteTender = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tenders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchTenders();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete tender');
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  return {
    tenders,
    loading,
    error,
    addTender,
    updateTender,
    deleteTender,
    refetch: fetchTenders
  };
};

export const useTenderProducts = (tenderId?: string) => {
  const [tenderProducts, setTenderProducts] = useState<TenderProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenderProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('tender_products')
        .select(`
          *,
          products (
            name
          )
        `);

      if (tenderId) {
        query = query.eq('tender_id', tenderId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTenderProducts = data.map(item => ({
        id: item.id,
        tenderId: item.tender_id,
        productId: item.product_id,
        productName: item.products?.name || 'Unknown Product',
        localizedName: item.localized_name,
        tenderPrice: item.tender_price,
        quantityLimit: item.quantity_limit,
        notes: item.notes || ''
      }));

      setTenderProducts(formattedTenderProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addTenderProduct = async (tenderProductData: Omit<TenderProduct, 'id' | 'productName'>) => {
    try {
      const { data, error } = await supabase
        .from('tender_products')
        .insert({
          tender_id: tenderProductData.tenderId,
          product_id: tenderProductData.productId,
          localized_name: tenderProductData.localizedName,
          tender_price: tenderProductData.tenderPrice,
          quantity_limit: tenderProductData.quantityLimit || null,
          notes: tenderProductData.notes || null
        })
        .select()
        .single();

      if (error) throw error;

      await fetchTenderProducts();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add tender product');
    }
  };

  const updateTenderProduct = async (id: string, tenderProductData: Omit<TenderProduct, 'id' | 'productName'>) => {
    try {
      const { error } = await supabase
        .from('tender_products')
        .update({
          tender_id: tenderProductData.tenderId,
          product_id: tenderProductData.productId,
          localized_name: tenderProductData.localizedName,
          tender_price: tenderProductData.tenderPrice,
          quantity_limit: tenderProductData.quantityLimit || null,
          notes: tenderProductData.notes || null
        })
        .eq('id', id);

      if (error) throw error;

      await fetchTenderProducts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update tender product');
    }
  };

  const deleteTenderProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tender_products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchTenderProducts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete tender product');
    }
  };

  useEffect(() => {
    fetchTenderProducts();
  }, [tenderId]);

  return {
    tenderProducts,
    loading,
    error,
    addTenderProduct,
    updateTenderProduct,
    deleteTenderProduct,
    refetch: fetchTenderProducts
  };
};