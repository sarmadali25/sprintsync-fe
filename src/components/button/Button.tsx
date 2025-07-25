import { cn } from "../../utils";

const Button = ({ children, onClick, className, variant="primary" }: any) => {
  return (
    <button
      className={cn(
        "group border-2 rounded-md px-4 py-1 hover:scale-105 cursor-pointer transition-all duration-300",
        variant === "primary" && "border-primary  hover:bg-primary text-primary hover:text-white",
        variant === "secondary" && "border-primary bg-primary hover:bg-white text-white hover:text-primary",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
