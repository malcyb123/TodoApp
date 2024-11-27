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
    const fetchTodos = async () => {
      if (todos.length === 0) {
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
          );
          const data = await response.json();
          const first10Todos = data.slice(0, 100);

          first10Todos.forEach((todo: any) => {
            dispatch(addTodo(todo));
          });
        } catch (error) {
          console.error("Error fetching todos from API", error);
        }
      }
    };

    fetchTodos();
  }, [dispatch, todos.length]);

  const handleDelete = (id: number) => {
    // Confirm before deleting the todo
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => dispatch(removeTodo(id)), // Dispatch delete action
        style: "destructive",
      },
    ]);
  };

  const toggleCompletion = (id: number) => {
    dispatch(toggleTodoCompletion(id));
  };

  const getFilteredAndSortedTodos = (status: string, order: "asc" | "desc") => {
    // Creating a copy of the original todos card to avoid mutation
    let filteredTodos = [...todos]; // Spread syntax creates a shallow copy of todos

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

    // Sort the filtered todos, but now it's done on the copied array, not the original one
    return filteredTodos.sort((a, b) => {
      return order === "asc" ? a.id - b.id : b.id - a.id;
    });
  };

  const sortedAndFilteredTodos = getFilteredAndSortedTodos(
    routes[index].key,
    sortOrder
  );

  // Calculate counts for all | active | done
  const allCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const doneCount = todos.filter((todo) => todo.completed).length;

  // Rendering the FlatList based on the selected tab using TabView
  const renderTodoList = (todos: any[]) => {
    return (
      <FlatList
        data={sortedAndFilteredTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: item.completed ? "#d3d3d3" : "#fff" }, // Light gray when completed
            ]}
          >
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
              <Switch
                value={item.completed}
                onValueChange={() => toggleCompletion(item.id)}
              />
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
                onPress={() =>
                  navigation.navigate("UpdateTodo", { todoId: item.id })
                }
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
      />
    );
  };

  // scenes for TabView
  const renderScene = SceneMap({
    all: renderTodoList,
    active: renderTodoList,
    done: renderTodoList,
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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <View style={styles.tabBarContainer}>
            {props.navigationState.routes.map((route, i) => (
              <TouchableOpacity
                key={route.key}
                style={[
                  styles.tabItem,
                  i === index && styles.activeTab, // Highlight active tab
                ]}
                onPress={() => setIndex(i)}
              >
                <Text style={styles.tabLabel}>{route.title}</Text>
                {/* Show the count next to the tab title */}
                <Text style={styles.tabCount}>
                  {i === 0
                    ? `: ${allCount}`
                    : i === 1
                    ? `: ${activeCount}`
                    : `: ${doneCount}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
