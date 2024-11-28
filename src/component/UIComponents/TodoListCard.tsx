import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TodoItem = React.memo(
  ({ item, navigation, toggleCompletion, handleDelete, styles }: any) => {
    // console.log(`Rendering TodoItem for task ID: ${item.id}`);
    return (
      <View
        style={[
          styles.card,
          { backgroundColor: item.completed ? "#d3d3d3" : "#fff" },
        ]}
      >
        <View style={styles.TaskUserContainer}>
          <Text style={styles.userId}>User ID: {item.userId}</Text>
          <Text style={styles.taskId}>Task ID: {item.id}</Text>
        </View>

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
        </View>

        <Text style={styles.timestamp}>
          Created:{" "}
          {item.created_at
            ? new Date(item.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A"}
        </Text>
        <Text style={styles.timestamp}>
          Updated:{" "}
          {item.updated_at
            ? new Date(item.updated_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A"}
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
          <View style={styles.switchContainer}>
            <Text
              style={{
                fontSize: 13,
                color: item.completed ? "#fff" : "#333",
                fontWeight: "bold",
              }}
            >
              {item.completed ? "Completed" : "Not Completed"}
            </Text>
            <Switch
              value={item.completed}
              onValueChange={() => toggleCompletion(item.id)}
              thumbColor={item.completed ? "#fff" : "#333"}
              trackColor={{ false: "#ccc", true: "#333" }}
              style={styles.switch}
            />
          </View>
          
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash" size={18} color="#fff" />
          </TouchableOpacity>
        </View>    
      </View>
      
    );
  }
);

export default TodoItem;
