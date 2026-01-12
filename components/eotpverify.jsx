import {
  Card,
  Page,
  Text,
  TextField,
  Button,
  Select,
  Link,
} from '@shopify/polaris';
import { useState, useEffect, useCallback } from 'react';
import shopifylogo from '../assets/aniyor-logo.png';
import countries from './data/countries';
import '@shopify/polaris/build/esm/styles.css';
import bg from './data/background-image.png';
import styled from 'styled-components';
import React from 'react';
import { Icon } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import Register from '../pages/Register';
import { supabase } from "../config/supabaseClient"
import { useNavigate } from "react-router-dom"







export default function AniyorTrialCard() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState('India');
  const [emailError, setEmailError] = useState(false);
  const [otp, setOtp] = useState('');
   const [correct, setCorrect] = useState(false);






  const navigate = useNavigate();

  function goToCreateAccount() {
    navigate('./EmailLogin');
  }

  function gotoLogin() {
    navigate('./errorpage');
  }




  // State for message display  
  const [message, setMessage] = useState("");

  const checkIfEmailExists = async (email) => {
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      return false; // handle error externally
    }

    const userExists = data.users.some(user => user.email === email);
    return userExists;
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('aniyorEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setMessage('❌ No email found. Please go back and enter your email again.');
    }
  }, []);






  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://aniyor-backend.onrender.com/verify-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        console.log('✅ OTP verified!');
        setMessage('✅ OTP verified successfully!');
        localStorage.removeItem('aniyorEmail');
        navigate('/dashboard')
      } else {
        setMessage(`❌ Verification failed: ${data.message}`);
      }
    } catch (err) {
      setMessage(`❌ Error verifying OTP: ${err.message}`);
    }
  };


  // Conditionally mask input with red asterisks when incorrect
  const displayValue = correct ? otp : '*'.repeat(otp?.length || 0);





  return (
    <Background >
      <Page narrowWidth>
        <Card sectioned roundedAbove="sm" >
          {/* Header with logo and country selector */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}>
            <img src={shopifylogo} alt="Shopify Logo" style={{ height: '138px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text as="span" variant="bodyMd">I am located in:</Text>
              <Select
                label="Location"
                labelHidden
                options={countries}
                value={country}
                onChange={setCountry}
              />
            </div>
          </div>

          {/* Trial header */}

          <Text variant="headingLg" alignment="start" as="h2">Start your free trial</Text>
          <Text as="p" variant="bodyMd" tone="subdued" alignment="start" style={{ marginTop: 4 }}>
            Get 3 days free, then 1 month for ₹20
          </Text>





          {/* Email Input */}
          {message && <span>{message}</span>}
          <form onSubmit={handleSubmit}>


            <div style={{ marginTop: 20 }}>
              <Text as="p" variant="bodyMd" alignment="start" fontWeight="medium">Password</Text>
              <TextField
              value={displayValue}
              onChange={setOtp}
              placeholder="135686"
              type="tel"
              autoComplete="tel"
              error={!correct ? '' : undefined}
              inputMode="numeric"
              style={{
                color: !correct ? 'red' : undefined,
                letterSpacing: '6px',
              }}
              tone={correct ? "plain" : "critical"}
            />
            </div>

            <div style={{ marginTop: 20 }}>
              <Button submit fullWidth variant="primary" tone="primary">
                Create Aniyor Account
              </Button>
            </div>
          </form>




          {/* or */}
          <DividerContainer>
            <Line />
            <OrText>Or</OrText>
            <Line />
          </DividerContainer>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <Footer style={{ marginLeft: '60px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text as="span" variant="bodyMd" >
                Already have an Aniyor account?{' '}
              </Text>
              <LoginLink inline onClick={gotoLogin}>
                Log in&nbsp;
              </LoginLink>
              <span style={{ color: '#3377FF' }}>
                {<Icon source={ArrowRightIcon} />}

              </span>
            </Footer>
          </div>

          {/* Terms and Conditions Footer */}
          <div style={{ marginTop: 16 }}>
            <Text as="p" variant="bodyXs" tone="subdued">
              By proceeding, you agree to the{' '}
              <Link url="#">Terms and Conditions</Link> and{' '}
              <Link url="#">Privacy Policy</Link>
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
    display: flex;background-repeat: no-repeat;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    `

const DividerContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 24px 0;
    `;

const Line = styled.div`
    flex-grow: 1;
    height: 1px;
    background: #d1d1d1;
    `;

const OrText = styled(Text).attrs({ as: 'span', variant: 'bodyMd', alignment: 'center' })`
    margin: 0 12px;
    color: #9e9e9e;
    `;

const Footer = styled.div`
    text-align: center;
    margin-top: 12px;
    `;

const LoginLink = styled(Link).attrs({ inline: true })`
   display: inline-flex;
   align-items: center;
   `;

//   const InputText = styled.div`
//   width: 370;
//   height: 61;
//   padding-top: 20px;
//   padding-right: 32px;
//   padding-bottom: 20px;
//   padding-left: 32px;
//   border-radius: 6px;
//   border-width: 1px;
// `

const IconCSS = styled(Icon)`
   color: #3377FF;
   `;