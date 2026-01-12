import React, { useState, useCallback } from 'react';
import { Text, Card, Select, Page, FormLayout, ChoiceList, IndexTable, Divider, Button, TextField, BlockStack, Link, InlineStack, Badge, Box, LegacyCard, Avatar, Checkbox, Tabs, Form, DropZone, Scrollable, useIndexResourceState } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Icon } from '@shopify/polaris';
import styled from 'styled-components';
import blackcross from '../../assets/blackcross.png';

export default function AddShippingCard() {
    const [selectedOption, setSelectedOption] = useState("custom");
    const [customName, setCustomName] = useState("Custom rate name");
    const [customAmount, setCustomAmount] = useState("0");
    const [currency, setCurrency] = useState("INR");

    const handleApply = () => {
        console.log("Shipping applied:", {
            selectedOption,
            customName,
            customAmount,
            currency,
        });
    };

    const handleCancel = () => {
        setSelectedOption("custom");
        setCustomName("Custom rate name");
        setCustomAmount("0");
        setCurrency("INR");
    };
    const [discount, setDiscount] = useState('');
    const [visible, setVisible] = useState(true);

    const handleDiscountChange = useCallback((value) => setDiscount(value), []);
    const handleClose = useCallback(() => setVisible(false), []);

    const [discountValue, setDiscountValue] = useState("0");
    const [reason, setReason] = useState("");
    const currencyOptions = [
        { label: "₹", value: "INR" },
        { label: "$", value: "USD" },
        { label: "€", value: "EUR" },
    ];





    return (
        <Background>
            <Page narrowWidth>
                <div style={{ minWidth: 600 }}>


                    <Card>
                        <div style={{ minWidth: 400, margin: '2rem auto', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>


                            <div style={{ background: '#f6f6f7', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxHeight: 50 }}>
                                <Text variant="headingMd" as="h2">Add Shipping or Delivery</Text>
                                <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <img src={blackcross} alt="Close" width={30} />
                                </button>
                            </div>








                            <Box paddingInline="400" paddingBlockStart="0" paddingBlockEnd="400">
                                <div style={{display:'flex', justifyContent:'flex-start', marginTop:10}}>
                                <ChoiceList
                                    title=""
                                    choices={[
                                        { label: "Standard\n₹ 50/-__", value: "standard" },
                                        { label: "Free shipping\n₹ 0/-", value: "free" },
                                        { label: "Custom_________", value: "custom" },
                                    ]}
                                    selected={[selectedOption]}
                                    onChange={(value) => setSelectedOption(value[0])}
                                />
                                </div>

                                {selectedOption === "custom" && (
                                    <Box paddingBlockStart="400">
                                        <InlineStack gap="200">
                                            <TextField
                                                label=""
                                                value={customName}
                                                onChange={setCustomName}
                                                autoComplete="off"
                                            />
                                            <Select
                                                label=""
                                                options={[
                                                    { label: "₹", value: "INR" },
                                                    { label: "$", value: "USD" },
                                                    { label: "€", value: "EUR" },
                                                ]}
                                                value={currency}
                                                onChange={setCurrency}
                                            />
                                        </InlineStack>
                                    </Box>
                                )}
                            </Box>


                         

                            <Divider/>
                            <div style={{ marginTop: 15 }}>


                                <Box paddingInline="400" paddingBlockEnd="400" display="flex" justifyContent="end" gap="200">
                                    <div style={{ display: 'flex ', justifyContent: 'flex-end', gap: 10 }}>


                                        <Button onClick={handleCancel}>Cancel</Button>
                                        <Button variant='primary' onClick={handleApply}>Apply</Button>
                                    </div>
                                </Box>

                            </div>


                        </div>
                    </Card>
                </div>



            </Page>

        </Background>
    );
};




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
