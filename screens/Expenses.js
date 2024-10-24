import {
  Alert,
  FlatList,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import { getAllExpenses } from "../http/http";
import Loading from "../components/UI/Loading";
import ExpenseItem from "../components/expenses/ExpenseItem";
import GlobalStyles from "../util/GlobalStyles";

function renderExtenseItem(itemData) {
  return <ExpenseItem expense={itemData.item} />;
}

function Expenses() {
  const [expeses, setExpenses] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const focused = useIsFocused();

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await getAllExpenses(token);
      if (res.status === "success") {
        setExpenses(res.data.expenses);
        setIsSubmitting(false);
      } else {
        Alert.alert("Expenses Error", res.message);
        setIsSubmitting(false);
      }
    };
    fetchExpenses();
  }, [token, setIsSubmitting, focused]);

  if (isSubmitting) {
    return <Loading />;
  }

  const sortedExpenses = expeses.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  if (expeses.length === 0) {
    return (
      <ImageBackground
        style={styles.fallbackContainer}
        source={require("../assets/details-bg.jpg")}
      >
        <Text style={styles.fallback}>
          You have not registered any expense yet.
        </Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      style={styles.screen}
      source={require("../assets/details-bg.jpg")}
    >
      <FlatList
        style={styles.screen}
        keyExtractor={(item) => item._id}
        data={sortedExpenses}
        renderItem={renderExtenseItem}
      />
    </ImageBackground>
  );
}

export default Expenses;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
