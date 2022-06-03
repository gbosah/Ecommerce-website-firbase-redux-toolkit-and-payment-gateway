import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../features/account/accountSlice";
import { auth } from "../firebase";

const AccountLogin = () => {
  const { user } = useSelector((state) => state.account);
  //   console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin");
        dispatch(logOut());
        console.log("log out");

        // Sign-out successful.
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="w-full flex flex-col mt-12 px-16 space-y-5">
      <div>
        <h1 className="px-8 text-4xl">Account</h1>
        {<p className='px-8 mt-4'>Hello: <span className='text-blue-400'>{user.email}</span> </p> }
        <button
          onClick={handleLogOut}
          className="px-8 text-blue-500 underline underline-offset-2"
        >
          Log out
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Order history</h2>
        <p>You haven't placed any orders yet.</p>
      </div>
      <div className="flex flex-col text-right">
        <p className="text-2xl font-bold">Account details</p>
        <p>{user.disp}</p>
      </div>
    </div>
  );
};

export default AccountLogin;
