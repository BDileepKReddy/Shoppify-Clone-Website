import React from 'react';
import ItemDashboard from './NoItemsDashboard';

export const ProductPage = () => (
  <ItemDashboard
    title="Products"
    itemName="product"
    illustration={
      <img
        src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-image.png"
        alt="Product Illustration"
        style={{ width: 100 }}
      />
    }
  />
);
