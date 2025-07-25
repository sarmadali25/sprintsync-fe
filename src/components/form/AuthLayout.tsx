import React from "react";
import Text from "../text/Text";

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footerText,
  footerActionText,
  onFooterAction,
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Text
            variant="h1"
            weight="bold"
            className="text-gray-900 mb-2 text-center"
          >
            {title}
          </Text>
          <Text
            variant="body"
            weight="normal"
            className="text-gray-700 text-center"
          >
            {subtitle}
          </Text>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          {children}
          
          {footerText && footerActionText && (
            <div className="mt-6 text-center">
              <Text variant="body" className="text-sm text-gray-600">
                {footerText}{" "}
                <button onClick={onFooterAction}>
                  <Text
                    variant="body"
                    className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    {footerActionText}
                  </Text>
                </button>
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 
