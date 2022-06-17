import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: ${colors.bgColor};
  border-radius: 25px;
  padding: 10px 20px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
const ButtonText = styled.Text`
  color: ${colors.accent};
  font-weight: 700;
  text-align: center;
  font-size: 16px;
`;

const AuthButton = ({ onPress, text, disabled, loading }) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? <ActivityIndicator /> : <ButtonText>{text}</ButtonText>}
    </Button>
  );
};

export default AuthButton;
