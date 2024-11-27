import { addTodo } from "../redux/TodoSlice";

// utils/apiUtils.ts
export const fetchTodosFromAPI = async (dispatch: any) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      const first10Todos = data.slice(0, 100);
      first10Todos.forEach((todo: any) => {
        dispatch(addTodo(todo));
      });
    } catch (error) {
      console.error("Error fetching todos from API", error);
    }
  };
  