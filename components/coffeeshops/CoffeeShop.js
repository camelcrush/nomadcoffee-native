import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View``;
const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const CoffeShopBox = styled.View``;
const Name = styled.Text`
  font-weight: 600;
`;
const Location = styled.Text`
  font-size: 12px;
  color: "rgba(0,0,0,0.8)";
`;
const UserBox = styled.View``;
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
  return (
    <Container>
      <Header>
        <CoffeShopBox>
          <Name>{name}</Name>
          <Location>
            {latitude}, {longitude}
          </Location>
        </CoffeShopBox>
        <UserBox>
          <Username>{user.username}</Username>
        </UserBox>
      </Header>
      <Photo
        resizeMode="cover"
        source={{ uri: photos[0].url }}
        style={{ width, height: 250 }}
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