import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootState } from "../redux/store";
import { addTodo, removeTodo, toggleTodoCompletion } from "../redux/TodoSlice";
import { FlatList, Switch } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap } from "react-native-tab-view";

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

  const filterTodos = (status: string) => {
    switch (status) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "done":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  // Sort the todos based on ID (asc or desc)
  const sortTodos = (todos: any[], order: "asc" | "desc") => {
    // Creating a shallow copy of the todos array before sorting
    const sortedTodos = [...todos];

    return sortedTodos.sort((a, b) => {
      if (order === "asc") {
        return a.id - b.id; // Ascending order
      } else {
        return b.id - a.id; // Descending order
      }
    });
  };

  const filteredTodos = filterTodos(routes[index].key);
  const sortedTodos = sortTodos(filteredTodos, sortOrder);

  // Calculate counts for all | active | done
  const allCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const doneCount = todos.filter((todo) => todo.completed).length;

  // Rendering the FlatList based on the selected tab using TabView
  const renderTodoList = () => {
    const filteredTodos = filterTodos(routes[index].key);
    return (
      <FlatList
        data={sortedTodos}
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
      <View style={styles.countContainer}>
        <Text style={styles.countText}>All: {allCount}</Text>
        <Text style={styles.countText}>Active: {activeCount}</Text>
        <Text style={styles.countText}>Done: {doneCount}</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 300 }}
      />

      <Button
        title={`Sort by ID: ${
          sortOrder === "asc" ? "Ascending" : "Descending - Show Latest"
        }`}
        onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      />

      {/* Add Todo Button */}
      <TouchableOpacity
        style={styles.addTodoButton}
        onPress={() => navigation.navigate("AddTodos")}
      >
        <Text style={styles.addTodoButtonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  countText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
  },
  todoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userIdTaskIdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  userId: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
    alignSelf: "flex-start",
  },
  taskId: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#888",
    alignSelf: "flex-end",
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  status: {
    fontSize: 14,
    marginTop: 8,
    color: "#555",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },
  addTodoButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  addTodoButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
});

export default DisplayTodos;
