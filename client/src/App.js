import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

export default function App() {
 
  useEffect(() => {
    fetch('/api/health')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => console.log('API health:', data))
      .catch(err => console.error('Health check failed:', err));
  }, []);  

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />    
      <Route path="/home"       element={<Home />} />
      <Route path="/login"      element={<Login />} />
      <Route path="/register"   element={<Register />} />
      <Route path="/dashboard"  element={<Dashboard />} />
      <Route path="*"           element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  
  );
}
