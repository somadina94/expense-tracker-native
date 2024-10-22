import { View, StyleSheet, Alert } from "react-native";
import useInput from "../hooks/userInput";
import { useState } from "react";

import Input from "../components/auth/Input";
import Button from "../components/buttons/Button";
import { forgotPassword } from "../http/http";
import ModalContainer from "../components/modals/ModalContainer";
import Loading from "../components/UI/Loading";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes("@"));

  let formIsValid = false;
  if (emailInputIsValid) {
    formIsValid = true;
  }

  const resetHandler = async () => {
    setIsSubmitting(true);

    const data = { email: emailInput };

    const res = await forgotPassword(data);
    if (res.status === "success") {
      setIsSubmitting(false);
      setShowModal(true);
    } else {
      Alert.alert("Forgot password alert", res.message);
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <Loading />;
  }

  return (
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
      <Button title="Proceed" disabled={!formIsValid} onPress={resetHandler} />
      <ModalContainer
        isVisible={showModal}
        onDismiss={() => setShowModal(false)}
      >
        <ResetPasswordForm />
      </ModalContainer>
    </View>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 16,
    marginTop: 100,
    marginHorizontal: 8,
    borderRadius: 4,
  },
});
