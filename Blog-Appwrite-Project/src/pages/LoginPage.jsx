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

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    // TODO: integrate auth
    console.log("Login data", data);
    navigate("/");
  };

  return (
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={handleLogin} />
      </div>
  );
};

export default LoginPage;
