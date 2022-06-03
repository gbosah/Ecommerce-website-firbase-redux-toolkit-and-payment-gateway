import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { BsPerson, BsBag } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaFacebook,
    FaTwitter,
   FaYoutube,
   FaInstagram } from 'react-icons/fa'

const Navbar = () => {

  const navigate = useNavigate()


  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user } = useSelector((state) => state.account)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      if (window.scrollY > lastScrollY) { 
        setShow(true); 
      } else {
        setShow(false);  
      }

  
      setLastScrollY(window.scrollY); 
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);



const {amount} = useSelector((state) => state.cart)

const [nav, setNav] = useState(false);

const handleClick = () => setNav(!nav)
const closeClick = () => setNav(false)



useEffect(() => {
    if (nav) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [nav]);

  const dispatch = useDispatch()

  const searchToggle = () => {
    dispatch(openModal())
  }

  const handleUser = () => {
    if(user) {
      navigate('/accountlogin')
    } else {
      navigate('/signin')
    }
  }

  return (
    <nav className={`w-full h-20 z-50 sticky top-0 bg-slate-50 px-4 flex duration-[0.3s] transform ease-in-out justify-between items-center 
    ${show && 'top-[-80px] fixed duration-[0.3s]'}`}>
        <div className='flex justify-around items-center space-x-7'>
        <NavLink to='/' className='px-16 text-3xl font-bold text-[#09aac7cc]'>
               PhoneLOVE
           </NavLink>

           <div className='hidden md:block space-x-7 cursive'>
              <NavLink to='' >
                  Home
              </NavLink>

              <NavLink to='' >
                  Products
              </NavLink>

              <NavLink to='' >
                  Support
              </NavLink>

              <NavLink to='' >
                  About Us
              </NavLink>
           </div>
        </div>

        <div className='relative flex items-center space-x-2 md:space-x-5 md:px-6'>
          <div>
              <BiSearch size={25} onClick={searchToggle} /> 
          </div>
          <button onClick={handleUser} className='hidden md:block' >
               <BsPerson size={25} />
          </button>
          <NavLink to='/cartcontainer' >
               <BsBag size={25} className='' />
          </NavLink>
          <div className='absolute right-0 md:right-6 top-4 px-1 text-xl bg-gray-700 text-gray-100 rounded-full'>
              {amount}
            </div>
        </div>

        {/* Mobile menu */}

        <div className='md:hidden'>
                <div onClick={() => setNav(!nav)} className='absolute left-1 top-6' >
                    {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} /> } 
                </div>
            
            <div className={nav ? 'w-[300px] absolute bg-gray-300 space-y-6 text-xl border-t z-10 cursive flex flex-col px-4 py-16 left-0 top-20' : 'absolute left-[-100%]'}
            onClick={handleClick} style={{marginTop: 1}}>
              <NavLink to='/'  >
                  Home
              </NavLink>

              <NavLink to='' >
                  Products
              </NavLink>

              <NavLink to='' >
                  Support
              </NavLink>

              <NavLink to='' >
                  About Us
              </NavLink>

              <div className='flex flex-col space-y-24 py-[320px] '>
              <div className='flex space-x-2 '>
                <button onClick={handleUser} > <BsPerson size={20} /> </button>
                <p className='text-xl font-bold'>Log in</p>
             </div>
                 <div className='flex space-x-5 text-2xl' >
                 <a href="">
                 <FaFacebook />
                 </a>
                 <a href="">
                 <FaTwitter />
                 </a>
                 <a href="">
                 <FaInstagram />
                 </a>
                 <a href="">
                 <FaYoutube />
                 </a>
                 </div>
             </div>
           </div>
           </div>
    </nav>
    )
}

export default Navbar