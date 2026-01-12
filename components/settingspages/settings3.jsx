import React, { useState, useCallback } from 'react';
import {
    Card, Text, Box, Page, InlineStack, TextField, Grid, LegacyCard, Select, Badge, Button, Icon,
    ResourceList,
    Avatar,
    ResourceItem, Link
} from '@shopify/polaris';
import styled from 'styled-components';
import MainNavbar from '../MainNavbar';

import StoreIcon from "../../assets/StoreIcon.svg"
import LocationIcon from "../../assets/LocationIcon.svg"
import Hoomon from "../../assets/hoomon.png"
import Vroom from "../../assets/vroom.png"


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



export default function settings3() {
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
                                textAlign: 'start',
                                margin: '20px auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px', // This adds consistent spacing between cards,
                                marginLeft: '40px',
                                marginTop: '300px',

                            }}>

                                <Text variant="headingLg" alignment='start'>
                                    Plan
                                </Text>

                                <Card distribution="equalSpacing" alignment="center">
                                    <InlineStack align="space-between" blockAlign="center" wrap={false}>

                                        <div style={{ textAlign: 'start', marginTop: 10, marginBottom: 10 }}>
                                            <div style={{ marginBottom: 5 }}>
                                                <Text variant="headingLg" as="h3">

                                                    Plan details
                                                </Text>
                                            </div>
                                            <Text as="p" tone="subdued">
                                                View the{' '}
                                                <Link url="#">terms of services</Link> and{' '}
                                                <Link url="#">privacy policy</Link>
                                            </Text>
                                        </div>
                                        <Button plain>Change Plan</Button>

                                    </InlineStack>


                                    <Card vertical spacing="tight">
                                        <div style={{ textAlign: 'start' }}>

                                            <Text variant="headingLg" as="h3">
                                                Billing
                                            </Text>

                                        </div>
                                        <InlineStack align='space-between' blockAlign='center'>

                                            <Text variant="headingLg" as="h4">
                                                ₹1,994 <Text as="span" tone="subdued">INR/month</Text>
                                            </Text>
                                            <Text as="p" tone="info">
                                                <Link url="#">Pay yearly and save ₹5,940/year</Link>
                                            </Text>
                                        </InlineStack>
                                        <div style={{ textAlign: 'start', marginBottom: 10 , marginTop:5 }}>
                                           

                                                <div>
                                                    <InlineStack>

                                                        <img
                                                            src={Vroom}
                                                            alt="usericon"
                                                            style={{ width: 20, height: 20, marginTop: '4px' }}
                                                        />
                                                        <Text as="p">Pay yearly and save ₹5,940/year</Text>
                                                    </InlineStack>
                                                </div>
                                                <div>
                                                    <InlineStack>


                                                        <img
                                                            src={Hoomon}
                                                            alt="usericon"
                                                            style={{ width: 20, height: 20, marginTop: '4px' }}
                                                        />


                                                        <Text as="p">Pay yearly and save ₹5,940/year</Text>
                                                    </InlineStack>
                                                </div>
                                           
                                        </div>


                                        <Button plain fullWidth >View all Features</Button>
                                    </Card>
                                </Card>


                                <div className="mt-4 flex justify-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button tone="critical" variant="secondary">
                                        Deactivate Store
                                    </Button>
                                </div>

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



