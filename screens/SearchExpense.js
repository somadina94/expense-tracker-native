import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";

import { getAllExpenses } from "../http/http";
import Loading from "../components/UI/Loading";
import Icon from "../components/icon/Icon";
import GlobalStyles from "../util/GlobalStyles";
import { formatDate, formatAmount } from "../util/helpers";
import ExpenseItem from "../components/expenses/ExpenseItem";

function renderExpensesItem(itemData) {
  return <ExpenseItem expense={itemData.item} />;
}

function SearchExpense() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const [formattedDate, setFormattedDate] = useState(formatDate(new Date()));
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const showStartDatepicker = () => {
    setShowStart(true);
  };

  const showEndDatepicker = () => {
    setShowEnd(true);
  };

  const startDateChangedHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowStart(Platform.OS === "ios");
    setStartDate(currentDate);
    // setFormattedDate(formatDate(currentDate));
  };

  const endDateChangedHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEnd(Platform.OS === "ios");
    setEndDate(currentDate);
    // setFormattedDate(formatDate(currentDate));
  };

  const getExpensesHandler = async () => {
    setIsSubmitting(true);

    const res = await getAllExpenses(token);

    if (res.status === "success") {
      const filteredExpenses = res.data.expenses.filter(
        (el) =>
          new Date(el.date) > new Date(startDate) &&
          new Date(el.date) < new Date(endDate)
      );
      setExpenses(filteredExpenses);
      setIsSubmitting(false);
    } else {
      Alert.alert("Error", "Error getting expenses");
      setIsSubmitting(false);
    }
  };

  const totalAmount = expenses
    ?.map((el) => el.amount)
    .reduce((acc, curr) => acc + curr, 0);

  const sortedExpenses = expenses.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <ImageBackground
      style={styles.screen}
      source={require("../assets/details-bg.jpg")}
    >
      <View style={styles.screen}>
        <View style={styles.container}>
          <Icon
            name="calendar-outline"
            size={24}
            color={GlobalStyles.colors.white900}
            title="Start"
            onPress={showStartDatepicker}
          />
          {showStart && (
            <DateTimePicker
              value={new Date(startDate)}
              mode="date"
              display="default"
              onChange={startDateChangedHandler}
            />
          )}
          {Platform.OS === "android" && (
            <Text style={styles.date}>{formatDate(startDate)}</Text>
          )}
        </View>
        <View style={styles.container}>
          <Icon
            name="calendar-outline"
            size={24}
            color={GlobalStyles.colors.white900}
            title="End"
            onPress={showEndDatepicker}
          />
          {showEnd && (
            <DateTimePicker
              value={new Date(endDate)}
              mode="date"
              display="default"
              onChange={endDateChangedHandler}
            />
          )}
          {Platform.OS === "android" && (
            <Text style={styles.date}>{formatDate(endDate)}</Text>
          )}
        </View>
        <View>
          <Icon
            name="search"
            size={48}
            color={GlobalStyles.colors.white900}
            title="Search Expenses"
            onPress={getExpensesHandler}
          />
        </View>
        {expenses.length === 0 && (
          <View style={styles.fallbackContainer}>
            <Text style={styles.fallback}>
              No expense found between dates specified
            </Text>
          </View>
        )}
        {expenses.length > 0 && !isSubmitting && (
          <View style={{ height: 300 }}>
            <FlatList
              data={sortedExpenses}
              keyExtractor={(item) => item._id}
              renderItem={renderExpensesItem}
            />
          </View>
        )}
        {isSubmitting && <Loading />}
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>#{formatAmount(totalAmount)}</Text>
      </View>
    </ImageBackground>
  );
}

export default SearchExpense;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 12,
    backgroundColor: GlobalStyles.colors.primary800,
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: "800",
    color: GlobalStyles.colors.gray800,
  },
  list: {
    margin: 12,
    height: 100,
    backgroundColor: "white",
  },

  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary800,
    margin: 12,
    borderRadius: 12,
    justifyContent: "space-around",
    height: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: "800",
    color: GlobalStyles.colors.white900,
  },
  fallbackContainer: {
    flex: 1,
    paddingTop: 200,
  },
  fallback: {
    fontSize: 16,
    color: GlobalStyles.colors.gray200,
    textAlign: "center",
  },
});
