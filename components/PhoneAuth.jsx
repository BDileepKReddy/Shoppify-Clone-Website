import {
    Page, Card, Text, TextField, Button, Select
} from '@shopify/polaris';
import aniyorSrc from "../assets/aniyor-logo.png";
import countries from './data/countries';
import { useState, useEffect, useRef } from 'react';
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import bg from './data/background-image.png';
import styled from 'styled-components';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export default function OtpSend() {
    const [country, setCountry] = useState('India');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');         
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [recaptchaReady, setRecaptchaReady] = useState(false);
    const recaptchaVerifierRef = useRef(null);
    const navigate = useNavigate();

    // Render reCAPTCHA only once
    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: "normal",
                callback: () => {
                    setRecaptchaReady(true);
                },
                'expired-callback': () => {
                    setMessage("⚠️ reCAPTCHA expired. Please solve it again.");
                    setRecaptchaReady(false);
                }
            });
            window.recaptchaVerifier.render().then((widgetId) => {
                recaptchaVerifierRef.current = widgetId;
                setRecaptchaReady(true);
            });
        }
        return () => {
            // Cleanup on unmount
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        };
    }, []);

    // Optionally update phone prefix when country changes
    // (Assumes countries data has a dial_code property)
    const handleCountryChange = (value) => {
        setCountry(value);
        const selected = countries.find(c => c.label === value || c.value === value);
        if (selected && selected.dial_code && !phone.startsWith(selected.dial_code)) {
            setPhone(selected.dial_code);
        }
    };

    const handleSendOTP = async () => {
        setMessage("");
        if (!phone.startsWith('+')) {
            setMessage("⚠️ Please enter phone number in international format (+91...)");
            return;
        }
        try {
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(result);
            setMessage("✅ OTP sent! Please check your phone.");
        } catch (err) {
            console.error("OTP Send Error:", err);
            setMessage("❌ Failed to send OTP: " + err.message);
            // Reset reCAPTCHA if error
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
                setRecaptchaReady(false);
            }
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setMessage("⚠️ Please enter the full 6-digit OTP.");
            return;
        }
        try {
            const result = await confirmationResult.confirm(otp);
            setMessage("✅ Logged in successfully!");
            navigate('/dashboard');
        } catch (err) {
            console.error("OTP Verify Error:", err);
            setMessage("❌ Incorrect OTP. Please try again.");
        }
    };

    const handleResend = () => {
        setConfirmationResult(null);
        setOtp('');
        setMessage('');
        // Reset reCAPTCHA
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
            setRecaptchaReady(false);
        }
        // Re-render reCAPTCHA
        setTimeout(() => {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    size: "normal",
                    callback: () => setRecaptchaReady(true),
                    'expired-callback': () => setMessage("⚠️ reCAPTCHA expired. Please solve it again.")
                });
                window.recaptchaVerifier.render().then((widgetId) => {
                    recaptchaVerifierRef.current = widgetId;
                    setRecaptchaReady(true);
                });
            }
        }, 100);
    };

    return (
        <Background>
            <Page narrowWidth>
                <Card sectioned roundedAbove="sm">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                        <img src={aniyorSrc} alt="Aniyor Logo" style={{ height: 55 }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Text as="span" variant="bodyMd">I am located in:</Text>
                            <Select label="Location" labelHidden options={countries} value={country} onChange={handleCountryChange} />
                        </div>
                    </div>

                    <Text variant="headingLg" alignment="start" as="h2">Start your free trial</Text>
                    <Text as="p" variant="bodyMd" tone="subdued" alignment="start" style={{ marginTop: 4 }}>
                        Get 3 days free, then 1 month for ₹20
                    </Text>

                    <div style={{ marginTop: 20 }}>
                        <TextField
                            label="Enter Phone (e.g. +91XXXXXXXXXX)"
                            value={phone}
                            onChange={setPhone}
                            type="tel"
                            autoComplete="tel"
                            inputMode="numeric"
                        />
                    </div>

                    {!confirmationResult && (
                        <>
                            <div style={{ marginTop: 20 }}>
                                <div id="recaptcha-container" />
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <Button fullWidth variant="primary" tone="success" onClick={handleSendOTP} disabled={!recaptchaReady}>
                                    Send OTP
                                </Button>
                            </div>
                        </>
                    )}

                    {confirmationResult && (
                        <>
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
                            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                                <Button fullWidth variant="primary" tone="success" onClick={handleVerifyOTP}>
                                    Submit OTP
                                </Button>
                                <Button fullWidth variant="secondary" onClick={handleResend}>
                                    Resend OTP
                                </Button>
                            </div>
                        </>
                    )}

                    {message && (
                        <div style={{ marginTop: 10 }}>
                            <Text tone="subdued">{message}</Text>
                        </div>
                    )}
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
