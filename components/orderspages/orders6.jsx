import React, { useState, useCallback } from 'react';
import { Text, Card, Select, Page, Banner, FormLayout, IndexTable, Divider, Button, TextField, BlockStack, Link, InlineStack, Badge, Box, LegacyCard, Avatar, Checkbox, Tabs, Form, DropZone, Scrollable, useIndexResourceState } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Icon } from '@shopify/polaris';
import styled from 'styled-components';
import blackcross from '../../assets/blackcross.png';

const addproducts = () => {
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


    const [discountValue, setDiscountValue] = useState("0");
    const [reason, setReason] = useState("");
    const [currency, setCurrency] = useState("INR");

    const currencyOptions = [
        { label: "₹", value: "INR" },
        { label: "$", value: "USD" },
        { label: "€", value: "EUR" },
    ];

    const handleApply = () => {
        console.log("Discount applied:", { discountValue, currency, reason });
    };

    const handleCancel = () => {
        setDiscountValue("0");
        setReason("");
        setCurrency("INR");
    };

    const [discount, setDiscount] = useState('');
    const [visible, setVisible] = useState(true);

    const handleDiscountChange = useCallback((value) => setDiscount(value), []);
    const handleClose = useCallback(() => setVisible(false), []);




    return (
        <Background>
            <Page narrowWidth>



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



                                    <Card>



                                        <div style={{ maxWidth: 800, margin: '2rem auto', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>


                                            <div style={{ background: '#f6f6f7', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxHeight: 50 }}>
                                                <Text variant="headingMd" as="h2">Leave the page with unsaved changes?</Text>
                                                <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <img src={blackcross} alt="Close" width={30} />
                                                </button>
                                            </div>
                                            <div style={{marginTop:20 , marginBottom:20 , marginLeft:20}}>
                                                <Text alignment='start'>Leaving the page will delete all the unsaved changes</Text>
                                            </div>




                                     

                                            <Divider />
                                            <div style={{ marginTop: 15 }}>


                                                <Box paddingInline="400" paddingBlockEnd="400" display="flex" justifyContent="end" gap="200">
                                                    <div style={{ display: 'flex ', justifyContent: 'flex-end', gap: 10 }}>


                                                        <Button onClick={handleCancel}>Stay</Button>
                                                        <Button variant='primary' tone='critical' onClick={handleApply}>Leave page</Button>
                                                    </div>
                                                </Box>

                                            </div>


                                        </div>
                                    </Card>









                                </FormLayout>
                            </div>
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
