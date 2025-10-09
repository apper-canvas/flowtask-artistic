import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const taskService = {
  getAll: async () => {
    await delay(300);
    return [...tasks];
  },

  getById: async (id) => {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  getByCategory: async (categoryId) => {
    await delay(300);
    return tasks.filter(t => t.categoryId === categoryId.toString()).map(t => ({ ...t }));
  },

  create: async (taskData) => {
    await delay(300);
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      categoryId: taskData.categoryId || "1",
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  update: async (id, taskData) => {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index] = {
      ...tasks[index],
      ...taskData,
      Id: tasks[index].Id,
      createdAt: tasks[index].createdAt
    };
    return { ...tasks[index] };
  },

  toggleComplete: async (id) => {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index].completed = !tasks[index].completed;
    tasks[index].completedAt = tasks[index].completed ? new Date().toISOString() : null;
    return { ...tasks[index] };
  },

  delete: async (id) => {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  },

  search: async (query) => {
    await delay(200);
    const lowerQuery = query.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(lowerQuery) || 
      t.description.toLowerCase().includes(lowerQuery)
    ).map(t => ({ ...t }));
  },

  filterByStatus: async (status) => {
    await delay(200);
    if (status === "all") return [...tasks];
    if (status === "active") return tasks.filter(t => !t.completed).map(t => ({ ...t }));
    if (status === "completed") return tasks.filter(t => t.completed).map(t => ({ ...t }));
    return [...tasks];
  },

  filterByPriority: async (priority) => {
    await delay(200);
    if (priority === "all") return [...tasks];
    return tasks.filter(t => t.priority === priority).map(t => ({ ...t }));
  }
};

export default taskService;