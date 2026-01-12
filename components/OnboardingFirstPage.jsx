import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Page,
  Card,
  TextField,
  Button,
  Text,
  Box,
  Checkbox,
  Icon,
} from '@shopify/polaris';
import MainNavbar from './MainNavbar';
import SideBar from './Sidebar.jsx';
import { NoteIcon } from '@shopify/polaris-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import CSVImportPopUp  from './CSVImportPopUp';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const CenterContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px;
  width: 900px;
  overflow-y: auto;
`;

const SetupCard = styled(Card)`
  width: 700px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const StepBoxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const StepBox = styled(Box)`
  background-color: ${(props) => (props.highlighted ? '#f3f3f3' : 'transparent')};
  border-radius: 12px;
  padding: 20px;
  width: 600px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormContent = styled(Box)`
  margin-top: 20px;
  width: 100%;
  max-width: 700px;
`;

const StyledTextFieldWrapper = styled.div`
  .Polaris-TextField__Input {
    background-color: #ffffff !important;
    color: #000000 !important;
    box-shadow: none !important;
    border: 1px solid #ccc !important;
    outline: none !important;
  }

  .Polaris-TextField--error .Polaris-TextField__Input {
    border-color: #d72c0d !important;
    background-color: #fff0f0 !important;
    color: #000000 !important;
  }

  .Polaris-TextField__Backdrop {
    box-shadow: none !important;
  }
`;

const ImportButton = styled.button`
  background-color: #f3f3f3;
  border-radius: 6px;
  padding: 4px 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const GstOptionWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const GstOptionBox = styled.div`
  border: 1.5px solid ${({ selected }) => (selected ? '#000' : '#ccc')};
  background: ${({ selected }) => (selected ? '#1a1a1a' : 'white')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    border-color: #000;
  }
`;

const stepData = [
  {
    label: 'Add your first product / Service',
    field: 'productName',
    type: 'text',
    helper: 'Write a description, add photos, and set pricing for the products you plan to sell.',
    actionLabel: 'Add product',
  },
  {
    label: 'GST Details',
    field: 'gstNumber',
    type: 'gst',
    actionLabel: 'Review GST Details',
  },
  {
    label: 'Business Details',
    field: 'business',
    type: 'button',
    actionLabel: 'Add Business Details',
    helper: 'Provide your Business Details, you can also register without GST with a simple GST enrolment number. ',
  },
  {
    label: 'Pickup address',
    field: 'address',
    type: 'button',
    actionLabel: 'Add Pickup Location',
    helper: 'Add your business address to pickup the delivery',
  },
  {
    label: 'Set your shipping rates',
    field: 'shipping',
    type: 'button',
    actionLabel: 'Choose Shipping Rates',
    helper: 'Choose where you ship and now much you charge so your customers can see  their shipping costs at checkout.',
  },
  {
    label: 'Bank Details for Payments',
    field: 'bank',
    type: 'button',
    actionLabel: 'Add Bank Details',
    helper: 'Provide your Bank Details. Once shared the bank details will be verified within 24Hrs.',
  },
  {
    label: 'Place a test order',
    field: 'testOrder',
    type: 'button',
    actionLabel: 'Learn Test Order',
    helper: 'Make sure things are running smoothly by placing a test order from your own store.',
  },
];

const MainPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [gstOption, setGstOption] = useState('have');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const resetOnboarding = () => {
    // Clear all completion flags from localStorage
    stepData.forEach((step) => {
      localStorage.removeItem(`${step.field}Complete`);
    });
    
    // Reset state
    setCurrentStep(0);
    setCompletedSteps([]);
    setFormValues({});
    setGstOption('have');
  };

  // On mount or navigation, set currentStep from location.state
  useEffect(() => {
    // Load completed steps from localStorage
    const completed = [];
    stepData.forEach((step, idx) => {
      const isComplete = localStorage.getItem(`${step.field}Complete`) === 'true';
      if (isComplete) {
        completed.push(idx);
      }
    });
    setCompletedSteps(completed);

    // Set current step based on navigation or next incomplete step
    if (location.state && typeof location.state.stepIndex === 'number') {
      setCurrentStep(location.state.stepIndex);
    } else if (completed.length > 0) {
      // Find the next incomplete step
      const nextIncompleteStep = completed.length;
      setCurrentStep(nextIncompleteStep);
    } else {
      // Start from the beginning if no steps are completed
      setCurrentStep(0);
    }
  }, [location.state]);

  // Listen for storage events to update completedSteps immediately
  useEffect(() => {
    const checkCompletedSteps = () => {
      const completed = [];
      stepData.forEach((step, idx) => {
        const isComplete = localStorage.getItem(`${step.field}Complete`) === 'true';
        if (isComplete) {
          completed.push(idx);
        }
      });
      setCompletedSteps(completed);
    };
    window.addEventListener('storage', checkCompletedSteps);
    return () => window.removeEventListener('storage', checkCompletedSteps);
  }, []);

  const handleInputChange = (field, value) => {
    const isErrorField = `${field}Error`;

    if (field === 'productName') {
      const isValid = /^[a-zA-Z0-9\s]+$/.test(value.trim());
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
        [isErrorField]: !isValid,
      }));
    } else if (field === 'gstNumber') {
      const val = value.toUpperCase();
      const isValidGST = /^[A-Z0-9]{15}$/.test(val);
      setFormValues((prev) => ({
        ...prev,
        [field]: val,
        [isErrorField]: !isValidGST,
      }));
    } else if (field === 'panNumber') {
      const val = value.toUpperCase();
      const isValidPAN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val);
      setFormValues((prev) => ({
        ...prev,
        [field]: val,
        [isErrorField]: !isValidPAN,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const step = stepData[currentStep];
    let field = step.field;
    let errorField = `${field}Error`;
    let isInvalid = false;

    if (step.type === 'gst') {
      if (gstOption === 'have') {
        field = 'gstNumber';
        errorField = 'gstNumberError';
        const val = formValues[field] || '';
        const isValidGST = /^[A-Z0-9]{15}$/.test(val.trim());
        if (!val || !isValidGST) {
          isInvalid = true;
        }
      } else {
        field = 'panNumber';
        errorField = 'panNumberError';
        const val = formValues[field] || '';
        const isValidPAN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.trim());
        if (!val || !isValidPAN) {
          isInvalid = true;
        }
      }
    } else if (step.type === 'text') {
      const val = formValues[field] || '';
      const isValid = /^[a-zA-Z0-9\s]+$/.test(val.trim());
      if (!val || !isValid) {
        errorField = `${field}Error`;
        isInvalid = true;
      }
    }

    if (isInvalid) {
      setFormValues((prev) => ({
        ...prev,
        [errorField]: true,
      }));
      return;
    }

    // Mark current step as complete
    localStorage.setItem(`${step.field}Complete`, 'true');
    setCompletedSteps((prev) => [...prev, currentStep]);

    // Move to next step
    const nextStep = currentStep + 1;
    if (nextStep < stepData.length) {
      setCurrentStep(nextStep);
    }
  };

  const handleImportClick = () => {
    setIsImportModalOpen(true);
  };

  return (
    <Page fullWidth>
      <Container>
        <SideBar />
        <MainNavbar />
        <CenterContent>
          <Box padding="400" width="100%" maxWidth="700px">
            <Text variant="headingLg" as="h2" style={{ color: '#000' }}>
              Get ready to sell
            </Text><br/>
            <Text tone="subdued" variant="bodySm">
              We'll make sure you're set up to sell in these places.
            </Text>
          </Box>

          <SetupCard>
            <Box paddingInline="400" paddingBlock="200" display="flex" justifyContent="space-between" alignItems="center">
              <div>
                <Text variant="headingMd" as="h3" style={{ color: '#000' }}>
                  Setup guide
                </Text>
                <Text variant="bodySm" tone="subdued">
                  {completedSteps.length} / {stepData.length} completed
                </Text>
              </div>
            </Box>

            {stepData.map((step, index) => {
              const isCurrent = index === currentStep;
              const isCompleted = completedSteps.includes(index);
              const error = formValues[`${step.field}Error`];

              return (
                <StepBoxWrapper key={index}>
                  <StepBox highlighted={isCurrent}>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        checked={isCompleted}
                        label={
                          <span style={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>
                            {step.label}
                          </span>
                        }
                        onChange={() => {}}
                        disabled
                        tone="magic"
                        style={{
                          '--pc-checkbox-color': '#303030',
                          '--pc-checkbox-border-color': '#303030',
                          '--pc-checkbox-checked-background': '#303030',
                          '--pc-checkbox-checked-border-color': '#303030'
                        }}
                      />
                    </Box>

                    {isCurrent && step.helper && (
                      <Text tone="subdued" variant="bodySm">{step.helper}</Text>
                    )}

                    {isCurrent && !isCompleted && (
                      <FormContent>
                        {step.type === 'gst' && (
                          <>
                            <GstOptionWrapper>
                              <GstOptionBox selected={gstOption === 'have'} onClick={() => setGstOption('have')}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Icon source={NoteIcon} tone={gstOption === 'have' ? 'inverse' : 'base'} />
                                  <span>I have GST</span>
                                </span>
                                {gstOption === 'have' && <span>✔</span>}
                              </GstOptionBox>

                              <GstOptionBox selected={gstOption === 'no'} onClick={() => setGstOption('no')}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Icon source={NoteIcon} tone={gstOption === 'no' ? 'inverse' : 'base'} />
                                  <span>I don't have GST No</span>
                                </span>
                                {gstOption === 'no' && <span>✔</span>}
                              </GstOptionBox>
                            </GstOptionWrapper>

                            <Box paddingBlockStart="200">
                              <StyledTextFieldWrapper>
                                <TextField
                                  label={gstOption === 'have' ? 'GST Number' : 'PAN Number'}
                                  value={formValues[gstOption === 'have' ? 'gstNumber' : 'panNumber'] || ''}
                                  onChange={(val) =>
                                    handleInputChange(gstOption === 'have' ? 'gstNumber' : 'panNumber', val)
                                  }
                                  autoComplete="off"
                                  error={
                                    formValues[gstOption === 'have' ? 'gstNumberError' : 'panNumberError']
                                      ? gstOption === 'have'
                                        ? 'GST number must be 15 alphanumeric characters'
                                        : 'PAN number must be in valid format (ABCDE1234F)'
                                      : undefined
                                  }
                                />
                              </StyledTextFieldWrapper>
                            </Box>

                            <Box paddingBlockStart="200">
                              <Button onClick={handleSubmit}>
                                {gstOption === 'have' ? 'Review GST Details' : 'Review PAN Details'}
                              </Button>
                            </Box>
                          </>
                        )}

                        {step.type === 'text' && (
                          <>
                            <StyledTextFieldWrapper>
                              <TextField
                                label={step.label}
                                placeholder="Enter your product name"
                                value={formValues[step.field] || ''}
                                onChange={(val) => handleInputChange(step.field, val)}
                                autoComplete="off"
                                error={error ? 'Invalid input' : undefined}
                              />
                            </StyledTextFieldWrapper>

                            <Box paddingBlockStart="200" display="flex" justifyContent="space-between">
                              <Button
                                onClick={() => {
                                  // Navigate to addproducts with productName and stepIndex
                                  navigate('/vendors/addproducts', {
                                    state: {
                                      productName: formValues[step.field] || '',
                                      stepIndex: currentStep,
                                      from: location.pathname,
                                    }
                                  });
                                }}
                              >
                                {step.actionLabel}
                              </Button>
                              {step.field === 'productName' && (
                                <ImportButton onClick={handleImportClick}>
                                  Import
                                </ImportButton>
                              )}
                            </Box>
                          </>
                        )}

                        {step.type === 'button' && (
                          <Box paddingBlockStart="200">
                            <Button onClick={() => {
                              if (step.field === 'business') {
                                navigate('/business-details', { state: { stepIndex: currentStep } });
                              } else if (step.field === 'bank') {
                                navigate('/bank-details', { state: { stepIndex: currentStep } });
                              } else if (step.field === 'address') {
                                navigate('/default-address', { state: { stepIndex: currentStep } });
                              } else {
                                handleSubmit();
                              }
                            }}>{step.actionLabel}</Button>
                          </Box>
                        )}
                      </FormContent>
                    )}
                  </StepBox>
                </StepBoxWrapper>
              );
            })}
          </SetupCard>
          <Box paddingInline="400" paddingBlock="200" display="flex" justifyContent="flex-end" alignItems="center" style={{ width: '700px', maxWidth: '900px' }}>
            <Button onClick={resetOnboarding} variant="plain">
              Reset Progress
            </Button>
          </Box>
        </CenterContent>
      </Container>
      <CSVImportPopUp 
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </Page>
  );
};

export default MainPage;