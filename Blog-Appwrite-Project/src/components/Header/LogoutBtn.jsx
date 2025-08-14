import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/config";
import { logout } from "../../store/AuthSlice";

export default function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => { 
        authService.logout().then(() => {
            dispatch(logout());
        })
    }

    return (
        <div>LogoutBtn</div>
    )
}