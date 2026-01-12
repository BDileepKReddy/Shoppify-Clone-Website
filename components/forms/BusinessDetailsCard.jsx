import {
    Card,
    TextField,
    Select,
    Button,
    Checkbox,
    Text,
    FormLayout,
    InlineStack,
    Box,
    BlockStack,
  } from "@shopify/polaris";
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from "../Sidebar";
import MainNavbar from "../MainNavbar";
import styled from "styled-components";
  
const SIDEBAR_WIDTH = 240;
const NAVBAR_HEIGHT = 44;
  
const PageWrapper = styled.div`
  background-color: #f6f6f7;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  padding-top: ${NAVBAR_HEIGHT}px;
`;
  
const ContentWrapper = styled.div`
  max-width: 800px;
  margin-left: ${SIDEBAR_WIDTH + 24}px;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 0;
  box-sizing: border-box;
  padding: 24px 0;
`;

const HeadingWrapper = styled.div`
  margin-bottom: 16px;
  margin-top: 12px;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #202223;
  margin-bottom: 0.2rem;
`;

const Subtitle = styled.div`
  font-size: 1rem;
  color: #6d7175;
  margin-bottom: 1.5rem;
`;
  
  const BusinessDetailsCard = () => {
    const [businessName, setBusinessName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [category, setCategory] = useState("grocery");
    const [emailOptIn, setEmailOptIn] = useState(false);
    const [smsOptIn, setSmsOptIn] = useState(false);
    const [countryCode, setCountryCode] = useState("+91");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
  
    const categoryOptions = [
      { label: "Grocery Store", value: "grocery" },
      { label: "Restaurant", value: "restaurant" },
      { label: "Clothing", value: "clothing" },
      { label: "Other", value: "other" },
    ];
  
    const validatePAN = (pan) => {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      return panRegex.test(pan.toUpperCase());
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };
  
    const validatePhone = (phone) => {
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(phone);
    };
  
    const handlePanChange = (value) => {
      const upperValue = value.toUpperCase();
      setPanNumber(upperValue);
      if (value && !validatePAN(upperValue)) {
        setErrors(prev => ({ ...prev, pan: 'Invalid PAN format (e.g., ABCDE1234F)' }));
      } else {
        setErrors(prev => ({ ...prev, pan: undefined }));
      }
    };
  
    const handleEmailChange = (value) => {
      setEmail(value);
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    };
  
    const handlePhoneChange = (value) => {
      setPhoneNumber(value);
      if (value && !validatePhone(value)) {
        setErrors(prev => ({ ...prev, phone: 'Phone number must be 10 digits' }));
      } else {
        setErrors(prev => ({ ...prev, phone: undefined }));
      }
    };
  
    const isFormValid = businessName && 
      ownerName && 
      panNumber && 
      email && 
      phoneNumber && 
      !errors.pan && 
      !errors.email && 
      !errors.phone;
  
    const handleSave = () => {
      if (!isFormValid) return;

      // Save the business details
      const businessDetails = {
        businessName,
        ownerName,
        panNumber,
        category,
        email,
        phoneNumber: `${countryCode} ${phoneNumber}`,
        emailOptIn,
        smsOptIn,
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('businessDetails', JSON.stringify(businessDetails));
      
      // Mark this step as complete
      localStorage.setItem('businessComplete', 'true');
      
      // Trigger a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      
      // Navigate to next step
      const nextStep = location.state && typeof location.state.stepIndex === 'number' ? location.state.stepIndex + 1 : 0;
      navigate('/onboarding', { state: { stepIndex: nextStep } });
    };
  
    return (
    <>
      <MainNavbar />
      <SideBar />
      <PageWrapper>
        <ContentWrapper>
          <HeadingWrapper>
            <Title>Business Details</Title>
            <Subtitle>
              We'll make sure you're set up to sell in these places.
            </Subtitle>
          </HeadingWrapper>
          <Card title="" padding={600}>  
            <FormLayout>
              <Box>
                <Text as="h3" alignment="start" fontWeight="bold" variant="bodyMd">
                  Business Name
                </Text>
              </Box>
              <TextField
                value={businessName}
                onChange={setBusinessName}
                autoComplete="off"
                required
                />
  
              <InlineStack gap="400" wrap={false}>
                <Box width="50%">
                  <TextField
                    label="Owner's Name"
                    value={ownerName}
                    onChange={setOwnerName}
                    autoComplete="off"
                    required
                    />
                </Box>
                <Box width="50%">
                  <TextField
                    label="PAN Number"
                    value={panNumber}
                    onChange={handlePanChange}
                    autoComplete="off"
                    required
                    error={errors.pan}
                    />
                </Box>
              </InlineStack>
  
              <Box>
                <Text as="h3" alignment="start" fontWeight="bold" variant="bodyMd">
                  Business Category
                </Text>
              </Box>
              <Select
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                />
  
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                required
                error={errors.email}
                />
  
              <Box>
                <Text as="h3" alignment="start" fontWeight="bold" variant="bodyMd">
                  Phone Number
                </Text>
              </Box>
  
              <InlineStack gap="200" wrap={false} align="center">
                <Box minWidth="120px">
                  <Select
                    options={[
                      { label: "🇮🇳 +91", value: "+91" },
                      { label: "🇺🇸 +1", value: "+1" },
                      { label: "🇬🇧 +44", value: "+44" },
                      { label: "🇦🇺 +61", value: "+61" },
                      { label: "🇨🇦 +1", value: "+1-CA" },
                      { label: "🇩🇪 +49", value: "+49" },
                    ]}
                    value={countryCode}
                    onChange={setCountryCode}
                    />
                </Box>
                <Box width="100%">
                  <TextField
                    label=""
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    autoComplete="tel"
                    type="tel"
                    required
                    error={errors.phone}
                    />
                </Box>
              </InlineStack>
  
              <Box>
                <BlockStack align="start">
                  <Checkbox
                    label="Customer agreed to receive marketing emails."
                    checked={emailOptIn}
                    onChange={setEmailOptIn}
                    disabled
                    />
                  <Checkbox
                    label="Customer agreed to receive SMS marketing text Messages."
                    checked={smsOptIn}
                    onChange={setSmsOptIn}
                    disabled
                    />
                </BlockStack>
              </Box>
  
              <Box background="bg-subdued" paddingBlockStart="20" paddingBlockEnd="400">
                <Text variant="bodySm" tone="subdued" as="p">
                  You should ask your customers for permission before you subscribe them
                  to your marketing emails or SMS.
                </Text>
              </Box>
  
              <Box style={{textAlign:"left"}}>
                <Button 
                  onClick={handleSave} 
                  variant="primary"
                  disabled={!isFormValid}
                >
                  Save
                </Button>
              </Box>
            </FormLayout>
          </Card>
        </ContentWrapper>
      </PageWrapper>
                </>
    );
  };
  
  export default BusinessDetailsCard;