import {
  Card,
  Page,
  Text,
  TextField,
  Button,
  Select,
  Link,
  
} from '@shopify/polaris';
import { useState } from 'react';
import aniyorSrc from "../assets/aniyor-logo.png"
import countries from './data/countries';
import styled from 'styled-components';
import '@shopify/polaris/build/esm/styles.css';
import {useNavigate} from "react-router-dom"
import bg from './data/background-image.png';



export default function EmailLogin() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const navigate = useNavigate();

  
    function goToOtpLogin(e) {
    e.preventDefault(); 
    navigate('/eotpverify'); 
  }


  return (
    <Background>
    <Page narrowWidth>
      <Card sectioned roundedAbove="sm" style={{ alignItems: 'center'}}>
        {/* Header with logo and country selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <img src={aniyorSrc} alt="Aniyor Logo" style={{ height: 55 }} />
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

        {/* Mobile Input */}
        <div style={{ marginTop: 20 }}>
          <Text as="p" variant="bodyMd" alignment="start" fontWeight="medium">Enter Email Id</Text>
          <TextField
            value={email}
            onChange={setEmail}
            placeholder="abc@email.com"
            type="email"
            autoComplete="tel"
          />
        </div>

        {/* Submit Button */}
        <form onSubmit={goToOtpLogin} >
        <div style={{ marginTop: 20 }}>
          <Button fullWidth variant='primary' tone="primary" submit >Send OTP</Button>
        </div>
        </form>

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

// const IconCSS = styled(Icon)`
//    color: #3377FF;
//    `;