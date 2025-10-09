import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className,
  error,
  children,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full px-4 py-2.5 text-base bg-white border rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
        "disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none cursor-pointer",
        error ? "border-error focus:ring-error/20 focus:border-error" : "border-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;