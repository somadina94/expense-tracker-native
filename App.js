import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import store from "./store/store";
import { persistor } from "./store/store";
import GlobalStyles from "./util/GlobalStyles";
import { authActions } from "./store/authSlice";
import Loading from "./components/UI/Loading";
import { getMe } from "./http/http";

import Welcome from "./screens/Welcome";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import Terms from "./screens/Terms";
import Privacy from "./screens/Privacy";
// Autheticated screens
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Expenses from "./screens/Expenses";
import ExpenseDetail from "./screens/ExpenseDetail";
import Update from "./screens/Update";
import Icon from "./components/icon/Icon";
import AddExpense from "./screens/AddExpense";
import SearchExpense from "./screens/SearchExpense";
import UpdateAccount from "./screens/UpdateAccount";
import UpdatePassword from "./screens/UpdatePassword";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Sign up" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{ title: "Forgot Password" }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ title: "Terms of Service" }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{ title: "Privacy Policy" }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: GlobalStyles.colors.white900,
      }}
    >
      <Stack.Screen
        name="SettingsMenu"
        component={Settings}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="UpdateAccount"
        component={UpdateAccount}
        options={{ title: "Update Account" }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{ title: "Update Password" }}
      />
    </Stack.Navigator>
  );
}

function ExpensesStack() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: GlobalStyles.colors.white900,
      }}
    >
      <Stack.Screen
        name="Homescreen"
        component={Home}
        options={{
          title: "Home",
          headerRight: () => (
            <Icon
              name="power-outline"
              size={24}
              color="red"
              onPress={handleLogout}
              title="Logout"
            />
          ),
        }}
      />
      <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{
          title: "All Expenses",
        }}
      />
      <Stack.Screen
        name="ExpenseDetail"
        component={ExpenseDetail}
        options={{ title: "Expense Detail" }}
      />
      <Stack.Screen
        name="Update"
        component={Update}
        options={{ title: "Update Expense" }}
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{ title: "Add Expense" }}
      />
      <Stack.Screen
        name="SearchExpense"
        component={SearchExpense}
        options={{ title: "Search Expenses" }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: GlobalStyles.colors.white900,
        tabBarActiveTintColor: GlobalStyles.colors.white900,
        tabBarInactiveTintColor: GlobalStyles.colors.gray200,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ExpensesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await getMe(token);
      if (res.status === "success") {
        dispatch(authActions.refresh({ user: res.data.user }));
        setIsloading(false);
      } else {
        dispatch(authActions.logout());
        setIsloading(false);
      }
    };
    fetchMe();
  }, [token, dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {!isLoggedIn && <AuthStack />}
      {isLoggedIn && <AuthenticatedTab />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </>
  );
}
