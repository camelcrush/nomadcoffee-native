import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import AuthTextLink from "../components/auth/AuthTextLink";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String
    $githubUsername: String
    $password: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      githubUsername: $githubUsername
      password: $password
    ) {
      ok
      error
    }
  }
`;

const CreateAccount = ({ navigation }) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const locationRef = useRef();
  const githubUsernameRef = useRef();
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      const { username, password } = getValues();
      navigation.navigate("Login", { username, password });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const { register, handleSubmit, setValue, watch, getValues } = useForm();
  const onNext = (onNext) => {
    onNext?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({ variables: { ...data } });
    }
  };
  useEffect(() => {
    register("username", { required: true });
    register("email", { required: true });
    register("name", { required: true });
    register("password", { required: true });
    register("location");
    register("githubUsername");
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        placeholderTextColor={colors.bgColor}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onChangeText={(text) => setValue("username", text)}
        onSubmitEditing={() => onNext(emailRef)}
      />
      <TextInput
        ref={emailRef}
        value={watch("email")}
        placeholder="Email"
        placeholderTextColor={colors.bgColor}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        keyboardType="email-address"
        onChangeText={(text) => setValue("email", text)}
        onSubmitEditing={() => onNext(nameRef)}
      />
      <TextInput
        ref={nameRef}
        value={watch("name")}
        placeholder="Name"
        placeholderTextColor={colors.bgColor}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onChangeText={(text) => setValue("name", text)}
        onSubmitEditing={() => onNext(locationRef)}
      />
      <TextInput
        ref={locationRef}
        value={watch("location")}
        placeholder="Location"
        placeholderTextColor={colors.bgColor}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onChangeText={(text) => setValue("location", text)}
        onSubmitEditing={() => onNext(githubUsernameRef)}
      />
      <TextInput
        ref={githubUsernameRef}
        value={watch("githubUsername")}
        placeholder="Github Username"
        placeholderTextColor={colors.bgColor}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(text) => setValue("githubUsername", text)}
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
        disabled={
          !watch("username") ||
          !watch("email") ||
          !watch("name") ||
          !watch("password")
        }
        loading={loading}
      />
      <AuthTextLink text="Do you have an account?" screenName="Login" />
    </AuthLayout>
  );
};

export default CreateAccount;
