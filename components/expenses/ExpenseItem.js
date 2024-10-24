import { Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GlobalStyles from "../../util/GlobalStyles";
import { formatDate, formatAmount } from "../../util/helpers";

function ExpenseItem({ expense }) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => navigation.navigate("ExpenseDetail", { expense })}
    >
      <Text style={styles.text}>{expense.title}</Text>
      <Text style={styles.text}>{formatDate(expense.date)}</Text>
      <Text style={styles.text}>#{formatAmount(expense.amount)}</Text>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: GlobalStyles.colors.gray200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 8,
    borderRadius: 12,
    height: 84,
    ...GlobalStyles.elevated,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: GlobalStyles.colors.gray800,
  },
  pressed: {
    ...GlobalStyles.pressed,
  },
});
