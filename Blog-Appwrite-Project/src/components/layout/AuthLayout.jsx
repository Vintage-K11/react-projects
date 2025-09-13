// import React, {useEffect, useState} from 'react'
// import {useSelector} from 'react-redux'
// import {useNavigate} from 'react-router-dom'

// export default function Protected({children, authentication = true}) {

//     const navigate = useNavigate()
//     const [loader, setLoader] = useState(true)
//     const authStatus = useSelector(state => state.auth.status)

//     useEffect(() => {
//         //TODO: make it more easy to understand

//         // if (authStatus ===true){
//         //     navigate("/")
//         // } else if (authStatus === false) {
//         //     navigate("/login")
//         // }
        
//         //let authValue = authStatus === true ? true : false

//         if(authentication && authStatus !== authentication){
//             navigate("/login")
//         } else if(!authentication && authStatus !== authentication){
//             navigate("/")
//         }
//         setLoader(false)
//     }, [authStatus, navigate, authentication])

//   return loader ? <h1>Loading...</h1> : <>{children}</>
// }


// src/components/layouts/AuthLayout.jsx
import {Outlet} from "react-router-dom"
import HeaderLite from "./layoutcomponents/HeaderLite";
import FooterLite from "./layoutcomponents/FooterLite";
import Container from "./layoutcomponents/Container";


const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Minimal Header */}
      <HeaderLite variant="lite" />

      {/* Centered Main Content using Container */}
      <Container className="flex-grow flex items-center justify-center">
        <Outlet />
      </Container>

      {/* Minimal Footer */}
      <FooterLite />
    </div>
  );
};

export default AuthLayout;
