// import React from 'react'
// import { Login as LoginComponent } from '../components'
// function Login() {
//   return (
//     <div className='py-8'>
//         <LoginComponent />
//     </div>
//   )
// }

// export default Login

// LoginPage.jsx
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full max-w-sm mx-auto my-20">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
