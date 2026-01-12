import {
  Page, Card, Text, TextField, Button, Link, Select
} from '@shopify/polaris';
import { useState } from 'react';
import { firebase, auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import bg from './data/background-image.png';
import styled from 'styled-components';
import aniyorSrc from "../assets/aniyor-logo.png";
import countries from './data/countries';

export default function OtpVerify() {
  const [otp, setOtp] = useState('');
  const [country, setCountry] = useState('India');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    const verificationId = localStorage.getItem("verificationId");
    const phone = localStorage.getItem("phoneNumber");

    if (!verificationId) {
      setMessage("Session expired. Please request OTP again.");
      return;
    }

    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);

    try {
      const result = await auth.signInWithCredential(credential);
      console.log("✅ OTP verified. User:", result.user);
      setMessage("✅ OTP Verified!");
      navigate("/dashboard"); // change to your post-login route
    } catch (error) {
      console.error("❌ OTP verification error:", error);
      setMessage("❌ Incorrect OTP");
    }
  };

  return (
    <Background>
      <Page narrowWidth>
        <Card sectioned roundedAbove="sm">


          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <img src={aniyorSrc} alt="Aniyor Logo" style={{ height: 55 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text as="span" variant="bodyMd">I am located in:</Text>
              <Select label="Location" labelHidden options={countries} value={country} onChange={setCountry} />
            </div>
          </div>

          <Text variant="headingLg" alignment="start" as="h2">Verify OTP</Text>

          <div style={{ marginTop: 20 }}>
            <TextField
              value={otp}
              onChange={setOtp}
              placeholder="123456"
              type="tel"
              autoComplete="one-time-code"
              inputMode="numeric"
              label="Enter OTP"
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <Button fullWidth variant="primary" tone="primary" onClick={handleVerifyOtp}>
              Submit
            </Button>
          </div>

          {message && (
            <div style={{ marginTop: 10 }}>
              <Text tone="subdued">{message}</Text>
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <Text as="p" variant="bodyXs" alignment="start" tone="subdued">
              <Link url="/phoneauth" removeUnderline>Resend OTP</Link>
            </Text>
          </div>
        </Card>
      </Page>
    </Background>
  );
}

const Background = styled.div`
  background-image: url(${bg});
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  display: flex;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
