import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Text,
  ImageBackground,
  Platform,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import useInput from "../hooks/userInput";

import Input from "../components/auth/Input";
import Icon from "../components/icon/Icon";
import { createExpense } from "../http/http";
import Loading from "../components/UI/Loading";
import GlobalStyles from "../util/GlobalStyles";
import { formatDate } from "../util/helpers";
import ModalContainer from "../components/modals/ModalContainer";
import Success from "../components/UI/Success";

function AddExpense({ navigation }) {
  const [pickedDate, setPickedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(formatDate(new Date()));
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    value: titleInput,
    enteredValueIsValid: titleInputIsValid,
    hasError: titleInputIsInvalid,
    valueInputChangedHandler: titleInputChangedHandler,
    valueInputBlurHandler: titleInputBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    value: amountInput,
    enteredValueIsValid: amountInputIsValid,
    hasError: amountInputIsInvalid,
    valueInputChangedHandler: amountInputChangedHandler,
    valueInputBlurHandler: amountInputBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    value: descriptionInput,
    enteredValueIsValid: descriptionInputIsValid,
    hasError: descriptionInputIsInvalid,
    valueInputChangedHandler: descriptionInputChangedHandler,
    valueInputBlurHandler: descriptionInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (titleInputIsValid && descriptionInputIsValid && amountInputIsValid) {
    formIsValid = true;
  }

  const dateChangedHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setPickedDate(currentDate);
    setFormattedDate(formatDate(currentDate));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const addHandler = async () => {
    setIsSubmitting(true);

    data = {
      title: titleInput,
      date: pickedDate,
      amount: amountInput,
      description: descriptionInput,
    };

    const res = await createExpense(data, token);

    if (res.status === "success") {
      navigation.navigate("Expenses");
      setSuccessMessage(res.message);
      setIsSubmitting(false);
      setShowModal(true);
    } else {
      Alert.alert("Updating Error", res.message);
      setIsSubmitting(false);
    }
  };
  if (isSubmitting) {
    return <Loading />;
  }
  return (
    <ImageBackground
      style={styles.screen}
      imageStyle={{ opacity: 0.2 }}
      source={require("../assets/background.jpg")}
    >
      <ScrollView>
        <KeyboardAvoidingView style={styles.form} behavior="padding">
          <Input
            label="Title"
            invalid={titleInputIsInvalid}
            textInputConfig={{
              onChangeText: titleInputChangedHandler,
              onBlur: titleInputBlurHandler,
              value: titleInput,
            }}
          />
          <View style={styles.dateContainer}>
            <Icon
              name="calendar-outline"
              color={GlobalStyles.colors.gray800}
              size={24}
              lightMode={true}
              title="Pick date"
              onPress={showDatepicker}
            />
            {show && (
              <DateTimePicker
                value={new Date(pickedDate)}
                mode="date"
                display="default"
                onChange={dateChangedHandler}
              />
            )}
            {Platform.OS === "android" && (
              <Text style={styles.date}>{formattedDate}</Text>
            )}
          </View>
          <Input
            label="Amount"
            invalid={amountInputIsInvalid}
            textInputConfig={{
              keyboardType: "number-pad",
              onChangeText: amountInputChangedHandler,
              onBlur: amountInputBlurHandler,
              value: amountInput,
            }}
          />
          <Input
            label="Description"
            invalid={descriptionInputIsInvalid}
            textInputConfig={{
              onChangeText: descriptionInputChangedHandler,
              onBlur: descriptionInputBlurHandler,
              value: descriptionInput,
              multiline: true,
            }}
          />
          <View style={styles.action}>
            <Icon
              name="add"
              title="Add Expense"
              size={32}
              color={GlobalStyles.colors.accent800}
              onPress={addHandler}
              disabled={!formIsValid}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <ModalContainer
        isVisible={showModal}
        onDismiss={() => setShowModal(false)}
      >
        <Success message={successMessage} onPress={() => setShowModal(false)} />
      </ModalContainer>
    </ImageBackground>
  );
}

export default AddExpense;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    margin: 32,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.gray800,
    borderRadius: 8,
  },
  date: {
    backgroundColor: GlobalStyles.colors.gray100,
    padding: 8,
    borderRadius: 12,
  },
  action: {
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 12,
    borderRadius: 12,
    marginTop: 48,
  },
});
