import { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";

const TaskCard = ({ task, onToggle, onEdit, onDelete, categoryColor }) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggle = async () => {
    setIsCompleting(true);
    setTimeout(() => {
      onToggle(task.Id);
    }, 300);
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { variant: "high", label: "High" },
      medium: { variant: "medium", label: "Medium" },
      low: { variant: "low", label: "Low" }
    };
    return badges[priority] || badges.medium;
  };

  const getDueDateInfo = (dueDate) => {
    if (!dueDate) return null;
    
    const date = typeof dueDate === "string" ? parseISO(dueDate) : dueDate;
    const isPastDue = isPast(date) && !isToday(date);
    
    let label = format(date, "MMM d");
    if (isToday(date)) label = "Today";
    if (isTomorrow(date)) label = "Tomorrow";
    
    return {
      label,
      isPastDue,
      variant: isPastDue ? "error" : isToday(date) ? "warning" : "default"
    };
  };

  const priorityBadge = getPriorityBadge(task.priority);
  const dueDateInfo = getDueDateInfo(task.dueDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: task.completed || isCompleting ? 0.6 : 1, 
        y: 0,
        scale: isCompleting ? 0.98 : 1
      }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-surface rounded-xl p-4 shadow-sm border-l-4 transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5",
        task.completed && "opacity-60"
      )}
      style={{ borderLeftColor: categoryColor }}
    >
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={handleToggle}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className={cn(
              "text-base font-semibold text-gray-900 leading-tight",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
              >
                <ApperIcon name="Edit2" size={16} />
              </button>
              <button
                onClick={() => onDelete(task.Id)}
                className="p-1.5 text-gray-400 hover:text-error hover:bg-error/10 rounded-lg transition-all"
              >
                <ApperIcon name="Trash2" size={16} />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm text-gray-600 mb-3 line-clamp-2",
              task.completed && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={priorityBadge.variant}>
              {priorityBadge.label}
            </Badge>
            {dueDateInfo && (
              <Badge variant={dueDateInfo.variant}>
                <ApperIcon name="Calendar" size={12} className="mr-1" />
                {dueDateInfo.label}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;