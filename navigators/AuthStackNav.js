import { createStackNavigator } from "@react-navigation/stack";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";

const Stack = createStackNavigator();

const AuthStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
};

export default AuthStackNav;
