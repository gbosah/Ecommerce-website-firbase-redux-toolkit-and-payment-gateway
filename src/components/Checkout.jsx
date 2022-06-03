import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addOrder } from "../features/order/orderSlice";
import { Country, State, City }  from 'country-state-city';
import Select from "react-select";
import { useFormik } from "formik";

const Checkout = () => {

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      country: "nigeria",
      street: "",
      city: null,
      state: null,
      postCodes: "",
      phone: "",
      email: "",
    },
    onSubmit: (values) => {},
  });

  const countries = Country.getAllCountries();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country
  }));

  const updatedStates = (countryId) => {
    State
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }));
  };
  const updatedCities = (stateId) => {
    City
      .getCitiesOfState(stateId)
      .map((city) => ({ label: city.name, value: city.id, ...city }));
  };

  const {
    values,
    handleSubmit,
    setValues,
    setFieldValue,
    handleChange,
    handleBlur,
  } = formik;

  useEffect(() => {}, [values]);

  const { order } = useSelector((state) => state.order);

  return (
    <form className="w-full flex flex-col md:flex-row justify-between px-4 md:px-16 mt-8 ">
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
              className="border-2 outline-none p-2 rounded-2xl w-[300px]"
            />
          </div>
          <div className="flex flex-col pr-6">
            <label className="">Last name *</label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              className="border-2 outline-none p-2 rounded-2xl w-[300px]"
            />
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
            className="border-2 outline-none p-2 rounded-2xl w-[300px] md:w-[600px]"
          />
        </div>
        <div className="flex flex-col">
          <label>Country / Region *</label>
          <Select
            id="country"
            name="country"
            label="country"
            options={updatedCountries}
            value={values.country}
            onChange={(value) => {
              setValues({ country: value, state: null, city: null }, false);
            }}
          />
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
          />
        </div>
        <div className="flex flex-col">
          <label>State *</label>
          <Select
            id="state"
            name="state"
            options={updatedStates(
              values.country ? values.country.value : null
            )}
            value={values.state}
            onChange={(value) => {
              setValues({ state: value, city: null }, false);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label>Town / City *</label>
          <Select
            id="city"
            name="city"
            options={updatedCities(values.state ? values.state.value : null)}
            value={values.city}
            onChange={(value) => setFieldValue("city", value)}
          />
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
          />
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
          />
        </div>
        <div>
          <button>Place order</button>
          <Link to="">Return to cart</Link>
        </div>
      </div>
      <div>
        <div>
          <h2>Your order</h2>
        </div>
        <div>
          <h2>Product</h2>
          <h2>Subtotal</h2>
        </div>
        <div>
          {order.map((item) => {
            return (
              <div>
                <div>
                  <p>
                    {item.title}({item.specification}) <span>x{item}</span>
                  </p>
                  <p>{item.price * item.cartOrder}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default Checkout;
