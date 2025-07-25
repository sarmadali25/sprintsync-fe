import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Text from "../text/Text";
import { cn } from "../../utils";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex w-full h-full justify-between items-center bg-white/60 backdrop-blur-sm px-4">
      <img src='./logo/creative-logo-light.svg' className="w-32"/>
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
          <button
            className="text-sm"
            onClick={() => {
              toggleMenu();
              navigate("/");
            }}
          >
            <Text variant="h4" weight="medium" className={cn("text-gray-400 hover:text-primary hover:scale-105 transition-all duration-300", pathname === "/" && "text-primary")}>
              Home
            </Text>
          </button>
          <button
            className="text-sm"
            onClick={() => {
              toggleMenu();
              navigate("/dashboard");
            }}
          >
            <Text variant="h4" weight="medium" className={cn("text-gray-400 hover:text-primary hover:scale-105 transition-all duration-300", pathname === "/dashboard" && "text-primary")}>
              Dashboard
            </Text>
          </button>
          <Button
          >
            <Text
              variant="h4"
              weight="medium"
              align="center"
              className="text-white"
            >
              Book a Call
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
