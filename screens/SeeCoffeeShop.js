import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components";
import CoffeeShop from "../components/coffeeshops/CoffeeShop";
import Layout from "../components/LayOut";

const SEE_COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      latitude
      longitude
      user {
        id
        username
        avatarUrl
      }
      photos(offset: 0) {
        id
        url
      }
      categories {
        id
        name
      }
    }
  }
`;

const Container = styled.View`
  flex: 1;
`;

const SeeCoffeeShop = ({ navigation, route }) => {
  const { data, loading } = useQuery(SEE_COFFEE_SHOP_QUERY, {
    variables: { id: route?.params?.id },
  });
  useEffect(() => {
    if (route?.params?.name) {
      navigation.setOptions({
        headerTitle: `${route?.params?.name}`,
      });
    }
  }, [data]);
  return (
    <Container>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <CoffeeShop {...data?.seeCoffeeShop} />
      )}
    </Container>
  );
};

export default SeeCoffeeShop;
