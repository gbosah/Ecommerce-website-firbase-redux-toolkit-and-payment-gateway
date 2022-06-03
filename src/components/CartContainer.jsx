import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate} from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsChevronUp, BsChevronDown } from 'react-icons/bs'
import { increment, decrement, remove, addCart } from "../features/cart/cartSlice";
import { RiDeleteBin2Line } from "react-icons/ri";

const CartContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { amount, cartItems, total } = useSelector((state) => state.cart);

  if (amount < 1) {
    return (
      <div className="w-full flex flex-col items-center mt-16 space-y-8">
        <h1 className="text-3xl">Your cart is empty</h1>
        <div>
          <NavLink to="/" className="bg-cyan-400  flex p-2 rounded-xl">
            <AiOutlineArrowLeft className="mr-2 mt-1" />
            Continue Shopping
          </NavLink>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    navigate('/checkout')
  }

  return (
    <section className="w-full mt-16 ">
      <div className="max-w-[1240px] flex justify-between mx-auto">
        <h2 className="text-3xl">Your Cart</h2>
        <NavLink
          to="/cartitem"
          className="text-xl border-2 bg-cyan-400 p-2 rounded-lg flex"
        >
          <AiOutlineArrowLeft className="mr-2 mt-1" /> Continue Shopping
        </NavLink>
      </div>
      <div className=" flex justify-around items-center font-bold mt-8">
        <h3 className="hidden md:block">Product</h3>
        <h3 className="hidden md:block">Quantity</h3>
        <h3 className="mr-12 hidden md:block">Total</h3>
      </div>
      <div className="hidden md:block">
        {cartItems.map((item) => {
          return (
            <div
              key={item.id}
              className="max-w-[1240px] mt-8 grid grid-cols-3 gap-10 items-center mx-auto"
            >
              <div className="flex">
                <div className="w-[150px]">
                  <img
                    src={item.img}
                    alt=""
                    className="w-full object-contain"
                  />
                </div>
                <div className="text-center mt-12 p-5">
                  <p>
                    {item.title} <br /> ({item.spacification})
                  </p>
                  <p>{item.price.toLocaleString("en-US", {style: 'currency', currency: 'USD'})}</p>
                </div>
              </div>
              <div className="flex mx-24 pl-10">
                <div className="border-2 flex px-3 py-2 space-x-5 ">
                  <button
                    onClick={() => {
                      if (item.cartQuantity === 1) {
                        dispatch(remove(item.id));
                        return;
                      }
                      dispatch(decrement(item));
                    }}
                  >
                    -
                  </button>
                  <p>{item.cartQuantity}</p>
                  <button onClick={() => dispatch(increment(item))}>+</button>
                </div>
                <button onClick={() => dispatch(remove(item.id))}>
                  <RiDeleteBin2Line className="ml-2" />
                </button>
              </div>
              <div className="pl-24 ml-16">{Number(item.price * item.cartQuantity).toLocaleString("en-US", {style: 'currency', currency: 'USD'})}</div>
            </div>
          );
        })}
      </div>
      {/* Mobile view */}
      <div className="w-full md:hidden flex-grow">
        <div className="flex justify-between px-2">
          <h1>product</h1>
          <h1>total</h1>
        </div>
        <div>
          {cartItems.map((item) => {
            return (
              <div key={item.id} className="max-w-[500px] mx-auto mt-6 flex justify-around items-center px-2">
                <div className="flex ">
                  <div className="w-full">
                    <img src={item.img} alt="smartphones" className="w-full object-contain" />
                  </div>
                  <div className="flex justify-center text-center mt-2 items-center">
                  <p className="">
                    {item.title} <br /> ({item.spacification})
                  </p>
                  <button onClick={() => dispatch(remove(item.id))} className="mt-2 pl-4">
                    <RiDeleteBin2Line size={20} />
                  </button>
                  </div>
                </div>
                <div className="w-[120px] flex flex-col items-center ">
                  <button onClick={() => dispatch(increment(item))}>
                    <BsChevronUp size={20} />
                  </button>
                  <p>{item.cartQuantity}</p>

                  <button onClick={() => {
                      if (item.cartQuantity === 1) {
                        dispatch(remove(item.id));
                        return;
                      }
                      dispatch(decrement(item));
                    }}
                  >
                    <BsChevronDown size={20} />
                  </button>
                </div>
                <div className="flex items-center ml-10">
                  <p>
                    {Number(item.price * item.cartQuantity).toLocaleString("en-US", {style: 'currency', currency: 'USD'})}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
         <hr className="hidden md:block mt-8 w- mx-auto md:w-[1100px] md:mx-[100px]" />
      <div className="max-w-[1240px] m-auto flex flex-col mt-5">
        <div className="text-right mr-[120px] text-2xl">
        <h2 className="font-bold"> Subtotal <span className="text-gray-600 ">{total.toLocaleString("en-US", {style: 'currency', currency: 'USD'})}</span> </h2>
      <button onClick={handleSubmit} className="border-2 px-10 py-3 mt-4 bg-cyan-400 rounded-full">Check out</button>
        </div>
      </div>
    </section>
  );
};

export default CartContainer;
