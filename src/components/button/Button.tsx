import { cn } from "../../utils";

const Button = ({ children, onClick, className, variant="primary" }: any) => {
  return (
    <button
      className={cn(
        "group border-2 rounded-md px-4 py-1 hover:scale-105 cursor-pointer transition-all duration-300",
        variant === "primary" && "border-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-blue-600 hover:text-white",
        variant === "secondary" && "bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-white hover:from-transparent hover:to-transparent text-white hover:text-blue-600 border-blue-600",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
