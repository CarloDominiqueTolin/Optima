import * as React from 'react';
import { useState, useEffect, createContext } from 'react';
import Container from '@mui/material/Container';
import SignInSide from './component/SignInSide';
import SignUp from './component/SignUp';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Container disableGutters maxWidth="false">
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}
