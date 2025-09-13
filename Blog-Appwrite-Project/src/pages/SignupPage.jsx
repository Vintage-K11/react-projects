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

// src/pages/SignupPage.jsx
import React from "react";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
