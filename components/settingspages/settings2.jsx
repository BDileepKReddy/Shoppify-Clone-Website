import React, { useState, useCallback } from 'react';
import {
    Card, Text, Box, Page, InlineStack, TextField, Grid, LegacyCard, Select, Badge, Button, Icon,
    ResourceList,
    Avatar,
    ResourceItem, Link,
    Layout,
    BlockStack,
    ChoiceList,
    Tag, LegacyStack,
    RadioButton

} from '@shopify/polaris';
import styled from 'styled-components';
import MainNavbar from '../MainNavbar';

import StoreIcon from "../../assets/StoreIcon.svg"
import LocationIcon from "../../assets/LocationIcon.svg"
import Plus from "../../assets/plus.png"
import Rupee from "../../assets/rupee.png"


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



export default function SidebarNavigationCard() {
    const [ownerName, setOwnerName] = useState("");
    const [category, setCategory] = useState("grocery");

    const categoryOptions = [
        { label: "Grocery Store", value: "grocery" },
        { label: "Restaurant", value: "restaurant" },
        { label: "Clothing", value: "clothing" },
        { label: "Other", value: "other" },
    ];

    const settings = [
        {
            id: '1',

            name: 'Billing cycle',
            location: 'Your trial has 1 day remaining',

            image: Rupee, // no image, fallback to initials

        },
        {
            id: '2',

            name: 'Add payment method',
            location: "",
            image: Plus,
        },

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
                                <div style={{ marginTop: 150, marginBottom: 10 }}>

                                    <Text variant="headingLg" as="h1" alignment='start'>
                                        Plan
                                    </Text>
                                </div>



                                <Card  >
                                    <Box padding="4">
                                        <div style={{ marginBottom: 10 }}>

                                            <Text variant="headingMd" as="h3" alignment='start'>
                                                Plan details
                                            </Text>
                                        </div>
                                        <div style={{ marginBottom: 5 }}>

                                            <Text as="p" alignment='start'>
                                                View the{' '}
                                                <Link url="#">terms of services</Link> and{' '}
                                                <Link url="#">privacy policy</Link>
                                            </Text>
                                        </div>
                                    </Box>

                                    <Card gap="2">
                                        <InlineStack align='space-between'>

                                            <div>
                                                <InlineStack gap={300}>

                                                    <Text variant='headingSm' alignment='start'>Trial</Text>
                                                    <Badge tone="success">1 day remaining</Badge>
                                                </InlineStack>

                                            </div>
                                            <div>
                                                <InlineStack>

                                                    <div style={{ marginRight: 10 }}>


                                                        <Button plain destructive tone='critical'>
                                                            Cancel trip
                                                        </Button>
                                                    </div>
                                                    <div>

                                                        <Button variant='primary' >Choose Plan</Button>
                                                    </div>
                                                </InlineStack>
                                            </div>
                                        </InlineStack>
                                    </Card>

                                </Card>




                                <Card >
                                    <div style={{ marginBottom: 10 }}>

                                        <Text alignment='start' variant='headingMd'>Billing
                                        </Text>
                                    </div>
                                    <LegacyCard>
                                        <Card>


                                            <ResourceList
                                                resourceName={{ singular: 'setting', plural: 'settings' }}
                                                items={settings}
                                                renderItem={({ id, url, name, location, image, media }) => {
                                                    ;

                                                    return (
                                                        <ResourceItem
                                                            id={id}

                                                            media={media}
                                                            accessibilityLabel={`View details for ${name}`}
                                                        >
                                                            <InlineStack align="space-between" blockAlign="center" gap="4">
                                                                <Box>
                                                                    <InlineStack>

                                                                        <div style={{ marginRight: 15 }}>
                                                                            <Avatar customer size="xs" name={name} source={image} />
                                                                        </div>
                                                                        <div>

                                                                            <Text variant="bodyLg" fontWeight="bold" as="h3" alignment='start'>
                                                                                {name}
                                                                            </Text>

                                                                            <Text>{location}</Text>
                                                                        </div>
                                                                    </InlineStack>

                                                                </Box>

                                                                <Box>
                                                                    <div style={{ marginLeft: 20 }}>

                                                                        {/* <img
                                                                            src={CheronRightIcon}
                                                                            alt="chevron"
                                                                            style={{ width: 15, height: 15, marginTop: '4px' }}
                                                                        /> */}
                                                                    </div>
                                                                </Box>
                                                            </InlineStack>
                                                        </ResourceItem>
                                                    );
                                                }}
                                            />
                                        </Card>
                                    </LegacyCard>

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



