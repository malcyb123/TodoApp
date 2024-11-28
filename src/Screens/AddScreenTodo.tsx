import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addTodo, setShouldScrollToTop } from "../redux/TodoSlice";

type RootStackParamList = {
  DisplayTodos: undefined;
  AddTodos: undefined;
};

type AddTodosProps = NativeStackScreenProps<RootStackParamList, "AddTodos">;

const AddTodos: React.FC<AddTodosProps> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();

  const addTodoHandler = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title cannot be empty");
      return;
    }

    const newTodo = {
      userId: 1, // static 1 for now
      id: new Date().getTime(), // unique ID based on current time
      title,
      completed, // toggle state for completed
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(), // Set updated_at timestamp initially the same
    };
    // to add todo to Redux store
    dispatch(addTodo(newTodo));

    // Dispatch action to scroll to top (Only when a new todo is added)
    dispatch(setShouldScrollToTop()); // No arguments needed here!

    navigation.goBack();

    // Task added alert with 0.5 sec delay
    setTimeout(() => {
      Alert.alert("Success", "Task added successfully!");
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo title"
          value={title}
          onChangeText={setTitle}
          multiline={true}
          numberOfLines={4}
        />

        {/* Toggle for Completed */}
        <View style={styles.switchContainer}>
          <Switch
            value={completed}
            onValueChange={setCompleted}
            thumbColor={completed ? "#fff" : "#333"}
            trackColor={{ false: "#ccc", true: "#333" }}
            style={styles.switch}
          />
          <Text>{completed ? "Completed" : "Not Completed"}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={addTodoHandler}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  switch: {},
  addButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddTodos;
