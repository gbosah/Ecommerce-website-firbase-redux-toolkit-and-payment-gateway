import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { form } from "../features/order/orderSlice";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useFormik } from "formik";
import * as Yup from "yup";

const Checkout = () => {
  const phoneRegExp = /^[+\d]+(?:[\d-.\s()]*)$/;

  const { cartItems, total } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      country: "",
      street: "",
      city: "",
      state: "",
      postCodes: "",
      phone: "",
      email: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),
      firstName: Yup.string().required("Please enter firstName"),
      lastName: Yup.string().required("Please enter lastName"),
      street: Yup.string().required("Please enter street address"),
      city: Yup.string().required("Please enter city"),
      phone: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Please enter phone number"),
      country: Yup.string().required("Required field"),
      state: Yup.string().when("country", {
        is: (val) => val === true,
        then: Yup.string().required("Field is required"),
        otherwise: Yup.string(),
      }),
    }),
    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      console.log(JSON.stringify(values, null, 2));
      dispatch(form(values));
      navigate("/payment");
    },
  });

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    formik;

  useEffect(() => {}, [values]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between px-4 md:px-16 mt-8 "
    >
      <div className="space-y-5">
        <h1>Billing details</h1>
        <div className="flex flex-col md:flex-row space-x-4">
          <div className="flex flex-col">
            <label>First name *</label>
            <input
              name="firstName"
              id="firstName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              className="border-2 outline-none p-2 rounded-2xl w-[350px]"
            />
            {touched.firstName && errors.firstName ? (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            ) : null}
            <div className="flex md:hidden mt-2 flex-col">
              <label className="">Last name *</label>
              <input
                name="lastName"
                id="lastName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                className="border-2 outline-none p-2 rounded-2xl w-[350px]"
              />
              {touched.lastName && errors.lastName ? (
                <span className="text-red-500 text-sm">{errors.lastName}</span>
              ) : null}
            </div>
          </div>
          <div className="hidden md:flex flex-col">
            <label className="">Last name *</label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              className="border-2 outline-none p-2 rounded-2xl w-[350px]"
            />
            {touched.lastName && errors.lastName ? (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label>Company name (optional)</label>
          <input
            name="companyName"
            id="companyName"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.companyName}
            className="border-2 outline-none p-2 rounded-2xl w-[350px] md:w-[750px]"
          />
        </div>
        <div className="flex flex-col">
          <label>Country / Region *</label>
          <CountryDropdown
            id="country"
            name="country"
            label="country"
            value={values.country}
            onChange={(_, e) => handleChange(e)}
            onBlur={handleBlur}
          />
          {touched.country && errors.country ? (
            <span className="text-red-500 text-sm">{errors.country}</span>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label>State *</label>
          <RegionDropdown
            country={values.country}
            name="state"
            id="state"
            onBlur={handleBlur}
            value={values.state}
            onChange={(_, e) => handleChange(e)}
            className="border-2 outline-none p-2 rounded-2xl w-[350px] md:w-[750px]"
          />
          {touched.state && errors.state ? (
            <span className="text-red-500 text-sm">{errors.state}</span>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label>Street address *</label>
          <input
            name="street"
            id="street"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.street}
            className="border-2 outline-none p-2 rounded-2xl w-[350px] md:w-[750px]"
          />
          {touched.street && errors.street ? (
            <span className="text-red-500 text-sm">{errors.street}</span>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label>Town / City *</label>
          <input
            name="city"
            id="city"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
            className="border-2 outline-none p-2 rounded-2xl w-[350px] md:w-[750px]"
          />
          {touched.city && errors.city ? (
            <span className="text-red-500 text-sm">{errors.city}</span>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label>Postcode (optional)</label>
          <input
            name="postCodes"
            id="postCodes"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.postCodes}
            className="border-2 outline-none p-2 rounded-2xl w-[350px] md:w-[750px]"
          />
        </div>
        <div className="flex flex-col">
          <label>Phone *</label>
          <input
            name="phone"
            id="phone"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            className="border-2 outline-none p-2 rounded-2xl w-[350px] md:w-[750px]"
          />
          {touched.phone && errors.phone ? (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label>Email address *</label>
          <input
            name="email"
            id="email"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="border-2 outline-none p-2 rounded-2xl w-[350px] md:w-[750px]"
          />
        </div>
        <div className="hidden md:block space-x-5">
          <button
            type="submit"
            className="mt-4 px-2 md:px-16 py-4 bg-blue-500 hover:bg-blue-400 rounded-3xl"
          >
            Place order
          </button>
          <Link
            to=""
            className="mt-4 px-2 md:px-16 py-4 bg-blue-500 hover:bg-blue-400 rounded-3xl"
          >
            Return to cart
          </Link>
        </div>
      </div>
      <div className="flex h-full flex-col border-2 px-12 mx-1 md:mx-8 mt-4 md:mt-0 bg-gray-200">
        <div className="">
          <h1>Your order</h1>
        </div>
        <div className="flex space-x-10 justify-between text-center mt-6">
          <h2>Product</h2>
          <h2 className="pl-24">Subtotal</h2>
        </div>
        <div>
          {cartItems.map((item) => {
            return (
              <div key={item.id}>
                <div className="flex justify-between mt-5 border-y-2 divide-y-8 border-gray-500">
                  <p>
                    {item.title} <br /> ({item.spacification})
                  </p>
                  <p>
                    {Number(item.price * item.cartQuantity).toLocaleString(
                      "en-US",
                      { style: "currency", currency: "USD" }
                    )}
                  </p>
                </div>
                <hr className="hidden md:block w-[300px]" />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-5 border- border-gray-500">
          <h2>Total</h2>
          <h2 className="text-gray-600 text-right ">
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h2>
        </div>
      </div>
      <div className="space-x-5 md:hidden">
        <button
          type="submit"
          className="mt-4 px-2 md:px-16 py-4 bg-blue-500 hover:bg-blue-400 rounded-3xl"
        >
          Place order
        </button>
        <Link
          to=""
          className="mt-4 px-2 md:px-16 py-4 bg-blue-500 hover:bg-blue-400 rounded-3xl"
        >
          Return to cart
        </Link>
      </div>
    </form>
  );
};

export default Checkout;
