import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import CategoryItem from "@/components/molecules/CategoryItem";
import Button from "@/components/atoms/Button";

const Sidebar = ({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  onAddCategory,
  onDeleteCategory,
  className 
}) => {
  return (
    <aside className={cn("h-full bg-surface border-r border-gray-200 flex flex-col", className)}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FlowTask
          </h1>
        </div>
        <Button
          onClick={onAddCategory}
          variant="outline"
          className="w-full"
          size="small"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Category
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {categories.map((category) => (
            <CategoryItem
              key={category.Id}
              category={category}
              isActive={activeCategory?.Id === category.Id}
              onClick={() => onCategoryChange(category)}
              onDelete={onDeleteCategory}
            />
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Made with ❤️ for productivity
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;