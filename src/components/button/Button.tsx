import { cn } from "../../utils";
import { Video } from "lucide-react";

const Button = ({
  children,
  onClick,
  className,
  small = false,
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg text-sm hover:scale-110 transition-all duration-300 hover:shadow-2xl relative group cursor-pointer border-3 border-primary hover:border-0",
        className,
        " hover:bg-gradient-to-r hover:from-tertiary hover:to-tertiary-light"
      )}
      onClick={
        onClick
          ? onClick
          : () => {
              window.open(
                "https://calendar.app.google/sk1G5pjX28zVUg4x9",
                "_blank"
              );
            }
      }
    >
      <span className="group-hover:opacity-0 transition-opacity duration-300">
        {children}
      </span>

      <Video
        className={cn(
          "absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white",
          small ? "w-6 h-6" : "w-8 h-8"
        )}
      />
    </button>
  );
};

export default Button;
