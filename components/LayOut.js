import React from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children, loading }) => {
  return <Container>{loading ? <ActivityIndicator /> : children}</Container>;
};

export default Layout;
