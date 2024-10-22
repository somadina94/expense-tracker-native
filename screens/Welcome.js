import { View, Text, StyleSheet, ImageBackground } from "react-native";
import GlobalStyles from "../util/GlobalStyles";

import Button from "../components/buttons/Button";
import LinkButton from "../components/buttons/LinkButton";

function Welcome({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
      resizeMode="cover"
    >
      <View style={styles.welcome}>
        <Text style={styles.text}>
          Take control of your expenses and build a better financial future.
          Manage, track, and save smarter with just a few taps.
        </Text>
        <View style={styles.actions}>
          <Button
            title="SIGN UP"
            size="small"
            onPress={() => navigation.navigate("Signup")}
          />
          <Button
            title="LOGIN"
            size="small"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <LinkButton onPress={() => navigation.navigate("Privacy")}>
          Privacy Policy
        </LinkButton>
      </View>
    </ImageBackground>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  welcome: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    justifyContent: "space-between",
  },
  text: {
    textAlign: "center",
    color: GlobalStyles.colors.gray200,
    fontSize: 28,
    marginTop: 60,
    fontStyle: "italic",
  },
  actions: {
    margin: 32,
    gap: 24,
  },
});
