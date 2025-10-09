import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className,
  checked,
  ...props 
}, ref) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        className="sr-only"
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center cursor-pointer",
          "hover:scale-110 active:scale-95",
          checked
            ? "bg-primary border-primary"
            : "bg-white border-gray-300 hover:border-primary",
          className
        )}
      >
        {checked && (
          <ApperIcon name="Check" size={14} className="text-white" strokeWidth={3} />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;