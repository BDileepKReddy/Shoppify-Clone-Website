import React, { useState, useCallback } from 'react';
import { Text, Card, Select, Page, FormLayout, IndexTable, Divider, Button, TextField, BlockStack, Link, InlineStack, Badge, Box, LegacyCard, Avatar, Checkbox, Tabs, Form, DropZone, Scrollable, useIndexResourceState, LegacyStack } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Icon } from '@shopify/polaris';
import styled from 'styled-components';
import blackcross from '../../assets/blackcross.png';
const AddCustomItemCard = () => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('0.00');
    const [quantity, setQuantity] = useState('1');
    const [isTaxable, setIsTaxable] = useState(true);
    const [isPhysical, setIsPhysical] = useState(false);
    const [unit, setUnit] = useState('kg');
    const [discountValue, setDiscountValue] = useState("0");
    const [reason, setReason] = useState("");
    const [currency, setCurrency] = useState("INR");

    const handleDiscountChange = useCallback((value) => setDiscount(value), []);
    const handleClose = useCallback(() => setVisible(false), []);


    const handleAddItem = () => {
        console.log({ itemName, price, quantity, isTaxable, isPhysical, unit });
        // Add your logic here to handle the item addition
    };
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

    return (
        <div style={{ minWidth: 800 }}>


            <Card >


                <div style={{ maxWidth: 800, margin: '2rem auto', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>


                    <div style={{ background: '#f6f6f7', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxHeight: 50 }}>
                        <Text variant="headingMd" as="h2">Add Discount</Text>
                        <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <img src={blackcross} alt="Close" width={30} />
                        </button>
                    </div>



                    <div style={{ marginTop: 30 }}>
                        <div style={{ marginLeft: 20  , marginRight:20}}>
                            <InlineStack gap={100} align='space-between'> 
                                <TextField
                                    label="Item name"
                                    value={itemName}
                                    onChange={setItemName}
                                    autoComplete="off"
                                />
                                <TextField
                                    label="Price"
                                    type="number"
                                    prefix="$"
                                    value={price}
                                    onChange={setPrice}
                                    autoComplete="off"
                                />
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    value={quantity}
                                    onChange={setQuantity}
                                    autoComplete="off"
                                />

                            </InlineStack>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: 20, marginTop: 5 }}>
                            <Checkbox
                                label="Item is taxable"
                                checked={isTaxable}
                                onChange={setIsTaxable}
                            />
                            <Checkbox
                                label="Item is a physical product"
                                checked={isPhysical}
                                onChange={setIsPhysical}
                            />
                        </div>
                        <div style={{ marginLeft: 20, marginTop: 5, marginBottom: 20 }}>
                            <Text alignment='start' variant='bodyLg'>Item name</Text>


                            <InlineStack gap="100" align="start" >
                                <TextField
                                    type="number"
                                    value={discountValue}
                                    onChange={setDiscountValue}
                                    autoComplete="off"
                                />
                                <Select
                                    options={[{ label: 'KG', value: 'kg' }]}
                                    label=""


                                    onChange={setUnit}
                                />
                            </InlineStack>


                        </div>
                        <Divider />
                        <div style={{ marginTop: 15 }}>


                            <Box paddingInline="400" paddingBlockEnd="400" display="flex" justifyContent="end" gap="200">
                                <div style={{ display: 'flex ', justifyContent: 'flex-end', gap: 10 }}>


                                    <Button onClick={handleCancel}>Cancel</Button>
                                    <Button variant='primary' onClick={handleApply}>Apply</Button>
                                </div>
                            </Box>

                        </div>


                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AddCustomItemCard;




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
