import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import FormField from "@/components/molecules/FormField";
import PrioritySelector from "@/components/molecules/PrioritySelector";

const TaskModal = ({ isOpen, onClose, onSubmit, task, categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    categoryId: "1"
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "",
        categoryId: task.categoryId
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        categoryId: "1"
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        dueDate: formData.dueDate || null
      });
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
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
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {task ? "Edit Task" : "Create New Task"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={24} className="text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  <FormField label="Title" required error={errors.title}>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Enter task title..."
                      error={errors.title}
                    />
                  </FormField>

                  <FormField label="Description">
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Add more details about this task..."
                      rows={4}
                    />
                  </FormField>

                  <FormField label="Priority">
                    <PrioritySelector
                      value={formData.priority}
                      onChange={(value) => handleChange("priority", value)}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField label="Due Date">
                      <Input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleChange("dueDate", e.target.value)}
                        min={format(new Date(), "yyyy-MM-dd")}
                      />
                    </FormField>

                    <FormField label="Category">
                      <div className="relative">
                        <select
                          value={formData.categoryId}
                          onChange={(e) => handleChange("categoryId", e.target.value)}
                          className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          {categories.map((cat) => (
                            <option key={cat.Id} value={cat.Id.toString()}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ApperIcon name="ChevronDown" size={20} className="text-gray-400" />
                        </div>
                      </div>
                    </FormField>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <ApperIcon name={task ? "Save" : "Plus"} size={18} className="mr-2" />
                    {task ? "Update Task" : "Create Task"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;