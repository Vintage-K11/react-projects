// import React from 'react'
// import { Signup as SignupComponent } from '../components'

// function Signup() {
//   return (
//     <div className='py-8'>
//         <SignupComponent />
//     </div>
//   )
// }

// export default Signup

import React from "react";
import SignupForm from "@/components/auth/SignupForm";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (data) => {
    // TODO: signup logic
    console.log("Signup", data);
    navigate("/");
  };

  return (
      <div className="w-full max-w-md">
        <SignupForm onSubmit={handleSignup} />
      </div>
  );
};

export default SignupPage;
