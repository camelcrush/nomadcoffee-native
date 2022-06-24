import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View``;
const Header = styled.View`
  padding: 5px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const CoffeShopBox = styled.TouchableOpacity``;
const Name = styled.Text`
  font-weight: 600;
`;
const Location = styled.Text`
  font-size: 12px;
  color: "rgba(0,0,0,0.8)";
`;
const UserBox = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 25px;
  height: 25px;
  background-color: black;
  border-radius: 20px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
`;
const Photo = styled.Image``;
const Bottom = styled.View`
  padding: 10px;
`;
const CategoriesBox = styled.View`
  width: 100%;
`;
const Category = styled.Text`
  color: ${colors.accent};
  margin-right: 10px;
`;

const CoffeeShop = ({
  id,
  name,
  latitude,
  longitude,
  user,
  photos,
  categories,
}) => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const goToScreen = () => {
    navigation.navigate("SeeCoffeeShop", {
      id,
      name,
    });
  };
  return (
    <Container>
      <Header>
        <CoffeShopBox onPress={goToScreen}>
          <Name>{name}</Name>
          <Location>
            {latitude}, {longitude}
          </Location>
        </CoffeShopBox>
        <UserBox>
          <Avatar source={{ uri: user.avatarUrl }} />
          <Username>{user.username}</Username>
        </UserBox>
      </Header>
      <Photo
        resizeMode="cover"
        source={{ uri: photos[0].url }}
        style={{ width, height: height / 3 }}
      />
      <Bottom>
        <CategoriesBox>
          <Category>
            {categories.map((category) => `${category.name}  `)}
          </Category>
        </CategoriesBox>
      </Bottom>
    </Container>
  );
};

export default CoffeeShop;
