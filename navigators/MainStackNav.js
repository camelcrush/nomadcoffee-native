import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import SeeCoffeeShop from "../screens/SeeCoffeeShop";

const Stack = createStackNavigator();

const MainStackNav = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: "rgba(0,0,0,0.8)",
    }}
  >
    <Stack.Screen
      name="TabsNav"
      component={TabsNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="SeeCoffeeShop" component={SeeCoffeeShop} />
  </Stack.Navigator>
);

export default MainStackNav;
