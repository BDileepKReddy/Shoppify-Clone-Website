import {
    TextField,
    Button,
    FormLayout,
    InlineStack,
    Box,
    Text,
  } from "@shopify/polaris";
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import MainNavbar from "../MainNavbar";
import SideBar from "../Sidebar";
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
  max-width: 900px;
  margin-left: ${SIDEBAR_WIDTH + 24}px;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 0;
  box-sizing: border-box;
  padding: 24px 0;
`;

const HeadingWrapper = styled.div`
  margin-bottom: 16px;
  margin-top: 32px;
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

const StyledCardWrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  padding: 0;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: center;
`;

const StyledCardInner = styled.div`
  width: 100%;
  max-width: 820px;
  padding: 32px 24px 24px 24px;
`;

const BankDetailsCard = () => {
  const [accountNo, setAccountNo] = useState("");
  const [reEnterAccountNo, setReEnterAccountNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const validateAccountNumber = (account) => {
    // Account number should be between 9 and 18 digits
    const accountRegex = /^[0-9]{9,18}$/;
    return accountRegex.test(account);
  };

  const validateIFSC = (ifsc) => {
    // IFSC code format: 4 letters + 7 alphanumeric characters
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifsc.toUpperCase());
  };

  const handleAccountNoChange = (value) => {
    setAccountNo(value);
    if (value && !validateAccountNumber(value)) {
      setErrors(prev => ({ ...prev, accountNo: 'Account number must be 9-18 digits' }));
    } else {
      setErrors(prev => ({ ...prev, accountNo: undefined }));
    }
  };

  const handleReEnterAccountNoChange = (value) => {
    setReEnterAccountNo(value);
    if (value && value !== accountNo) {
      setErrors(prev => ({ ...prev, reEnterAccountNo: 'Account numbers do not match' }));
    } else {
      setErrors(prev => ({ ...prev, reEnterAccountNo: undefined }));
    }
  };

  const handleIFSCChange = (value) => {
    const upperValue = value.toUpperCase();
    setIfscCode(upperValue);
    if (value && !validateIFSC(upperValue)) {
      setErrors(prev => ({ ...prev, ifsc: 'Invalid IFSC format (e.g., SBIN0001234)' }));
    } else {
      setErrors(prev => ({ ...prev, ifsc: undefined }));
    }
  };

  const isFormValid = accountNo && 
    reEnterAccountNo && 
    ifscCode && 
    bankName && 
    branchAddress && 
    !errors.accountNo && 
    !errors.reEnterAccountNo && 
    !errors.ifsc;

  const handleSave = () => {
    if (!isFormValid) return;

    // Save the bank details
    const bankDetails = {
      accountNo,
      ifscCode,
      bankName,
      branchAddress,
    };
    
    // Store in localStorage for persistence
    localStorage.setItem('bankDetails', JSON.stringify(bankDetails));
    
    // Mark this step as complete
    localStorage.setItem('bankComplete', 'true');
    
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
            <Title>Bank Details</Title>
            <Subtitle>
              We'll make sure you're set up to sell in these places.
            </Subtitle>
          </HeadingWrapper>
          <StyledCardWrapper>
            <StyledCardInner>
              <Box style={{ textAlign: "left" }} paddingBlockEnd="300">
                <Text as="h3" fontWeight="bold" variant="bodyMd">
                  Bank Details
                </Text>
              </Box>
              <FormLayout>
                <InlineStack gap="400" wrap={false}>
                  <Box width="50%">
                    <TextField
                      label="Account No"
                      placeholder="Enter account number"
                      value={accountNo}
                      onChange={handleAccountNoChange}
                      autoComplete="off"
                      required
                      error={errors.accountNo}
                    />
                  </Box>
                  <Box width="50%">
                    <TextField
                      label="Re-Enter Account No"
                      placeholder="Re-enter account number"
                      value={reEnterAccountNo}
                      onChange={handleReEnterAccountNoChange}
                      autoComplete="off"
                      required
                      error={errors.reEnterAccountNo}
                    />
                  </Box>
                </InlineStack>
                <TextField
                  label="IFSC Code"
                  placeholder="Enter IFSC code"
                  value={ifscCode}
                  onChange={handleIFSCChange}
                  autoComplete="off"
                  required
                  error={errors.ifsc}
                />
                <TextField
                  label="Bank Name"
                  placeholder="Enter bank name"
                  value={bankName}
                  onChange={setBankName}
                  autoComplete="off"
                  required
                />
                <TextField
                  label="Branch Address"
                  placeholder="Enter branch address"
                  value={branchAddress}
                  onChange={setBranchAddress}
                  autoComplete="off"
                  required
                />
                <Box style={{ textAlign: "left" }}>
                  <Button
                    onClick={handleSave}
                    variant="primary"
                    disabled={!isFormValid}
                  >
                    Save
                  </Button>
                </Box>
              </FormLayout>
            </StyledCardInner>
          </StyledCardWrapper>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};

export default BankDetailsCard;