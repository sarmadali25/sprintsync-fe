import { useLocation, useNavigate } from "react-router-dom";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import Button from "../button/Button";
import { cn } from "../../utils";
import Text from "../text/Text";

const Navbar = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <div
      className={cn(
        "fixed w-full bg-white/70 backdrop-blur-md shadow-md transition-transform duration-300 z-50 flex justify-center items-center",
      )}
    >
      <div className="w-[100%] max-w-[1600px] h-[70px] flex justify-between items-center px-6">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <Text variant="h1" className="text-primary">SprintSync</Text>
        </button>
        <div className="flex justify-between items-center gap-4">
          <button
            className={cn(
              "text-sm text-gray-400 hover:text-primary hover:scale-105 cursor-pointer transition-all duration-300",
              pathname === "/" && "text-primary"
            )}
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className={cn(
              "text-sm text-gray-400 hover:text-primary hover:scale-105 cursor-pointer transition-all duration-300",
              pathname === "/dashboard" && "text-primary"
            )}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>
        <Button variant="secondary" onClick={() => navigate("/login")}>
          <Text variant="medium" className="">
            Sign In
          </Text>
        </Button>
        
      </div>
    </div>
  );
};

export default Navbar;
