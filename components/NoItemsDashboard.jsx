import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, Icon, Text, Page, Layout } from '@shopify/polaris';
import { ImportIcon } from '@shopify/polaris-icons';
import SideBar from './Sidebar';
import MainNavbar from './MainNavbar';
import CsvImportModal from './CSVImportPopUp';
import logo from '../assets/Noitemslogo.png';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardContainer = styled.div`
  padding: 4rem;
  background-color: #f6f6f7;
  min-height: 100vh;
  width: 100vw;
`;

const CardWrapper = styled.div`
  max-width: 800px;
  margin: 0 40px;
`;

const CustomTitle = styled(Text)`
  font-size: 2rem;
  font-weight: 600;
`;

const BottomCard = styled.div`
  background-color: #F3F3F3;
  padding: 1.5rem;
  border-radius: 12px;
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 60px 20px;
`;

const Illustration = styled.img`
  max-width: 100px;
  height: auto;
  flex-shrink: 0;
  margin-right: 5rem;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ActionArea1 = styled.div`
  margin: 10px 20px;
`;

const ImportButton = styled.button`
  background-color:rgb(255, 255, 255);
  border-radius: 6px;
  padding: 4px 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  border: none;
  height: 30px;
  margin: 2px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba( 0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ItemDashboard = ({ title, itemName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleAddProduct = () => {
    navigate('/vendors/addproducts', { state: { from: location.pathname } });
  };

  return (
    <Page>
      <SideBar />
      <MainNavbar />
      <DashboardContainer>
        <CustomTitle as="h1">{title}</CustomTitle>
        <br /><br />

        <CardWrapper>
          <Layout>
            <Layout.Section>
              <Card>
                <FlexContainer>
                  <ActionArea>
                    <Text as="h3" variant="headingMd">
                      Add your {itemName}
                    </Text>
                    <Text variant="bodyMd" color="subdued">
                      Start by stocking your store with {itemName}s your customers will love
                    </Text>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', height: '2rem' }}>
                      <Button variant="primary" onClick={handleAddProduct}>Add {itemName}</Button>
                      <ImportButton onClick={handleOpen}>
                        <Icon source={ImportIcon} color="base" />
                        Import
                      </ImportButton>
                      <CsvImportModal open={modalOpen} onClose={handleClose} />
                    </div>
                  </ActionArea>

                  <Illustration src={logo} alt="Illustration" />
                </FlexContainer>
              </Card>

              <BottomCard>
                <ActionArea1>
                  <Text as="h6" variant="headingSm" color="text-inverse">Find products to sell</Text><br />
                  <Text variant="bodySm" color="text-inverse">
                    Have dropshipping or print on demand {itemName}s shipped directly from the supplier to your customer,
                    and only pay for what you sell
                  </Text>
                  <div style={{ marginTop: '1rem' }}>
                    <ImportButton>
                      Browse {itemName} sourcing apps
                    </ImportButton>
                  </div>
                </ActionArea1>
              </BottomCard>
            </Layout.Section>
          </Layout>
        </CardWrapper>
      </DashboardContainer>
    </Page>
  );
};

export default ItemDashboard;