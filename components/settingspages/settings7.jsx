import React, { useState, useCallback } from 'react';
import {
    Card, Text, Box, Page, InlineStack, TextField, Grid, LegacyCard, Select, Badge, Button, Icon,
    ResourceList,
    Avatar,
    ResourceItem, Link,
    Layout,
    RadioButton,
    Checkbox,

} from '@shopify/polaris';
import styled from 'styled-components';
import MainNavbar from '../MainNavbar';

import StoreIcon from "../../assets/StoreIcon.svg"
import LocationIcon from "../../assets/LocationIcon.svg"


const navItems = [
    'General',
    'Plan',
    'Billing',
    'Users and Permissions',
    'Payments',
    'Checkout',
    'Customer accounts',
    'Shipping and delivery',
    'Taxes and duties',
    'Location',
    'Markets',
    'Apps and sales channels',
    'Domains',
    'Customer events',
    'Notifications',
    'Custom Data',
    'Languages',
    'Customer Privacy',
    'Policies',
];



export default function settings6() {
    const [ownerName, setOwnerName] = useState("");
    const [category, setCategory] = useState("grocery");

    const categoryOptions = [
        { label: "Grocery Store", value: "grocery" },
        { label: "Restaurant", value: "restaurant" },
        { label: "Clothing", value: "clothing" },
        { label: "Other", value: "other" },
    ];
    const [orderProcessing, setOrderProcessing] = useState('gift-cards');
    const [autoArchive, setAutoArchive] = useState(true);

    const handleOrderProcessingChange = useCallback(
        (value) => setOrderProcessing(value),
        [],
    );

    const handleAutoArchiveChange = useCallback(
        (value) => setAutoArchive(value),
        [],
    );
    


    return (

        <Page>
            <MainNavbar />
            <div style={{ marginLeft: '250px' }}>

                <InlineStack>
                    <Grid>

                        <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 4 }}>


                            <div style={{ maxWidth: '280px', marginLeft: '0px', marginTop: '350px' }}>
                                <Card>
                                    <NavContainer>
                                        {navItems.map((item, index) => (
                                            <NavItem key={index}>{item}</NavItem>
                                        ))}
                                    </NavContainer>
                                </Card>
                            </div>
                        </Grid.Cell>

                        <Grid.Cell columnSpan={{ xs: 9, sm: 9, md: 9, lg: 9, xl: 8 }}>
                            <div style={{
                                minWidth: '600px',
                                margin: '20px auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                marginLeft: '40px',
                                marginTop: '300px',

                            }}>

                                <Layout>
                                    <Card title="Checkout" sectioned>
                                        <Text variant="headingMd" as="h2" alignment="start" className="mb-4">
                                            Order processing
                                        </Text>
                                        <div style={{ marginBottom: '16px' }}>
                                            <Text variant="bodyMd" as="p" tone="subdued" style={{ marginBottom: '8px' }}>
                                                After an order has been paid
                                            </Text>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <RadioButton
                                                    label="Automatically fulfill the order’s line items"
                                                    checked={orderProcessing === 'line-items'}
                                                    id="line-items"
                                                    name="orderProcessing"
                                                    onChange={() => handleOrderProcessingChange('line-items')}
                                                />
                                                <RadioButton
                                                    label="Automatically fulfill only the gift cards of the order"
                                                    checked={orderProcessing === 'gift-cards'}
                                                    id="gift-cards"
                                                    name="orderProcessing"
                                                    onChange={() => handleOrderProcessingChange('gift-cards')}
                                                />
                                                <RadioButton
                                                    label="Don’t fulfill any of the order’s line items automatically"
                                                    checked={orderProcessing === 'none'}
                                                    id="none"
                                                    name="orderProcessing"
                                                    onChange={() => handleOrderProcessingChange('none')}
                                                />
                                            </div>
                                        </div>

                                        <Text variant="bodyMd" as="p" tone="subdued" style={{ marginBottom: '12px' }}>
                                            After an order has been fulfilled and paid, or when all items have been refunded
                                        </Text>

                                        <Checkbox
                                            label={
                                                <span>
                                                    <strong>Automatically archive the order</strong>
                                                    <div style={{ fontWeight: 'normal', color: '#6d7175', fontSize: '14px' }}>
                                                        The order will be removed from your list of open orders.
                                                    </div>
                                                </span>
                                            }
                                            checked={autoArchive}
                                            onChange={handleAutoArchiveChange}
                                        />
                                    </Card>
                                    


                                </Layout>

                            </div>







                        </Grid.Cell>
                    </Grid >
                </InlineStack >
            </div >
        </Page >


    );
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

const NavItem = styled.div`
  padding: 4px 6px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #1c1c1c;
  cursor: pointer;

  &:hover {
    background-color: #f4f6f8;
  }
`;



