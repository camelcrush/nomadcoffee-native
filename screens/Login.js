import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import AuthTextLink from "../components/auth/AuthTextLink";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = ({ route: { params } }) => {
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
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
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
      <AuthTextLink
        text="Don't you have an account?"
        screenName="CreateAccount"
      />
    </AuthLayout>
  );
};

export default Login;
