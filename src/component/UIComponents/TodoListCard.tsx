import React from "react";
import { FlatList, View, Text, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { toggleTodoCompletion, removeTodo } from "../../redux/TodoSlice";

import { confirmDelete } from "../../utils/deleteUtils";
import styles from "../../Screens/MainScreen";

interface TodoListProps {
  todos: any[];
  sortedAndFilteredTodos: any[];
  navigation: any;
}

const TodoList: React.FC<TodoListProps> = ({ todos, sortedAndFilteredTodos, navigation }) => {
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    confirmDelete(id, dispatch, removeTodo);
  };

  const toggleCompletion = (id: number) => {
    dispatch(toggleTodoCompletion(id));
  };

  return (
    <FlatList
      data={sortedAndFilteredTodos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={[styles.card, { backgroundColor: item.completed ? "#d3d3d3" : "#fff" }]}>
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
    />
  );
};

export default TodoList;
