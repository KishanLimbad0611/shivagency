import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Company {
  id: string;
  name: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      const formattedCompanies = data.map(company => ({
        id: company.id,
        name: company.name,
        description: company.description || '',
        website: company.website || '',
        email: company.email || '',
        phone: company.phone || '',
        address: company.address || '',
        createdAt: company.created_at
      }));

      setCompanies(formattedCompanies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addCompany = async (companyData: Omit<Company, 'id' | 'createdAt'>) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert({
          name: companyData.name,
          description: companyData.description || null,
          website: companyData.website || null,
          email: companyData.email || null,
          phone: companyData.phone || null,
          address: companyData.address || null
        })
        .select()
        .single();

      if (error) throw error;

      await fetchCompanies();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add company');
    }
  };

  const updateCompany = async (id: string, companyData: Omit<Company, 'id' | 'createdAt'>) => {
    try {
      const { error } = await supabase
        .from('companies')
        .update({
          name: companyData.name,
          description: companyData.description || null,
          website: companyData.website || null,
          email: companyData.email || null,
          phone: companyData.phone || null,
          address: companyData.address || null
        })
        .eq('id', id);

      if (error) throw error;

      await fetchCompanies();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update company');
    }
  };

  const deleteCompany = async (id: string) => {
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchCompanies();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete company');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return {
    companies,
    loading,
    error,
    addCompany,
    updateCompany,
    deleteCompany,
    refetch: fetchCompanies
  };
};
