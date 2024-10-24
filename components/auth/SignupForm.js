import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import useInput from "../../hooks/userInput";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import Input from "./Input";
import Button from "../buttons/Button";
import GlobalStyles from "../../util/GlobalStyles";
import LinkButton from "../buttons/LinkButton";
import { authActions } from "../../store/authSlice";
import { signupUser } from "../../http/http";
import Loading from "../UI/Loading";

function SignupForm() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    value: firstNameInput,
    enteredValueIsValid: firstNameInputIsValid,
    hasError: firstNameInputIsInvalid,
    valueInputChangedHandler: firstNameInputChangedHandler,
    valueInputBlurHandler: firstNameInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: lastNameInput,
    enteredValueIsValid: lastNameInputIsValid,
    hasError: lastNameInputIsInvalid,
    valueInputChangedHandler: lastNameInputChangedHandler,
    valueInputBlurHandler: lastNameInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: passwordInput,
    enteredValueIsValid: passwordInputIsValid,
    hasError: passwordInputIsInvalid,
    valueInputChangedHandler: passwordInputChangedHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: passwordConfirmInput,
    enteredValueIsValid: passwordConfirmInputIsValid,
    hasError: passwordConfirmInputIsInvalid,
    valueInputChangedHandler: passwordConfirmInputChangedHandler,
    valueInputBlurHandler: passwordConfirmInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    firstNameInputIsValid &&
    lastNameInputIsValid &&
    emailInputIsValid &&
    passwordInputIsValid &&
    passwordConfirmInputIsValid
  ) {
    formIsValid = true;
  }

  async function signupHandler() {
    setIsSubmitting(true);

    const data = {
      name: `${firstNameInput.trim()} ${lastNameInput.trim()}`,
      email: emailInput.trim(),
      password: passwordInput,
      passwordConfirm: passwordConfirmInput,
    };

    const res = await signupUser(data);
    if (res.status === "success") {
      dispatch(authActions.login({ user: res.data.user, token: res.token }));
    } else {
      Alert.alert("Sign up error", res.message);
    }
    setIsSubmitting(false);
  }

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <Input
            label="First name"
            invalid={firstNameInputIsInvalid}
            textInputConfig={{
              onChangeText: firstNameInputChangedHandler,
              onBlur: firstNameInputBlurHandler,
              value: firstNameInput,
              placeholder: "John",
            }}
          />
          <Input
            label="Last name"
            invalid={lastNameInputIsInvalid}
            textInputConfig={{
              onChangeText: lastNameInputChangedHandler,
              onBlur: lastNameInputBlurHandler,
              value: lastNameInput,
              placeholder: "Doe",
            }}
          />
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
          <Input
            label="Confirm password"
            invalid={passwordConfirmInputIsInvalid}
            textInputConfig={{
              onChangeText: passwordConfirmInputChangedHandler,
              onBlur: passwordConfirmInputBlurHandler,
              value: passwordConfirmInput,
              placeholder: "password",
              secureTextEntry: true,
            }}
          />
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By clicking Sign up, you agree to our Terms and Conditions
            </Text>
            <LinkButton onPress={() => navigation.navigate("Terms")}>
              Terms and Conditions
            </LinkButton>
          </View>
          <View style={styles.btnContainer}>
            <Button
              disabled={!formIsValid}
              onPress={signupHandler}
              title="Sign up"
            >
              Sign up
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 16,
    marginVertical: 32,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  btnContainer: {
    marginTop: 24,
  },
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    color: GlobalStyles.colors.gray800,
    textAlign: "center",
    fontSize: 12,
  },
});
