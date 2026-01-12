import styled from 'styled-components';

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

const addproducts = () => {
    const [selected, setSelected] = useState(0);
    const [popoverActive, setPopoverActive] = useState(true);

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
        <Page fullWidth>
            <PageBackground />
            <Navbar />
            <Sidebar />
            <PageWrapper>
                <ContentWrapper>
                    <Box>
                        <div style={{ marginTop: 50, marginBottom: 50 }}>
                            <InlineStack>
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
                    </Box>
                    <InlineStack wrap={false} blockAlign="start" gap="0">
                        <Box
                            style={{
                                flexGrow: 2,
                                flexShrink: 0,
                                minWidth: '700px',
                                marginTop: '50px',
                            }}
                        >
                            <StyledCard>
                                {/* Order Status and Fulfillment */}
                                <Box padding="4">
                                    <div style={{marginTop:5 , marginBottom:5 , marginLeft:3}}>
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
                                        <Box paddingBlockStart="4">
                                            <Text tone="subdued" alignment='start'>Location</Text>
                                            <Text fontWeight="semibold" alignment='start'>Juhu Koliwada</Text>
                                        </Box>
                                        <Box paddingBlockStart="2">
                                            <Text tone="subdued" alignment='start'>Fulfilled</Text>
                                            <Text fontWeight="semibold" alignment='start'>September 28, 2024</Text>
                                        </Box>
                                        <Box paddingBlockStart="2">
                                            <Text tone="subdued" alignment='start'>Delhivery tracking number</Text>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <InlineStack>
                                                    <Link removeUnderline url="#" >23267010000604</Link>
                                                    <Badge tone="info">In Transit</Badge>
                                                </InlineStack>
                                            </div>
                                        </Box>
                                    </Card>
                                </Box>
                            </StyledCard>
                            <StyledCard>
                                {/* Product Details */}
                                <Box padding="4" paddingBlockStart="3">
                                    <Layout>
                                        <Layout.Section oneThird>
                                            <Text fontWeight="medium">Farali Pasta (180g)</Text>
                                            <Text tone="subdued" variant="bodySm">SKU: 1007</Text>
                                        </Layout.Section>
                                        <Layout.Section oneThird>
                                            <Text>₹155.00 × 4</Text>
                                        </Layout.Section>
                                        <Layout.Section oneThird>
                                            <Text fontWeight="semibold">₹620.00</Text>
                                        </Layout.Section>
                                    </Layout>
                                </Box>
                            </StyledCard>
                            <StyledCard>
                                {/* Payment Summary */}
                                <div style={{ padding: '1rem' }}>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <Badge status="success">Paid</Badge>
                                    </div>
                                    <Divider />
                                    <div style={{ marginTop: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text variant="bodyMd">Subtotal</Text>
                                            <div style={{ textAlign: 'right' }}>
                                                <Text variant="bodyMd">4 items</Text><br />
                                                <Text variant="bodyMd">Net sales</Text>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                                            <Text variant="bodyMd">Shipping</Text>
                                            <div style={{ textAlign: 'right' }}>
                                                <Text variant="bodyMd">4 items</Text><br />
                                                <Text variant="bodyMd">₹00.00</Text>
                                            </div>
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
                                    </div>
                                </div>
                            </StyledCard>
                            <StyledCard>
                                {/* Timeline and Comments */}
                                <div style={{ padding: '1rem' }}>
                                    <Text variant="headingMd" as="h2">Timeline</Text>
                                    {/* Comment box */}
                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                                        <Avatar customer initials="VD" size="medium" />
                                        <TextField
                                            label=""
                                            placeholder="Leave a comment.."
                                            value={comment}
                                            onChange={setComment}
                                            multiline
                                            autoComplete="off"
                                        />
                                    </div>
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
                            </StyledCard>
                            <div style={{ maxWidth: '800', marginTop: '1px', alignItems: 'start', justifyContent: 'start', flexShrink: 0, }}>
                            </div>
                        </Box>
                        <Box>
                            <div style={{ marginRight: 200, marginTop: 110, minWidth: 300 }}>
                                <Leftadd />
                            </div>
                        </Box>
                    </InlineStack>
                </ContentWrapper>
            </PageWrapper>
        </Page>
    );
};

export default addproducts;
