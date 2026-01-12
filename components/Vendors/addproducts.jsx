import React, { useState, useCallback } from 'react';
import { Text, Card, Select, Page, FormLayout, IndexTable, Divider, Button, TextField, BlockStack, Link, InlineStack, Badge, Box, LegacyCard, Avatar, Checkbox, Tabs, Form, DropZone, Scrollable, useIndexResourceState } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Icon } from '@shopify/polaris';
import { supabase } from '../../config/supabaseClient.js';
import Sidebar from '../Sidebar.jsx'
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import Leftadd from './leftadd.jsx'
import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg'
import Dbox from './dbox.jsx';
import SaveNavbar from '../SaveNavbar.jsx';

const SIDEBAR_WIDTH = 240;
const NAVBAR_HEIGHT = 44;

const PageWrapper = styled.div`
  background-color: #f6f6f7;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  padding-top: ${NAVBAR_HEIGHT}px;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin-left: ${SIDEBAR_WIDTH + 24}px;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 0;
  box-sizing: border-box;
  padding: 24px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const MainFormWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  min-width: 0;
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const addproducts = () => {
    const [selected, setSelected] = useState(0);

    const [businessName, setBusinessName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState('');
    const [sellerid, setSellerId] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState('');
    const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), []);
    const [price, setPrice] = useState('0.00');
    const [compareAtPrice, setCompareAtPrice] = useState('0.00');
    const [costPerItem, setCostPerItem] = useState('0.00');
    const [chargeTax, setChargeTax] = useState(true);
    const [inventoryLocation, setInventoryLocation] = useState('multiple');

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
 const [vendor, setVendor] = useState('');
const [type, setType] = useState('product');
const [status, setStatus] = useState('active');
const [publicationIds, setPublicationIds] = useState([]);
const [categoryId, setCategoryId] = useState('');
    


    const unitOptions = [
        { label: 'g', value: 'g' },
        { label: 'kg', value: 'kg' },
        { label: 'lb', value: 'lb' },
        { label: 'oz', value: 'oz' },
    ];
    const [search, setSearch] = useState('');

    const handleSearchChange = useCallback((value) => setSearch(value), []);



    // Track if form is dirty (has unsaved changes)
    const [isDirty, setIsDirty] = useState(false);

    // Mark dirty on any field change
    const handleFieldChange = (setter) => (value) => {
        setter(value);
        setIsDirty(true);
    };

    // Save handler: save product, mark onboarding step, go to onboarding next step
    const handleSave = async () => {
        // Validate price
        if (!price || isNaN(Number(price)) || Number(price) < 0) {
            alert('Please enter a valid price.');
            return;
        }
        // Validate cost per item (optional, but can add similar check)
        if (costPerItem && (isNaN(Number(costPerItem)) || Number(costPerItem) < 0)) {
            alert('Please enter a valid cost per item.');
            return;
        }
        let vendorUid = null;
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (!error && user) {
                vendorUid = user.id;
            }
        } catch (e) {
            // ignore
        }

        const productPayload = {
            title: title.trim(),
            body_html: description,
            vendor: vendor.trim(),
            vendorUid,
            productType: type,
            status: status.toUpperCase(),
            publicationIds,
            categoryId,
            options: ["Title"],
            variants: [{
                price: Number(price),
                compareAtPrice: compareAtPrice ? Number(compareAtPrice) : 0,
                costPerItem: costPerItem ? Number(costPerItem) : undefined,
                inventoryManagement: "SHOPIFY",
                inventoryPolicy: "DENY",
                requiresShipping: isPhysical,
                taxable: chargeTax,
                weight: weight,
                weightUnit: weightUnit,
                originCountry: originCountry
            }]
        };

        try {
            const res = await fetch('https://aniyor-backend.onrender.com/products', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ product: productPayload }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Product creation failed:', errorData);
                alert(`Failed to create product: ${errorData.error || 'Unknown error'}`);
                return;
            }

            const data = await res.json();
            alert('Product created successfully!');
            
            // Mark onboarding step as complete and go to next step
            localStorage.setItem('addedProductName', title);
            localStorage.setItem('productNameComplete', 'true');
            window.dispatchEvent(new Event('storage'));
            
            const nextStep = location.state && typeof location.state.stepIndex === 'number'
                ? location.state.stepIndex + 1
                : 1;
                
            setTimeout(() => {
                const backTo = location.state?.from || '/onboarding';
                navigate(backTo, { state: { stepIndex: nextStep } });
            }, 0);
            
            setIsDirty(false);
        } catch (err) {
            console.error('Submission error:', err);
            alert('Network error while creating product.');
        }
    };

    // Discard handler: just go back to onboarding, do not tick the step
    const handleDiscard = () => {
        const stepIndex = location.state && typeof location.state.stepIndex === 'number'
            ? location.state.stepIndex
            : 0;
        setTimeout(() => {
            const backTo = location.state?.from || '/onboarding';
            navigate(backTo, { state: { stepIndex } });
        }, 0);
        setIsDirty(false);
    };

    const navigate = useNavigate();
    const location = useLocation();

    // Set product name from onboarding page if present (only on mount)
    React.useEffect(() => {
        if (location.state && location.state.productName) {
            setTitle(location.state.productName);
            setIsDirty(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Background>
            <SaveNavbar
                onSave={handleSave}
                onDiscard={handleDiscard}
                isDirty={isDirty}
            />
            <Sidebar />
            <PageWrapper>
                <ContentWrapper>
                    <MainFormWrapper>
                        <div style={{ width: "100%" }}>
                            <div style={{ width: '100%', marginTop: '1px', alignItems: 'start', justifyContent: 'start', flexShrink: 0 }}>
                                <div style={{ marginRight: 0 }}>
                                    <FormLayout>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8, // space between icon and text
                                                marginBottom: 12,
                                                flexShrink: 0,
                                            }}
                                        >
                                            <img src={ArrowLeftIcon} alt="arrow" style={{ width: 25 }} />
                                            <Text as="h3" fontWeight="bold" variant="headingXl">
                                                Add Products
                                            </Text>
                                        </div>
                                        <Card>
                                            <BlockStack gap="200">
                                                <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                                    Title
                                                </Text>
                                                <TextField
                                                    value={title}
                                                    onChange={handleFieldChange(setTitle)}
                                                    placeholder="Enter product name"
                                                />
                                            </BlockStack>
                                            <BlockStack>
                                       <Dbox setDescription={setDescription} />



                                            </BlockStack>



                                            <BlockStack>
                                                <Box maxHeight='200px'>


                                                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                        <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                                            Media
                                                        </Text>


                                                        <DropZone onDrop={handleDropZoneDrop} >
                                                            {dropZoneOverlay}
                                                        </DropZone>

                                                    </div>

                                                </Box>

                                            </BlockStack>

                                            <Box>
                                                <div style={{ marginTop: 10, marginBottom: 10 }}>

                                                    <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                                        Category
                                                    </Text>
                                                </div>


                                                <BlockStack gap="200">
                                                    <Select

                                                        options={categoryOptions}
                                                        value={category}
                                                        onChange={handleFieldChange(setCategory)}
                                                    />
                                                </BlockStack>
                                            </Box>
                                            <div style={{ marginTop: 7, marginBottom: 7 }}>

                                                <Text as="h3" alignment="start" variant="bodyMd">
                                                    Countries have different laws for gift card expiry dates.Check the laws for your country before changing this date
                                                </Text>

                                            </div>
                                        </Card>

                                        <Card>
                                            <div style={{ marginTop: 10, marginBottom: 10 }}>

                                                <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                                    Pricing
                                                </Text>
                                            </div>

                                            <InlineStack gap="400" align="start">

                                                <div style={{ flex: 1 }}>
                                                    <div style={{ flex: 1, marginBottom: 5 }}>

                                                        <Text variant="bodySm" as="label" alignment='start'>Price</Text>
                                                    </div>
                                                    <TextField type="number" prefix="₹" value={price} onChange={handleFieldChange(setPrice)} autoComplete="off" required min={0} />
                                                </div>

                                                <div style={{ flex: 1 }}>
                                                    <div style={{ flex: 1, marginBottom: 5 }}>

                                                        <Text variant="bodySm" as="label" alignment='start'>Compare-at Price</Text>
                                                    </div>
                                                    <TextField
                                                        type="number"
                                                        prefix="₹"
                                                        value={compareAtPrice}
                                                        onChange={handleFieldChange(setCompareAtPrice)}
                                                        autoComplete="off"
                                                        min={0}
                                                    />
                                                </div>
                                            </InlineStack>

                                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 16 }}>
                                                <Checkbox
                                                    label="Charge tax on this product"
                                                    checked={chargeTax}
                                                    onChange={handleFieldChange(setChargeTax)}
                                                />
                                            </div>


                                            <Divider borderColor="border" />

                                            <Box width='50%'>

                                                <div style={{ flex: 1, marginTop: 10, marginBottom: 3 }}>
                                                    <Text variant="bodySm" as="label" alignment='start'>Cost per item</Text>
                                                </div>
                                                <TextField
                                                    type="number"
                                                    prefix="₹"
                                                    value={costPerItem}
                                                    onChange={handleFieldChange(setCostPerItem)}
                                                    autoComplete="off"
                                                    min={0}
                                                />
                                            </Box>


                                        </Card>




                                        <LegacyCard sectioned>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                                <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>Inventory</Text>
                                                <Link url="#">Adjustment History</Link>
                                            </div>
                                            <div style={{ marginTop: 10, marginBottom: 5 }}>

                                                <Text variant="bodyMd" as="p" alignment='start'>Inventory will be stocked at</Text>
                                            </div>

                                            <Select
                                                options={locationOptions}
                                                value={inventoryLocation}
                                                onChange={handleFieldChange(setInventoryLocation)}
                                            />

                                            <div style={{ marginTop: 16 }}>
                                                <InlineStack gap="400" align="start">

                                                    <div style={{ flex: 1, marginBottom: 5 }}>
                                                        <div style={{ flex: 1, marginBottom: 5 }}>

                                                            <Text variant="bodySm" as="label" alignment='start'>Price</Text>
                                                        </div>
                                                        <TextField
                                                            type="number"
                                                            prefix="₹"
                                                            value={price}
                                                            onChange={handleFieldChange(setPrice)}
                                                            autoComplete="off"
                                                        />
                                                    </div>

                                                    <div style={{ flex: 1, marginBottom: 5 }}>
                                                        <div style={{ flex: 1, marginBottom: 5 }}>

                                                            <Text variant="bodySm" as="label" alignment='start'>Compare-at Price</Text>
                                                        </div>
                                                        <TextField
                                                            type="number"
                                                            prefix="₹"
                                                            value={compareAtPrice}
                                                            onChange={handleFieldChange(setCompareAtPrice)}
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </InlineStack>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'start', marginTop: 8 }}>
                                                <Checkbox
                                                    label="Charge tax on this product"
                                                    checked={chargeTax}
                                                    onChange={setChargeTax}
                                                />
                                            </div>

                                            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'start' }}>
                                                <Checkbox
                                                    label={
                                                        <Text as="span" fontWeight="semibold">
                                                            Continue Selling when out of Stock
                                                        </Text>
                                                    }
                                                    checked={continueSelling}
                                                    onChange={setContinueSelling} />
                                            </div>
                                            <Text as="p" tone="subdued">
                                                This won't affect <Link url="#">Aniyor POS</Link>. Staff will see a warning,
                                                but can complete sales when available inventory reaches zero and below.
                                            </Text>

                                            <div style={{ marginTop: 20 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                                                    <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>Quantity</Text>
                                                    <Link url="#">Edit Location</Link>
                                                </div>
                                                <Divider />





                                                <IndexTable
                                                    resourceName={{ singular: 'location', plural: 'locations' }}
                                                    itemCount={rows.length}
                                                    selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                                                    onSelectionChange={handleSelectionChange}
                                                    headings={[
                                                        { title: 'Location' },
                                                        { title: 'Unavailable' },
                                                        { title: 'Committed' },
                                                        { title: 'Available' },
                                                        { title: 'On Hand' },
                                                    ]}
                                                    selectable={false}
                                                >
                                                    {rows.map(({ id, location, unavailable, committed, available, onHand }) => (
                                                        <IndexTable.Row id={id} key={id} selected={false} position={parseInt(id)}>
                                                            <IndexTable.Cell>
                                                                <Text as="span">{location}</Text>
                                                            </IndexTable.Cell>
                                                            <IndexTable.Cell>{unavailable}</IndexTable.Cell>
                                                            <IndexTable.Cell>{committed}</IndexTable.Cell>
                                                            <IndexTable.Cell>{available}</IndexTable.Cell>
                                                            <IndexTable.Cell>{onHand}</IndexTable.Cell>
                                                        </IndexTable.Row>
                                                    ))}
                                                </IndexTable>
                                            </div>

                                        </LegacyCard>

                                        <LegacyCard sectioned>
                                            <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>Shipped</Text>
                                            <FormLayout>
                                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

                                                    <Checkbox
                                                        label="Item is a physical product"
                                                        checked={isPhysical}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </div>
                                                <InlineStack gap={400}>
                                                    <Box width='30%'>
                                                        <Text variant="bodySm" as="label" alignment='start'>Weight</Text>
                                                        <TextField

                                                            type="number"
                                                            value={weight}
                                                            onChange={handleWeightChange}
                                                            autoComplete="off"
                                                        />
                                                    </Box>
                                                    <Box width='10%'>
                                                        <Text variant="bodySm" as="label" alignment='start'>Unit</Text>

                                                        <Select
                                                            label=" "
                                                            labelHidden
                                                            options={unitOptions}
                                                            value={weightUnit}
                                                            onChange={handleUnitChange}
                                                        />

                                                    </Box>
                                                </InlineStack>

                                                <TextField
                                                    label="Country/Region of origin"
                                                    value={originCountry}
                                                    onChange={handleCountryChange}
                                                    autoComplete="country"
                                                />
                                            </FormLayout>
                                        </LegacyCard>




                                    </FormLayout>
                                </div>
                            </div>
                        </div>
                    </MainFormWrapper>
                    <Box>
                        <div style={{ marginRight: 0, marginTop: 110, minWidth: 260, maxWidth: 260 }}>

                            <Leftadd
  status={status}
  setStatus={setStatus}
  vendor={vendor}
  setVendor={setVendor}
  type={type}
  setType={setType}
  publicationIds={publicationIds}
  setPublicationIds={setPublicationIds}
  categoryId={categoryId}
  setCategoryId={setCategoryId}
/>

                        </div>
                    </Box>
                </ContentWrapper>
            </PageWrapper>
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

const IconCSS = styled(Icon)`
   color: #3377FF;
   `;