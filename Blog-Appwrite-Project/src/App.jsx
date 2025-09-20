// src/App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";

// Auth
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { fetchCurrentUser } from "./store/authSlice";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AllPosts from "./pages/AllPosts";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import BlogSettings from "./pages/BlogSettings";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* ---------- Public Pages ---------- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/post/:id" element={<PostPage />} />
        {/* Public profile view */}
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ---------- Auth Pages ---------- */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <ProtectedRoute authentication={false} redirectTo="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute authentication={false} redirectTo="/">
              <SignupPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ---------- Dashboard / Protected Area ---------- */}
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
  );
}

export default App;
