import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils";
import Text from "../text/Text";

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  disabled = false,
  required = false,
}) => {
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <label htmlFor={id} className="block mb-2">
        <Text variant="body" weight="semibold" className="text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Text>
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          className={cn(
            "block w-full py-3 border rounded-lg text-sm transition-colors duration-200",
            "font-poppins text-gray-700",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            icon ? "pl-10" : "pl-3",
            showPasswordToggle ? "pr-12" : "pr-3",
            error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 bg-white hover:border-gray-400",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      {error && (
        <Text variant="body" className="mt-1 text-red-600">
          {error}
        </Text>
      )}
    </div>
  );
};

export default FormInput; 
