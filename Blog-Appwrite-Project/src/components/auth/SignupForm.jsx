// src/components/auth/SignupForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser, selectAuthStatus, selectAuthError, selectCurrentUser } from "@/store/authSlice";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Input } from "../common/Input";
import { Label } from "../common/Label";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const currentUser = useSelector(selectCurrentUser);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) navigate("/", { replace: true });
  }, [currentUser, navigate]);

  // Helper: generate username slug
  const generateUsername = (nameInput) => {
    return (
      nameInput.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "-" +
      Math.floor(1000 + Math.random() * 9000)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Final username
      let finalUsername = username.trim();
      if (!finalUsername) {
        finalUsername = name.trim()
          ? generateUsername(name)
          : `user-${Math.floor(1000 + Math.random() * 9000)}`;
      }

      // Default avatar and cover
      const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || finalUsername)}`;
      const defaultCover = "https://source.unsplash.com/1200x400/?nature,abstract";

      // Dispatch signup
      const result = await dispatch(
        signupUser({ 
          name, 
          email, 
          password, 
          username: finalUsername,
          avatarUrl: defaultAvatar,
          coverImageUrl: defaultCover
        })
      ).unwrap();

      console.log("✅ Signup successful:", result);

      // Redirect to user's profile page
      navigate(`/profile/${result.profile.username}`);
    } catch (err) {
      console.error("❌ Signup failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto my-20">
      <Card>
        <Card.Header>
          <Card.Title>Create an account</Card.Title>
          <Card.Description>Enter your details to sign up</Card.Description>
        </Card.Header>

        <Card.Content>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Username (optional) */}
            <div className="grid gap-3">
              <Label htmlFor="username">Username (optional)</Label>
              <Input
                id="username"
                type="text"
                placeholder="john-doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

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
            {status === "failed" && (
              <p className="text-red-500 text-sm text-center">
                {error || "Signup failed."}
              </p>
            )}

            {/* Signup Button */}
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Signing up..." : "Sign Up"}
            </Button>

            {/* Already have account */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
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
