import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    tabBarContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#000",
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    countContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      paddingHorizontal: 5,
    },
    countText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
    tabItem: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: "white",
    },
    tabLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
    tabCount: {
      fontSize: 16,
      color: "white",
      marginLeft: 5,
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
  
    SortCountcontainer: { flex: 1, padding: 10 },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
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
      color: "#444",
      alignSelf: "flex-start",
    },
    taskId: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#666",
      alignSelf: "flex-end",
    },
    todoTitle: {
      fontSize: 18,
      fontWeight: "bold",
      flex: 1,
      color: "#000",
    },
    status: {
      fontSize: 14,
      marginTop: 8,
      color: "#444",
    },
    actionButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    deleteButton: {
      backgroundColor: "#000",
      padding: 10,
      borderRadius: 8,
    },
    editButton: {
      backgroundColor: "#000",
      padding: 10,
      borderRadius: 8,
    },
    addTodoButtonContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    addTodoButton: {
      backgroundColor: "#000",
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },
    addTodoButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    sortButton: {
      backgroundColor: "#000",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 10,
    },
    sortButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    tabBar: {
      backgroundColor: "#000",
    },
    labelStyle: {
      color: "#fff",
      fontSize: 16,
    },
    indicatorStyle: {
      backgroundColor: "#fff",
    },
    timestamp: {
      fontSize: 12,
      color: "#666",
      marginTop: 5,
    },
  });

  export default styles