import { useState, useEffect } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import useInput from "../hooks/userInput";

import Loading from "../components/UI/Loading";
import Success from "../components/UI/Success";
import Input from "../components/auth/Input";
import Button from "../components/buttons/Button";
import ModalContainer from "../components/modals/ModalContainer";
import { updatePassword } from "../http/http";

function UpdatePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {
    value: passwordCurrentInput,
    enteredValueIsValid: passwordCurrentInputIsValid,
    hasError: passwordCurrentInputIsInvalid,
    valueInputChangedHandler: passwordCurrentInputChangedHandler,
    valueInputBlurHandler: passwordCurrentInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

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
    passwordCurrentInputIsValid &&
    passwordInputIsValid &&
    passwordConfirmInputIsValid
  ) {
    formIsValid = true;
  }

  if (isSubmitting) {
    return <Loading />;
  }

  const submitHandler = async () => {
    setIsSubmitting(true);

    const data = {
      passwordCurrent: passwordCurrentInput,
      password: passwordInput,
      passwordConfirm: passwordConfirmInput,
    };

    const res = await updatePassword(data, token);
    if (res.status === "success") {
      setSuccessMessage(res.message);
      setShowModal(true);
      setIsSubmitting(false);
    } else {
      Alert.alert("Update Error", res.message);
      setIsSubmitting(false);
    }
  };
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen}>
        <View style={styles.form}>
          <Input
            label="Current Password"
            invalid={passwordCurrentInputIsInvalid}
            textInputConfig={{
              onChangeText: passwordCurrentInputChangedHandler,
              onBlur: passwordCurrentInputBlurHandler,
              value: passwordCurrentInput,
              secureTextEntry: true,
            }}
          />
          <Input
            label="New Password"
            invalid={passwordInputIsInvalid}
            textInputConfig={{
              onChangeText: passwordInputChangedHandler,
              onBlur: passwordInputBlurHandler,
              value: passwordInput,
              secureTextEntry: true,
            }}
          />
          <Input
            label="Confirm New Password"
            invalid={passwordConfirmInputIsInvalid}
            textInputConfig={{
              onChangeText: passwordConfirmInputChangedHandler,
              onBlur: passwordConfirmInputBlurHandler,
              value: passwordConfirmInput,
              secureTextEntry: true,
            }}
          />
          <Button
            onPress={submitHandler}
            title="Update Password"
            disabled={!formIsValid}
          />
        </View>
        <ModalContainer
          isVisible={showModal}
          onDismiss={() => setShowModal(false)}
        >
          <Success
            message={successMessage}
            onPress={() => setShowModal(false)}
          />
        </ModalContainer>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default UpdatePassword;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    margin: 24,
  },
});
