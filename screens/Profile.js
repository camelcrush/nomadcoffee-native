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
import AuthStackNav from "../navigators/AuthStackNav";

const Profile = ({ navigation }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  if (!isLoggedIn) {
    return <AuthStackNav />;
  }
  return (
    <Layout>
      <Text>Profile</Text>
    </Layout>
  );
};

export default Profile;
