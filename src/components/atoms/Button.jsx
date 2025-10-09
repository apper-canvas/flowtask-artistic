import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "medium",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:brightness-110 active:scale-[0.98] focus:ring-primary shadow-sm",
    secondary: "bg-secondary text-white hover:brightness-110 active:scale-[0.98] focus:ring-secondary shadow-sm",
    accent: "bg-accent text-white hover:brightness-110 active:scale-[0.98] focus:ring-accent shadow-sm",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-[0.98] focus:ring-primary",
    ghost: "text-gray-700 hover:bg-gray-100 active:scale-[0.98] focus:ring-gray-300",
    danger: "bg-error text-white hover:brightness-110 active:scale-[0.98] focus:ring-error shadow-sm"
  };
  
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };
  
  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;