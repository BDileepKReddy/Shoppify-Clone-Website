import React from 'react';
import {
    Page,
    Layout,
    LegacyCard,
    TextField,
    Select,
    Button,
    FormLayout,
} from '@shopify/polaris';

// Optional: Add this only if you're using styled-components for layout control
// import styled from 'styled-components';

const left = () => {
    return (
        <Page fullWidth>
            <Layout>
                <div style={{alignItems:'right' }}>



                    {/* Secondary section always sits flush to the right */}
                    <Layout.Section primary>
                        <FormLayout>
                            {/* Admin Actions */}
                            <LegacyCard title="Admin Actions" sectioned>
                                <TextField label="Note" multiline placeholder="Write Your Message" />
                            </LegacyCard>

                            {/* Market Info */}
                            <LegacyCard title="Market" sectioned>
                                <p><strong>Malhar Agencies</strong></p>
                                <p>2 orders</p>
                                <p><a href="mailto:malharagencies@gmail.com">malharagencies@gmail.com</a></p>
                                <p>505, Shapuri Heights, Rath Yatra, Varanasi UP</p>
                                <p>+91922****348</p>
                                <p><a href="#">view map</a></p>
                            </LegacyCard>

                            {/* Send Notification */}
                            <LegacyCard title="Send Notification" sectioned>
                                <Select
                                    label="Customize Notification"
                                    options={[
                                        { label: 'Payment', value: 'payment' },
                                        { label: 'Shipping', value: 'shipping' },
                                    ]}
                                    onChange={() => { }}
                                    value="payment"
                                />
                                <TextField
                                    label="Message"
                                    multiline
                                    placeholder="Write Your Message"
                                    onChange={() => { }}
                                />
                                <Button variant="primary" fullWidth>
                                    Send
                                </Button>
                            </LegacyCard>
                        </FormLayout>
                    </Layout.Section>

                </div>
            </Layout>

        </Page>


    );
};

export default left;
