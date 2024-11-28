import { useCallback } from "react";
import TodoItem from "./TodoListCard";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Todo } from "../../utils/types";

const TodoList = ({ todos, navigation, toggleCompletion, handleDelete, styles, isLoading, hasMore, setPage }: any) => {
    const renderItem = useCallback(({ item }: { item: Todo }) => {
        // console.log(`Rendering item in TodoList for task ID: ${item.id}`);
        return (
          <TodoItem
            item={item}
            navigation={navigation}
            toggleCompletion={toggleCompletion}
            handleDelete={handleDelete}
            styles={styles}
          />
        );
      }, [navigation, toggleCompletion, handleDelete, styles]);
      
  
    return (
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => {
          if (hasMore && !isLoading) {
            setPage((prevPage: number) => prevPage + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <Text>Loading...</Text> : null}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    );
  };
  
  export default TodoList;