import { Page, Card, Text, SkeletonBodyText, Select, Link, SkeletonDisplayText } from '@shopify/polaris';
import { useState } from 'react';
import shopifylogo from "./data/shopify-logo.png"
import countries from './data/countries';
import iconmail from "../assets/iconmail.png"
import google from "../assets/google.png"
import apple from "../assets/apple.png"
import { supabase } from '../config/supabaseClient';
import styled from 'styled-components';
import { Icon } from '@shopify/polaris';

import bg from './data/background-image.png';
import { useNavigate } from 'react-router-dom';
import facebook from "../assets/facebook.png";

export default function Aniyor() {

  const navigate = useNavigate();

  function goToCreateAccount() {
    navigate('/createaccount');
  }
  function doRegister() {
    navigate('/register');
  }



const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:4000/send-email-otp', // FULL URL required
    },
  });
};

  const handleFacebookLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    });
  };


  const [country, setCountry] = useState('India')

  const socialBtnStyle = {
    width: '48px',
    height: '40px',
    backgroundColor: '#F2F2F5',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
  };
  return (
    <Background>
      <Page narrowWidth>
        <Card sectioned roundedAbove="sm">
          {/* Header with logo and country selector */}
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '113px', width: '370px', alignItems: 'center', marginBottom: '10px', marginTop: '10px', marginLeft: '24px', marginRight: '24px' }}>
            <img src={shopifylogo} alt="shopifylogo" style={{ width: 123 }} />
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
          <div style={{ marginLeft: '24px' }}>
            <Text variant="headingLg" alignment="start" as="h2">Start your free trial</Text>
            <Text as="p" variant="bodyMd" tone="subdued" alignment="start" style={{ marginTop: 4 }}>
              Get 3 days free, then 1 month for ₹20
            </Text>
          </div>
          {/* {login choise} */}

          <div style={{ marginTop: '8px', marginLeft: '24px', marginRight: '24px', width: '370px', marginBottom: '8px' }}>
            <button
              onClick={goToCreateAccount}

              style={{
                width: '370px',
                height: '40px',
                backgroundColor: '#F2F2F5',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <img src={iconmail} alt="email icon" style={{ width: 25 }} />
              <Text as="p" variant="bodyLg" tone="subdued" alignment="center">
                Sign up with email
              </Text>
            </button>
          </div>

          <div style={{ marginLeft: '24px', marginRight: '24px', width: '370px', marginBottom: '8px' }}>
            <button
              onClick={() => handleGoogleLogin()}
              style={{
                width: '370px',
                height: '40px',
                backgroundColor: '#F2F2F5',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',     // Vertical center
                justifyContent: 'center', // Horizontal center
                gap: '8px'
              }}
            ><img src={google} alt="shopifylogo" style={{ width: 25 }} />
              <Text as="p" variant="bodyLg" tone="subdued" alignment='center'>Sign up with email</Text>
            </button>

          </div>


          <div style={{ marginLeft: '24px', marginRight: '24px', width: '370px', marginBottom: '8px' }}>
            <button
              style={{
                width: '370px',
                height: '40px',
                backgroundColor: '#F2F2F5',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',     // Vertical center
                justifyContent: 'center', // Horizontal center
                gap: '8px'
              }}
            ><img src={apple} alt="shopifylogo" style={{ width: 25 }} />
              <Text as="p" variant="bodyLg" tone="subdued" alignment='center'>Sign up with email</Text>
            </button>

          </div>


          <div style={{ marginLeft: '24px', marginRight: '24px', width: '370px', marginBottom: '8px' }}>
            <button onClick={() => handleFacebookLogin()}
              style={{
                width: '370px',
                height: '40px',
                backgroundColor: '#F2F2F5',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',     // Vertical center
                justifyContent: 'center', // Horizontal center
                gap: '8px'
              }}
            ><img src={facebook} alt="shopifylogo" style={{ width: 25 }} />
              <Text as="p" variant="bodyLg" tone="subdued" alignment='center'>Sign up with email</Text>
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '14px 24px 8px 24px',
              width: '370px',
            }}
          >
            <div style={{ flex: 1 }}>
              <hr style={{ border: 'none', borderTop: '1px solid #C4C4C4' }} />
            </div>

            <span style={{ margin: '0 12px', color: '#8C8C8C', fontSize: '14px' }}>Or</span>

            <div style={{ flex: 1 }}>
              <hr style={{ border: 'none', borderTop: '1px solid #C4C4C4' }} />
            </div>

          </div>

          <div style={{ weidth: '268px', height: '24px' }}>
            <Text>Already have an account? <Link url='#'>Log in</Link> </Text>



          </div>


          {/* Terms and Conditions Footer */}
          <div style={{ marginTop: '16px', height: "86px", marginLeft: '24px', marginRight: '24px', width: '381px' }}>
            <Text as="h3" variant="bodyLg" tone="subdued" alignment='start' >
              By proceeding, you agree to the{' '}
              <Link url="#">Terms and Conditions</Link> and{' '}
              <Link url="#">Privacy Policy</Link>
            </Text>
            <br></br>

            <Text as="h3" variant="bodyLg" tone="subdued" alignment='start'>
              Help Privacy Terms
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