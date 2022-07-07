// import logo from './logo.svg';
import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom';
import Beginning from './pages/beginning/Beginning';
import ProductDetail from './pages/productDetail/productDetail';
import Login from './pages/login/logIn';
import CreateProduct from './pages/createProduct/createProduct';
import PreviousPurchases from './pages/previousPurchases/previousPurchases';
import Products from './pages/produts/products';
import Nav from './components/nav/nav';
import SignIn from './pages/signin/signIn';
function App() {
  return (
        <BrowserRouter>
          <Nav />
          <div className="App">
              <Routes> 
              {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
                <Route 
                  path='/'
                  element={<Beginning />}
                />
                <Route 
                  path='/login'
                  element={<Login />}
                />
                <Route 
                  path='/previousPurchases'
                  element={<PreviousPurchases />}
                />
                <Route 
                  path='/productDetail/:id'
                  element={<ProductDetail />}
                />
                <Route 
                  path='/products'
                  element={<Products />}
                />
                <Route 
                  path='/SignIn'
                  element={<SignIn />}
                />
                <Route 
                  path='/createProduct'
                  element={<CreateProduct />}
                />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;

// {/* <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header> */}