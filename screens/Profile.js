import React, { useEffect, useRef } from "react";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { Text, View } from "react-native";
import { isLoggedInVar, logUserIn } from "../apollo";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";
import Layout from "../components/LayOut";
import { colors } from "../colors";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Profile = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, setValue, watch } = useForm();
  const onNext = (onNext) => {
    onNext?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      loginMutation({ variables: { ...data } });
    }
  };
  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);
  if (isLoggedIn) {
    return (
      <Layout>
        <Text>Profile</Text>
      </Layout>
    );
  } else {
    return (
      <AuthLayout>
        <TextInput
          value={watch("username")}
          placeholder="Username"
          placeholderTextColor={colors.bgColor}
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => setValue("username", text)}
          onSubmitEditing={() => onNext(passwordRef)}
        />
        <TextInput
          ref={passwordRef}
          value={watch("password")}
          placeholder="Password"
          placeholderTextColor={colors.bgColor}
          secureTextEntry
          returnKeyType="done"
          onChangeText={(text) => setValue("password", text)}
          onSubmitEditing={handleSubmit(onValid)}
        />
        <AuthButton
          onPress={handleSubmit(onValid)}
          text="Login"
          disabled={!watch("username") || !watch("password")}
          loading={loading}
        />
      </AuthLayout>
    );
  }
};

export default Profile;
