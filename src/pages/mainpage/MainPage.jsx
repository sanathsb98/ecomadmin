import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Products from '../products/Products';
import '../mainpage/MainPage.css';
import Orders from '../orders/Orders';
import Dashboard from '../dashboard/Dashboard';

const MainPage = () => {
  return (
    <Router>
      <div className='main-page-container'>
        <div className='main-page-contents'>
          <Sidebar />
          <Routes>
            <Route path='/products' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default MainPage;
