import {
    Page,
    Card,
    Text,
    InlineGrid,
    Box,
    InlineStack,
    Icon,
    Divider,
    CalloutCard,
    Button,
    Badge,
} from "@shopify/polaris";
import {
    CalendarIcon,
    EditIcon,
} from "@shopify/polaris-icons";
import Sidebar from '../Sidebar.jsx'
import Schoolbag from '../../assets/schoolbag.png'
import Ccircle from '../../assets/ccircle.png'
import Downarrow from '../../assets/downarrow.png'
import Navbar from '../MainNavbar.jsx';
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const SIDEBAR_WIDTH = 240;
const NAVBAR_HEIGHT = 44;

const PageBackground = styled.div`
  background-color: #f6f6f7;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
`;

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  padding-top: ${NAVBAR_HEIGHT}px;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin-left: ${SIDEBAR_WIDTH + 24}px;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 0;
  box-sizing: border-box;
  padding: 24px 0;
`;

const DashboardPage = () => {
    return (
        <Page fullWidth>
            <PageBackground />
            <Navbar />
            <Sidebar />
            <PageWrapper>
                <ContentWrapper>
                    <InlineStack>
                        <Box>
                            <div style={{ marginTop: 12, marginBottom: 10 }}>
                                <InlineStack gap="300" wrap={false}>
                                    {/* Today Button */}
                                    <Button >
                                        <InlineStack>
                                            <img src={Schoolbag} alt="usericon" style={{ width: 20, marginRight: 5 }} />
                                            <Text>Today</Text>
                                        </InlineStack>
                                    </Button>
                                    <Button >
                                        <InlineStack>
                                            <img src={Downarrow} alt="usericon" style={{ width: 20, marginRight: 5 }} />
                                            <Text>All channels</Text>
                                        </InlineStack>
                                    </Button>
                                    <Button >
                                        <InlineStack>
                                            <img src={Ccircle} alt="usericon" style={{ width: 15, marginRight: 5 }} />
                                            <Text>Live visitor</Text>
                                        </InlineStack>
                                    </Button>
                                </InlineStack>
                            </div>
                        </Box>

                        {/* Stats and Chart Card */}
                        <Card  >
                            <InlineStack>
                                <div style={{ minWidth: 875 }}>
                                    <Box padding="400">
                                        <InlineGrid columns={{ xs: 2, sm: 4 }} gap="400">
                                            <InlineStack gap="200">
                                                <div>
                                                    <Text as="h3" variant="bodySm" fontWeight="medium">
                                                        Online store sessions
                                                        <EditIcon width={15} />
                                                    </Text>
                                                    <Text variant="headingMd">2</Text>
                                                </div>
                                            </InlineStack>

                                            <InlineStack gap="200">
                                                <div>
                                                    <Text as="h3" variant="bodySm" fontWeight="medium">
                                                        Total Sales
                                                    </Text>
                                                    <Text variant="headingMd">₹0.00</Text>
                                                </div>
                                            </InlineStack>

                                            <InlineStack gap="200">
                                                <div>
                                                    <Text as="h3" variant="bodySm" fontWeight="medium">
                                                        Total Orders
                                                    </Text>
                                                    <Text variant="headingMd">0</Text>
                                                </div>
                                            </InlineStack>

                                            <InlineStack gap="200">
                                                <div>
                                                    <Text as="h3" variant="bodySm" fontWeight="medium">
                                                        Conversion Rate
                                                    </Text>
                                                    <Text variant="headingMd">0%</Text>
                                                </div>
                                            </InlineStack>
                                        </InlineGrid>
                                    </Box>

                                    {/* Chart Placeholder */}
                                    <Box
                                        padding="400"
                                        style={{
                                            height: "200px",
                                            textAlign: "center",
                                            borderTop: "1px solid #ebebeb",
                                        }}
                                    >
                                        <Text variant="bodySm" tone="subdued">
                                            (Insert chart here using chart.js or recharts big ,  big)
                                        </Text>
                                    </Box>
                                </div>
                            </InlineStack>
                        </Card>
                        <Box paddingBlockStart="500" />

                        {/* Info Cards Section */}
                        <InlineGrid gap="400">
                            <div style={{marginTop:20 , display:'flex', justifyContent:'flex-start', minWidth:'875px'}}>
                                <Box>
                                    <CalloutCard
                                        title="Drive more sales this BFCM with Ship to Store"
                                        illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                                        primaryAction={{ content: "Set up Store Transfers" }}
                                        secondaryAction={{ content: "Learn more" }}
                                    >
                                        <p>
                                            Allow your customers to buy items online and have them shipped to
                                            their preferred store for pickup by enabling Store Transfers.
                                        </p>
                                    </CalloutCard>
                                </Box>
                            </div>

                            <CalloutCard
                                title="Measure your return on ad spend"
                                illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                                primaryAction={{ content: "View channel insights" }}
                                secondaryAction={{ content: "Learn more" }}
                            >
                                <p>
                                    Get unbiased insights into your ad performance data right from
                                    Aniyor. Sync data from important channels, like Google and TikTok...
                                </p>
                            </CalloutCard>

                            <CalloutCard
                                title="A built-in taxonomy to power products"
                                illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                                primaryAction={{ content: "Add product" }}
                                secondaryAction={{ content: "Learn more" }}
                            >
                                <p>
                                    It's now easier to create and classify products with over 10,000
                                    categories and 2,000+ AI-powered attributes.
                                </p>
                            </CalloutCard>
                        </InlineGrid>
                    </InlineStack>
                </ContentWrapper>
            </PageWrapper>
        </Page>
    );
};

export default DashboardPage;
