import React, { useState, useCallback } from 'react';
import {
    Card, Text, Box, Page, InlineStack, TextField, Grid, LegacyCard, Select,
    ResourceList,
    Avatar,
    ResourceItem
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
const customers = [
    {
        id: '100',

        name: 'My Store',
        location: '',
        image: StoreIcon,
    },
    {
        id: '200',

        name: 'Billing address ',
        location: 'India',
        image: LocationIcon, // no image, fallback to initials
    },
];



export default function SidebarNavigationCard() {
    const [ownerName, setOwnerName] = useState("");
    const [category, setCategory] = useState("grocery");

    const categoryOptions = [
        { label: "Grocery Store", value: "grocery" },
        { label: "Restaurant", value: "restaurant" },
        { label: "Clothing", value: "clothing" },
        { label: "Other", value: "other" },
    ];

    return (

        <Page>
            <MainNavbar />
            <div style={{ marginLeft: '250px' }}>

                <InlineStack>
                    <Grid>

                        <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 2, xl: 4 }}>


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
                                gap: '20px', // This adds consistent spacing between cards,
                                marginLeft: '40px',
                                marginTop: '300px',

                            }}>
                                {/* Store Details Card */}
                                <Text tone="headingXl" alignment='start'>
                                    General
                                </Text>
                                <Card>
                                    <Box padding="4">
                                        <Box vertical spacing="loose" style={{ marginBottom: "10px" }}>
                                            <Text variant="headingMd" as="h2" alignment='start'>Store details</Text>

                                        </Box>

                                        <LegacyCard>
                                            <ResourceList
                                                resourceName={{ singular: 'customer', plural: 'customers' }}
                                                items={customers}
                                                renderItem={({ id, url, name, location, image }) => {
                                                    const media = <Avatar customer size="md" name={name} source={image} />;

                                                    return (
                                                        <ResourceItem
                                                            id={id}

                                                            media={media}
                                                            accessibilityLabel={`View details for ${name}`}
                                                        >
                                                            <Text variant="bodyMd" fontWeight="bold" as="h3" alignment='start'>
                                                                {name}
                                                            </Text>
                                                            <Text as="p" color="subdued" alignment='start'>{location}</Text>
                                                        </ResourceItem>
                                                    );
                                                }}
                                            />
                                        </LegacyCard>
                                    </Box>

                                </Card>



                                {/* Store Defaults Card */}
                                <Card>
                                    <Box padding="4">
                                        <div style={{ marginBottom: 8 }}>

                                            <Text variant="headingLg" alignment='start' as="h1" fontWeight="bold">
                                                Store defaults
                                            </Text>
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <Card>
                                                <Text variant="headingSm" as="h3" fontWeight="semibold" alignment='start'>
                                                    Currency display
                                                </Text>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                    {/* Left Side Text */}
                                                    <Text as="p" color="subdued">
                                                        To manage the currencies customers see, go to Markets
                                                    </Text>

                                                    {/* Right Side Chip + Ellipsis */}
                                                    <InlineStack align="center" gap="100">
                                                        <div style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            backgroundColor: '#f1f2f4',
                                                            borderRadius: '9999px',
                                                            padding: '4px 12px',
                                                            fontSize: '10px',
                                                            fontWeight: 500,
                                                            color: '#1c1c1c',
                                                            gap: '6px',
                                                            height: '28px'
                                                        }}>
                                                            <span>Indian Rupee (INR₹)</span>
                                                        </div>

                                                        <span style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontWeight: 'bold',
                                                            fontSize: '20px',
                                                            lineHeight: '0',
                                                            cursor: 'pointer',
                                                            height: '28px'
                                                        }}>⋯</span>
                                                    </InlineStack>
                                                </div>

                                            </Card>
                                        </div>
                                        <div>

                                        </div>

                                        <div style={{ marginBottom: '16px' }}>


                                            <InlineStack align='space-between'>
                                                <Box width="49%" alignItems="start" >
                                                    <Text variant="headingSm" as="h3" fontWeight="semibold" alignment='start'>
                                                        Unit system
                                                    </Text>

                                                    <Text 
                                                        label="City"
                                                        value={ownerName}
                                                        onChange={setOwnerName}
                                                        autoComplete="off"
                                                    />
                                                    <Select
                                                    

                                                        options={categoryOptions}
                                                        value={category}
                                                        onChange={setCategory}
                                                    />
                                                </Box>

                                                <Box width="49%">
                                                    <Text variant="headingSm" as="h3" fontWeight="semibold" alignment='start'>
                                                        Default weight unit
                                                    </Text>
                                                    <Text
                                                        label="City"
                                                        value={ownerName}
                                                        onChange={setOwnerName}
                                                        autoComplete="off"
                                                    />
                                                    <Select

                                                        options={categoryOptions}
                                                        value={category}
                                                        onChange={setCategory}
                                                    />
                                                </Box>
                                            </InlineStack>

                                        </div>



                                        <div style={{ marginBottom: '16px' }}>
                                            <Text variant="headingSm" as="h3" fontWeight="semibold" alignment='start'>
                                                Time zone
                                            </Text>
                                            <Box width="100%">

                                                <Text
                                                    label="City"
                                                    value={ownerName}
                                                    onChange={setOwnerName}
                                                    autoComplete="off"
                                                />
                                                <Select

                                                    options={categoryOptions}
                                                    value={category}
                                                    onChange={setCategory}
                                                />
                                            </Box>

                                            <Text as="p" color="subdued" alignment='start' style={{ marginTop: '4px' }}>
                                                Sets the time for when orders and analytics are recorded
                                            </Text>
                                        </div>
                                        <div
                                            style={{
                                                backgroundColor: '#f6f6f7', // Very light gray
                                                border: '1px solid #dfe3e8', // Subtle border
                                                borderRadius: '8px',         // Rounded corners
                                                padding: '12px 16px',        // Spacing inside
                                                marginTop: '16px',
                                            }}
                                        >
                                            <Text as="p">
                                                To change your user level time zone and language visit your{' '}
                                                <a href="" style={{ color: '#1a73e8' }}>
                                                    account settings
                                                </a>
                                                .
                                            </Text>
                                        </div>
                                    </Box>
                                </Card>



                                {/* Order ID Card */}
                                <Card>
                                    <Box padding="4">
                                        <Text variant="headingLg" as="h1" fontWeight="bold"alignment='start'>
                                            Order ID
                                        </Text>
                                        <Text as="p" color="subdued" style={{ margin: '16px 0' }} alignment='start'>
                                            Shown on the order page, customer pages, and customer order notifications to identify order
                                        </Text>
                                        <div style={{ margin: '12px ' }}>
                                          
                                            <InlineStack align='space-between'>

                                                <Box width="49%">
                                                    <div style={{ flex: 1 }}>
                                                        <TextField
                                                            label="Prefix"
                                                            value="#"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </Box>
                                                <Box width="49%">

                                                    <div style={{ flex: 1 }}>
                                                        <TextField
                                                            label="Suffix"
                                                            value="#"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </Box>
                                            </InlineStack>
                                        </div>
                                        <Text as="p" color="subdued" alignment='start'>
                                            Your order ID will appear as #1001, #1002, #1003
                                        </Text>
                                    </Box>

                                </Card>


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



