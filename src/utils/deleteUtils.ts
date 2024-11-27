import { Alert } from "react-native";

export const confirmDelete = (id: number, dispatch: any, removeTodo: any) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => dispatch(removeTodo(id)),
        style: "destructive",
      },
    ]);
  };
  