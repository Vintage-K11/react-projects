// import React, {useState} from 'react'
// import authService from '../appwrite/auth'
// import {Link ,useNavigate} from 'react-router-dom'
// import {login} from '../store/authSlice'
// import {Button, Input, Logo} from './index.js'
// import {useDispatch} from 'react-redux'
// import {useForm} from 'react-hook-form'

// function Signup() {
//     const navigate = useNavigate()
//     const [error, setError] = useState("")
//     const dispatch = useDispatch()
//     const {register, handleSubmit} = useForm()

//     const create = async(data) => {
//         setError("")
//         try {
//             const userData = await authService.createAccount(data)
//             if (userData) {
//                 const userData = await authService.getCurrentUser()
//                 if(userData) dispatch(login({userData}));
//                 navigate("/")
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//   return (
//     <div className="flex items-center justify-center">
//             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//             <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>
//                 <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
//                 <p className="mt-2 text-center text-base text-black/60">
//                     Already have an account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign In
//                     </Link>
//                 </p>
//                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//                 <form onSubmit={handleSubmit(create)}>
//                     <div className='space-y-5'>
//                         <Input
//                         label="Full Name: "
//                         placeholder="Enter your full name"
//                         {...register("name", {
//                             required: true,
//                         })}
//                         />
//                         <Input
//                         label="Email: "
//                         placeholder="Enter your email"
//                         type="email"
//                         {...register("email", {
//                             required: true,
//                             validate: {
//                                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                 "Email address must be a valid address",
//                             }
//                         })}
//                         />
//                         <Input
//                         label="Password: "
//                         type="password"
//                         placeholder="Enter your password"
//                         {...register("password", {
//                             required: true,})}
//                         />
//                         <Button type="submit" className="w-full">
//                             Create Account
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//     </div>
//   )
// }

// export default Signup

// src/components/auth/SignupForm.jsx
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Input } from "../common/Input";
import { Label } from "../common/Label";

const SignupForm = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      <Card>
        <Card.Header>
          <Card.Title>Create an account</Card.Title>
          <Card.Description>
            Enter your details below to create a new account
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <form className="flex flex-col gap-6">
            {/* Full Name */}
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>

            {/* Email */}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
    variant="outline"
    className="w-full border border-black text-white font-medium rounded-lg 
               bg-black hover:bg-white hover:text-black hover:shadow-md 
               transform hover:active:scale-95 
               transition-all duration-300 ease-in-out 
               flex items-center justify-center gap-2"
  >
                Sign Up
              </Button>
              <Button
    variant="outline"
    className="w-full border border-black text-black font-medium rounded-lg 
               bg-white hover:bg-black hover:text-white hover:shadow-md 
               transform hover:active:scale-95 
               transition-all duration-300 ease-in-out 
               flex items-center justify-center gap-2"
  >
                Sign up with Google
              </Button>
            </div>

            {/* Already have an account */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SignupForm;
