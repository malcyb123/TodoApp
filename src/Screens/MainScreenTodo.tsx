import React, { useCallback, useEffect, useRef, useState } from "react";
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
import axios from 'axios';

// Constants
const ITEM_PER_PAGE = 10;
const TOTAL_ITEMS = 200;
const ON_END_REACHED_THRESHOLD = 0.8;

type RootStackParamList = {
  DisplayTodos: undefined;
  AddTodos: undefined;
  UpdateTodo: { todoId: number };
};

type DisplayTodosProps = NativeStackScreenProps<RootStackParamList, "DisplayTodos">;

const DisplayTodos: React.FC<DisplayTodosProps> = ({ navigation }) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const initialRender = useRef(true); // Ref to track the initial render

  // Tab state
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "active", title: "Active" },
    { key: "done", title: "Done" },
  ]);

  // Sorting state
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const sortedAndFilteredTodos = filterAndSortTodos(todos, routes[index].key, sortOrder);

  // Count todos using utility function
  const { allCount, activeCount, doneCount } = countTodos(todos);

  // Handle delete and toggle completion
  const handleDelete = (id: number) => {
    confirmDelete(id, dispatch, removeTodo);
  };

  const toggleCompletion = (id: number) => {
    dispatch(toggleTodoCompletion(id));
  };

  // Define the renderScene function
  const renderScene = ({ route }: any) => {
    // Filter todos based on the current tab
    const filteredTodos = filterAndSortTodos(todos, route.key, sortOrder);

    return (
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.completed ? "#d3d3d3" : "#fff" }]}>
            {/* Task ID - top-left corner */}
            <Text style={styles.taskId}>Task ID: {item.id}</Text>

            {/* User ID - top-right corner */}
            <Text style={styles.userId}>User ID: {item.userId}</Text>

            <View style={styles.todoHeader}>
              <Text
                style={{
                  color: item.completed ? "#6c757d" : "#212529",
                  fontSize: 18,
                  fontWeight: "bold",
                  flex: 1,
                }}
              >
                {item.title}
              </Text>
              <Switch value={item.completed} onValueChange={() => toggleCompletion(item.id)} />
            </View>
            <Text style={styles.status}>
              {item.completed ? "Completed" : "Not Completed"}
            </Text>
            <Text style={styles.timestamp}>
              Created At: {new Date(item.created_at).toLocaleString()}
            </Text>
            <Text style={styles.timestamp}>
              Updated At: {new Date(item.updated_at).toLocaleString()}
            </Text>

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate("UpdateTodo", { todoId: item.id })}
              >
                <Ionicons name="pencil" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Ionicons name="trash" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        onEndReached={() => {
          if (hasMore && !isLoading) {
            setPage((prevPage) => prevPage + 1);
          }
        }}
        onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
        ListFooterComponent={isLoading ? <Text>Loading...</Text> : null}
        initialNumToRender={10} // Render only 10 items initially
        maxToRenderPerBatch={10} // Render 10 items per batch
        windowSize={5} 

        
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Count to display All | Active | Done */}
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        <Text style={styles.sortButtonText}>
          {`Sort by ID: ${sortOrder === "asc" ? "Show Oldest" : "Show Latest"}`}
        </Text>
      </TouchableOpacity>

      {/* Tabs */}
      <Tabs
        index={index}
        setIndex={setIndex}
        routes={routes}
        renderScene={renderScene} // Pass renderScene function here
        allCount={allCount}
        activeCount={activeCount}
        doneCount={doneCount}
      />

      {/* Add Todo Button */}
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
