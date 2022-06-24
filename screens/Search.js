import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FlatList, Image, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import DissmissKeyboard from "../components/DissmissKeyboard";
import Layout from "../components/LayOut";

const SEARCH_COFFEESHOPS_QUERY = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      photos {
        id
        url
      }
    }
  }
`;

const KeywordInput = styled.TextInput`
  background-color: "rgba(255,255,255,1)";
  border: 1px solid ${colors.bgColor};
  width: ${(props) => props.width / 1.1}px;
  color: black;
  padding: 5px 10px;
  border-radius: 7px;
`;

const ResultMessage = styled.Text``;

const Search = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [serachCoffeeShopsQuery, { loading, data }] = useLazyQuery(
    SEARCH_COFFEESHOPS_QUERY,
    { fetchPolicy: "network-only" }
  );
  const { register, handleSubmit, setValue } = useForm();
  const onValid = ({ keyword }) => {
    serachCoffeeShopsQuery({ variables: { keyword } });
  };
  const SearchBox = () => (
    <KeywordInput
      width={width}
      placeholder="Search"
      placeholderTextColor={colors.bgColor}
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  const renderItem = ({ item: coffeeShop }) => (
    <Image
      source={{ uri: coffeeShop.photos[0].url }}
      style={{ width: width / 3, height: height / 6 }}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);
  useEffect(() => {
    register("keyword", { required: true });
  }, [register]);
  return (
    <DissmissKeyboard>
      <View style={{ flex: 1 }}>
        <Layout loading={loading}>
          {data?.searchCoffeeShops !== undefined ? (
            data?.searchCoffeeShops?.length === 0 ? (
              <ResultMessage>Not found.</ResultMessage>
            ) : (
              <FlatList
                numColumns={3}
                data={data.searchCoffeeShops}
                keyExtractor={(item) => item.id + ""}
                renderItem={renderItem}
              />
            )
          ) : null}
        </Layout>
      </View>
    </DissmissKeyboard>
  );
};

export default Search;
