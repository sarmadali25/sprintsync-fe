interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  disabled?: boolean;
  required?: boolean;
}

interface FormButtonProps {
  type?: "submit" | "button";
  isLoading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText?: string;
  footerActionText?: string;
  onFooterAction?: () => void;
}
