import React from "react";
import { Link } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const TextContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const AuthText = styled.Text`
  margin-right: 10px;
`;
const AuthLink = styled.Text`
  color: ${colors.accent};
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: ${colors.accent};
`;

const AuthTextLink = ({ text, screenName }) => (
  <TextContainer>
    <AuthText>{text}</AuthText>
    <Link to={{ screen: screenName }}>
      <AuthLink>Click</AuthLink>
    </Link>
  </TextContainer>
);

export default AuthTextLink;
