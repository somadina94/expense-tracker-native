import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "../icon/Icon";
import GlobalStyles from "../../util/GlobalStyles";

function ExpenseMenu() {
  const navigation = useNavigation();
  return (
    <View style={styles.menu}>
      <Icon
        name="cash-outline"
        size={24}
        color={GlobalStyles.colors.white900}
        title="All Expenses"
        onPress={() => navigation.navigate("Expenses")}
      />
      <Icon
        name="add-circle-outline"
        size={24}
        color={GlobalStyles.colors.white900}
        title="Add Expense"
        onPress={() => navigation.navigate("AddExpense")}
      />
      <Icon
        name="calendar-outline"
        size={24}
        color={GlobalStyles.colors.white900}
        title="View by date"
        onPress={() => navigation.navigate("SearchExpense")}
      />
    </View>
  );
}

export default ExpenseMenu;

const styles = StyleSheet.create({
  menu: {
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary800,
    flexDirection: "row",
    margin: 12,
    borderRadius: 16,
    justifyContent: "space-between",
  },
});
