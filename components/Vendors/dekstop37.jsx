import React, { useState, useCallback } from 'react';
import { Text, Card, Select, Page, FormLayout, Button, TextField, InlineStack, Badge, Box, LegacyCard, Avatar, Tabs, Form } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import usericon from '../../assets/usericon.png'; // Adjust the path as necessary
import { Icon } from '@shopify/polaris';
import { supabase } from '../../config/supabaseClient.js';
import arrow from '../../assets/arrow.png'; // Adjust the path as necessary
import tick from '../../assets/tick.png'; // Adjust the path as necessary
import cross from '../../assets/cross.png'; // Adjust the path as necessary
import SideBar from '../Sidebar.jsx';
import MainNavbar from '../MainNavbar.jsx'; // Adjust the path as necessary
import styled from 'styled-components';
import Left from './left.jsx'
const dekstop37 = () => {
    const [selected, setSelected] = useState(0);

    const [businessName, setBusinessName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [category, setCategory] = useState("grocery");
    const [sellerid, setSellerId] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), []);

    const categoryOptions = [
        { label: "Grocery Store", value: "grocery" },
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






    return (
        <Background>
            <Page narrowWidth>

                <Sidebar />
                <Navbar />

                {/* <div style={{ padding: '20px' }}>
                <button onClick={getLoggedInUserId}>Get Logged-in User ID</button>

            </div> */}

                <InlineStack wrap={false} blockAlign="start" gap="0">
                    <Box
                        style={{
                            flexGrow: 2,    // ← give it twice the weight of the secondary box
                            flexShrink: 0,  // ← never shrink below its content width
                            minWidth: '700px', // ← ensure it doesn’t collapse too small
                            marginTop: '50px',
                        }}
                    >





                        <div style={{ maxWidth: '800', marginTop: '1px', alignItems: 'start', justifyContent: 'start', flexShrink: 0, }}>
                            <div style={{ marginRight: 0 }}>
                                <FormLayout>
                                    <div style={{ marginBottom: 12, flexShrink: 0 }}>
                                        <Text as="h3" alignment="start" fontWeight="bold" variant="headingXl">
                                            Malhar Agencies
                                        </Text>

                                        <Text as="h3" alignment="start" fontWeight="regular" variant="bodySm">
                                            Varanasi UP , India , Customer for 2 months
                                        </Text>
                                    </div>

                                    <LegacyCard style={{ minHeight: 300 }}>
                                        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                                            <LegacyCard.Section>
                                               
                                                {selected === 0 && (
                                                    <>
                                                        <div style={{ marginBottom: 10, flexShrink: 0 }} >


                                                            <Text as="h3" alignment="start" fontWeight="bold" variant="bodyMd">
                                                                Seller Details
                                                            </Text>
                                                        </div>
                                                        <div>


                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                                                {/* Left Side: All Text Fields */}
                                                                <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
                                                                    <Box width="100%" style={{ marginBottom: '5px' }}>
                                                                        <TextField
                                                                            label="Seller/Business Name"
                                                                            value={businessName}
                                                                            onChange={setBusinessName}
                                                                            autoComplete="off"
                                                                        />
                                                                    </Box>

                                                                    <Box width="100%">
                                                                        <TextField
                                                                            label="Seller Id"
                                                                            value={sellerid}
                                                                            onChange={setSellerId}
                                                                            autoComplete="off"
                                                                        />
                                                                    </Box>
                                                                </div>

                                                                {/* Right Side: Picture + Status + Time */}
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                    <div>
                                                                        <img src={usericon} alt="usericon" style={{ width: 92 }} />
                                                                    </div>
                                                                    <Badge tone="success">Active</Badge>
                                                                    <Text variant="bodyMd" as="p" fontWeight="medium" alignment="center">
                                                                        10:30 am
                                                                    </Text>
                                                                </div>
                                                            </div>






                                                            <div style={{ marginBottom: 10, marginTop: 10, flexShrink: 0 }} >

                                                                <InlineStack gap="200" wrap={false}>
                                                                    <Button onClick={saveSellerDetails} size="large" loading={loading} variant="primary">
                                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                            <img src={arrow} alt="arrow" style={{ width: 15 }} />
                                                                            Send Notification
                                                                        </span>
                                                                    </Button>

                                                                    <Button tone="success" variant='primary' size='large'>
                                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                            <img src={tick} alt="tick" style={{ width: 20 }} />
                                                                            Approve/Verify Account
                                                                        </span>
                                                                    </Button>

                                                                    <Button tone="critical" size='large'>
                                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                            <img src={cross} alt="cross" style={{ width: 20 }} />
                                                                            Suspend
                                                                        </span>
                                                                    </Button>


                                                                </InlineStack>
                                                            </div>
                                                        </div>

                                                        <InlineStack gap="400" wrap={false}>
                                                            <Box width="50%">
                                                                <TextField
                                                                    label="Brand Name"
                                                                    value={ownerName}
                                                                    onChange={setOwnerName}
                                                                    autoComplete="off"
                                                                />
                                                            </Box>
                                                            <Box width="50%">
                                                                <TextField
                                                                    label="Contact Person"
                                                                    value={panNumber}
                                                                    onChange={setPanNumber}
                                                                    autoComplete="off"
                                                                />
                                                            </Box>

                                                        </InlineStack>
                                                        <Box>
                                                            <Text as="h3" alignment="start" variant="bodyMd">
                                                                Business Category
                                                            </Text>
                                                        </Box>
                                                        <Select

                                                            options={categoryOptions}
                                                            value={category}
                                                            onChange={setCategory}
                                                        />
                                                        <InlineStack gap="400" wrap={false}>
                                                            <Box width="50%">
                                                                <TextField
                                                                    label="Address Line 1"
                                                                    value={ownerName}
                                                                    onChange={setOwnerName}
                                                                    autoComplete="off"
                                                                />
                                                            </Box>
                                                            <Box width="50%">
                                                                <TextField
                                                                    label="Address Line 2"
                                                                    value={panNumber}
                                                                    onChange={setPanNumber}
                                                                    autoComplete="off"
                                                                />
                                                            </Box>

                                                        </InlineStack>

                                                        <InlineStack gap="400" wrap={false}>
                                                            <Box width="50%">
                                                                <Text as="h3" alignment="start" variant="bodyMd">
                                                                    Country
                                                                </Text>

                                                            </Box>
                                                            <Box width="50%">
                                                                <Text as="h3" alignment="start" variant="bodyMd">
                                                                    State
                                                                </Text>

                                                            </Box>

                                                        </InlineStack>
                                                        <InlineStack gap="400" wrap={false}>
                                                            <Box width="50%">
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
                                                            <Box width="50%">
                                                                <Text
                                                                    label="Pin Code"
                                                                    value={panNumber}
                                                                    onChange={setPanNumber}
                                                                    autoComplete="off"
                                                                />
                                                                <Select

                                                                    options={categoryOptions}
                                                                    value={category}
                                                                    onChange={setCategory}
                                                                />
                                                            </Box>

                                                        </InlineStack>
                                                        <div >


                                                            <InlineStack gap="400" wrap={false}>
                                                                <Box width="50%">
                                                                    <Text as="h3" alignment="start" variant="bodyMd">
                                                                        City
                                                                    </Text>
                                                                    <Select

                                                                        options={categoryOptions}
                                                                        value={category}
                                                                        onChange={setCategory}
                                                                    />
                                                                </Box>
                                                                <Box width="50%">
                                                                    <TextField
                                                                        label="PAN Number"
                                                                        value={panNumber}
                                                                        onChange={setPanNumber}
                                                                        autoComplete="off"
                                                                    />
                                                                </Box>


                                                            </InlineStack>
                                                        </div>
                                                        <InlineStack gap="400" wrap={false}>
                                                            <Box width="50%">
                                                                <TextField
                                                                    label="Registration Date"
                                                                    value={ownerName}
                                                                    onChange={setOwnerName}
                                                                    autoComplete="off"
                                                                />
                                                            </Box>
                                                            <Box width="50%">
                                                                <TextField
                                                                    label="Ratings & Feedback"
                                                                    value={panNumber}
                                                                    onChange={setPanNumber}
                                                                    autoComplete="off"
                                                                />
                                                            </Box>

                                                        </InlineStack>



                                                    </>
                                                )}
                                             

                                                {/* Add more tab content here if needed */}
                                            </LegacyCard.Section>

                                        </Tabs>
                                    </LegacyCard>
                                </FormLayout>
                            </div>
                        </div>
                    </Box>
                    <Box>

                    <div style={{ marginRight: 200 , marginTop: 110 , minWidth: 300}}>

                        <Left />
                    </div>
                    </Box>



                </InlineStack>

            </Page>

        </Background>
    );
};

export default dekstop37;




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



//   const InputText = styled.div`
//   width: 370;
//   height: 61;
//   padding-top: 20px;
//   padding-right: 32px;
//   padding-bottom: 20px;
//   padding-left: 32px;
//   border-radius: 6px;
//   border-width: 1px;
// `

const IconCSS = styled(Icon)`
   color: #3377FF;
   `;
