import React, { useState, useCallback } from 'react';
import {
    Card, Text, Box, Page, InlineStack, TextField, Grid, LegacyCard, Select, Badge, Button, Icon, Layout, Divider,
    ResourceList,
    Avatar,
    ResourceItem, Link
} from '@shopify/polaris';
import styled from 'styled-components';
import MainNavbar from '../MainNavbar';

import StoreIcon from "../../assets/StoreIcon.svg"
import LocationIcon from "../../assets/LocationIcon.svg"
import PlusCircleIcon from "../../assets/PlusCircleIcon.svg"
import Circleloading from "../../assets/circleloading.png"
import Bag from "../../assets/bag.png"
import ChevronRightIcon from "../../assets/ChevronRightIcon.svg"
import Formi from "../../assets/formi.png"


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



export default function settings4() {
    const [ownerName, setOwnerName] = useState("");
    const [category, setCategory] = useState("grocery");
    const [paymentAdded, setPaymentAdded] = useState(false);

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
                                <InlineStack gap="2" align='space-between'>
                                    <Text variant="headingXl" alignment='start' >Billing</Text>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            backgroundColor: '#E0E0E0', // light gray background
                                            borderRadius: '9999px',     // pill shape
                                            padding: '4px 10px',
                                            fontSize: '10px',
                                            fontWeight: '500',
                                            color: '#1c1c1c',
                                            gap: '6px'
                                        }}>
                                            <img
                                                src={Formi}
                                                alt="icon"
                                                style={{ width: '16px', height: '16px' }}
                                            />
                                            <span>Billing profile</span>
                                        </div>

                                    </div>
                                </InlineStack>



                                <Layout>
                                    {/* Current Billing Cycle */}
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
                                            <div style={{ marginTop: 7, marginBottom: 7 }}>



                                                <Text as="p" tone="subdued" alignment='start' >
                                                    Billed on: Sep 21, 2024{' '}
                                                    <Link url="#">View current charges</Link>
                                                </Text>
                                            </div>

                                            <div className="mt-4">
                                                <Button textAlign='start' fullWidth onClick={() => setPaymentAdded(true)}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <img src={PlusCircleIcon} alt="usericon" style={{ width: 20, height: 20 }} />
                                                        {paymentAdded ? 'Payment Method Added' : 'Add payment method'}
                                                    </span>
                                                </Button>



                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: 10 }}>
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

                                    {/* Past Bills */}
                                    <Layout.Section>
                                        <Card padding="400" roundedAbove="sm" >
                                            <Box>
                                                <Text variant="headingMd" alignment='start'>Past Bills</Text>
                                            </Box>

                                            <div style={{ backgroundColor: '#f5f5f7', marginTop: 10 }} >
                                                <Card background='#f5f5f7' >
                                                    <div
                                                        style={{
                                                            height: '10px',
                                                            display: 'flex',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'center',

                                                        }}
                                                    >
                                                        <Text variant="headingSm" alignment="start">
                                                            Your past bills will appear here.
                                                        </Text>
                                                    </div>
                                                </Card>
                                            </div>
                                        </Card>
                                    </Layout.Section>

                                    {/* Subscriptions */}
                                    <Layout.Section>
                                        <Card padding="400" roundedAbove="sm" title="Subscriptions">
                                            <Box>
                                                <Text variant="headingMd" alignment='start'>Subscriptions</Text>
                                                <div style={{ marginTop: 10, marginBottom: 10 }}>

                                                    <Text as="p" tone="subdued" variant="bodySm" alignment='start'>
                                                        Items you're billed for on a recurring basis , like your Aniyor plan and apps.

                                                    </Text>
                                                </div>
                                            </Box>
                                            <Card>

                                                <Box paddingInline="4" paddingBlock="4">
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: 20 }}>
                                                        <img
                                                            src={Bag}
                                                            alt="Shopify"
                                                            width={32}
                                                            height={32}
                                                        />
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                            <Text variant="bodyMd" fontWeight="semibold">Billing cycle</Text>
                                                            <Text variant="bodySm" color="subdued">Your trial has 1 day remaining</Text>
                                                        </div>
                                                    </div>
                                                </Box>


                                                {/* Full-width divider */}

                                                <hr >
                                                </hr>

                                                {/* Bottom section */}
                                                <Box paddingInline="4" paddingBlock="3">
                                                    <div style={{ marginTop: 5 }}>
                                                        <InlineStack align="space-between" blockAlign="center" wrap={false}>

                                                            <Text variant="bodyMd" fontWeight="semibold">
                                                                View all subscriptions
                                                            </Text>
                                                            <img
                                                                src={ChevronRightIcon}
                                                                alt="chevron"
                                                                style={{ width: 20, height: 20 }}
                                                            />
                                                        </InlineStack>
                                                    </div>

                                                </Box>
                                            </Card>
                                            <div className="mt-4">

                                            </div>
                                        </Card>
                                    </Layout.Section>

                                    {/* Statement of Charges */}
                                    <Layout.Section>
                                        <Card padding="400" roundedAbove="sm" >
                                            <div style={{ textAlign: 'start' }}>




                                                <Text variant="headingMd" alignment='start'>
                                                    Statement of charges
                                                </Text>
                                                <div style={{ marginTop: 5, marginBottom: 5 }}>

                                                    <Text as="p" tone="subdued" className="mb-2">
                                                        View a summary of all your Aniyor charges for any date range within the last 90 days.
                                                    </Text>
                                                </div>
                                                <Link url="#">View summary</Link>
                                            </div>
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



