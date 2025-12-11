import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";

import GlobalStyles from "../../util/GlobalStyles";
import Loading from "../UI/Loading";
import { getAllExpenses } from "../../http/http";
import { useSelector } from "react-redux";
import { formatAmount } from "../../util/helpers";
import { useIsFocused } from "@react-navigation/native";

function Summary() {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const focused = useIsFocused();

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await getAllExpenses(token);
      if (res.status === "success") {
        setExpenses(res.data.expenses);
        setIsSubmitting(false);
      } else {
        Alert.alert("Expenses Eroor", "Error fetching data");
        setIsSubmitting(false);
      }
    };
    fetchExpenses();
  }, [token, setIsSubmitting, focused]);

  const expensesAmounts = expenses.map((el) => el.amount);

  const totalAmount = expensesAmounts.reduce((acc, curr) => acc + curr, 0);

  if (isSubmitting) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expenses Summary</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Total number of Expenses</Text>
        <Text style={styles.value}>{expenses.length}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Total amount</Text>
        <Text style={styles.value}>#{formatAmount(totalAmount)}</Text>
      </View>
    </View>
  );
}

export default Summary;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: GlobalStyles.colors.primary800light,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    margin: 12,
    borderRadius: 16,
    gap: 48,
    padding: 16,
    ...GlobalStyles.elevated,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.white900,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.white900,
  },
  content: {
    alignItems: "center",
    gap: 24,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.white900,
  },
});
