import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  Text,
  TextField,
  Button,
  FormLayout,
  InlineError,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import bg from "../assets/LoginBackground.jpg";
import emailIcon from "../assets/email-icon.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("Enter correct Email Id");
    } else {
      setEmailError("");
      // submit logic
    }
  };

  return (
    <Background>
      <StyledCard sectioned>
        <LogoContainer>
          <Logo
            src="https://cdn.shopify.com/shopifycloud/shopify/assets/shopify-mark.png"
            alt="Shopify"
          />
          <Text as="h3" variant="headingMd">
            Log in
          </Text>
          <Text tone="subdued">Continue to Aniyor</Text>
        </LogoContainer>

        <FormLayout>
          <TextField
            label="Email"
            value={email}
            onChange={(val) => setEmail(val)}
            type="email"
            autoComplete="email"
            error={emailError}
          />
          {emailError && <InlineError message={emailError} fieldID="email" />}

          <Button fullWidth onClick={handleSubmit} tone="success">
            Continue with email
          </Button>
        </FormLayout>
      </StyledCard>
    </Background>
  );
};

export default Login;

const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
`;

const StyledCard = styled(Card)`
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
`;

const LogoContainer = styled.div`
  text-align: left;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  width: 60px;
  margin-bottom: 0.5rem;
`;

const IconImage = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

