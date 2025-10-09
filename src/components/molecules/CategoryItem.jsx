import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategoryItem = ({ category, isActive, onClick, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (category.name !== "Inbox" && category.name !== "Work" && category.name !== "Personal" && category.name !== "Shopping") {
      onDelete(category.Id);
    }
  };

  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: category.color }}
        />
        <span className="font-medium truncate">{category.name}</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={cn(
          "text-sm px-2 py-0.5 rounded-full",
          isActive ? "bg-primary/20 text-primary" : "bg-gray-200 text-gray-600"
        )}>
          {category.taskCount}
        </span>
        {!["Inbox", "Work", "Personal", "Shopping"].includes(category.name) && (
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error/10 rounded"
          >
            <ApperIcon name="Trash2" size={14} className="text-error" />
          </button>
        )}
      </div>
    </motion.button>
  );
};

export default CategoryItem;