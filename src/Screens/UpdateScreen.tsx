import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Switch, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateTodo } from "../redux/TodoSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    DisplayTodos: undefined;
    UpdateTodo: { todoId: number }; 
};

type UpdateTodoProps = NativeStackScreenProps<RootStackParamList, "UpdateTodo">;

const UpdateTodo: React.FC<UpdateTodoProps> = ({ route, navigation }) => {
  const { todoId } = route.params;
  const dispatch = useDispatch();

  const todo = useSelector((state: RootState) =>
    state.todos.todos.find((item) => item.id === todoId)
  );

  const [title, setTitle] = useState(todo?.title || "");
  const [completed, setCompleted] = useState(todo?.completed || false);

  const handleSave = () => {
    if (todo) {
      const updatedTodo = {
        ...todo,  // added new fields for created and updated in interface Todo. It was giving error hence added the spread
        id: todo.id,
        userId: todo.userId,
        title,
        completed,
        updated_at: new Date().toISOString(),
      };
      dispatch(updateTodo(updatedTodo));
      navigation.goBack(); 
    }
  };

  useEffect(() => {
    if (!todo) {
      navigation.goBack();
    }
  }, [todo, navigation]);

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
        onPress={handleSave}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>Update Todo</Text>
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

export default UpdateTodo;
