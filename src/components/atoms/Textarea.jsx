import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className,
  error,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full px-4 py-2.5 text-base bg-white border rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
        "placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed resize-none",
        error ? "border-error focus:ring-error/20 focus:border-error" : "border-gray-300",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;