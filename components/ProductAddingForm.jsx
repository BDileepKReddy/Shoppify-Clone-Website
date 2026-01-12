import React, { useState } from 'react';
import '../styles/ProductAdder.css';
import { supabase } from '../config/supabaseClient';
import API_URL from '../config/api';

async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user.id;
}

function Productadder() {
  const [formData, setFormData] = useState({
    title: '',
    body_html: '',
    isService: false,
    vendor: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const isService = e.target.value === 'true';
    setFormData((prev) => ({ ...prev, isService }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get the Supabase logged‐in user UID
    const userId = await getCurrentUserId();
    if (!userId) {
      alert('Please log in before adding a product.');
      return;
    }
    try {
      // Build payload so that `vendor` is userId, not coming from state
      const productPayload = {
        title: formData.title,
        body_html: formData.body_html,
        vendor: formData.vendor,            // ← set vendor explicitly here
        isService: formData.isService,
        vendorUid: userId, // Add vendorUid to track who created the product
      };
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: productPayload,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Raw 400/500 response text:', text);
        alert('Failed to create product. See console for details.');
        return;
      }
      const data = await res.json();
      console.log('Product created:', data);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      handleReset();
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network error while creating product.');
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      body_html: '',
      vendor: '',
      isService: false,
    });
  };

  return (
    <div className="container">
      <h1 className="heading">Product Adder</h1>
      <form onSubmit={handleSubmit}>
        <label>Product Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Title"
          required
        />
        <label>Product Description</label>
        <input
          type="text"
          name="body_html"
          value={formData.body_html}
          onChange={handleChange}
          placeholder="Enter Description"
          required
        />
        {/* Vendor is no longer an input */}
        <label>Name of Vendor</label>
        <input
          type="text"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          placeholder="Enter Vendor Name"
          required
        />
        <label>Type</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="isService"
              value="false"
              checked={!formData.isService}
              onChange={handleRadioChange}
            />
            Product
          </label>
          <label>
            <input
              type="radio"
              name="isService"
              value="true"
              checked={formData.isService}
              onChange={handleRadioChange}
            />
            Service
          </label>
        </div>
        <button type="button" onClick={handleReset}>Reset</button>
        <button type="submit">Submit</button>
      </form>
      {showPopup && <div className="popup">✅ Product submitted successfully!</div>}
    </div>
  );
}

export default Productadder;

