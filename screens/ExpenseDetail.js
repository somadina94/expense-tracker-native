import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";

import { formatAmount, formatDate } from "../util/helpers";
import GlobalStyles from "../util/GlobalStyles";
import Icon from "../components/icon/Icon";
import { deleteExpense } from "../http/http";
import Loading from "../components/UI/Loading";
import ModalContainer from "../components/modals/ModalContainer";
import Success from "../components/UI/Success";

function ExpenseDetail({ route, navigation }) {
  const { expense } = route.params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const deleteHandler = async () => {
    setIsSubmitting(true);

    const res = await deleteExpense(expense._id, token);
    if (!res.message) {
      setSuccessMessage("Expense deleted successfully");
      setShowModal(true);
      setIsSubmitting(false);
    } else {
      Alert.alert("Deleting Error", res.message);
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <Loading />;
  }
  return (
    <ImageBackground
      style={styles.screen}
      source={require("../assets/details-bg.jpg")}
    >
      <ScrollView style={styles.screen}>
        <View style={styles.content}>
          <Text style={styles.heading}>Title</Text>
          <Text style={styles.title}>{expense.title}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.heading}>Date</Text>
          <Text style={styles.date}>{formatDate(expense.date)}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.heading}>Amount</Text>
          <Text>#{formatAmount(expense.amount)}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.heading}>Description</Text>
          <Text>{expense.description}</Text>
        </View>
        <View style={styles.action}>
          <Icon
            name="reload-outline"
            size={24}
            color={GlobalStyles.colors.white900}
            title="Update"
            onPress={() => navigation.navigate("Update", { expense })}
          />
          <Icon
            name="trash-outline"
            size={24}
            color={GlobalStyles.colors.white900}
            title="Delete"
            onPress={deleteHandler}
          />
        </View>
      </ScrollView>
      <ModalContainer
        isVisible={showModal}
        onDismiss={() => setShowModal(false)}
      >
        <Success
          message={successMessage}
          onPress={() => navigation.navigate("Expenses")}
        />
      </ModalContainer>
    </ImageBackground>
  );
}

export default ExpenseDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    gap: 12,
    margin: 16,
    padding: 12,
    ...GlobalStyles.elevated,
    backgroundColor: GlobalStyles.colors.gray200,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 32,
    padding: 12,
    gap: 6,
    backgroundColor: GlobalStyles.colors.primary800,
    margin: 12,
    borderRadius: 12,
  },
});
