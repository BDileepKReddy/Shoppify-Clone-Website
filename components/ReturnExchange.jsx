import {
  Page,
  Card,
  BlockStack,
  Text,
  Thumbnail,
  TextField,
  Button,
  DropZone,
  Select,
  InlineStack,
  Box,
  RadioButton,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import styled from "styled-components";
import SideBar from "./Sidebar";
import MainNavbar from "./MainNavbar";
import ArrowLeftIcon from "../assets/ArrowLeftIcon.svg";

// --- Styled Components for layout and spacing ---
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
  max-width: 1200px;
  margin-left: ${SIDEBAR_WIDTH + 24}px;
  margin-top: 32px;
  margin-right: auto;
  margin-bottom: 20px;
  width: calc(100vw - ${SIDEBAR_WIDTH + 48}px);
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
`;

const MainColumn = styled.div`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SummaryColumn = styled.div`
  min-width: 260px;
  max-width: 320px;
  margin-left: 0.5rem;
  margin-top: 82px; /* align with cards */
`;

const SectionCard = styled(Card)`
  margin-bottom: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid #e3e3e3;
`;

const LastSectionCard = styled(SectionCard)`
  margin-bottom: 2.5rem;
`;

const ReturnItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  margin-top: 0.5rem;
`;

const ReturnItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ReturnItemInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 0.5rem;
`;

const ExchangeSection = styled.div`
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
`;

const DropZoneBox = styled.div`
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
`;

const ReturnOptionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 0.7rem;
`;

const SummaryCard = styled(Card)`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid #e3e3e3;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 1.7rem;
  margin-top: 0.2rem;
`;

const BackArrow = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const PageTitle = styled.div`
  font-size: 1.45rem;
  font-weight: 600;
  color: #202223;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const SelfServeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelfServeBadge = styled.span`
  background: #1a7f37;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 2px 10px;
  margin-left: 0.7rem;
`;

const SelfServeImage = styled.div`
  width: 90px;
  height: 90px;
  background: #e3e3e3;
  border-radius: 8px;
  margin-left: 1.5rem;
`;

const SelfServeButton = styled(Button)`
  background: #fff !important;
  color: #202223 !important;
  border: 1px solid #babfc3 !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  margin-top: 0.7rem;
`;

const AddProductButton = styled(Button)`
  background: #fff !important;
  color: #202223 !important;
  border: 1px solid #babfc3 !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  margin-top: 0.7rem;
`;

const CreateReturnButton = styled(Button)`
  background: #303030 !important;
  color: #fff !important;
  border: none !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  margin-top: 0.7rem;
`;

export default function ReturnExchange() {
  const [quantity, setQuantity] = useState("0");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shippingCarrier, setShippingCarrier] = useState("");
  const [shippingOption, setShippingOption] = useState("upload");
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback((_dropFiles, acceptedFiles) => {
    setFiles((files) => [...files, ...acceptedFiles]);
  }, []);

  const shippingCarriers = [
    { label: "Select carrier", value: "" },
    { label: "Delhivery", value: "delhivery" },
    { label: "India Post", value: "india-post" },
    { label: "Blue Dart", value: "blue-dart" },
  ];

  const handleBack = () => window.history.back();

  return (
    <>
      <SideBar />
      <MainNavbar />
      <PageWrapper>
        <ContentWrapper>
          <MainColumn>
            <TopRow>
              <BackArrow src={ArrowLeftIcon} alt="Back" onClick={handleBack} />
              <PageTitle>Return and exchange</PageTitle>
            </TopRow>
            <SectionCard padding="400">
              <BlockStack gap="200">
                <SelfServeRow>
                  <div>
                    <Text variant="headingMd" as="span">
                      Self-serve returns
                    </Text>
                    <SelfServeBadge>New</SelfServeBadge>
                  </div>
                  <SelfServeImage />
                </SelfServeRow>
                <Text>
                  Customers can now submit return requests from their accounts
                  without having to email or call you. It streamlines your returns
                  process and saves you time.
                </Text>
                <SelfServeButton
                  variant="primary"
                  size="slim"
                  onClick={() => {}}
                >
                  Go to self-serve returns
                </SelfServeButton>
              </BlockStack>
            </SectionCard>

            <SectionCard padding="400">
              <BlockStack gap="200">
                <Text variant="headingMd">Select return items</Text>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <Text fontWeight="medium" tone="subdued">
                    #1014-F1
                  </Text>
                  <Text fontWeight="medium" tone="subdued">
                    Shipped from Juhu Koliwada
                  </Text>
                </div>
                <div style={{
                  border: "1px solid #e3e3e3",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  background: "#fafbfc",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem"
                }}>
                  <Thumbnail
                    source="https://cdn.shopify.com/s/files/1/0752/6435/9886/files/farali-pasta.png"
                    alt="Farali Pasta"
                  />
                  <div style={{ flex: 1 }}>
                    <Text>Farali Pasta(180g)</Text>
                    <Text tone="subdued">1007</Text>
                    <Text>₹155.00 × 4</Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                    <TextField
                      label="Qty"
                      value={quantity}
                      onChange={setQuantity}
                      autoComplete="off"
                      type="number"
                      min="0"
                      max="4"
                      labelHidden
                      style={{ width: 60 }}
                    />
                    <Text>0/4</Text>
                    <Text>0 g</Text>
                    <Text>₹0.00</Text>
                  </div>
                </div>
              </BlockStack>
            </SectionCard>

            <SectionCard padding="400">
              <BlockStack gap="200">
                <Text variant="headingMd">Exchange items</Text>
                <ExchangeSection>
                  <Text tone="subdued">
                    Shipping rate: Rest of India (<b>₹120.00</b>)
                  </Text>
                  <AddProductButton
                    variant="primary"
                    size="slim"
                    onClick={() => {}}
                  >
                    Add product
                  </AddProductButton>
                </ExchangeSection>
              </BlockStack>
            </SectionCard>

            <LastSectionCard padding="400">
              <BlockStack gap="200">
                <Text variant="headingMd">Return shipping options</Text>
                <ReturnOptionsRow>
                  <RadioButton
                    label="Upload a return label"
                    checked={shippingOption === "upload"}
                    id="upload"
                    name="shippingOption"
                    onChange={() => setShippingOption("upload")}
                  />
                  <RadioButton
                    label="No shipping required"
                    checked={shippingOption === "none"}
                    id="none"
                    name="shippingOption"
                    onChange={() => setShippingOption("none")}
                  />
                </ReturnOptionsRow>
                {shippingOption === "upload" && (
                  <>
                    <DropZoneBox>
                      <DropZone onDrop={handleDropZoneDrop}>
                        {files.length > 0
                          ? files.map((file, index) => (
                              <Text key={index}>{file.name}</Text>
                            ))
                          : (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: 90,
                              }}
                            >
                              <Button variant="secondary" size="slim">
                                Add file
                              </Button>
                            </div>
                          )}
                      </DropZone>
                    </DropZoneBox>
                    <Text
                      tone="subdued"
                      as="p"
                      style={{ marginTop: 8 }}
                    >
                      Use return label URL instead
                    </Text>
                    <InlineStack gap="200">
                      <TextField
                        label="Tracking number"
                        value={trackingNumber}
                        onChange={setTrackingNumber}
                        autoComplete="off"
                        labelHidden
                        style={{ width: 160 }}
                      />
                      <Select
                        label="Shipping carrier"
                        options={shippingCarriers}
                        onChange={setShippingCarrier}
                        value={shippingCarrier}
                        labelHidden
                        style={{ width: 160 }}
                      />
                    </InlineStack>
                  </>
                )}
              </BlockStack>
            </LastSectionCard>
          </MainColumn>
          <SummaryColumn>
            <SummaryCard padding="400">
              <BlockStack gap="300">
                <Text variant="headingMd" style={{ fontWeight: 600, marginBottom: 8 }}>Summary</Text>
                <Text tone="subdued" style={{ marginBottom: 12 }}>No items selected</Text>
                <CreateReturnButton
                  variant="primary"
                  size="slim"
                  fullWidth
                  onClick={() => {}}
                >
                  Create return
                </CreateReturnButton>
              </BlockStack>
            </SummaryCard>
          </SummaryColumn>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}