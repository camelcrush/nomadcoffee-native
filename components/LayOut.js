import React from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";
import DissmissKeyboard from "./DissmissKeyboard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
`;

const Layout = ({ children, loading }) => {
  return <Container>{loading ? <ActivityIndicator /> : children}</Container>;
};

export default Layout;
