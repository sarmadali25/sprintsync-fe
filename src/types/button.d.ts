interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  variant: "primary" | "secondary";
}
