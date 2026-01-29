import type { ReactElement } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  text?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  children?: React.ReactNode;
}

//#5147E4
//#E1E7FE

const variantStyles = {
  primary: "bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-500",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = (props: ButtonProps) => {
  const {
    variant = "primary",
    size = "md",
    text,
    startIcon,
    endIcon,
    onClick,
    children,
  } = props;

  return (
    <button
      onClick={onClick}
      className={`
        rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
        ${variantStyles[variant]} 
        ${sizeStyles[size]}
        flex items-center gap-2 cursor-pointer
      `}
    >
      {startIcon}
      {text}
      {children}
      {endIcon}
    </button>
  );
};


