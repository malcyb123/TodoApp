import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  Switch,
} from "react-native";
import { useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  addTodo,
  setShouldScrollToTop,
} from "../redux/TodoSlice";

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
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter todo title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Toggle for Completed */}
      <View style={styles.switchContainer}>
        <Text>Completed: </Text>
        <Switch
          value={completed}
          onValueChange={setCompleted} // Updating the state when toggled
        />
      </View>

      <Button title="Add Todo" onPress={addTodoHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default AddTodos;
