// CsvImportModal.jsx
import React, { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';
import styled from 'styled-components';
import {
  Modal,
  Text,
  DropZone,
  Link,
} from '@shopify/polaris';

const supabase = createClient(
  'https://prfizyixtucmllngfnfy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZml6eWl4dHVjbWxsbmdmbmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNTc2OTAsImV4cCI6MjA2MzgzMzY5MH0.giud0_D9m-rcmZhYSukGCNm80jpzoLBlqs8Qk8sov7A'
);

const StyledModal = styled.div`
  .Polaris-Modal-Dialog {
    max-width: 600px;
    padding: 2rem;
  }
`;

const CsvImportModal = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleDrop = useCallback((_dropFiles, acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setParsedData([]);
  }, []);

  const handlePreview = () => {
    if (!file) return alert('Please select a CSV first.');
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: h => h.trim().toLowerCase().replace(/\s+/g, '_'),
      complete: ({ data, errors }) => {
        if (errors.length) return alert('Error parsing CSV. See console.');
        const cleaned = data.filter(row => row && typeof row === 'object');
        if (cleaned.length === 0) return alert('No valid data found in CSV.');
        setParsedData(cleaned);
      },
      error: err => {
        console.error('Parse error:', err);
        alert('Unexpected error while parsing.');
      },
    });
  };

  const handleUpload = useCallback(async () => {
    if (!parsedData.length) return alert('Nothing to upload.');
    setUploading(true);
    try {
      const names = [...new Set(parsedData.map(r => r.name).filter(Boolean))];
      const { data: existing, error } = await supabase.from('Krishna_Aniyor').select('name');
      if (error) throw error;

      const existingNames = existing.map(r => r.name);
      const newRecords = names
        .filter(name => !existingNames.includes(name))
        .map(name => ({ name }));

      if (!newRecords.length) {
        alert('All records already exist.');
        setUploading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('Krishna_Aniyor')
        .insert(newRecords);
      if (insertError) throw insertError;

      alert(`Uploaded ${newRecords.length} new rows.`);
      setFile(null);
      setParsedData([]);
      onClose();
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    }
    setUploading(false);
  }, [parsedData, onClose]);

  return (
    <StyledModal>
      <Modal
        open={open}
        onClose={onClose}
        title="Import products by CSV"
        primaryAction={{
          content: parsedData.length ? 'Upload and preview' : 'Preview CSV',
          onAction: parsedData.length ? handleUpload : handlePreview,
          disabled: uploading || (!parsedData.length && !file),
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: onClose,
            disabled: uploading,
          },
        ]}
      >
        <Modal.Section>
          {!parsedData.length ? (
            <>
              <DropZone accept=".csv" type="file" onDrop={handleDrop}>
  <DropZone.FileUpload actionTitle="Add files" />
</DropZone>

{file && (
  <Text as="p" variant="bodyMd" fontWeight="medium" alignment="center" mt={2}>
    Uploaded: {file.name}
  </Text>
)}

<Text as="p" variant="bodySm" tone="subdued" alignment="center" mt={1}>
  <Link url="/sample.csv" external>
    Download sample CSV
  </Link>
</Text>
            </>
          ) : (
            <>
              <Text as="p" variant="bodyMd" fontWeight="bold">
                Previewing first {Math.min(parsedData.length, 10)} of {parsedData.length} rows
              </Text>
              <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {Object.keys(parsedData[0]).map(header => (
                        <th key={header} style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedData.slice(0, 10).map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((val, j) => (
                          <td key={j} style={{ border: '1px solid #eee', padding: '0.5rem' }}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Modal.Section>
      </Modal>
    </StyledModal>
  );
};

export default CsvImportModal;
