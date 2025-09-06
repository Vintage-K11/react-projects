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
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../common/Card";
import { Input } from "../common/Input";
import { Label } from "../common/Label";
import Logo from "../common/Logo";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      {/* Optional Logo at the top */}
      <div className="flex justify-center mb-4">
        <Logo />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            {/* Email field */}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
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
              <Input id="password" type="password" required />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
