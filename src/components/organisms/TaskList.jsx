import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Empty from "@/components/ui/Empty";

const TaskList = ({ tasks, onToggle, onEdit, onDelete, categories, onAddTask }) => {
  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.Id.toString() === categoryId);
    return category?.color || "#6366f1";
  };

  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        message="Start organizing your work by creating your first task"
        icon="CheckCircle2"
        action={onAddTask}
        actionLabel="Add Task"
      />
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            categoryColor={getCategoryColor(task.categoryId)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;