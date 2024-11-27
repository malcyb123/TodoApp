import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import styles from "../../Screens/MainScreen";


interface TabsProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  routes: { key: string; title: string }[];
  renderScene: any;
  allCount: number;
  activeCount: number;
  doneCount: number;
}

const Tabs: React.FC<TabsProps> = ({
  index,
  setIndex,
  routes,
  renderScene,
  allCount,
  activeCount,
  doneCount,
}) => {
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <View style={styles.tabBarContainer}>
          {props.navigationState.routes.map((route, i) => (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabItem, i === index && styles.activeTab]} // Highlight active tab
              onPress={() => setIndex(i)}
            >
              <Text style={styles.tabLabel}>{route.title}</Text>
              {/* Show the count next to the tab title */}
              <Text style={styles.tabCount}>
                {i === 0
                  ? `: ${allCount}`
                  : i === 1
                  ? `: ${activeCount}`
                  : `: ${doneCount}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    />
  );
};

export default Tabs;