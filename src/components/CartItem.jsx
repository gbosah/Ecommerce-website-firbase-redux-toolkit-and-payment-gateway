import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCart } from '../features/cart/cartSlice';

const CartItem = () => {

    const navigate = useNavigate()


    const handleChange = (items) => {
        dispatch(addCart(items))
        navigate('/cartcontainer')
    }

    const dispatch = useDispatch()

    const {productItems} = useSelector((state) => state.product)
  return (
    <div className='max-w-[1240px] flex flex-col mx-auto mt-6 '>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {productItems.map((items) => {
                return (
                    <div key={items.id} className='w-full border-r px-4 py-4'>
                        <h2 className='tracking-[0.25em] font-bold text-cyan-500 text-xs py-5'>{items.title}({items.spacification})</h2>
                        <div className=''>
                        <img src={items.img} alt="" className='w-[150px] h-[150px] object-contain transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' />
                        </div>
                        <p className='px-6 py-2 text-xl'>{items.price.toLocaleString("en-US", {style: 'currency', currency: 'USD'})}</p>
                        <div className='w-full flex text-center'>
                        <button onClick={() => handleChange(items)}
                        className='border-2 rounded-full px-2 bg-blue-500 focus:bg-green-800 hover:text-green-600'>
                            Add To Cart
                        </button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default CartItem