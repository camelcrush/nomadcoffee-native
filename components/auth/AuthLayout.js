import React from "react";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import DissmissKeyboard from "../DissmissKeyboard";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  margin: 0 auto;
`;

const AuthLayout = ({ children }) => {
  return (
    <DissmissKeyboard>
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%", alignItems: "center" }}
          behavior="padding"
          keyboardVerticalOffset={50}
        >
          <Logo
            source={require("../../assets/logo.jpg")}
            resizeMode="contain"
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DissmissKeyboard>
  );
};

export default AuthLayout;
