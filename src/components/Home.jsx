import React from 'react';
import About from './About';
import CartItem from './CartItem';

const image = 'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870'
const Home = () => {
  return (
    <div className='w-full flex flex-col relative'>
        <div className=''>
            <img src={image} alt=""  className='w-full h-full object-cover'/>
        </div>
        <div className='space-y-10'>
            <h2 className='text-gray-100 font-bold text-2xl absolute py-16 px-5 md:px-16 top-0 left-0'>The world on your palm</h2>
            <p className='text-gray-100 font-bold text-2xl absolute py-16 px-5 md:px-16 top-0 left-0'>Make it 
            <span className='font-bold cursive'> Beautiful</span></p>
        </div>
        <div className='text-center text-white'>
          <div className='grid md:grid-cols-3 gap-5 px-10 text-2xl bg-black'>
           <h3 className='border-2 m-2 p-2 bg-gray-900 border-gray-900'>FREE SHIPPING</h3>
            <h3 className='border-2 p-2 m-2 bg-gray-900 border-gray-900'>30-DAY GUARANTEE</h3>
            <h3 className='border-2 m-2 p-2 bg-gray-900 border-gray-900'>1-YEAR WARRANTY</h3>
          </div>  
        </div>
        <div>
          <About />
        </div>

        <div>
        <CartItem />
        </div>
    </div>
  )
}

export default Home