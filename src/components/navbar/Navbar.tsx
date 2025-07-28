import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { cn } from "../../utils";
import Text from "../text/Text";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  }

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
  );
};

export default Navbar;
