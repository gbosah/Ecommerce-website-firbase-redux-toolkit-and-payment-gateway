import React from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { closeModal } from '../features/modal/modalSlice'

const Modal = () => {

    const dispatch = useDispatch()
  return (
    <div className='w-full relative z-10 space-x-2 top-2 left-0 flex justify-center items-center'>
        <div className=' flex border-2 focus-within:border-black py-2 px-1 md:px-2'>
        <input type="text"placeholder='search'
        className='px-2 w-[300px] md:w-[400px]  outline-none' />
         <AiOutlineSearch size={25} className='mt-2 text-gray-400' />
        </div>
        <div>
           <AiOutlineClose size={20} className='text-gray-400' onClick={() => dispatch(closeModal())} />
        </div>
    </div>
  )
}

export default Modal