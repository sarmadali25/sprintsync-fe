import { Mail, Lock, Phone } from "lucide-react";
import useSignupFrom from "../../hooks/useSignupFrom";
import { AuthLayout, FormInput, FormButton } from "../../components/form";

const SignupFrom = () => {
  const {
    isLoading,
    formData,
    errors,
    showPassword,
    showConfirmPassword,

    setShowPassword,
    setShowConfirmPassword,
    handleInputChange,
    handleSubmit,
    handleLoginClick,
  } = useSignupFrom();

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us and start your journey today"
      footerText="Already have an account?"
      footerActionText="Sign in"
      onFooterAction={handleLoginClick}
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            error={errors.firstName}
            disabled={isLoading}
            required
          />
          <FormInput
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            error={errors.lastName}
            disabled={isLoading}
            required
          />
        </div>

        {/* Email Field */}
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

        {/* Phone Field */}
        <FormInput
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          error={errors.phoneNumber}
          icon={<Phone className="h-5 w-5 text-gray-400" />}
          disabled={isLoading}
          required
        />

        {/* Password Fields */}
        <FormInput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a strong password"
          error={errors.password}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          disabled={isLoading}
          required
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          showPasswordToggle
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          disabled={isLoading}
          required
        />

        {/* Submit Button */}
        <FormButton isLoading={isLoading} loadingText="Creating account...">
          Create Account
        </FormButton>
      </form>
    </AuthLayout>
  );
};

export default SignupFrom;
