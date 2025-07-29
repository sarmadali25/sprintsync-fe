import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../utils";
import Text from "../text/Text";

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    const syntheticEvent = {
      target: {
        name,
        value: optionValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder || "Select an option";

  return (
    <div>
      <label htmlFor={id} className="block mb-2">
        <Text variant="body" weight="semibold" className="text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Text>
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "block w-full py-3 border rounded-lg text-sm transition-colors duration-200",
            "font-poppins text-left px-3 pr-10",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 bg-white hover:border-gray-400",
            disabled && "opacity-50 cursor-not-allowed",
            !selectedOption && "text-gray-500"
          )}
          disabled={disabled}
        >
          {displayValue}
        </button>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                    option.value === value && "bg-blue-50 text-blue-700"
                  )}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
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

export default FormSelect; 
