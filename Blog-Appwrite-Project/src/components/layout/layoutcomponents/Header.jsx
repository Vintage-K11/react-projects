import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { loginUser, logoutUser } from "../../../store/authSlice";
import { Menu, X, User } from "lucide-react";
import Logo from "@/components/common/Logo";

const Header = () => {
  const dispatch = useDispatch();
  const { status, userData } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Posts", path: "/all-posts" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm ">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium text-gray-700 hover:text-primary transition-all duration-300 ${
                  isActive ? "text-primary underline" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {status && (
            <NavLink
              to="/create-post"
              className="font-medium text-gray-700 hover:text-primary transition-all duration-300"
            >
              Create Post
            </NavLink>
          )}
        </nav>

        {/* Auth / User Section */}
        <div className="hidden md:flex items-center gap-3 relative">
          {!status ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary transition-all duration-300"
              >
                <User className="w-5 h-5" />
                {userData?.name || "User"}
              </button>

              {/* User Dropdown */}
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-posts"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Posts
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => dispatch(logoutUser())}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-medium text-gray-700 hover:text-primary transition-all duration-300 ${
                  isActive ? "text-primary underline" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {status && (
            <NavLink
              to="/create-post"
              onClick={() => setMobileOpen(false)}
              className="font-medium text-gray-700 hover:text-primary transition-all duration-300"
            >
              Create Post
            </NavLink>
          )}

          {/* Mobile Auth / User */}
          {!status ? (
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full">Signup</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2 border-t pt-2">
              <Link to="/profile" onClick={() => setMobileOpen(false)}>
                Profile
              </Link>
              <Link to="/my-posts" onClick={() => setMobileOpen(false)}>
                My Posts
              </Link>
              <Link to="/settings" onClick={() => setMobileOpen(false)}>
                Settings
              </Link>
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  setMobileOpen(false);
                }}
                className="text-red-600 text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
