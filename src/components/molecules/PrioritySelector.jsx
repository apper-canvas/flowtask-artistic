import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const PrioritySelector = ({ value, onChange, className }) => {
  const priorities = [
    { value: "high", label: "High", color: "text-accent", bg: "bg-accent/10", icon: "AlertCircle" },
    { value: "medium", label: "Medium", color: "text-secondary", bg: "bg-secondary/10", icon: "Circle" },
    { value: "low", label: "Low", color: "text-gray-500", bg: "bg-gray-100", icon: "Minus" }
  ];

  return (
    <div className={cn("flex gap-2", className)}>
      {priorities.map((priority) => (
        <button
          key={priority.value}
          type="button"
          onClick={() => onChange(priority.value)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all duration-200",
            "hover:scale-[1.02] active:scale-[0.98]",
            value === priority.value
              ? `${priority.bg} border-current ${priority.color}`
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          )}
        >
          <ApperIcon name={priority.icon} size={16} />
          <span className="text-sm font-medium">{priority.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PrioritySelector;