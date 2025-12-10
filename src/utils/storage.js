// 本地存储工具函数

export const saveTodos = (todos) => {
  try {
    localStorage.setItem("crush_todos", JSON.stringify(todos));
  } catch (error) {
    console.error("保存便签失败:", error);
  }
};

export const loadTodos = () => {
  try {
    const data = localStorage.getItem("crush_todos");
    if (data) {
      const todos = JSON.parse(data);
      return Array.isArray(todos) ? todos : [];
    }
  } catch (error) {
    console.error("加载便签失败:", error);
  }
  return [];
};
