import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../features/account/accountSlice";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reset = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/resetinfo");
        // Password reset email sent!
        dispatch(reset());
      })
      .catch((error) => {
        // alert(errorMessage);
        if (
          error.code === "auth/user-not-found"
        ) {
          toast.error("wrong email", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        // ..
      });
  };

  return (
    <form
      onSubmit={handleReset}
      className="max-w[700px] mx-auto flex flex-col items-center mt-16 space-y-5"
    >
      <div className="text-center space-y-3">
        <h1 className="text-4xl">Reset your password</h1>
        <p>We will send you an email to reset your password</p>
      </div>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 outline-none p-3"
      />
      <ToastContainer autoClose={false} />
      <div className="mt-4 px-16 py-4 bg-blue-500 hover:bg-blue-400 rounded-3xl">
        <button>Submit</button>
      </div>
      <Link
        to="/signin"
        className="text-xl text-blue-600 underline underline-offset-7"
      >
        Cancel
      </Link>
    </form>
  );
};

export default Reset;
