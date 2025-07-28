interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  }
  
  interface SignupFormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
  }