import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Sidebar from "@/components/organisms/Sidebar";
import MobileSidebar from "@/components/organisms/MobileSidebar";
import Toolbar from "@/components/organisms/Toolbar";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import CategoryModal from "@/components/organisms/CategoryModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import taskService from "@/services/api/taskService";
import categoryService from "@/services/api/categoryService";

const MainView = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: "all", priority: "all" });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
      setActiveCategory(categoriesData[0] || null);
    } catch (err) {
      setError(err.message || "Failed to load data");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (activeCategory) {
      if (activeCategory.name === "Inbox") {
        result = result.filter(t => t.categoryId === "1");
      } else {
        result = result.filter(t => t.categoryId === activeCategory.Id.toString());
      }
    }

    if (searchQuery) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.status !== "all") {
      result = result.filter(t =>
        filters.status === "active" ? !t.completed : t.completed
      );
    }

    if (filters.priority !== "all") {
      result = result.filter(t => t.priority === filters.priority);
    }

    return result.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [tasks, activeCategory, searchQuery, filters]);

  const handleToggleTask = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id);
      setTasks(tasks.map(t => t.Id === id ? updatedTask : t));
      toast.success(updatedTask.completed ? "Task completed! 🎉" : "Task reopened");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create({
        ...taskData,
        categoryId: activeCategory?.Id.toString() || "1"
      });
      setTasks([...tasks, newTask]);
      toast.success("Task created successfully");
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.update(editingTask.Id, taskData);
      setTasks(tasks.map(t => t.Id === editingTask.Id ? updatedTask : t));
      toast.success("Task updated successfully");
      setEditingTask(null);
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.delete(id);
        setTasks(tasks.filter(t => t.Id !== id));
        toast.success("Task deleted");
      } catch (err) {
        toast.error("Failed to delete task");
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCreateCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully");
    } catch (err) {
      toast.error("Failed to create category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? Tasks will be moved to Inbox.")) {
      try {
        await categoryService.delete(id);
        setCategories(categories.filter(c => c.Id !== id));
        
        const tasksInCategory = tasks.filter(t => t.categoryId === id.toString());
        for (const task of tasksInCategory) {
          await taskService.update(task.Id, { ...task, categoryId: "1" });
        }
        
        if (activeCategory?.Id === id) {
          setActiveCategory(categories[0]);
        }
        
        toast.success("Category deleted");
        loadData();
      } catch (err) {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddCategory={() => setIsCategoryModalOpen(true)}
        onDeleteCategory={handleDeleteCategory}
        className="hidden lg:block w-80 flex-shrink-0"
      />

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddCategory={() => setIsCategoryModalOpen(true)}
        onDeleteCategory={handleDeleteCategory}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Toolbar
          onSearch={setSearchQuery}
          onFilter={setFilters}
          activeFilters={filters}
          onAddTask={() => setIsTaskModalOpen(true)}
          onToggleSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 lg:p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {activeCategory?.name || "All Tasks"}
              </h2>
              <p className="text-gray-600">
                {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
              </p>
            </div>
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              categories={categories}
              onAddTask={() => setIsTaskModalOpen(true)}
            />
          </div>
        </div>
      </main>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        categories={categories}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
};

export default MainView;