import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../features/account/accountSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        navigate("/accountlogin");
        dispatch(
          signIn({
            email: userAuth.user.email,
            displayName: userAuth.displayName,
            uid: userAuth.user.uid,
          })
        );
      })
      .catch((error) => {
        // alert(error.message);
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          toast.error("wrong email/password", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[700px] mx-auto flex flex-col items-center mt-16"
    >
      <div className="flex flex-col space-y-5">
        <h1 className="text-center text-3xl">Login</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 outline-none p-3"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 outline-none p-3"
        />
        <Link
          to="/reset"
          className="text-xs text-blue-600 underline underline-offset-7"
        >
          Forget your password?
        </Link>
      </div>
      <ToastContainer autoClose={false} />
      <div className="mt-4 px-16 py-4 bg-blue-500 hover:bg-blue-400 rounded-3xl">
        <button>Sign In</button>
      </div>
      <div className="mt-4 text-blue-600 underline">
        <Link to="/signUp">Create account</Link>
      </div>
    </form>
  );
};

export default SignIn;
