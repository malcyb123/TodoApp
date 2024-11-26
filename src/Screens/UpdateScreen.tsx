import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Switch, Text } from "react-native";
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
      <TextInput
        style={styles.input}
        placeholder="Edit todo title"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.switchContainer}>
        <Text>Completed</Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default UpdateTodo;
