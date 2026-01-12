import {
    Card,
    TextField,
    Select,
    Button,
    FormLayout,
    InlineStack,
    Box,
    Text,
  } from "@shopify/polaris";
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from "../Sidebar";
import MainNavbar from "../MainNavbar";
import styled from "styled-components";

// Layout constants
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

const DefaultAdress = () => {
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const stateOptions = [
    { label: "Select a State", value: "" },
    { label: "Maharashtra", value: "MH" },
    { label: "Karnataka", value: "KA" },
    { label: "Tamil Nadu", value: "TN" },
    { label: "Delhi", value: "DL" },
    // Add more as needed
  ];

  const countryCodeOptions = [
    { label: "🇮🇳 +91", value: "+91" },
    { label: "🇺🇸 +1", value: "+1" },
    { label: "🇬🇧 +44", value: "+44" },
    { label: "🇦🇺 +61", value: "+61" },
    { label: "🇨🇦 +1", value: "+1-CA" },
    { label: "🇩🇪 +49", value: "+49" },
  ];

  const validatePinCode = (pincode) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handlePinCodeChange = (value) => {
    setPinCode(value);
    if (value && !validatePinCode(value)) {
      setErrors(prev => ({ ...prev, pincode: 'Pincode must be 6 digits and cannot start with 0' }));
    } else {
      setErrors(prev => ({ ...prev, pincode: undefined }));
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
    address && 
    city && 
    state && 
    pinCode && 
    phoneNumber && 
    !errors.pincode && 
    !errors.phone;

  const handleSave = () => {
    if (!isFormValid) return;

    // Save the address details
    const addressDetails = {
      businessName,
      address,
      apartment,
      city,
      state,
      pinCode,
      phoneNumber: `${countryCode} ${phoneNumber}`,
    };
    
    // Store in localStorage for persistence
    localStorage.setItem('addressDetails', JSON.stringify(addressDetails));
    
    // Mark this step as complete
    localStorage.setItem('addressComplete', 'true');
    
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
            <Title>Pick up Address</Title>
            <Subtitle>
              We'll make sure you're set up to sell in these places.
            </Subtitle>
          </HeadingWrapper>
          <Card padding={600}>
            <Box style={{ textAlign: "left" }} paddingBlockEnd="300">
              <strong>Default Address</strong>
            </Box>
            <FormLayout>
              <TextField
                label="Business Name"
                value={businessName}
                onChange={setBusinessName}
                autoComplete="off"
                required
              />
              <TextField
                label="Address"
                value={address}
                onChange={setAddress}
                autoComplete="street-address"
                required
              />
              <TextField
                label="Apartment, suite,etc"
                value={apartment}
                onChange={setApartment}
                autoComplete="address-line2"
              />
              <InlineStack gap="400" wrap={false}>
                <Box width="50%">
                  <TextField
                    label="City"
                    value={city}
                    onChange={setCity}
                    autoComplete="address-level2"
                    required
                  />
                </Box>
                <Box width="50%">
                  <Select
                    label="State"
                    options={stateOptions}
                    value={state}
                    onChange={setState}
                    required
                  />
                </Box>
              </InlineStack>

              <TextField
                label="Pin Code"
                value={pinCode}
                onChange={handlePinCodeChange}
                autoComplete="postal-code"
                required
                error={errors.pincode}
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

export default DefaultAdress;