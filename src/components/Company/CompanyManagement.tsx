import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Building2 } from 'lucide-react';
import { useCompanies, Company } from '../../hooks/useCompanies';
import CompanyForm from './CompanyForm';

const CompanyManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { companies, loading, error, addCompany, updateCompany, deleteCompany } = useCompanies();

  const handleAddCompany = async (companyData: Omit<Company, 'id' | 'createdAt'>) => {
    try {
      await addCompany(companyData);
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add company');
    }
  };

  const handleEditCompany = async (companyData: Omit<Company, 'id' | 'createdAt'>) => {
    if (editingCompany) {
      try {
        await updateCompany(editingCompany.id, companyData);
        setEditingCompany(null);
        setShowForm(false);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to update company');
      }
    }
  };

  const handleDeleteCompany = async (id: string) => {
    if (confirm('Are you sure you want to delete this company? This will affect all associated products.')) {
      try {
        await deleteCompany(id);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete company');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading companies...</div>
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

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return (
      <CompanyForm
        company={editingCompany}
        onSave={editingCompany ? handleEditCompany : handleAddCompany}
        onCancel={() => {
          setShowForm(false);
          setEditingCompany(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Company Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Company</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.description}</div>
                        {company.website && (
                          <a 
                            href={company.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {company.website}
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {company.email && <div>{company.email}</div>}
                      {company.phone && <div className="text-gray-500">{company.phone}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {company.address}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingCompany(company);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
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

export default CompanyManagement;
