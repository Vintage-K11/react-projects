// import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import './App.css'
// import authService from "./appwrite/auth"
// import {login, logout} from "./store/authSlice"
// import { Footer, Header } from './components'
// import { Outlet } from 'react-router-dom'

// function App() {
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     authService.getCurrentUser()
//     .then((userData) => {
//       if (userData) {
//         dispatch(login({userData}))
//       } else {
//         dispatch(logout())
//       }
//     })
//     .catch((error) => {
//       // Only show detailed error in development
//       if (import.meta.env.DEV) {
//         console.error("App :: getCurrentUser :: error", error)
//         setError("Failed to connect to authentication service. Please check your internet connection and try again.")
//       }
//       dispatch(logout())
//     })
//     .finally(() => setLoading(false))
//   }, [])
  
//   return !loading ? (
//     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
//       <div className='w-full block'>
//         <Header />
//         <main>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//               {error}
//             </div>
//           )}
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   ) : null
// }

// export default App

// src/App.jsx
import { Routes, Route } from "react-router-dom"

// Layouts
import MainLayout from "./components/layout/MainLayout"
import AuthLayout from "./components/layout/AuthLayout"
import DashboardLayout from "./components/layout/DashboardLayout"

// Auth
import ProtectedRoute from "./components/auth/ProtectedRoute"

// Pages
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import AllPosts from "./pages/AllPosts"
import PostPage from "./pages/PostPage"
import CreatePostPage from "./pages/CreatePostPage"
import EditPostPage from "./pages/EditPostPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import EditProfile from "./pages/EditProfile"
import BlogSettings from "./pages/BlogSettings"
import NotFound from "./pages/NotFound"

// Dashboard Pages
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import UserDashboard from "./pages/dashboard/UserDashboard"

function App() {
  return (
    <Routes>
      {/* ---------- Main Public Layout ---------- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ---------- Auth Layout (minimal header/footer) ---------- */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <ProtectedRoute authentication={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute authentication={false}>
              <SignupPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ---------- Dashboard Layout (protected area) ---------- */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <BlogSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/create"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id/edit"
          element={
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App

