import { View, StyleSheet, ImageBackground } from "react-native";
import ExpenseMenu from "../components/menu/ExpenseMenu";
import Summary from "../components/body/Summary";

function Home() {
  return (
    <ImageBackground
      style={styles.screen}
      source={require("../assets/details-bg.jpg")}
    >
      <ExpenseMenu />
      <Summary />
    </ImageBackground>
  );
}

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-around",
  },
});
