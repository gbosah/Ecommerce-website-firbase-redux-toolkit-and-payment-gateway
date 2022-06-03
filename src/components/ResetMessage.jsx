import React from "react";
import { Link } from "react-router-dom";

const ResetMessage = () => {
  return (
    <div className="max-w-[700px] mx-auto mt-16 flex flex-col items-center space-y-5">
      <div>
        <h1>Forget password</h1>
      </div>
      <div className="mr-24 p-2 bg-green-400">
        <p>Password reset email has been sent...</p>
      </div>
      <div className="text-xs">
        <p>
          Password reset email has been sent.
          but may take several minutes to show up in your inbox. Please
          wait at least 10 minutes before attempting another reset.
        </p>
      </div>
      <Link to='/signin' className="text-xl text-blue-600 underline underline-offset-7">Go back</Link>
    </div>
  );
};

export default ResetMessage;
