import React, { useEffect } from 'react'
import "@stripe/stripe-js";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartContainer from './components/CartContainer';
import Footer from './components/Footer';
import Home from './components/Home';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { calculateTotal } from './features/cart/cartSlice';
import { getCartItems } from './features/products/productSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { logOut, signIn } from './features/account/accountSlice';
import AccountLogin from './components/AccountLogin';
import ProtectedRoute from './components/ProtectedRoute';
import CartItem from './components/CartItem';
import Reset from './components/Reset';
import ResetMessage from './components/ResetMessage';
import Checkout from './components/Checkout';
import { Payment } from './components/Payment';

const App = () => {

  const {cartItems} = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getCartItems())
  }, [])

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems, dispatch])

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        
        dispatch(signIn({
          displayName: userAuth.displayName
        }));
       } else {
        dispatch(logOut());
      
       }
    });
  }, []);

  const { isOpen } = useSelector((state) => state.modal)
  const { isLoading } = useSelector((state) => state.product);

  if (isLoading) {
    return(
      <div className='w-full h-screen flex justify-center items-center'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <BrowserRouter>
       {isOpen ? <Modal /> : <Navbar /> }
       <Routes>
       <Route index element={<Home />} />
         <Route path='/cartcontainer' element={<CartContainer />} />
         <Route path='/cartitem' element={<CartItem />} />
         <Route path='/signin' element={<SignIn />} />
         <Route path='/signup' element={<SignUp />} />
         <Route path='/reset' element={<Reset />} />
         <Route path='/payment' element={<Payment />} />
         <Route path='/resetinfo' element={<ResetMessage />} />
         <Route path='/accountlogin' element={ <ProtectedRoute>
                                               <AccountLogin />
                                               </ProtectedRoute>
                                              } 
                                              />
         <Route path='/checkout' element={ <ProtectedRoute>
                                               <Checkout />
                                               </ProtectedRoute>
                                              } 
                                              />
          
       </Routes>
       <div><Footer /> </div>
    </BrowserRouter>
  )
}

export default App