import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logoutUser, selectCurrentUser } from "@/store/authSlice";
import { Menu, X, User, Bell } from "lucide-react";
import Logo from "@/components/common/Logo";

const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectCurrentUser); // Redux state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Posts", path: "/all-posts" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Close dropdown on route change
  useEffect(() => {
    setUserDropdown(false);
    setMobileOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
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

          {userData && (
            <NavLink
              to="/post/create"
              className="font-medium text-gray-700 hover:text-primary transition-all duration-300"
            >
              Create Post
            </NavLink>
          )}
        </nav>

        {/* Auth / User Section (Desktop) */}
        <div className="hidden md:flex items-center gap-3 relative">
          {!userData ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Bell size={20} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                  {userData?.name || "User"}
                </button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-50">
                    <Link
                      to={`/profile/${userData._id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
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

          {userData && (
            <NavLink
              to="/post/create"
              onClick={() => setMobileOpen(false)}
              className="font-medium text-gray-700 hover:text-primary transition-all duration-300"
            >
              Create Post
            </NavLink>
          )}

          {!userData ? (
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
              <Link
                to={`/profile/${userData._id}`}
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </Link>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                Dashboard
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
