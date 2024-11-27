
export type Todo = {
    userId: number;
    id: string;
    title: string;
    completed: boolean;
  };

  export interface TabsProps {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    routes: { key: string; title: string }[];
    renderScene: any;
    allCount: number;
    activeCount: number;
    doneCount: number;
  };

  export interface TodoListProps {
    todos: any[];
    sortedAndFilteredTodos: any[];
    navigation: any;
  }
  
  