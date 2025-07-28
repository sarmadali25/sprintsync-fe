import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Text from "../text/Text";
import { cn } from "../../utils";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";

const MobileNavbar = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex w-full h-full justify-between items-center bg-white/60 backdrop-blur-sm px-4">
      <Text variant="h1" className="text-primary">
        SprintSync
      </Text>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X
            size={24}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          />
        ) : (
          <Menu
            size={24}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          />
        )}
      </button>
      <div
        className={`absolute w-full h-[100vh] top-full left-0 bg-white backdrop-blur-sm z-20 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start gap-4 px-5 py-8 w-full">
          {user ? (
            <Button variant="secondary" onClick={handleSignOut}>
              <Text variant="medium" className="">
                Sign Out
              </Text>
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => navigate("/login")}>
              <Text variant="medium" className="">
                Sign In
              </Text>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
