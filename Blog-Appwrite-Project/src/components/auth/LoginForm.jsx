// src/components/auth/LoginForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  loginUser,
  selectAuthStatus,
  selectAuthError,
  selectCurrentUser,
  selectCurrentProfile,
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
  const currentProfile = useSelector(selectCurrentProfile);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser && currentProfile?.username) {
      navigate(`/profile/${currentProfile.username}`, { replace: true });
    }
  }, [currentUser, currentProfile, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      if (result?.profile?.username) {
        navigate(`/profile/${result.profile.username}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto my-20">
      <Card>
        <Card.Header>
          <Card.Title>Login to your account</Card.Title>
          <Card.Description>Enter your email and password</Card.Description>
        </Card.Header>

        <Card.Content>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Email */}
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

            {/* Password */}
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {status === "failed" && error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </Button>

            {/* Signup Link */}
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                Sign Up
              </Link>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default LoginForm;
