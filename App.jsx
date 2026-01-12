import { useState } from 'react'
import './App.css'
import en from '@shopify/polaris/locales/en.json'; // ✅ Add i18n strings
import '@shopify/polaris/build/esm/styles.css'; // ✅ Polaris styles
import AniyorTrialCard from './components/createaccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, Frame } from '@shopify/polaris';

import Errorpage from './components/errorpage';
import OtpVerify from './components/OtpLogin';
import EmailLogin from './components/EmailLogin';
import Dekstop37 from './components/Vendors/dekstop37';
import BankDetailsCard from './components/forms/BankDetails.jsx';
import BusinessDetailsCard from './components/forms/BusinessDetailsCard.jsx';
import Left from './components/Vendors/left.jsx';
import Settings from './components/settingspages/settings.jsx';
import Settings2 from './components/settingspages/settings2.jsx';
import Addproducts from './components/Vendors/addproducts.jsx'
import Settings3 from './components/settingspages/settings3.jsx';
import Settings4 from './components/settingspages/settings4.jsx';
import Settings5 from './components/settingspages/settings5.jsx';
import Settings6 from './components/settingspages/settings6.jsx';
import Settings7 from './components/settingspages/settings7.jsx';
import Settings8 from './components/settingspages/settings8.jsx';
import Settings9 from './components/settingspages/settings9.jsx';
import Settings10 from './components/settingspages/settings10.jsx'; 
import Dashboard from './components/Vendors/dashboard.jsx';
import '@shopify/polaris/build/esm/styles.css';
import FirstPage from "./components/FirstPage";
import ProductList from './components/ProductList';

import PricingPage from './components/AvailablePlans';
import Whatdoyousell from './components/WhatDoYouSell';
import Wheredoyousell from './components/WhereDoYouSell';
import BusinessStageSelector from './components/BusinessStage';
import MainPage from './components/OnboardingFirstPage';
import { ServicePage } from './components/ServicesPage';
import OrderList from './components/OrderList';
import DefaultAdress from './components/forms/DefaultAdress.jsx';
import ReturnExchange from './components/ReturnExchange.jsx';
import ServiceList from './components/ServiceList';
import Orders from './components/orderspages/orders.jsx'
import Orders2 from './components/orderspages/orders2.jsx'
import Orders3 from './components/orderspages/orders3.jsx'
import Orders4 from './components/orderspages/orders4.jsx'
import Orders5 from './components/orderspages/orders5.jsx'
import Orders6 from './components/orderspages/orders6.jsx'
import Orders7 from './components/orderspages/orders7.jsx'
import Orders8 from './components/orderspages/orders8.jsx'
import Body from './components/body.jsx'
import OtpLogin from './components/OtpLogin.jsx'
import Afterlogin from './components/afterlogin.jsx'
import Authcallback from './components/authcallback.jsx'
import CreateaAccount from './components/createaccount.jsx'
import Eotpverify from './components/eotpverify.jsx'
import PhoneAuth from './components/PhoneAuth.jsx'
import Addservices from './components/Vendors/addservices.jsx';




function App() {

  



  return (
    <AppProvider>
      <Frame>
      <Router>
        <Routes>
          <Route path ='createaccount' element={<CreateaAccount/>}/>
          <Route path = '/eotpverify' element={<Eotpverify/>}/>
          
          
          <Route path ="/otplogin" element={<OtpLogin/>}/>  
          <Route path ="/afterlogin" element={<Afterlogin/>}/>  
          <Route path = "/dekstop37" element={<Dekstop37/>} />
          <Route path = "/left" element={<Left/>}/>
          <Route path = "/settings" element= {<Settings/>}/>
          <Route path = "/settings2" element= {<Settings2/>}/>
          <Route path = '/settings3' element = {<Settings3/>}/>
          <Route path = '/settings4' element = {<Settings4/>}/>
          <Route path = '/settings5' element = {<Settings5/>}/>
          <Route path = '/settings6' element = {<Settings6/>}/>
          <Route path = '/dashboard' element = {<Dashboard/>}/>
          <Route path = '/settings7' element = {<Settings7/>}/>
          <Route path = '/settings8' element = {<Settings8/>}/>
          <Route path = '/settings9' element = {<Settings9/>}/>
          <Route path = '/settings10' element = {<Settings10/>}/>
           <Route path = '/orders1' element={<Orders/>}/>
          <Route path = '/orders2' element={<Orders2/>}/>
          <Route path = '/orders3' element={<Orders3/>}/>
          <Route path = '/orders4' element={<Orders4/>}/>
          <Route path = '/orders5' element={<Orders5/>}/>
          <Route path = '/orders6' element={<Orders6/>}/>
          <Route path = '/orders7' element={<Orders7/>}/>
          <Route path = '/orders8' element={<Orders8/>}/>
          <Route path="/" element={<FirstPage/>} />
          <Route path="/login" element={<Errorpage/>} />
          <Route path="/createaccount" element={<AniyorTrialCard/>} />
          <Route path="/errorpage" element={<Errorpage/>} />
          <Route path="/OtpLogin" element={<OtpVerify/>} />
          <Route path="/EmailLogin" element={<EmailLogin/>} />
          <Route path="/where-do-you-sell" element={<Wheredoyousell/>} />
          <Route path="/business-status" element={<BusinessStageSelector/>} />
          <Route path="/what-do-you-sell" element={<Whatdoyousell/>} />
          <Route path="/available-plans" element={<PricingPage/>}/>
          <Route path="/onboarding" element={<MainPage/>} />
          <Route path="/products" element={<ProductList/>} />
          <Route path="/orders" element={<OrderList/>} />
          <Route path="/business-details" element={<BusinessDetailsCard />} />
          <Route path="/bank-details" element={<BankDetailsCard />} />
          <Route path="/default-address" element={<DefaultAdress />} />
          <Route path="/vendors/addproducts" element={<Addproducts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/return-exchange" element={<ReturnExchange />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/body" element={<Body />} />
          <Route path='/authcallback' element={<Authcallback/>}/>
          <Route path='/phoneauth' element={<PhoneAuth/>}/>
          <Route path='/vendors/addservices' element={<Addservices/>}/>
        </Routes>
      </Router>
      </Frame>
    </AppProvider>
  )
}

export default App
