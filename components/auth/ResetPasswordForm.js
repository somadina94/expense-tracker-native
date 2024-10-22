import { View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import useInput from "../../hooks/userInput";
import { useDispatch } from "react-redux";

import Input from "./Input";
import Button from "../buttons/Button";
import Loading from "../UI/Loading";
import { resetPassword } from "../../http/http";
import { authActions } from "../../store/authSlice";

function ResetPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const {
    value: tokenInput,
    enteredValueIsValid: tokenInputIsValid,
    hasError: tokenInputIsInvalid,
    valueInputChangedHandler: tokenInputChangedHandler,
    valueInputBlurHandler: tokenInputBlurHandler,
    reset: tokenInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: passwordInput,
    enteredValueIsValid: passwordInputIsValid,
    hasError: passwordInputIsInvalid,
    valueInputChangedHandler: passwordInputChangedHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: passwordConfirmInput,
    enteredValueIsValid: passwordConfirmInputIsValid,
    hasError: passwordConfirmInputIsInvalid,
    valueInputChangedHandler: passwordConfirmInputChangedHandler,
    valueInputBlurHandler: passwordConfirmInputBlurHandler,
    reset: passwordConfirmInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    tokenInputIsValid &&
    passwordInputIsValid &&
    passwordConfirmInputIsValid
  ) {
    formIsValid = true;
  }

  const resetHandler = async () => {
    setIsSubmitting(true);

    const data = {
      token: tokenInput,
      password: passwordInput,
      passwordConfirm: passwordConfirmInput,
    };

    const res = await resetPassword(data);

    if (res.status === "success") {
      dispatch(authActions.login({ user: res.data.user, token: res.token }));
      setIsSubmitting(false);
    } else {
      Alert.alert("Password reset alert", res.message);
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <Loading />;
  }
  return (
    <View style={styles.form}>
      <Input
        label="Reset token"
        invalid={tokenInputIsInvalid}
        textInputConfig={{
          onChangeText: tokenInputChangedHandler,
          onBlur: tokenInputBlurHandler,
          value: tokenInput,
          placeholder: "000000",
        }}
      />
      <Input
        label="Password"
        invalid={passwordInputIsInvalid}
        textInputConfig={{
          onChangeText: passwordInputChangedHandler,
          onBlur: passwordInputBlurHandler,
          value: passwordInput,
          placeholder: "***************",
        }}
      />
      <Input
        label="Confirm password"
        invalid={passwordConfirmInputIsInvalid}
        textInputConfig={{
          onChangeText: passwordConfirmInputChangedHandler,
          onBlur: passwordConfirmInputBlurHandler,
          value: passwordConfirmInput,
          placeholder: "***************",
        }}
      />
      <Button
        title="Reset Password"
        disabled={!formIsValid}
        onPress={resetHandler}
      />
    </View>
  );
}

export default ResetPasswordForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 16,
    marginTop: 100,
    marginHorizontal: 8,
    borderRadius: 4,
  },
});
