import { Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import TabsNav from "./navigators/TabsNav";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontsPromise = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.jpg")];
    const imagesPromise = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontsPromise, ...imagesPromise]);
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <TabsNav />
      </NavigationContainer>
    </ApolloProvider>
  );
}
