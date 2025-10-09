import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import FormField from "@/components/molecules/FormField";

const CategoryModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "#6366f1"
  });
  const [errors, setErrors] = useState({});

  const predefinedColors = [
    "#6366f1", "#8b5cf6", "#ec4899", "#10b981",
    "#f59e0b", "#ef4444", "#3b82f6", "#06b6d4",
    "#8b5cf6", "#f97316"
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", color: "#6366f1" });
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
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
              className="bg-surface rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  New Category
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={24} className="text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  <FormField label="Category Name" required error={errors.name}>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter category name..."
                      error={errors.name}
                    />
                  </FormField>

                  <FormField label="Color">
                    <div className="grid grid-cols-5 gap-3">
                      {predefinedColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleChange("color", color)}
                          className="relative w-full aspect-square rounded-lg transition-all hover:scale-110"
                          style={{ backgroundColor: color }}
                        >
                          {formData.color === color && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ApperIcon name="Check" size={20} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </FormField>
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
                    <ApperIcon name="Plus" size={18} className="mr-2" />
                    Create Category
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

export default CategoryModal;