import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import CoffeeShop from "../components/coffeeshops/CoffeeShop";
import Layout from "../components/LayOut";

const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
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

const Home = () => {
  const { data, loading, refetch, fetchMore } = useQuery(
    SEE_COFFEE_SHOPS_QUERY,
    {
      variables: {
        offset: 0,
      },
    }
  );
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const renderCoffeeShop = ({ item: coffeeShop }) => {
    return <CoffeeShop {...coffeeShop} />;
  };
  return (
    <Layout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.seeCoffeeShops?.length } })
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={{ width: "100%" }}
        data={data?.seeCoffeeShops}
        keyExtractor={(coffeeShop) => coffeeShop.id + ""}
        renderItem={renderCoffeeShop}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </Layout>
  );
};

export default Home;
