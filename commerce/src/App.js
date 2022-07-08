import './App.css';
import React,{useState} from 'react'
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom';
import { Redirect } from 'react-dom'
import Beginning from './pages/beginning/Beginning';
import ProductDetail from './pages/productDetail/productDetail';
import CreateOrder from './pages/createOrder/createOrder';
import PreviousPurchases from './pages/previousPurchases/previousPurchases';
import Products from './pages/produts/products';
import Nav from './components/nav/nav';
import SignIn from './pages/signin/signIn';

function App() {
  const [cart,setCart] = useState([])
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
                  path='/previousPurchases'
                  element={<PreviousPurchases />}
                />
                <Route 
                  path='/productDetail/:id'
                  cart={cart}
                  element={<ProductDetail />}
                />
                <Route 
                  path='/products'
                  element={<Products 
                  setCart={setCart}
                  />}
                />
                <Route 
                  path='/SignIn'
                  element={<SignIn />}
                />
                <Route 
                  path='/createOrder'
                  element={<CreateOrder />}
                />
                <Route  path="*" 
                    element={<Navigate to="/"/>}
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