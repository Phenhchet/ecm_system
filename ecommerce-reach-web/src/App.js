
import './App.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"
import HomePage from './pages/home/HomePage';
import CustomerPage from './pages/customers/CustomerPage';
import LoginPage from './pages/auth/LoginPage';
import UserPage from './pages/users/UserPage';
import ProductPage from './pages/products/ProduectPage';
import MainLayout from './pages/container/layout/MainLayout';
// import MainContainer from './pages/container/MainContainer';

function App() {
  // get data from local storage
  const isLogin = (localStorage.getItem("is_login") == "1")
  return (
    <BrowserRouter>
      {/* <div>
        <div className='menu_bar'>
          <Link className='menu_item' to="./">Home</Link>
          <Link className='menu_item' to="./product">Product</Link>
          <Link className='menu_item' to="./customer">Customer</Link>
          <Link className='menu_item' to="./register">Register</Link>
          <Link className='menu_item' to="./login">Login</Link>
          <Link className='menu_item' to="./user">User</Link>
        </div>
      </div> */}
      {isLogin && <MainLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customer' element={<CustomerPage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/user' element={<UserPage />} />
        </Routes>
      </MainLayout>}

      {!isLogin && <Routes>
        <Route path='*' element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<HomePage />} />

      </Routes>}
    </BrowserRouter>
  );
}

export default App;
