// import React, {useState} from 'react'
// import {Link, useNavigate} from 'react-router-dom'
// import { login as authLogin } from '../../store/authSlice'
// import {Button, Input, Logo} from "../index"
// import {useDispatch} from "react-redux"
// import authService from "../../services/appwrite/auth"
// import {useForm} from "react-hook-form"

// function Login() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const {register, handleSubmit} = useForm()
//     const [error, setError] = useState("")

//     const login = async(data) => {
//         setError("")
//         try {
//             const session = await authService.login(data)
//             if (session) {
//                 const userData = await authService.getCurrentUser()
//             if(userData) dispatch(authLogin({userData}));
//                 navigate("/")
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//   return (
//     <div
//     className='flex items-center justify-center w-full'
//     >
//         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//         <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
//         <p className="mt-2 text-center text-base text-black/60">
//                     Don&apos;t have any account?&nbsp;
//                     <Link
//                         to="/signup"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign Up
//                     </Link>
//         </p>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//         <form onSubmit={handleSubmit(login)} className='mt-8'>
//             <div className='space-y-5'>
//                 <Input
//                 label="Email: "
//                 placeholder="Enter your email"
//                 type="email"
//                 {...register("email", {
//                     required: true,
//                     validate: {
//                         matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                         "Email address must be a valid address",
//                     }
//                 })}
//                 />
//                 <Input
//                 label="Password: "
//                 type="password"
//                 placeholder="Enter your password"
//                 {...register("password", {
//                     required: true,
//                 })}
//                 />
//                 <Button
//                 type="submit"
//                 className="w-full"
//                 >Sign in</Button>
//             </div>
//         </form>
//         </div>
//     </div>
//   )
// }

// export default Login

// src/components/auth/LoginForm.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAuthStatus,
  selectAuthError,
  selectCurrentUser,
} from "@/store/authSlice";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Input } from "../common/Input";
import { Label } from "../common/Label";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const currentUser = useSelector(selectCurrentUser);

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (result) navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      <Card>
        <Card.Header>
          <Card.Title>Login to your account</Card.Title>
          <Card.Description>
            Enter your email and password to login
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password field */}
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error message */}
            {status === "error" && error && (
              <p className="text-red-500 text-sm text-center">
                {error || "Login failed. Please try again."}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                variant="outline"
                className="w-full border border-black text-white font-medium rounded-lg 
                           bg-black hover:bg-white hover:text-black hover:shadow-md 
                           transform hover:active:scale-95 
                           transition-all duration-300 ease-in-out 
                           flex items-center justify-center gap-2"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Logging in..." : "Login"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border border-black text-black font-medium rounded-lg 
                           bg-white hover:bg-black hover:text-white hover:shadow-md 
                           transform hover:active:scale-95 
                           transition-all duration-300 ease-in-out 
                           flex items-center justify-center gap-2"
              >
                Login with Google
              </Button>
            </div>

            {/* Signup link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default LoginForm;
