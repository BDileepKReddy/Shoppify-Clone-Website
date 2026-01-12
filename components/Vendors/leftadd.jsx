import {
  Card,
  Select,
  Checkbox,
  TextField,
  BlockStack,
  Text,
  Link,
  Spinner,
} from '@shopify/polaris';
import React, { useState, useEffect } from 'react';
import API_URL from '../../config/api';

export default function Leftadd({
  status,
  setStatus,
  vendor,
  setVendor,
  type,
  setType,
  setPublicationIds,
}) {
  const [collections, setCollections] = useState('');
  const [tags, setTags] = useState('');
  const [themeTemplate, setThemeTemplate] = useState('default');
  const [publicationMap, setPublicationMap] = useState({});
  const [selectedPublications, setSelectedPublications] = useState({});
  const [publications, setPublications] = useState([]);

  // 🧠 Fetch publications on load
  useEffect(() => {
    fetch(`${API_URL}/publications`)
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        if (Array.isArray(data.publications)) {
          data.publications.forEach((pub) => {
            if (pub.name === 'Online Store') map['Online Store'] = pub.id;
            if (pub.name === 'Point of Sale') map['Point of Sale'] = pub.id;
          });
        }
        setPublicationMap(map);
      })
      .catch((err) => {
        console.error('⚠️ Failed to fetch publications:', err);
      });
  }, []);

  // 🧠 Update selected publication IDs when checkboxes change
  useEffect(() => {
    if (typeof setPublicationIds !== 'function') {
      console.warn('setPublicationIds is not a function');
      return;
    }

    const ids = Object.entries(selectedPublications)
      .filter(([_, isChecked]) => isChecked)
      .map(([name]) => publicationMap[name])
      .filter(Boolean);

    setPublicationIds(ids);
  }, [selectedPublications, publicationMap, setPublicationIds]);

  // 🧠 Toggle function for checkboxes
  const toggleChannel = (channel) => {
    setSelectedPublications((prev) => ({
      ...prev,
      [channel]: !prev[channel],
    }));
  };

  return (
    <div style={{ marginLeft: 25 }}>
      <BlockStack gap="400">
        <Card>
          <div style={{ marginBottom: '10px' }}>
            <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment="start">
              Status
            </Text>
          </div>
          <Select
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Draft', value: 'draft' },
              { label: 'Archived', value: 'archived' },
            ]}
            onChange={setStatus}
            value={status}
          />
        </Card>

        <Card>
          <div style={{ marginBottom: '10px' }}>
            <Text variant="bodyLg" as="h2" fontWeight="bold" alignment="start">
              Publishing
            </Text>
          </div>
          <BlockStack gap="200">
            <Text variant="bodyMd" fontWeight="bold" alignment="start">
              Sales channels
            </Text>

            {Object.keys(publicationMap).length === 0 ? (
              <Spinner accessibilityLabel="Loading sales channels" size="small" />
            ) : (
              <>
                <Checkbox
                  label="Online Store"
                  checked={!!selectedPublications['Online Store']}
                  onChange={() => toggleChannel('Online Store')}
                />
                <Checkbox
                  label="Point of Sale"
                  checked={!!selectedPublications['Point of Sale']}
                  onChange={() => toggleChannel('Point of Sale')}
                />
              </>
            )}

            <Text tone="subdued" variant="bodySm" alignment="start">
              Point of Sale has not been set up. <Link url="#">Learn more.</Link>
            </Text>
          </BlockStack>
        </Card>

        <Card>
          <div style={{ marginBottom: '10px' }}>
            <Text variant="bodyMd" fontWeight="bold" alignment="start">
              Product Organization
            </Text>
          </div>
          <BlockStack gap="200">
            <Select
              label="Product Type"
              options={[
                { label: 'Product', value: 'product' },
                { label: 'Service', value: 'service' },
              ]}
              value={type}
              onChange={setType}
            />
            <TextField label="Vendor" value={vendor} onChange={setVendor} />
            <TextField label="Collections" value={collections} onChange={setCollections} />
            <TextField label="Tags" value={tags} onChange={setTags} />
          </BlockStack>
        </Card>

        <Card>
          <div style={{ marginBottom: '10px' }}>
            <Text variant="bodyMd" fontWeight="bold" alignment="start">
              Theme Template
            </Text>
          </div>
          <Select
            options={[
              { label: 'Default Products', value: 'default' },
              { label: 'Custom Template 1', value: 'custom1' },
            ]}
            onChange={setThemeTemplate}
            value={themeTemplate}
          />
        </Card>
      </BlockStack>
    </div>
  );
}
