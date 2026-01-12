import React, { useState, useCallback } from 'react';
import { Text, Card, Select, Page, FormLayout, IndexTable, Divider, Button, TextField, BlockStack, Link, InlineStack, Badge, Box, LegacyCard, Avatar, Checkbox, Tabs, Form, DropZone, Scrollable, useIndexResourceState } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Icon } from '@shopify/polaris';
import { supabase } from '../../config/supabaseClient';
import SideBar from '../Sidebar';
import MainNavbar from '../MainNavbar';
import styled from 'styled-components';
import Leftadd from '../Vendors/leftadd';
import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';

const addproducts = () => {
    const [selected, setSelected] = useState(0);
    const [status, setStatus] = useState('active');
    const [vendor, setVendor] = useState('');
    const [type, setType] = useState('product');
    const [publicationIds, setPublicationIds] = useState([]);

    const [businessName, setBusinessName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [category, setCategory] = useState("");
    const [sellerid, setSellerId] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState('Short sleeve t-shirt');
    const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), []);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('0.00');
    const [compareAtPrice, setCompareAtPrice] = useState('0.00');
    const [chargeTax, setChargeTax] = useState(true);
    const [location, setLocation] = useState('multiple');

    const [continueSelling, setContinueSelling] = useState(false);

    const locationOptions = [
        { label: 'Multiple locations', value: 'multiple' },
        { label: 'Warehouse', value: 'warehouse' },
        { label: 'Storefront', value: 'storefront' },
    ];


    const categoryOptions = [

        { label: "Grocery Store", value: "grocery" },
        { label: "", value: "" },
        { label: "Restaurant", value: "restaurant" },
        { label: "Clothing", value: "clothing" },
        { label: "Other", value: "other" },
    ];

    const tabs = [
        {
            id: 'all-customers-1',
            content: 'Overview',
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'accepts-marketing-1',
            content: 'Accepts marketing',
            panelID: 'accepts-marketing-content-1',
        },
        {
            id: 'repeat-customers-1',
            content: 'Repeat customers',
            panelID: 'repeat-customers-content-1',
        },
        {
            id: 'prospects-1',
            content: 'Prospects',
            panelID: 'prospects-content-1',
        },



    ];
    const saveSellerDetails = async () => {
        setLoading(true);

        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                console.error('Auth error:', authError);
                setLoading(false);
                return;
            }

            const { error: upsertError } = await supabase
                .from('sellers')
                .upsert(
                    {
                        uid: user.id,
                        business_name: businessName,
                        seller_id: sellerid
                    },
                    { onConflict: ['uid'] }
                );

            if (upsertError) {
                console.error('Upsert error:', upsertError);
            } else {
                console.log('Seller details saved.');
            }
        } catch (e) {
            console.error('Unexpected error:', e);
        }

        setLoading(false);
    };



    const getLoggedInUserId = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            console.error('User not logged in or error occurred:', error);
            return null;
        }

        console.log('Logged-in user ID:', user.id);
        return user.id;
    };
    const [files, setFiles] = useState([]);

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) =>

            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]),
        [],
    );

    const dropZoneOverlay = (

        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',      // Horizontal center
                justifyContent: 'center',  // Vertical center
                height: '120px',           // Or whatever height you want
                textAlign: 'center',
            }}
        >


            <InlineStack align="center" gap="200">
                <Button variant="primary">Upload new</Button>
                <Text as="span" variant="bodyMd">
                    Select existing
                </Text>
            </InlineStack>
            <Text as="p" tone="subdued">
                Accepts images, videos or, 3d models
            </Text>
        </div>


    );




    const rows = [
        {
            id: '1',
            location: 'Juhu Koliwada',
            unavailable: 0,
            committed: 0,
            available: 31,
            onHand: 31,
        },
        {
            id: '2',
            location: 'Santacruz East',
            unavailable: 0,
            committed: 0,
            available: 0,
            onHand: 0,
        },
        {
            id: '3',
            location: 'Total',
            unavailable: 0,
            committed: 0,
            available: 31,
            onHand: 31,
        },
    ];

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(rows);


    const [isPhysical, setIsPhysical] = useState(true);
    const [weight, setWeight] = useState('180.0');
    const [weightUnit, setWeightUnit] = useState('g');
    const [originCountry, setOriginCountry] = useState('');

    const handleCheckboxChange = useCallback((value) => setIsPhysical(value), []);
    const handleWeightChange = useCallback((value) => setWeight(value), []);
    const handleUnitChange = useCallback((value) => setWeightUnit(value), []);
    const handleCountryChange = useCallback((value) => setOriginCountry(value), []);

    const unitOptions = [
        { label: 'g', value: 'g' },
        { label: 'kg', value: 'kg' },
        { label: 'lb', value: 'lb' },
        { label: 'oz', value: 'oz' },
    ];
    const [search, setSearch] = useState('');

    const handleSearchChange = useCallback((value) => setSearch(value), []);




    return (
        <Background>
            <Page narrowWidth>

                <SideBar />
                <MainNavbar />

                {/* <div style={{ padding: '20px' }}>
                <button onClick={getLoggedInUserId}>Get Logged-in User ID</button>

            </div> */}

                <InlineStack wrap={false} blockAlign="start" gap="0">
                    <Box
                        style={{
                            flexGrow: 2,    // ← give it twice the weight of the secondary box
                            flexShrink: 0,  // ← never shrink below its content width
                            minWidth: '700px', // ← ensure it doesn't collapse too small
                            marginTop: '50px',
                        }}
                    >





                        <div style={{ maxWidth: '800', marginTop: '1px', alignItems: 'start', justifyContent: 'start', flexShrink: 0, }}>
                            <div style={{ marginRight: 0 }}>
                                <FormLayout>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8, // space between icon and text
                                            marginBottom: 12,
                                            flexShrink: 0,
                                            minWidth: 800,
                                        }}
                                    >
                                        <img src={ArrowLeftIcon} alt="arrow" style={{ width: 25 }} />
                                        <Text as="h3" fontWeight="bold" variant="headingXl">
                                            Add Products
                                        </Text>
                                    </div>
                                    <Card>
                                        <BlockStack gap="100">

                                            <Box paddingBlockEnd="100">
                                                <InlineStack align="space-between">
                                                    <Text variant="bodyLg" as="h2" fontWeight="semibold">
                                                        Products
                                                    </Text>
                                                    <Link>
                                                        Add custom item
                                                    </Link>
                                                </InlineStack>
                                            </Box>

                                            <InlineStack gap="100" align="center">
                                                <Box width="90%">
                                                    <TextField
                                                        value={search}
                                                        onChange={handleSearchChange}
                                                        placeholder="Search"
                                                        autoComplete="off"
                                                        label=""
                                                        labelHidden
                                                    />
                                                </Box>

                                                <Box minHeight="100%" display="flex" alignItems="center">
                                                    <Button size="medium">Browse</Button>
                                                </Box>
                                            </InlineStack>
                                        </BlockStack>


                                    </Card>



                                    <Card>
                                        <div style={{ marginTop:0, marginBottom: 5 }}>
                                            <Text alignment='start' variant='headingMd'>Payment</Text>
                                        </div>
                                        <Card>
                                            {/* Subtotal header */}
                                            <Box paddingBlockEnd="2">
                                            <div style={{ marginBottom: 5 }}>
                                                <InlineStack align="space-between" blockAlign="center">
                                                    
                                                    <Text variant="bodyMd" fontWeight="medium">
                                                        Subtotal
                                                    </Text>
                                                    <Text variant="bodyMd" tone="subdued" fontWeight="medium">
                                                        Net sales
                                                    </Text>
                                                </InlineStack>
                                                </div>
                                            </Box>

                                            <Divider />

                                            {/* Add discount */}
                                            <Box paddingBlock="3">
                                            <div style={{ marginTop: 5 , marginBottom:5}}>
                                                <InlineStack align="space-between" blockAlign="center">
                                                    <Text tone="subdued">Add discount</Text>
                                                    <Text tone="subdued">₹0.00</Text>
                                                </InlineStack>
                                                </div>
                                            </Box>
                                            <Divider />

                                            {/* Add shipping */}
                                            <Box paddingBlock="3">
                                            <div style={{ marginTop: 5 , marginBottom:5}}>
                                                <InlineStack align="space-between" blockAlign="center">
                                                    <Text tone="subdued">Add shipping or delivery</Text>
                                                    <Text tone="subdued">₹0.00</Text>
                                                </InlineStack>
                                                </div>
                                            </Box>

                                            <Divider />
                                            {/* Estimated tax */}
                                            <Box paddingBlock="3">
                                            <div style={{ marginTop: 5 , marginBottom:5}}>
                                                <InlineStack align="space-between" blockAlign="center">
                                                    <Text tone="subdued">
                                                        Estimated tax{" "}
                                                        <span
                                                            style={{
                                                                display: "inline-block",
                                                                width: 14,
                                                                height: 14,
                                                                backgroundColor: "#f3f4f6",
                                                                borderRadius: "50%",
                                                                textAlign: "center",
                                                                fontSize: "10px",
                                                                lineHeight: "14px",
                                                                marginLeft: "4px",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            i
                                                        </span>
                                                    </Text>
                                                    <Text fontWeight="medium">Not calculated</Text>
                                                </InlineStack>
                                                </div>
                                            </Box>

                                            <Divider />

                                            {/* Totals */}
                                            <Box paddingBlockStart="3">
                                            <div style={{ marginTop: 5 , marginBottom:5}}>
                                                <InlineStack align="space-between" blockAlign="center">
                                                    <Text fontWeight="bold">Totals</Text>
                                                    <Text fontWeight="bold">₹0.00</Text>
                                                </InlineStack>
                                                </div>
                                            </Box>
                                        </Card>

                                        {/* Footer */}
                                    </Card>
                                    <div style={{ marginTop: 5, marginBottom: 5, marginLeft: 5 }}>


                                        <Text variant="bodyMd" tone="subdued" alignment='start'>
                                            Add a product to calculate total and view payment options.
                                        </Text>
                                    </div>










                                </FormLayout>
                            </div>
                        </div>
                    </Box>
                    <Box>

                        <div style={{ marginRight: 200, marginTop: 110, minWidth: 300 }}>

                            <Leftadd
                                status={status}
                                setStatus={setStatus}
                                vendor={vendor}
                                setVendor={setVendor}
                                type={type}
                                setType={setType}
                                setPublicationIds={setPublicationIds}
                            />
                        </div>
                    </Box>
                </InlineStack>

            </Page>

        </Background>
    );
};

export default addproducts;




const Background = styled.div`
   height: 100vh;
   width: 100vw;
   display: flex;
   flex-direction: column;
   overflow-y: auto;
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   `;
const DividerContainer = styled.div`
   display: flex;
   align-items: center;
   margin: 24px 0;
   `;

const Line = styled.div`
    flex-grow: 1;
    height: 1px;
    background: #d1d1d1;
    `;

const OrText = styled(Text).attrs({ as: 'span', variant: 'bodyMd', alignment: 'center' })`
    margin: 0 12px;
    color: #9e9e9e;
    `;

const Footer = styled.div`
    text-align: center;
    margin-top: 12px;
    `;

// const InputText = styled.div`
// width: 370;
// height: 61;
// padding-top: 20px;
// padding-right: 32px;
// padding-bottom: 20px;
// padding-left: 32px;
// border-radius: 6px;
// border-width: 1px;
// `

const IconCSS = styled(Icon)`
   color: #3377FF;
   `;
