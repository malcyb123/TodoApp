import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addTodo, removeTodo, toggleTodoCompletion } from "../redux/TodoSlice";
import { confirmDelete } from "../utils/deleteUtils";
import { countTodos, filterAndSortTodos } from "../utils/todoUtils";
import { TodoListProps } from "../utils/types";
import styles from "./MainScreen"; // Assuming styles are imported from a separate file
import Tabs from "../component/UIComponents/Tabs";
import axios from "axios";
import TodoList from "../component/UIComponents/TodoList";

// Constants
const ITEM_PER_PAGE = 10;
const TOTAL_ITEMS = 200;
const ON_END_REACHED_THRESHOLD = 0.8;

type RootStackParamList = {
  DisplayTodos: undefined;
  AddTodos: undefined;
  UpdateTodo: { todoId: number };
};

type DisplayTodosProps = NativeStackScreenProps<
  RootStackParamList,
  "DisplayTodos"
>;

const DisplayTodos: React.FC<DisplayTodosProps> = ({ navigation }) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  console.log("Current Todos:", todos); // Log todos state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //kya pata why memonize styles
  const memoizedStyles = useMemo(() => styles, [styles]);

  const initialRender = useRef(true);

  const scrollRef = useRef<FlatList>(null);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "active", title: "Active" },
    { key: "done", title: "Done" },
  ]);

  // Sorting state
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"id" | "userId">("id"); // Default sorting by ID

  // Fetch data using axios and handle pagination
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${ITEM_PER_PAGE}&_page=${page}`
      );
      data.forEach((todo: any) => {
        dispatch(addTodo(todo));
      });
      if (data.length < ITEM_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching todos from API", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (hasMore) {
      fetchData();
    }
  }, [fetchData, hasMore]);

  useEffect(() => {
    if (todos.length === 0) {
      fetchData(); // Fetch initial data
    }
  }, [todos.length, fetchData]);

  useEffect(() => {
    console.log(
      "DisplayTodos re-rendered due to changes in todos or page:",
      todos,
      page
    );
  }, [todos, page]); // Log when `todos` or `page` changes

  const sortedAndFilteredTodos = filterAndSortTodos(
    todos,
    routes[index].key,
    sortOrder
  );

  // Count todos using utility function
  const { allCount, activeCount, doneCount } = countTodos(todos);

  const handleDelete = useCallback(
    (id: number) => {
      confirmDelete(id, dispatch, removeTodo);
    },
    [dispatch]
  );

  const toggleCompletion = (id: number) => {
    console.log(`Toggling completion for todo with id: ${id}`);
    dispatch(toggleTodoCompletion(id));
  };

  // Define the renderScene function
  const renderScene = useCallback(
    ({ route }: any) => {
      const filteredTodos = filterAndSortTodos(todos, route.key, sortOrder);
      return (
        <TodoList
          todos={filteredTodos}
          navigation={navigation}
          toggleCompletion={toggleCompletion}
          handleDelete={handleDelete}
          styles={styles}
          isLoading={isLoading}
          hasMore={hasMore}
          setPage={setPage}
        />
      );
    },
    [
      todos,
      sortOrder,
      toggleCompletion,
      handleDelete,
      isLoading,
      hasMore,
      setPage,
      navigation,
    ]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        <Text style={styles.sortButtonText}>
          {`Sort by ID: ${sortOrder === "asc" ? "Show Oldest" : "Show Latest"}`}
        </Text>
      </TouchableOpacity>

      <Tabs
        index={index}
        setIndex={setIndex}
        routes={routes}
        renderScene={renderScene}
        allCount={allCount}
        activeCount={activeCount}
        doneCount={doneCount}
      />

      <View style={styles.addTodoButtonContainer}>
        <TouchableOpacity
          style={styles.addTodoButton}
          onPress={() => navigation.navigate("AddTodos")}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DisplayTodos;
