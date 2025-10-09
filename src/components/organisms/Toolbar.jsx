import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { cn } from "@/utils/cn";

const Toolbar = ({ onSearch, onFilter, activeFilters, onAddTask, onToggleSidebar }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" }
  ];

  const handleFilterChange = (type, value) => {
    onFilter({ ...activeFilters, [type]: value });
  };

  return (
    <div className="bg-surface border-b border-gray-200 sticky top-0 z-30">
      <div className="p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="Menu" size={24} className="text-gray-600" />
          </button>
          <SearchBar
            onSearch={onSearch}
            placeholder="Search tasks..."
            className="flex-1"
          />
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="ghost"
            className="relative"
          >
            <ApperIcon name="Filter" size={20} />
            {(activeFilters.status !== "all" || activeFilters.priority !== "all") && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            )}
          </Button>
          <Button onClick={onAddTask} className="hidden sm:flex">
            <ApperIcon name="Plus" size={20} className="mr-2" />
            Add Task
          </Button>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleFilterChange("status", option.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                            activeFilters.status === option.value
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {priorityOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleFilterChange("priority", option.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                            activeFilters.priority === option.value
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={onAddTask}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg flex items-center justify-center z-40 hover:scale-110 active:scale-95 transition-transform"
      >
        <ApperIcon name="Plus" size={24} className="text-white" />
      </button>
    </div>
  );
};

export default Toolbar;