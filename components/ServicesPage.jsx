import React from 'react';
import ItemDashboard from './NoItemsDashboard';

export const ServicePage = () => (
  <ItemDashboard
    title="Services"
    itemName="service"
    illustration={
      <img
        src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-image.png"
        alt="Service Illustration"
        style={{ width: 100 }}
      />
    }
  />
);
