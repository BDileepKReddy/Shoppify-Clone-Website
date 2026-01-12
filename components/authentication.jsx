import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Wrapper from "../pages/Wrapper";
import body from "./body";

function Authentication() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          
          {/* <Route path="/" element={<body />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <Wrapper>
              <Dashboard />

            </Wrapper>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Authentication;
