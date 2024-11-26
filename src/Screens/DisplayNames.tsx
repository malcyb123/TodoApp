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
import { addTodo, removeTodo } from "../redux/TodoSlice";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

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

  useEffect(() => {
    const fetchTodos = async () => {
      if (todos.length === 0) {
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
          );
          const data = await response.json();
          const first10Todos = data.slice(0, 10);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Container for userId and taskId in the same line */}
            <View style={styles.userIdTaskIdContainer}>
              <Text style={styles.userId}>{item.userId}</Text>
              <Text style={styles.taskId}>ID: {item.id}</Text>
            </View>

            {/* Task Title */}
            <View style={styles.todoHeader}>
              <Text style={styles.todoTitle}>{item.title}</Text>
            </View>

            {/* Status of the task */}
            <Text style={styles.status}>
              {item.completed ? "Completed" : "Not Completed"}
            </Text>
            {/* Delete Button */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Ionicons name="trash-bin" size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate("UpdateTodo", { todoId: item.id })
                }
              >
                <Ionicons name="pencil" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Button
        title="Add Todo"
        onPress={() => navigation.navigate("AddTodos")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

export default DisplayTodos;
