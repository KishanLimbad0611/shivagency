import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Calendar, FileText, Users, Package } from 'lucide-react';
import TenderForm from './TenderForm';
import TenderProductsModal from './TenderProductsModal';
import { useTenders, Tender } from '../../hooks/useTenders';

const TenderManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTender, setEditingTender] = useState<Tender | null>(null);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { tenders, loading, error, addTender, updateTender, deleteTender } = useTenders();

  const handleAddTender = async (tenderData: Omit<Tender, 'id'>) => {
    try {
      await addTender(tenderData);
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add tender');
    }
  };

  const handleEditTender = async (tenderData: Omit<Tender, 'id'>) => {
    if (editingTender) {
      try {
        await updateTender(editingTender.id, tenderData);
        setEditingTender(null);
        setShowForm(false);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to update tender');
      }
    }
  };

  const handleDeleteTender = async (id: string) => {
    if (confirm('Are you sure you want to delete this tender? This will also delete all associated products.')) {
      try {
        await deleteTender(id);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete tender');
      }
    }
  };

  const handleManageProducts = (tender: Tender) => {
    setSelectedTender(tender);
    setShowProductsModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading tenders...</div>
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

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.tenderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || tender.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showForm) {
    return (
      <TenderForm
        tender={editingTender}
        onSave={editingTender ? handleEditTender : handleAddTender}
        onCancel={() => {
          setShowForm(false);
          setEditingTender(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tender Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Tender</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tenders</p>
              <p className="text-2xl font-bold text-gray-900">{tenders.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Tenders</p>
              <p className="text-2xl font-bold text-green-600">
                {tenders.filter(t => t.status === 'Active').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{tenders.reduce((sum, tender) => sum + tender.totalValue, 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {tenders.filter(t => t.status === 'Completed').length}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tenders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredTenders.length} of {tenders.length} tenders
          </div>
        </div>
      </div>

      {/* Tenders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenders.map((tender) => (
          <div key={tender.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{tender.name}</h3>
                  <p className="text-sm text-gray-600">{tender.tenderNumber}</p>
                  <p className="text-sm text-gray-600">{tender.clientName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tender.status)}`}>
                  {tender.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span>{new Date(tender.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>End Date:</span>
                  <span>{new Date(tender.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Value:</span>
                  <span className="font-medium">₹{tender.totalValue.toLocaleString()}</span>
                </div>
              </div>

              {tender.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tender.description}</p>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleManageProducts(tender)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
                >
                  <Package size={14} />
                  <span>Manage Products</span>
                </button>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingTender(tender);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTender(tender.id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTenders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tenders found matching your criteria.</p>
        </div>
      )}

      {/* Tender Products Modal */}
      {showProductsModal && selectedTender && (
        <TenderProductsModal
          tender={selectedTender}
          onClose={() => {
            setShowProductsModal(false);
            setSelectedTender(null);
          }}
        />
      )}
    </div>
  );
};

export default TenderManagement;
// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Search, Calendar, FileText, Users, Package, Download, FileSpreadsheet, FileImage } from 'lucide-react';
// import TenderForm from './TenderForm';
// import TenderProductsModal from './TenderProductsModal';
// import { useTenders, Tender } from '../../hooks/useTenders';
// import { useTenderProducts } from '../../hooks/useTenders';

// // Download utility functions
// const downloadUtils = {
//   // Generate CSV content for tender with products
//   generateTenderCSV: (tender: Tender, tenderProducts: any[]) => {
//     const headers = [
//       'Tender Name', 'Tender Number', 'Client Name', 'Status', 'Start Date', 'End Date', 
//       'Total Value', 'Product Name', 'Tender Price', 'Quantity Limit', 'Notes'
//     ];
    
//     let csvContent = headers.join(',') + '\n';
    
//     // Add tender header row
//     const tenderRow = [
//       `"${tender.name}"`, `"${tender.tenderNumber}"`, `"${tender.clientName}"`, 
//       `"${tender.status}"`, `"${tender.startDate}"`, `"${tender.endDate}"`,
//       `"${tender.totalValue}"`, '', '', '', ''
//     ];
//     csvContent += tenderRow.join(',') + '\n';
    
//     // Add separator row
//     csvContent += ',,,,,,,"--- PRODUCTS ---",,\n';
    
//     // Add product rows
//     if (tenderProducts.length > 0) {
//       tenderProducts.forEach(product => {
//         const productRow = [
//           '', '', '', '', '', '', '',
//           `"${product.localizedName}"`,
//           `"${product.tenderPrice}"`,
//           `"${product.quantityLimit || 'No Limit'}"`,
//           `"${product.notes || ''}"`
//         ];
//         csvContent += productRow.join(',') + '\n';
//       });
//     } else {
//       csvContent += ',,,,,,,"No products added",,\n';
//     }
    
//     return csvContent;
//   },

//   // Generate detailed tender report
//   generateTenderReport: (tender: Tender, tenderProducts: any[]) => {
//     const totalProducts = tenderProducts.length;
//     const totalTenderValue = tenderProducts.reduce((sum, product) => sum + product.tenderPrice, 0);
    
//     return `
// TENDER REPORT
// =============

// Tender Information:
// ------------------
// Name: ${tender.name}
// Tender Number: ${tender.tenderNumber}
// Client: ${tender.clientName}
// Status: ${tender.status}
// Start Date: ${new Date(tender.startDate).toLocaleDateString()}
// End Date: ${new Date(tender.endDate).toLocaleDateString()}
// Description: ${tender.description || 'No description provided'}
// Total Value: ₹${tender.totalValue.toLocaleString()}
// Notes: ${tender.notes || 'No notes'}

// Product Summary:
// ---------------
// Total Products: ${totalProducts}
// Total Product Value: ₹${totalTenderValue.toLocaleString()}

// Product Details:
// ---------------
// ${tenderProducts.length > 0 ? 
//   tenderProducts.map((product, index) => `
// ${index + 1}. ${product.localizedName}
//    Price: ₹${product.tenderPrice.toLocaleString()}
//    Quantity Limit: ${product.quantityLimit || 'No Limit'}
//    Notes: ${product.notes || 'None'}
// `).join('') : 'No products added to this tender.'}

// Generated on: ${new Date().toLocaleString()}
//     `.trim();
//   },

//   // Download file
//   downloadFile: (content: string, filename: string, mimeType: string) => {
//     const blob = new Blob([content], { type: mimeType });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   }
// };

// // Download Component
// const TenderDownloadMenu: React.FC<{ tender: Tender; onDownload: (tender: Tender, format: 'csv' | 'txt' | 'json') => Promise<void>}> = ({ 
//   tender, 
//   onDownload 
// }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowMenu(!showMenu)}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
//       >
//         <Download size={14} />
//         <span>Download</span>
//       </button>

//       {showMenu && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//           <div className="py-1">
//             <button
//               onClick={() => {
//                 onDownload(tender, 'csv');
//                 setShowMenu(false);
//               }}
//               className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//             >
//               <FileSpreadsheet size={16} />
//               <span>Download as CSV</span>
//             </button>
//             <button
//               onClick={() => {
//                 onDownload(tender, 'txt');
//                 setShowMenu(false);
//               }}
//               className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//             >
//               <FileText size={16} />
//               <span>Download as Report</span>
//             </button>
//             <button
//               onClick={() => {
//                 onDownload(tender, 'json');
//                 setShowMenu(false);
//               }}
//               className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//             >
//               <FileImage size={16} />
//               <span>Download as JSON</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const TenderManagement: React.FC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingTender, setEditingTender] = useState<Tender | null>(null);
//   const [showProductsModal, setShowProductsModal] = useState(false);
//   const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [downloadingTender, setDownloadingTender] = useState<string | null>(null);

//   const { tenders, loading, error, addTender, updateTender, deleteTender } = useTenders();

//   const handleAddTender = async (tenderData: Omit<Tender, 'id'>) => {
//     try {
//       await addTender(tenderData);
//       setShowForm(false);
//     } catch (err) {
//       alert(err instanceof Error ? err.message : 'Failed to add tender');
//     }
//   };

//   const handleEditTender = async (tenderData: Omit<Tender, 'id'>) => {
//     if (editingTender) {
//       try {
//         await updateTender(editingTender.id, tenderData);
//         setEditingTender(null);
//         setShowForm(false);
//       } catch (err) {
//         alert(err instanceof Error ? err.message : 'Failed to update tender');
//       }
//     }
//   };

//   const handleDeleteTender = async (id: string) => {
//     if (confirm('Are you sure you want to delete this tender? This will also delete all associated products.')) {
//       try {
//         await deleteTender(id);
//       } catch (err) {
//         alert(err instanceof Error ? err.message : 'Failed to delete tender');
//       }
//     }
//   };

//   const handleManageProducts = (tender: Tender) => {
//     setSelectedTender(tender);
//     setShowProductsModal(true);
//   };

//   // Download tender with products
//   const handleDownloadTender = async (tender: Tender, format: 'csv' | 'txt' | 'json') => {
//     setDownloadingTender(tender.id);
    
//     try {
//       // Fetch tender products - you'll need to implement this hook or API call
//       // const { tenderProducts } = useTenderProducts(tender.id);
//       // For now, I'll use a placeholder - replace this with actual data fetching
      
//       // This is where you would fetch the actual tender products
//       // const tenderProducts = await fetchTenderProducts(tender.id);
//       const tenderProducts: any[] = []; // Placeholder - replace with actual data
      
//       const timestamp = new Date().toISOString().slice(0, 10);
//       const safeTenderName = tender.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      
//       switch (format) {
//         case 'csv':
//           const csvContent = downloadUtils.generateTenderCSV(tender, tenderProducts);
//           downloadUtils.downloadFile(
//             csvContent, 
//             `tender_${safeTenderName}_${timestamp}.csv`, 
//             'text/csv'
//           );
//           break;
          
//         case 'txt':
//           const reportContent = downloadUtils.generateTenderReport(tender, tenderProducts);
//           downloadUtils.downloadFile(
//             reportContent, 
//             `tender_report_${safeTenderName}_${timestamp}.txt`, 
//             'text/plain'
//           );
//           break;
          
//         case 'json':
//           const jsonContent = JSON.stringify({
//             tender,
//             products: tenderProducts,
//             generatedOn: new Date().toISOString(),
//             summary: {
//               totalProducts: tenderProducts.length,
//               totalProductValue: tenderProducts.reduce((sum, p) => sum + p.tenderPrice, 0)
//             }
//           }, null, 2);
//           downloadUtils.downloadFile(
//             jsonContent, 
//             `tender_${safeTenderName}_${timestamp}.json`, 
//             'application/json'
//           );
//           break;
//       }
//     } catch (error) {
//       alert('Failed to download tender data. Please try again.');
//     } finally {
//       setDownloadingTender(null);
//     }
//   };

//   // Bulk download all tenders
//   const handleBulkDownload = async (format: 'csv' | 'json') => {
//     try {
//       const timestamp = new Date().toISOString().slice(0, 10);
      
//       if (format === 'csv') {
//         let csvContent = 'Tender Name,Tender Number,Client Name,Status,Start Date,End Date,Total Value,Description,Notes\n';
        
//         tenders.forEach(tender => {
//           const row = [
//             `"${tender.name}"`,
//             `"${tender.tenderNumber}"`,
//             `"${tender.clientName}"`,
//             `"${tender.status}"`,
//             `"${tender.startDate}"`,
//             `"${tender.endDate}"`,
//             `"${tender.totalValue}"`,
//             `"${tender.description || ''}"`,
//             `"${tender.notes || ''}"`
//           ];
//           csvContent += row.join(',') + '\n';
//         });
        
//         downloadUtils.downloadFile(csvContent, `all_tenders_${timestamp}.csv`, 'text/csv');
//       } else {
//         const jsonContent = JSON.stringify({
//           tenders,
//           generatedOn: new Date().toISOString(),
//           summary: {
//             totalTenders: tenders.length,
//             activeTenders: tenders.filter(t => t.status === 'Active').length,
//             totalValue: tenders.reduce((sum, t) => sum + t.totalValue, 0)
//           }
//         }, null, 2);
        
//         downloadUtils.downloadFile(jsonContent, `all_tenders_${timestamp}.json`, 'application/json');
//       }
//     } catch (error) {
//       alert('Failed to download tender data. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-lg text-gray-600">Loading tenders...</div>
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

//   const filteredTenders = tenders.filter(tender => {
//     const matchesSearch = tender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          tender.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          tender.tenderNumber.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === '' || tender.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Active': return 'bg-green-100 text-green-800';
//       case 'Completed': return 'bg-blue-100 text-blue-800';
//       case 'Inactive': return 'bg-gray-100 text-gray-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (showForm) {
//     return (
//       <TenderForm
//         tender={editingTender}
//         onSave={editingTender ? handleEditTender : handleAddTender}
//         onCancel={() => {
//           setShowForm(false);
//           setEditingTender(null);
//         }}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Tender Management</h1>
//         <div className="flex space-x-3">
//           {/* Bulk Download Options */}
//           <div className="relative">
//             <button
//               onClick={() => {}}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//             >
//               <Download size={18} />
//               <span>Bulk Download</span>
//             </button>
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 hidden group-hover:block">
//               <div className="py-1">
//                 <button
//                   onClick={() => handleBulkDownload('csv')}
//                   className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                 >
//                   <FileSpreadsheet size={16} />
//                   <span>All Tenders (CSV)</span>
//                 </button>
//                 <button
//                   onClick={() => handleBulkDownload('json')}
//                   className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                 >
//                   <FileImage size={16} />
//                   <span>All Tenders (JSON)</span>
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//           >
//             <Plus size={20} />
//             <span>Add Tender</span>
//           </button>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Tenders</p>
//               <p className="text-2xl font-bold text-gray-900">{tenders.length}</p>
//             </div>
//             <FileText className="w-8 h-8 text-blue-500" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Active Tenders</p>
//               <p className="text-2xl font-bold text-green-600">
//                 {tenders.filter(t => t.status === 'Active').length}
//               </p>
//             </div>
//             <Calendar className="w-8 h-8 text-green-500" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Value</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ₹{tenders.reduce((sum, tender) => sum + tender.totalValue, 0).toLocaleString()}
//               </p>
//             </div>
//             <Users className="w-8 h-8 text-purple-500" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Completed</p>
//               <p className="text-2xl font-bold text-blue-600">
//                 {tenders.filter(t => t.status === 'Completed').length}
//               </p>
//             </div>
//             <Package className="w-8 h-8 text-blue-500" />
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search tenders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//             <option value="Completed">Completed</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>

//           <div className="text-sm text-gray-600 flex items-center">
//             Showing {filteredTenders.length} of {tenders.length} tenders
//           </div>
//         </div>
//       </div>

//       {/* Tenders Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {filteredTenders.map((tender) => (
//           <div key={tender.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">{tender.name}</h3>
//                   <p className="text-sm text-gray-600">{tender.tenderNumber}</p>
//                   <p className="text-sm text-gray-600">{tender.clientName}</p>
//                 </div>
//                 <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tender.status)}`}>
//                   {tender.status}
//                 </span>
//               </div>

//               <div className="space-y-2 text-sm text-gray-600 mb-4">
//                 <div className="flex justify-between">
//                   <span>Start Date:</span>
//                   <span>{new Date(tender.startDate).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>End Date:</span>
//                   <span>{new Date(tender.endDate).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Total Value:</span>
//                   <span className="font-medium">₹{tender.totalValue.toLocaleString()}</span>
//                 </div>
//               </div>

//               {tender.description && (
//                 <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tender.description}</p>
//               )}

//               <div className="flex items-center justify-between space-x-2">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleManageProducts(tender)}
//                     className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
//                   >
//                     <Package size={14} />
//                     <span>Products</span>
//                   </button>

//                   <TenderDownloadMenu 
//                     tender={tender} 
//                     onDownload={handleDownloadTender}
//                   />
//                 </div>

//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => {
//                       setEditingTender(tender);
//                       setShowForm(true);
//                     }}
//                     className="text-blue-600 hover:text-blue-800 p-1 rounded"
//                   >
//                     <Edit size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteTender(tender.id)}
//                     className="text-red-600 hover:text-red-800 p-1 rounded"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>

//               {downloadingTender === tender.id && (
//                 <div className="mt-2 text-sm text-blue-600 flex items-center space-x-1">
//                   <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
//                   <span>Preparing download...</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredTenders.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No tenders found matching your criteria.</p>
//         </div>
//       )}

//       {/* Tender Products Modal */}
//       {showProductsModal && selectedTender && (
//         <TenderProductsModal
//           tender={selectedTender}
//           onClose={() => {
//             setShowProductsModal(false);
//             setSelectedTender(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default TenderManagement;