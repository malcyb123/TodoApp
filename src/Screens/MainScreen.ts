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
    fontSize: 14,
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
    fontSize: 14,
    color: "white",
    marginLeft: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 12,
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
    marginBottom: 5,
  },
  userIdTaskIdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  TaskUserContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10
  },
  userId: {
    fontSize: 12,
    color: "#333",
  },
  taskId: {
    fontSize: 12,
    color: "#333",
    textAlign: "right",
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "#000",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20, 
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  switch: {
    marginLeft: 10,
  },
  status: {
    fontSize: 12,
    marginRight: 10,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#28231D", 
    padding: 12,  
    borderRadius: 8,
    justifyContent: "center",  
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#28231D",
    padding: 12,  
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addTodoButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0, 
    justifyContent: "center",
    alignItems: "center"
  },
  addTodoButton: {
    width: 56,
    height: 56,
    borderRadius: 28, 
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
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
  timestampContainer: {
    marginTop: 10, 
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "#666", 
    marginBottom: 5, 
  },
  
});

export default styles;
