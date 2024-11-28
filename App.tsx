import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import DisplayTodos from "./src/Screens/MainScreenTodo";
import AddTodos from "./src/Screens/AddScreenTodo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import UpdateTodo from "./src/Screens/UpdateScreen";

type RootStackParamList = {
  DisplayTodos: undefined;
  AddTodos: undefined;
  UpdateTodo: { todoId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="DisplayTodos">
            <Stack.Screen name="DisplayTodos" component={DisplayTodos} />
            <Stack.Screen name="AddTodos" component={AddTodos} />
            <Stack.Screen name="UpdateTodo" component={UpdateTodo} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
