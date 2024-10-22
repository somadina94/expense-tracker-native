import { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import useInput from "../../hooks/userInput";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import Input from "./Input";
import Button from "../buttons/Button";
import LinkButton from "../buttons/LinkButton";
import { loginUser } from "../../http/http";
import { authActions } from "../../store/authSlice";
import Loading from "../UI/Loading";

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: passwordInput,
    enteredValueIsValid: passwordInputIsValid,
    hasError: passwordInputIsInvalid,
    valueInputChangedHandler: passwordInputChangedHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (emailInputIsValid && passwordInputIsValid) {
    formIsValid = true;
  }

  async function loginHandler() {
    setIsSubmitting(true);
    const data = {
      email: emailInput,
      password: passwordInput,
    };

    const res = await loginUser(data);
    if (res.status === "success") {
      dispatch(authActions.login({ user: res.data.user, token: res.token }));
    } else {
      Alert.alert("Authentication failed", res.message);
    }
    setIsSubmitting(false);
    emailInputReset();
    passwordInputReset();
  }

  if (isSubmitting) {
    return <Loading />;
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <Input
            label="Email address"
            invalid={emailInputIsInvalid}
            textInputConfig={{
              onChangeText: emailInputChangedHandler,
              onBlur: emailInputBlurHandler,
              value: emailInput,
              placeholder: "john@example.com",
            }}
          />
          <Input
            label="Password"
            invalid={passwordInputIsInvalid}
            textInputConfig={{
              onChangeText: passwordInputChangedHandler,
              onBlur: passwordInputBlurHandler,
              value: passwordInput,
              placeholder: "password",
              secureTextEntry: true,
            }}
          />
          <View style={styles.btnLinkContainer}>
            <LinkButton onPress={() => navigation.navigate("forgotPassword")}>
              Forgot password?
            </LinkButton>
          </View>
          <Button
            onPress={loginHandler}
            title="Login"
            disabled={!formIsValid}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 16,
    marginTop: 100,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  btnLinkContainer: {
    marginVertical: 8,
  },
});
