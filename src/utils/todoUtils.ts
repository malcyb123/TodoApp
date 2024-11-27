
export const filterAndSortTodos = (
    todos: any[],
    status: string,
    order: "asc" | "desc"
  ) => {
    let filteredTodos = [...todos];
  
    // Apply filtering based on status
    switch (status) {
      case "active":
        filteredTodos = filteredTodos.filter((todo) => !todo.completed);
        break;
      case "done":
        filteredTodos = filteredTodos.filter((todo) => todo.completed);
        break;
      default:
        break;
    }
  
    // Sort the filtered todos
    return filteredTodos.sort((a, b) => {
      return order === "asc" ? a.id - b.id : b.id - a.id;
    });
  };
  
  export const countTodos = (todos: any[]) => {
    const allCount = todos.length;
    const activeCount = todos.filter((todo) => !todo.completed).length;
    const doneCount = todos.filter((todo) => todo.completed).length;
  
    return { allCount, activeCount, doneCount };
  };
  