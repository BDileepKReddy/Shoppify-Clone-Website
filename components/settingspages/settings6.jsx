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
import Green from '../../assets/green.png'

import StoreIcon from "../../assets/StoreIcon.svg"
import LocationIcon from "../../assets/LocationIcon.svg"
import CheronRightIcon from "../../assets/ChevronRightIcon.svg"
import Fromi from "../../assets/formi.png"
import cookie from "../../assets/cookie.png"
import harrow from "../../assets/harrow.png"
import mail from "../../assets/mail.png"
import clickable from "../../assets/clickable.png"
import bag from "../../assets/bag.png"
import Iicon from "../../assets/iicon.png"



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

        name: 'Privacy policy',
        location: 'Published on your online store',
        image: Fromi,

    },
    {
        id: '200',

        name: 'Cookie banner',
        location: "Not required for the regions you're selling in ",
        image: cookie, // no image, fallback to initials
    },
    {
        id: '200',

        name: 'Data sales opt_out page',
        location: "Not required for the regions you're selling in ",
        image: harrow, // no image, fallback to initials
    },
];


const settings = [
    {
        id: '1',

        name: 'E-main and SMS marketing in checkout',
        location: 'Published on your online store',
        image: mail,

    },
    {
        id: '2',

        name: 'Double opt-in for marketing',
        location: "Ask your customers to confirm their contact details ",
        image: clickable, // no image, fallback to initials
    },

];



export default function settings6() {
    const [ownerName, setOwnerName] = useState("");
    const [category, setCategory] = useState("grocery");
    const [selected, setSelected] = useState(['gift-cards']);

    const handleChange = useCallback((value) => setSelected(value), []);

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
                                gap: '20px',
                                marginLeft: '40px',
                                marginTop: '300px',

                            }}>


                                <Text tone="headingXl">
                                    General
                                </Text>
                                <Card>
                                    <Box padding="4">
                                        <Box vertical spacing="loose" style={{ marginBottom: "10px" }}>
                                            <Text variant="headingMd" as="h2" alignment='start'>Privacy Settings</Text>



                                        </Box>

                                        <LegacyCard>
                                            <Card>


                                                <ResourceList
                                                    resourceName={{ singular: 'customer', plural: 'customers' }}
                                                    items={customers}
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
                                                                        <InlineStack>

                                                                            <Tag url="#">
                                                                                <LegacyStack spacing="extraTight" alignment="center">
                                                                                    <img
                                                                                        src={Green}
                                                                                        alt="usericon"
                                                                                        style={{ width: 10, height: 10, marginTop: '4px' }}
                                                                                    />

                                                                                    <span>Automated</span>
                                                                                </LegacyStack>
                                                                            </Tag>
                                                                            <div style={{ marginLeft: 20 }}>

                                                                                <img
                                                                                    src={CheronRightIcon}
                                                                                    alt="chevron"
                                                                                    style={{ width: 15, height: 15, marginTop: '4px' }}
                                                                                />
                                                                            </div>
                                                                        </InlineStack>
                                                                    </Box>
                                                                </InlineStack>
                                                            </ResourceItem>
                                                        );
                                                    }}
                                                />
                                            </Card>
                                        </LegacyCard>
                                    </Box>

                                </Card>

                                <Card>
                                    <Box padding="4">
                                        <Box vertical spacing="loose" style={{ marginBottom: "10px" }}>
                                            <InlineStack blockAlign="center" gap={200}>
                                                <Text variant="headingMd" as="h2" alignment="start">
                                                    Marketing Settings
                                                </Text>
                                                <img
                                                    src={Iicon}
                                                    alt="usericon"
                                                    style={{ width: 20, height: 20 }}
                                                />
                                            </InlineStack>
                                        </Box>

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

                                                                            <img
                                                                                src={CheronRightIcon}
                                                                                alt="chevron"
                                                                                style={{ width: 15, height: 15, marginTop: '4px' }}
                                                                            />
                                                                        </div>
                                                                    </Box>
                                                                </InlineStack>
                                                            </ResourceItem>
                                                        );
                                                    }}
                                                />
                                            </Card>
                                        </LegacyCard>
                                    </Box>

                                </Card>



                                {/* Brand assets */}
                                <Card  >
                                    <InlineStack align="space-between">
                                        <BlockStack gap="1">
                                            <Text variant="headingMd" as="h2" alignment='start'>Brand assets</Text>

                                            <Text as="p" tone="subdued">
                                                Integrate brand assets across sales channels, theme, and apps
                                            </Text>
                                        </BlockStack>
                                        <Button size='large'>Manage</Button>
                                    </InlineStack>
                                </Card>

                                {/* Point of Sale subscriptions */}
                                <Card >
                                    <Box padding="3">
                                        <BlockStack gap="1">
                                            <InlineStack blockAlign='center' gap={200}>
                                                <Text variant="headingMd" as="h2" alignment='start'>
                                                    Point of Sale subscriptions
                                                </Text>

                                                <img
                                                    src={Iicon}
                                                    alt="usericon"
                                                    style={{ width: 20, height: 20 }}
                                                />
                                            </InlineStack>
                                            <div style={{ marginTop: 5, marginBottom: 5 }}>

                                                <Text as="p" tone="subdued" alignment='start'>
                                                    Start selling in person from any location with the POS subscription included in your Anyior plan
                                                </Text>
                                            </div>
                                        </BlockStack>
                                    </Box>

                                    <BlockStack>
                                        <Card>

                                            <InlineStack align="space-between" blockAlign="center" >
                                                <InlineStack>

                                                    <img
                                                        src={bag}
                                                        alt="chevron"
                                                        style={{ width: 30, height: 30, marginTop: '4px' }}
                                                    />
                                                    <div style={{ marginLeft: 15 }}>

                                                        <Text variant="bodyMd" fontWeight="semibold" alignment='start'>Point of Sale</Text>
                                                        <Text tone="subdued" variant="bodySm" alignment='start'>Installed</Text>
                                                    </div>
                                                </InlineStack>
                                                <Button>Open</Button>
                                            </InlineStack>

                                        </Card>
                                    </BlockStack>
                                </Card>


                                <Card>
                                    <Box padding="1">
                                        <BlockStack gap="2">
                                            <div style={{ }}>
                                                <InlineStack blockAlign='center' gap={200}>

                                                    <Text variant="headingMd" as="h2" alignment='start'>
                                                        Order processing
                                                    </Text>

                                                    <img
                                                        src={Iicon}
                                                        alt="usericon"
                                                        style={{ width: 20, height: 20 }}
                                                    />
                                                </InlineStack>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft:0, marginTop:5 , marginBottom:5 }}>


                                                <Text tone="subdued" as="p">
                                                    After an order has been paid
                                                </Text>
                                            </div>
                                            <Box alignment='start'>
                                                <div style={{ display: 'flex', justifyContent: 'flex-start',  minWidth: 300 }}>



                                                    <ChoiceList
                                                        title=""
                                                        choices={[
                                                            {
                                                                label: "Don’t fulfill any of the order’s line items automatically",
                                                                value: "none",
                                                            },

                                                            {


                                                                label: "Automatically fulfill only the gift cards of the order____",
                                                                value: "gift-cards",
                                                            },
                                                            {
                                                                label: "Automatically fulfill the order’s line items______________",
                                                                value: "line-items",
                                                            },
                                                        ]}
                                                        selected={selected}
                                                        onChange={handleChange}
                                                    />

                                                </div>
                                            </Box>
                                        </BlockStack>
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



