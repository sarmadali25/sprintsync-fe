
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../store/slices/userSlice";
import { showErrorToast } from "../utils/common.utils";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const useLoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user: { loading: isLoading, error: loginError, data: loginData } } = useAppSelector((state) => state.user);
    const [formData, setFormData] = useState<LoginFormData>({
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
  
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
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  
      await dispatch(loginUser(formData));
    };
  
    const handleSignupClick = () => {
      navigate("/signup");
    };
  
    useEffect(() => {
      if (isLoading) return;
      
      if (loginData && !loginError) {
        navigate("/task");
      } else if (loginError) {
        showErrorToast({
          title: "Login Failed",
          text: loginError
        });
      }
    }, [isLoading, loginData, loginError, dispatch, navigate]);


    return {
        isLoading,
        loginError,
        loginData,
        formData,
        errors,
        showPassword,
        handleInputChange,
        handleSubmit,
        handleSignupClick,
        setShowPassword,
    }
}

export default useLoginForm;