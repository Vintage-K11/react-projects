import Logo from "@/components/common/Logo";
import { Menu, Bell, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, selectCurrentUser } from "@/store/authSlice";

const HeaderLite = ({ variant = "lite", toggleSidebar }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  if (variant === "lite") {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4 flex justify-center">
          <Logo />
        </div>
      </header>
    );
  }

  if (variant === "dashboard") {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <Logo />

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Bell size={20} />
          </button>

          <div className="relative group">
            <button className="flex items-center gap-2">
              <User size={20} />
              <span className="text-sm">{user?.name || "Guest"}</span>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg hidden group-hover:block">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Profile
              </button>
              <button
                onClick={() => dispatch(logoutUser())}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return null;
};

export default HeaderLite;
