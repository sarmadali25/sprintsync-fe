import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { AuthLayout, FormInput, FormButton } from "../../components/form";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Login successful:", formData);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    // TODO: Navigate to signup page
    console.log("Navigate to signup");
  };

  const handleForgotPasswordClick = () => {
    // TODO: Navigate to forgot password page
    console.log("Navigate to forgot password");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      footerText="Don't have an account?"
      footerActionText="Sign up"
      onFooterAction={handleSignupClick}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          error={errors.email}
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          disabled={isLoading}
          required
        />

        <FormInput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={errors.password}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          disabled={isLoading}
          required
        />

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={handleForgotPasswordClick}
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            Forgot password?
          </button>
        </div>

        <FormButton
          isLoading={isLoading}
          loadingText="Signing in..."
        >
          Sign In
        </FormButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
