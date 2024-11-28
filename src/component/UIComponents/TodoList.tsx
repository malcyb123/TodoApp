import { useCallback, useEffect, useRef } from "react";
import TodoItem from "./TodoListCard";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Text, View } from "react-native";
import { Todo } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { resetScrollToTop } from "../../redux/TodoSlice";

const TodoList = ({
  todos,
  navigation,
  toggleCompletion,
  handleDelete,
  styles,
  isLoading,
  hasMore,
  setPage,
}: any) => {
  const dispatch = useDispatch();
  const shouldScrollToTop = useSelector(
    (state: any) => state.todos.shouldScrollToTop
  );
  const flatListRef = useRef<FlatList>(null); // Create a reference to the FlatList

  // Scroll to top when the flag is true
  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      dispatch(resetScrollToTop()); // Reset scroll state after triggering
    }
  };

  useEffect(() => {
    // If the scroll flag is set, trigger scrollToTop
    if (shouldScrollToTop) {
      scrollToTop();
    }
  }, [shouldScrollToTop]);

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => {
      return (
        <TodoItem
          item={item}
          navigation={navigation}
          toggleCompletion={toggleCompletion}
          handleDelete={handleDelete}
          styles={styles}
        />
      );
    },
    [navigation, toggleCompletion, handleDelete, styles]
  );

  return (
    <FlatList
      ref={flatListRef} // Attach ref
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={() => {
        if (hasMore && !isLoading) {
          setPage((prevPage: number) => prevPage + 1);
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoading ? (
          <View style={{ paddingVertical: 10, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#000" />
            <Text>Loading...</Text>
          </View>
        ) : null
      }
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      // Pass scrollToTop to the AddTodos screen via navigation
      extraData={scrollToTop}
    />
  );
};

export default TodoList;
