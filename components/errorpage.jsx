import React from 'react'
import {
    Card,
    Page,
    Text,
    TextField,
    Button,
    Select,
    Link,
} from '@shopify/polaris';
import { useState, useCallback } from 'react';
import shopifylogo from '../assets/aniyor-logo.png';
import countries from './data/countries';
import '@shopify/polaris/build/esm/styles.css';
import bg from './data/background-image.png';
import styled from 'styled-components';
import { Icon } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import Register from '../pages/Register';
import { supabase } from "../config/supabaseClient"
import iconmail from "../assets/iconmail.png"
import google from "../assets/google.png"
import facebook from "../assets/facebook.png";
import apple from "../assets/apple.png"
import keylogo from "../assets/keylogo.png"
import { useNavigate } from "react-router-dom"

const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function errorpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState('India');
    const [emailError, setEmailError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const socialBtnStyle = {
        width: '116px',
        height: '40px',
        backgroundColor: '#F2F2F5',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
    }

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://aniyor-project.web.app/authcallback', // FULL URL required
            },
        });


        if (error) {
            setMessage(error.message);
            return;
        }
    };

    const handleFacebookLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
        });
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return emailRegex.test(email);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        if (!isValidEmail(email)) {
            setEmailError("Invalid email format");
            return;
        }

        try {
            // Sign in the user
            const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (signInError) {
                setMessage(signInError.message);
                setEmail("");
                setPassword("");
                return;
            }

            if (user) {
                // Check if the user exists in the users table
                const { data: userData, error: dbError } = await supabase
                    .from('users')
                    .select('id')
                    .eq('id', user.id)
                    .single();

                if (dbError || !userData) {
                    // First time user - redirect to where do you sell page
                    navigate('/where-do-you-sell');
                } else {
                    // Returning user - redirect to dashboard
                    navigate('/dashboard');
                }
                return null;
            }
        } catch (error) {
            setMessage("An error occurred during login");
            console.error(error);
        }

        setEmail("");
        setPassword("");
    };

    return (
        <Background>
            <Page narrowWidth>
                <Card sectioned roundedAbove="sm" >
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
                        <Text variant="headingLg" alignment="start" as="h2">Log in </Text>
                        <Text as="p" variant="bodyMd" tone="subdued" alignment="start" style={{ marginTop: 4 }}>
                            Continue to Aniyor
                        </Text>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: 20, marginLeft: '24px', marginRight: '24px', width: '370px' }}>
                            <Text as="p" variant="bodyMd" alignment="start" fontWeight="medium">Email</Text>
                            <TextField
                                value={email}
                                onChange={setEmail}
                                placeholder="abc@email.com"
                                type="email"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div style={{ marginTop: 20, marginLeft: '24px', marginRight: '24px', width: '370px' }}>
                            <Text as="p" variant="bodyMd" alignment="start" fontWeight="medium">Password</Text>
                            <TextField
                                value={password}
                                onChange={setPassword}
                                placeholder="Enter your password"
                                type="password"
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        {emailError && (
                            <div style={{ color: 'red', display: 'flex', alignItems: 'center', marginBottom: '8px', marginLeft: '24px', marginRight: '24px', width: '370px' }}>
                                <span style={{ fontWeight: 'bold', marginRight: '6px' }}>⚠</span>
                                <span>{emailError}</span>
                            </div>
                        )}

                        {message && (
                            <div style={{ color: 'red', display: 'flex', alignItems: 'center', marginBottom: '8px', marginLeft: '24px', marginRight: '24px', width: '370px' }}>
                                <span style={{ fontWeight: 'bold', marginRight: '6px' }}>⚠</span>
                                <span>{message}</span>
                            </div>
                        )}

                        <div style={{
                            marginLeft: '24px',
                            marginRight: '24px',
                            width: '370px',
                            marginBottom: '8px',
                            marginTop: '24px'
                        }}>
                            <button type='submit'
                                style={{
                                    width: '370px',
                                    height: '40px',
                                    backgroundColor: '#3A3A3C',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Continue with email
                            </button>
                        </div>
                    </form>

                    <div style={{
                        marginTop: '16px',
                        marginLeft: '24px',
                        marginRight: '24px',
                        width: '381px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <img src={keylogo} alt="key-logo" style={{ width: 24, height: 24 }} />
                        <Text as="h3" variant="bodyLg" tone="subdued" alignment="center" fontWeight='medium'>
                            Sign in with passkey
                        </Text>
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

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '12px',
                        marginLeft: '24px',
                        marginRight: '24px',
                        marginBottom: '8px'
                    }}>
                        {/* Apple */}
                        <button style={socialBtnStyle}>
                            <img src={apple} alt="Apple logo" style={{ width: 20 }} />
                        </button>

                        {/* Facebook */}
                        <button style={socialBtnStyle} onClick={handleFacebookLogin}>
                            <img src={facebook} alt="Facebook logo" style={{ width: 20 }} />
                        </button>

                        {/* Google */}
                        <button style={socialBtnStyle} onClick={handleGoogleLogin}>
                            <img src={google} alt="Google logo" style={{ width: 20 }} />
                        </button>
                    </div>
                </Card>
            </Page>
        </Background>
    );
}

export default errorpage;

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

const IconCSS = styled(Icon)`
   color: #3377FF;
   `;