import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import CategoryItem from "@/components/molecules/CategoryItem";
import Button from "@/components/atoms/Button";

const MobileSidebar = ({ 
  isOpen,
  onClose,
  categories, 
  activeCategory, 
  onCategoryChange, 
  onAddCategory,
  onDeleteCategory
}) => {
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-surface z-50 flex flex-col shadow-2xl lg:hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <ApperIcon name="CheckSquare" size={24} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    FlowTask
                  </h1>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={24} className="text-gray-600" />
                </button>
              </div>
              <Button
                onClick={() => {
                  onAddCategory();
                  onClose();
                }}
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
                    onClick={() => handleCategoryClick(category)}
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;