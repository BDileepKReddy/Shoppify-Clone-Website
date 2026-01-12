import React, { useState, useCallback } from 'react';
import { Text, Tag, LegacyStack, ActionList, Popover, Layout, Card, Select, Page, FormLayout, IndexTable, Divider, Button, TextField, BlockStack, Link, InlineStack, Badge, Box, LegacyCard, Avatar, Checkbox, Tabs, Form, DropZone, Scrollable, useIndexResourceState } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Icon } from '@shopify/polaris';
import Sidebar from '../Sidebar';
import MainNavbar from '../MainNavbar';
import styled from 'styled-components';
import Leftadd from '../Vendors/leftadd';
import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';
import Greybox from '../../assets/greybox.png';
import Vroom from '../../assets/vroom.png';
import Tdots from '../../assets/tdots.png';
import Rupee from '../../assets/rupee.png';
import Pasta from '../../assets/pasta.png';
import vdicon from '../../assets/vdicon.png';

const addproducts = () => {
    const [selected, setSelected] = useState(0);
    const [popoverActive, setPopoverActive] = useState(true);
    const [status, setStatus] = useState('active');
    const [vendor, setVendor] = useState('');
    const [type, setType] = useState('product');
    const [publicationIds, setPublicationIds] = useState([]);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            More actions
        </Button>
    );
    const [comment, setComment] = useState('');

    const timelineData = [
        { text: 'This order was archived', time: '8:22 AM' },
        { text: 'Delhivery fulfilled 4 items from Juhu Koliwada.', time: '8:22 AM' },
        {
            text: 'Order confirmation email was sent to Kajal Somal (pabarikajal@gmail.com).',
            time: '8:22 AM',
            hasPost: true,
        },
        { text: 'A ₹740.00 INR payment was processed on 1 Razorpay.', time: '8:22 AM' },
        { text: 'Confirmation #FUN3CUCHY was generated for this order', time: '8:22 AM' },
        {
            text: 'Kajal Somai placed this order on Online Store (checkout #37767571407618).',
            time: '8:22 AM',
        },
    ];

    return (
        <Background>
            <Page narrowWidth>

                <Sidebar />
                <MainNavbar />



                <Box>
                    <div style={{ marginTop: 50, marginBottom: 25, minWidth:1000}}>
                        <InlineStack align='space-between'  blockAlign='center'>

                            <div>
                                <InlineStack gap={400}>



                                    <img src={ArrowLeftIcon} alt="Close" width={30} />
                                    <Text alignment='start' variant='headingLg'># 1014</Text>

                                    <Tag url="#">
                                        <LegacyStack spacing="extraTight">
                                            <img src={Greybox} alt="Close" width={15} />

                                            <span>Paid</span>
                                        </LegacyStack>
                                    </Tag>
                                    <Tag url="#">
                                        <LegacyStack spacing="extraTight">
                                            <img src={Greybox} alt="Close" width={15} />

                                            <span>Fulfilled</span>
                                        </LegacyStack>
                                    </Tag>
                                    <Tag url="#">
                                        <LegacyStack spacing="extraTight">


                                            <span>Archived</span>
                                        </LegacyStack>
                                    </Tag>
                                </InlineStack>
                            </div>
                            <div >
                                <InlineStack gap={400}>


                                <Tag url="#">
                                    <LegacyStack spacing="extraTight">


                                        <span>Refund</span>
                                    </LegacyStack>
                                </Tag>
                                <Tag url="#">
                                    <LegacyStack spacing="extraTight">


                                        <span>Return</span>
                                    </LegacyStack>
                                </Tag>
                                <Tag url="#">
                                    <LegacyStack spacing="extraTight">


                                        <span>Add</span>
                                    </LegacyStack>
                                </Tag>

                                <Popover
                                    active={popoverActive}
                                    activator={activator}
                                    onClose={togglePopoverActive}
                                    >
                                    <ActionList
                                        items={[
                                            { content: "Duplicate", onAction: () => { } },
                                            { content: "Unarchive", onAction: () => { } },
                                        ]}
                                        />
                                </Popover>
                                        </InlineStack>
                         
                            </div>
                        </InlineStack>
                    </div>

                </Box>


                <InlineStack wrap={false} blockAlign="start" gap="0">
                    <Box
                        style={{
                            flexGrow: 2,    // ← give it twice the weight of the secondary box
                            flexShrink: 0,  // ← never shrink below its content width
                            minWidth: '700px', // ← ensure it doesn't collapse too small
                            marginTop: '50px',
                        }}
                    >
                        <StyledCard>
                            {/* Order Status and Fulfillment */}
                            <Box padding="4">
                                <div style={{ marginTop: 0, marginBottom: 15, marginLeft: 3 }}>
                                    <InlineStack align="space-between" blockAlign="center" width="100%">
                                        <div>
                                            <InlineStack gap={200}>
                                                <Badge tone="success">
                                                    <InlineStack align='space-between' blockAlign='center' >
                                                        <img src={Vroom} alt="Close" width={15} />
                                                        Fulfilled (4)
                                                    </InlineStack>
                                                </Badge>
                                                <Text variant="bodyMd" fontWeight="semibold">#1014-F1</Text>
                                            </InlineStack>
                                        </div>
                                        <div>
                                            <img src={Tdots} alt="Close" width={15} />
                                        </div>
                                    </InlineStack>
                                </div>


                                <Card>
                                    <div style={{ marginTop: 5, marginBottom: 5 }}>

                                    </div>
                                    <Box paddingBlockStart="4">
                                        <Text tone="subdued" alignment='start'>Location</Text>
                                        <Text fontWeight="semibold" alignment='start'>Juhu Koliwada</Text>
                                    </Box>
                                    <div style={{ marginTop: 5, marginBottom: 5 }}>
                                        <Box paddingBlockStart="2">
                                            <Text tone="subdued" alignment='start'>Fulfilled</Text>
                                            <Text fontWeight="semibold" alignment='start'>September 28, 2024</Text>
                                        </Box>
                                    </div>
                                    <div style={{ marginTop: 5, marginBottom: 5 }}>
                                        <Box paddingBlockStart="2">
                                            <Text tone="subdued" alignment='start'>Delhivery tracking number</Text>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <InlineStack gap={200}>
                                                    <Link removeUnderline url="#" >23267010000604</Link>
                                                    <Badge tone="info">
                                                        In Transit</Badge>
                                                </InlineStack>
                                            </div>
                                        </Box>
                                    </div>
                                    <div style={{ marginTop: 20 }}>



                                        <Divider />

                                    </div>

                                    <Box>
                                        <InlineStack gap={100} align="space-between" blockAlign="center">
                                            <InlineStack>

                                                <img
                                                    src={Pasta}
                                                    alt="icon"
                                                    style={{ width: '80x', height: '80px' }}
                                                />
                                                <div>

                                                    <Text variant="bodyMd" fontWeight="bold" alignment='start'>
                                                        Farali Pasta(180g)
                                                    </Text>
                                                    <Text tone="subdued" variant="bodySm" alignment='start'>SKU: 1007</Text>
                                                </div>
                                            </InlineStack>
                                            <div>

                                                <Text variant="bodyMd" fontWeight="semibold" alignment='start'>
                                                    ₹155.00 × 4
                                                </Text>
                                            </div>
                                            <Text fontWeight="semibold">₹620.00</Text>
                                        </InlineStack>
                                    </Box>
                                </Card>



                            </Box>
                        </StyledCard>


                        <StyledCard>
                            {/* Payment Summary */}

                            <div style={{ marginBottom: '1rem', minHeight: 10, minWidth: 10, display: 'flex', justifyContent: 'flex-start' }}>
                                <Badge status="success">
                                    <InlineStack >

                                        <img src={Rupee} alt="Close" width={15} />
                                        Paid
                                    </InlineStack>
                                </Badge>
                            </div>
                            <Card>
                                <div style={{ marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Text variant="bodyMd">Subtotal</Text>

                                        <Text variant="bodyMd">4 items</Text>
                                        <Text variant="bodyMd">Net sales</Text>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                                    <Text variant="bodyMd">Shipping</Text>

                                    <Text variant="bodyMd">4 items</Text>
                                    <Text variant="bodyMd">₹00.00</Text>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                                    <Text variant="bodyMd">Taxes</Text>
                                    <Text variant="bodyMd">₹00.00</Text>
                                </div>
                                <Divider style={{ margin: '1rem 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text variant="bodyMd" fontWeight="medium">Total</Text>
                                    <Text variant="bodyMd">₹00.00</Text>
                                </div>
                                <Divider style={{ margin: '1rem 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text variant="bodyMd" fontWeight="medium">Paid</Text>
                                    <Text variant="bodyMd">₹00.00</Text>
                                </div>
                            </Card>


                        </StyledCard>
                        <div style={{ marginBottom: 10, marginLeft: 5 }}>


                            <Text variant="headingMd" alignment='start' as="h2">Timeline</Text>
                        </div>



                        <div >
                            <StyledCard>


                                <InlineStack align='start' blockAlign='center' gap={200}>


                                    <img src={vdicon} alt="Close" width={60} />
                                    <Text variant='headingMd'>Leave a comment</Text>


                                </InlineStack>
                            </StyledCard>
                            {/* Comment actions */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '0.5rem',
                                    alignItems: 'center',
                                }}
                            >
                                <Text fontSize="12px" tone="subdued">
                                    Only you and other staff can see comments
                                </Text>
                                <Button disabled={!comment.trim()} onClick={() => setComment('')}>
                                    Post
                                </Button>
                            </div>
                            <Divider style={{ margin: '1rem 0' }} />
                            {/* Timeline items */}
                            <div>
                                <Text variant="bodySm" tone="subdued">September 28</Text>
                                {timelineData.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                                        <div>
                                            <Text variant="bodyMd">{item.text}</Text>
                                            {item.hasPost && (
                                                <div style={{ marginTop: '0.25rem' }}>
                                                    <Button size="slim">Post</Button>
                                                </div>
                                            )}
                                        </div>
                                        <Text variant="bodySm" tone="subdued">{item.time}</Text>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ maxWidth: '800', marginTop: '1px', alignItems: 'start', justifyContent: 'start', flexShrink: 0, }}>
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

        </Background >
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

const StyledCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 24px;
  padding: 24px;
`;
