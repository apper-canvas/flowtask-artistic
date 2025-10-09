import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const categoryService = {
  getAll: async () => {
    await delay(200);
    return [...categories];
  },

  getById: async (id) => {
    await delay(200);
    const category = categories.find(c => c.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  create: async (categoryData) => {
    await delay(300);
    const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0;
    const newCategory = {
      Id: maxId + 1,
      name: categoryData.name,
      color: categoryData.color || "#6366f1",
      taskCount: 0,
      createdAt: new Date().toISOString()
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  update: async (id, categoryData) => {
    await delay(300);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return null;
    
    categories[index] = {
      ...categories[index],
      ...categoryData,
      Id: categories[index].Id,
      createdAt: categories[index].createdAt
    };
    return { ...categories[index] };
  },

  delete: async (id) => {
    await delay(300);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return false;
    
    categories.splice(index, 1);
    return true;
  },

  updateTaskCount: async (id, count) => {
    await delay(100);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return null;
    
    categories[index].taskCount = count;
    return { ...categories[index] };
  }
};

export default categoryService;