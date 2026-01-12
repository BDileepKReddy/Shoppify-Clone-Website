import React, { useState, useCallback } from 'react';
import {
    Card, Text, Box, Page, InlineStack, TextField, Grid, LegacyCard, Select, Badge, Button, Icon,
    ResourceList,
    Avatar,
    ResourceItem, Link,
    Layout
} from '@shopify/polaris';
import {

    IndexTable,

    IndexFilters,
    useSetIndexFiltersMode,
    useIndexResourceState,

    ChoiceList,
    RangeSlider,

    useBreakpoints,
} from '@shopify/polaris';

import styled from 'styled-components';
import MainNavbar from '../MainNavbar';

import StoreIcon from "../../assets/StoreIcon.svg"
import LocationIcon from "../../assets/LocationIcon.svg"
import PlusCircleIcon from "../../assets/PlusCircleIcon.svg"
import Circleloading from "../../assets/circleloading.png"
import Bag from "../../assets/bag.png"
import ChevronRightIcon from "../../assets/ChevronRightIcon.svg"


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

        name: 'Mae Jemison',
        location: 'Decatur, USA',
        image: StoreIcon,
    },
    {
        id: '200',

        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
        image: LocationIcon, // no image, fallback to initials
    },
];

const bills = [
    {
        id: '1',
        date: 'Oct 12, 2024',
        number: '#283526557',
        type: 'Billing Cycle',
        status: 'Paid',
        amount: '₹2,370.00',
    },
    {
        id: '2',
        date: 'Sep 12, 2024',
        number: '#283526557',
        type: 'Billing Cycle',
        status: 'Paid',
        amount: '₹2,370.00',
    },
    {
        id: '3',
        date: 'Aug 13, 2024',
        number: '#283526557',
        type: 'Billing Cycle',
        status: 'Paid',
        amount: '₹2,370.00',
    },
    {
        id: '4',
        date: 'Jul 14, 2024',
        number: '#283526557',
        type: 'Billing Cycle',
        status: 'Partially paid',
        amount: '₹2,370.00',
    },
    // Add more rows as needed...
];





export default function settings5() {
    const [ownerName, setOwnerName] = useState("");
    const [category, setCategory] = useState("grocery");
    const [paymentAdded, setPaymentAdded] = useState(false);

    const categoryOptions = [
        { label: "Grocery Store", value: "grocery" },
        { label: "Restaurant", value: "restaurant" },
        { label: "Clothing", value: "clothing" },
        { label: "Other", value: "other" },
    ];
    const resourceName = {
        singular: 'bill',
        plural: 'bills',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(bills);



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
                                gap: '20px', // This adds consistent spacing between cards,
                                marginLeft: '40px',
                                marginTop: '300px',

                            }}>

                                <Layout>
                                    <Layout.Section>
                                        <Card padding="400" roundedAbove="sm">


                                            <InlineStack align="space-between" blockAlign="center" wrap={false}>
                                                <Box>
                                                    <Text variant="headingMd">Current billing cycle</Text>
                                                </Box>
                                                <Box>
                                                    <Text as="span">
                                                        Running total:{' '}
                                                        <Text variant="headingLg" as="span">₹0.00 INR</Text>
                                                    </Text>
                                                </Box>
                                            </InlineStack>


                                            <Text as="p" tone="subdued" alignment='start' >
                                                Billed on: Sep 21, 2024{' '}
                                                <Link url="#">View current charges</Link>
                                            </Text>

                                            <div className="mt-4">
                                                <Button textAlign='start' fullWidth onClick={() => setPaymentAdded(true)}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <img src={PlusCircleIcon} alt="usericon" style={{ width: 20, height: 20 }} />
                                                        {paymentAdded ? 'Payment Method Added' : 'Add payment method'}
                                                    </span>
                                                </Button>



                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                    <img
                                                        src={Circleloading}
                                                        alt="usericon"
                                                        style={{ width: 20, height: 20, marginTop: '4px' }}
                                                    />
                                                    <Text as="p" tone="subdued" variant="bodySm" alignment='start'>
                                                        You’re ₹60.00 away from reaching your billing threshold of ₹60.00 INR.
                                                        If reached, you will be billed automatically, outside of your regular billing cycle.
                                                    </Text>
                                                </div>

                                            </div>
                                        </Card>
                                    </Layout.Section>
                                    <Layout.Section>
                                        <Card>
                                            <IndexTable
                                                resourceName={resourceName}
                                                itemCount={bills.length}
                                                selectedItemsCount={
                                                    allResourcesSelected ? 'All' : selectedResources.length
                                                }
                                                onSelectionChange={handleSelectionChange}
                                                headings={[
                                                    { title: 'Date issued' },
                                                    { title: 'Bill number' },
                                                    { title: 'Bill type' },
                                                    { title: 'Payment status' },
                                                    { title: 'Amount' },
                                                ]}
                                            >
                                                {bills.map(({ id, date, number, type, status, amount }, index) => (
                                                    <IndexTable.Row
                                                        id={id}
                                                        key={id}
                                                        selected={selectedResources.includes(id)}
                                                        position={index}
                                                    >
                                                        <IndexTable.Cell>{date}</IndexTable.Cell>
                                                        <IndexTable.Cell>
                                                            <Text variant="bodySm" fontWeight="medium" as="span">
                                                                {number}
                                                            </Text>
                                                        </IndexTable.Cell>
                                                        <IndexTable.Cell>{type}</IndexTable.Cell>
                                                        <IndexTable.Cell>
                                                            <Badge status={status === 'Paid' ? 'success' : 'warning'}>
                                                                {status}
                                                            </Badge>
                                                        </IndexTable.Cell>
                                                        <IndexTable.Cell>{amount}</IndexTable.Cell>
                                                    </IndexTable.Row>
                                                ))}
                                            </IndexTable>
                                        </Card>
                                    </Layout.Section>


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



