interface UserAttributes {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  interface UserState {
    user: {
      loading: boolean;
      error: string | null;
      data : UserAttributes | null;
    }
    registerUser: {
      loading: boolean;
      error: string | null;
      data: UserAttributes | null;
    }
    userList:{
      loading: boolean;
      error: string | null;
      data: UserAttributes[] | null;
    }
  }