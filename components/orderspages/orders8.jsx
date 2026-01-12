import React, { useState, useCallback } from 'react';
import { Text, Tag, LegacyStack, Card, Select, Page, FormLayout, IndexTable, Divider, Button, TextField, BlockStack, Link, InlineStack, Badge, Box, LegacyCard, Avatar, Checkbox, Tabs, Form, DropZone, Scrollable, useIndexResourceState } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Icon } from '@shopify/polaris';
import Sidebar from '../Sidebar';
import MainNavbar from '../MainNavbar';
import styled from 'styled-components';
import Leftadd from '../Vendors/leftadd';
import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';


const addproducts = () => {


    return (
        <Background>
            <Page narrowWidth>

                <Sidebar />
                <MainNavbar />



                <Box>
                    <div style={{ marginTop: 50 }}>
                        <InlineStack>


                            <img src={ArrowLeftIcon} alt="Close" width={30} />
                            <Text alignment='start' variant='headingLg'># 1014</Text>

                            <Tag url="#">
                                <LegacyStack spacing="extraTight">
                                  
                                    <span>Paid</span>
                                </LegacyStack>
                            </Tag>
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





                        <div style={{ maxWidth: '800', marginTop: '1px', alignItems: 'start', justifyContent: 'start', flexShrink: 0, }}>

                        </div>
                    </Box>
                    <Box>

                        <div style={{ marginRight: 200, marginTop: 110, minWidth: 300 }}>

                            <Leftadd />
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
