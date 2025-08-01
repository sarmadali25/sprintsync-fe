import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { registerUser, clearRegisterUser } from "../store/slices/userSlice";
import { showSuccessToast, showErrorToast } from "../utils/common.utils";


const useSignupFrom = () => {
    const dispatch = useAppDispatch();
  const {
    registerUser: { loading: isLoading, error: registerError, data: registerData },
    user: { error: loginError, data: loginData }
  } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      formData.phoneNumber.replace(/\s/g, "").length < 10 ||
      formData.phoneNumber.replace(/\s/g, "").length > 15
    ) {
      newErrors.phoneNumber = "Phone number must be between 10 and 15 digits";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof SignupFormErrors]) {
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

    const signUpData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
    };
    await dispatch(registerUser(signUpData));
  };

  const handleLoginClick = () => {
    navigate("/login");
  };


  useEffect(() => {
    if (isLoading) return; 

    if (registerData && !registerError) {
      showSuccessToast({
        title: "Account Created!",
        text: "Your account has been created successfully. Please sign in to continue."
      });
      dispatch(clearRegisterUser());
      navigate("/login");
    } else if (registerError) {
      showErrorToast({
        title: "Registration Failed",
        text: registerError
      });
    }
  }, [isLoading, registerData, registerError]);

  useEffect(() => {
    if (loginData && !loginError) {
      navigate("/");
    } 
  }, [loginData, loginError]);

  return {
    isLoading,
    registerError,
    registerData,
    formData,
    errors,
    showPassword,
    showConfirmPassword,

    setShowPassword,
    setShowConfirmPassword,
    handleInputChange,
    handleSubmit,
    handleLoginClick,
  }
}

export default useSignupFrom;