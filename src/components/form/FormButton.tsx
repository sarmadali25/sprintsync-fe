import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../utils";
import Text from "../text/Text";

const FormButton: React.FC<FormButtonProps> = ({
  type = "submit",
  isLoading = false,
  disabled = false,
  loadingText = "Loading...",
  children,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        "w-full py-3 px-4 text-base font-medium text-white rounded-lg",
        "bg-gradient-to-r from-blue-600 to-purple-600",
        "hover:from-blue-700 hover:to-purple-700",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "transition-all duration-200 transform hover:scale-[1.02]",
        "disabled:opacity-75 disabled:cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          <Text variant="medium" className="text-sm text-white">
            {loadingText}
          </Text>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Text variant="h4" className="text-white">
            {children}
          </Text>
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      )}
    </button>
  );
};

export default FormButton; 
