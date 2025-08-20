import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/AuthSlice' 
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

 }

export default Login