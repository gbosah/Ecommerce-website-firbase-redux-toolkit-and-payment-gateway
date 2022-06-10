import React from 'react'
import { FiSend } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { FaFacebook,
    FaTwitter,
   FaYoutube,
   FaInstagram } from 'react-icons/fa';
   import { BiCopyright } from 'react-icons/bi'


const Footer = () => {
  return (
    <footer className='w-full mt-16 bg-gray-400'>
        <div className='flex flex-col md:flex-row md:bg-yellow-400  items-center justify-around h-[50px]'>
            <h2 className='flex px-2 space-x-5 text-xl'>
              <FiSend className='' size={25} /> <span>Sign up to Newsletter</span>
            </h2>
            <h3 className='hidden md:block'>
                ...and receive best price for first Shopping
            </h3>
            <div className='flex rounded-l-lg border-2 md:border-none mt-4 md:mt-0'>
                <input type="email" placeholder='Enter your email address' className='outline-none rounded px-2 py-1' />
                <p className='bg-gray-800 px-1 rounded-r-lg py-2 text-gray-300'>
                    Sign Up
                </p>
            </div>
        </div>
        <div className='max-w-[1240] text-center mx-auto grid md:grid-cols-3 mt-16'>
           <div className=''>
               <h1>
                   Menu
               </h1>
               <ul className='flex flex-col py-6 space-y-4'>
                   <NavLink to=''>Home</NavLink>
                   <NavLink to=''>Product</NavLink>
                   <NavLink to=''>Support</NavLink>
                   <NavLink to=''>About Us</NavLink>
               </ul>
           </div>
           <div>
               <h1>
                   Support
               </h1>
               <ul className='flex flex-col py-6 space-y-4'>
                   <NavLink to=''>Support</NavLink>
                   <NavLink to=''>Warranty</NavLink>
                   <NavLink to=''>About Us</NavLink>
               </ul>
           </div>
           <div>
               <h1>
                   Policies
               </h1>
               <ul className='flex flex-col py-6 space-y-4'>
                   <NavLink to=''>Refund Policy</NavLink>
                   <NavLink to=''>Shipping Policy</NavLink>
                   <NavLink to=''>Privacy Policy</NavLink>
                   <NavLink to=''>Terms of service</NavLink>
               </ul>
           </div>
        </div>
        <div className='w-full flex justify-center mt-4 space-x-10'>
            <a href="/"><FaFacebook  size={25} /></a>
            <a href="/"><FaInstagram size={25} /></a>
            <a href="/"><FaTwitter   size={25} /></a>
            <a href="/"><FaYoutube   size={25} /></a>
        </div>
        <div className='w-full flex justify-center text-center mt-6'>
            <BiCopyright className='mt-1' /> <span className='pl-1'>PhoneLove - {new Date().getFullYear()}. All Rights Reserved</span>
        </div>
    </footer>
  )
}

export default Footer