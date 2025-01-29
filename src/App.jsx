import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';
import MainPage from './pages/mainpage/MainPage';
import Orders from './pages/orders/Orders';
import Products from './pages/products/Products';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
  <>
   <Navbar />
   <MainPage/>
  <BrowserRouter>
  <Routes>
    <Route path='/products' element={<Products/>}/>
  </Routes>
  </BrowserRouter>
  </>
      
      
 
  );
}

export default App;

