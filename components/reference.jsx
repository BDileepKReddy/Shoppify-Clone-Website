// import {
//   Card,
//   Page,
//   Text,
//   TextField,
//   Button,
//   Select,
//   Link
// } from '@shopify/polaris';
// import { useState } from 'react';
// import aniyorSrc from "../assets/aniyor-logo.png"
// import countries from '../data/countries';

// export default function AniyorTrialCard() {
//   const [email, setEmail] = useState('');
//   const [country, setCountry] = useState('India');

//   return (
//     <Page narrowWidth>
//       <Card sectioned roundedAbove="sm">
//         {/* Header with logo and country selector */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//           <img src={aniyorSrc} alt="Aniyor Logo" style={{ height: 55 }} />
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//             <Text as="span" variant="bodyMd">I am located in:</Text>
//             <Select
//               label="Location"
//               labelHidden
//               options={countries}
//               value={country}
//               onChange={setCountry}
//             />
//           </div>
//         </div>

//         {/* Trial header */}
//         <Text variant="headingLg" alignment="start" as="h2">Start your free trial</Text>
//         <Text as="p" variant="bodyMd" tone="subdued" alignment="start" style={{ marginTop: 4 }}>
//           Get 3 days free, then 1 month for ₹20
//         </Text>

//         {/* Mobile Input */}
//         <div style={{ marginTop: 20 }}>
//           <Text as="p" variant="bodyMd" alignment="start" fontWeight="medium">Enter Email Id</Text>
//           <TextField
//             value={email}
//             onChange={setEmail}
//             placeholder="abc@email.com"
//             type="email"
//             autoComplete="tel"
//           />
//         </div>

//         {/* Submit Button */}
//         <div style={{ marginTop: 20 }}>
//           <Button url='#' fullWidth variant='primary' tone="primary">Send OTP</Button>
//         </div>

//         {/* Terms and Conditions Footer */}
//         <div style={{ marginTop: 16 }}>
//           <Text as="p" variant="bodyXs" tone="subdued">
//             By proceeding, you agree to the{' '}
//             <Link url="#">Terms and Conditions</Link> and{' '}
//             <Link url="#">Privacy Policy</Link>
//           </Text>
//         </div>
//       </Card>
//     </Page>
//   );
// }


// this is a sytax for page not forung go to homepage
//   <h1>404 - Page Not Found</h1>
//         <p>Sorry, the page you are looking for does not exist.</p>
//         <p>Please check the URL or return to the homepage.</p>
//         <a href="/">Go to Homepage</a>

// //////////////////////////////////////////
