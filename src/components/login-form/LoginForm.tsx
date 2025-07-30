import { AuthLayout, FormButton, FormInput } from "../form";
import useLoginForm from "../../hooks/useLoginForm";
import { Lock, Mail } from "lucide-react";

const LoginForm = () => {
  const {
    isLoading,
    formData,
    errors,
    showPassword,
    handleInputChange,
    handleSubmit,
    handleSignupClick,
    setShowPassword,
  } = useLoginForm();

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      footerText="Don't have an account?"
      footerActionText="Sign up"
      onFooterAction={handleSignupClick}
    >
      <form onSubmit={handleSubmit} className="space-y-6 noValidate">
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
        />

        {/* <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div> */}

        <FormButton isLoading={isLoading} loadingText="Signing in...">
          Sign In
        </FormButton>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
