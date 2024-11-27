import React, { useEffect, useState } from "react";
import styles from "./MainScreen";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootState } from "../redux/store";
import { addTodo, removeTodo, toggleTodoCompletion } from "../redux/TodoSlice";
import { FlatList, Switch } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { countTodos, filterAndSortTodos } from "../utils/todoUtils";
import { confirmDelete } from "../utils/deleteUtils";
import Tabs from "../component/UIComponents/Tabs";
import TodoList from "../component/UIComponents/TodoListCard";
import { fetchTodosFromAPI } from "../utils/api";

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

  // Tab state
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "active", title: "Active" },
    { key: "done", title: "Done" },
  ]);

  // Sorting state
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (todos.length === 0) {
      fetchTodosFromAPI(dispatch);
    }
  }, [dispatch, todos.length]);

  const sortedAndFilteredTodos = filterAndSortTodos(
    todos,
    routes[index].key,
    sortOrder
  );

  // Get counts using the utility function

  const { allCount, activeCount, doneCount } = countTodos(todos);

  // scenes for TabView, imported from another file
  const renderScene = SceneMap({
    all: () => (
      <TodoList
        todos={todos}
        sortedAndFilteredTodos={sortedAndFilteredTodos}
        navigation={navigation}
      />
    ),
    active: () => (
      <TodoList
        todos={todos}
        sortedAndFilteredTodos={sortedAndFilteredTodos}
        navigation={navigation}
      />
    ),
    done: () => (
      <TodoList
        todos={todos}
        sortedAndFilteredTodos={sortedAndFilteredTodos}
        navigation={navigation}
      />
    ),
  });

  return (
    <View style={styles.container}>
      {/* Count to display All | Active | Done */}

      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        <Text style={styles.sortButtonText}>
          {`Sort by ID: ${
            sortOrder === "asc" ? "Show Oldest" : " Show Latest"
          }`}
        </Text>
      </TouchableOpacity>

      {/* getting tabs from utils */}
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
