import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from '../config/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    body_html: "",
    vendor: "",
    vendorUid: "",
    productType: "Product",
    status: "active",
    price: "0.00",
    categoryId: "",
    publicationIds: [],
  });

  useEffect(() => {
    fetchPublications();
    fetchCategories();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axios.get(`${API_URL}/publications`);
      setPublications(response.data.publications);
    } catch (err) {
      console.error("Failed to fetch publications:", err);
      setError("Failed to load publications");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data.categories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError("Failed to load categories");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
    setFormData(prev => ({
      ...prev,
      categoryId: categoryId
    }));
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    setSelectedSubcategory(subcategoryId);
    setFormData(prev => ({
      ...prev,
      categoryId: subcategoryId
    }));
  };

  const handlePublicationChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      publicationIds: checked
        ? [...prev.publicationIds, value]
        : prev.publicationIds.filter((id) => id !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/products`, {
        product: formData,
      });

      if (response.data.message) {
        navigate("/products");
      }
    } catch (err) {
      console.error("Failed to create product:", err);
      setError(err.response?.data?.error || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="body_html"
            value={formData.body_html}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vendor</label>
          <input
            type="text"
            name="vendor"
            value={formData.vendor}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vendor UID</label>
          <input
            type="text"
            name="vendorUid"
            value={formData.vendorUid}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategoryData?.subcategories?.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a subcategory</option>
              {selectedCategoryData.subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Type</label>
          <input
            type="text"
            name="productType"
            value={formData.productType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publish to Channels
          </label>
          <div className="space-y-2">
            {publications.map((pub) => (
              <div key={pub.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={pub.id}
                  value={pub.id}
                  checked={formData.publicationIds.includes(pub.id)}
                  onChange={handlePublicationChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={pub.id}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {pub.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct; 