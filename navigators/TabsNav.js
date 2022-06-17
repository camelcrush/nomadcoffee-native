import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import { colors } from "../colors";

const Tabs = createBottomTabNavigator();

const TabsNav = () => (
  <Tabs.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.accent,
      tabBarShowLabel: false,
      tabBarLabelStyle: false,
      tabBarStyle: {
        borderTopColor: "rgba(0,0,0,0.5)",
      },
    }}
  >
    <Tabs.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="search-outline" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="person-outline" color={color} size={size} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export default TabsNav;
