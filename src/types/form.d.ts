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
