import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, Package } from 'lucide-react';
import { useTenderProducts, TenderProduct } from '../../hooks/useTenders';
import { useProducts } from '../../hooks/useProducts';

interface Tender {
  id: string;
  name: string;
  tenderNumber: string;
}

interface TenderProductsModalProps {
  tender: Tender;
  onClose: () => void;
}

const TenderProductsModal: React.FC<TenderProductsModalProps> = ({ tender, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TenderProduct | null>(null);
  const [formData, setFormData] = useState({
    productId: '',
    localizedName: '',
    tenderPrice: 0,
    quantityLimit: '',
    notes: ''
  });

  const { tenderProducts, loading, addTenderProduct, updateTenderProduct, deleteTenderProduct } = useTenderProducts(tender.id);
  const { products } = useProducts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productId || !formData.localizedName || formData.tenderPrice <= 0) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const productData = {
        tenderId: tender.id,
        productId: formData.productId,
        localizedName: formData.localizedName,
        tenderPrice: formData.tenderPrice,
        quantityLimit: formData.quantityLimit ? parseInt(formData.quantityLimit) : undefined,
        notes: formData.notes
      };

      if (editingProduct) {
        await updateTenderProduct(editingProduct.id, productData);
      } else {
        await addTenderProduct(productData);
      }

      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        productId: '',
        localizedName: '',
        tenderPrice: 0,
        quantityLimit: '',
        notes: ''
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save tender product');
    }
  };

  const handleEdit = (product: TenderProduct) => {
    setEditingProduct(product);
    setFormData({
      productId: product.productId,
      localizedName: product.localizedName,
      tenderPrice: product.tenderPrice,
      quantityLimit: product.quantityLimit?.toString() || '',
      notes: product.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this product from the tender?')) {
      try {
        await deleteTenderProduct(id);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete tender product');
      }
    }
  };

  const availableProducts = products.filter(product => 
    !tenderProducts.some(tp => tp.productId === product.id)
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Manage Products - {tender.name}
            </h3>
            <p className="text-sm text-gray-600">{tender.tenderNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {!showForm ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium text-gray-800">
                Tender Products ({tenderProducts.length})
              </h4>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm transition-colors"
              >
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-600">Loading products...</div>
              </div>
            ) : tenderProducts.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products added</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding products to this tender.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Details
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tender Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remarks
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tenderProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.localizedName}
                            </div>
                            {/* <div className="text-sm text-gray-500">
                              Original: {product.productName}
                            </div> */}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            ₹{product.tenderPrice.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {product.notes}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
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
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="text-md font-medium text-gray-800">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Product *
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!editingProduct}
                >
                  <option value="">Select a product</option>
                  {(editingProduct ? products : availableProducts).map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ₹{product.sellingPrice}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localized Name *
                </label>
                <input
                  type="text"
                  value={formData.localizedName}
                  onChange={(e) => setFormData({ ...formData, localizedName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tender-specific name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tender Price (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.tenderPrice}
                  onChange={(e) => setFormData({ ...formData, tenderPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity Limit
                </label>
                <input
                  type="number"
                  value={formData.quantityLimit}
                  onChange={(e) => setFormData({ ...formData, quantityLimit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Leave empty for no limit"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Additional notes"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setFormData({
                    productId: '',
                    localizedName: '',
                    tenderPrice: 0,
                    quantityLimit: '',
                    notes: ''
                  });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TenderProductsModal;