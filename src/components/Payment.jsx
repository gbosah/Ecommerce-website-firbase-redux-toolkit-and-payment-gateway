import React from "react";
import { useSelector } from "react-redux";



export const Payment = () => {
  const {cartItems, total } = useSelector((state) => state.cart);


  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };

  const { order } = useSelector((state) => state.order);
  return (
    <div className="max-w-[1240px] mx-auto flex flex-col items-center py-16">
      <div>
        <h1>Pay for order</h1>
      </div>
      <div className="mt-5 border-t-2 border-gray-500">
        {order.map((items) => {
          return (
            <div key={items.name}>
              <h2 className="text-xl">
                {" "}
                <span className="font-bold text-xl">Contact:</span>{" "}
                {items.email}
              </h2>
            </div>
          );
        })}
        <div>
          <h2 className="text-xl">
            {" "}
            <span className="font-bold text-xl">Date:</span>{" "}
            {date.toLocaleDateString("en-US", options)}
          </h2>
        </div>
      </div>
      <div>
        <div>
          <p className="text-center text-xl font-bold py-2">Product Name</p>
        </div>
        {cartItems.map((items) => {
          return (
            <div className="text-xl">
              {items.title} ({items.spacification})
            </div>
          );
        })}
      </div>
      <div className="py-4 text-xl border-b-2 border-gray-500">
        {" "}
        <span className="font-bold text-xl">Total:</span>{" "}
        {total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </div>
      <div className="flex mt-4 px-4">
        <form action="/create-checkout-session" method="POST" className="px-4">
          <button type="submit" className="border rounded bg-blue-600"> Pay with Stripe </button>
        </form>
      </div>
    </div>
  );
};
