import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  created_at: string;  
  updated_at: string; 
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = {
          ...action.payload,
          updated_at: new Date().toISOString(), // Update the updated_at timestamp only
        };
      }
    },
    toggleTodoCompletion(state, action: PayloadAction<number>) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { setTodos, addTodo, toggleTodoCompletion, removeTodo, updateTodo  } = todosSlice.actions;
export default todosSlice.reducer;
