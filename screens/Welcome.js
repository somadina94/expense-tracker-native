import { View, Text, StyleSheet, ImageBackground } from "react-native";
import GlobalStyles from "../util/GlobalStyles";

import Button from "../components/buttons/Button";
import LinkButton from "../components/buttons/LinkButton";
import Icon from "../components/icon/Icon";

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
          <Icon
            name="person-add-outline"
            title="SIGN UP"
            size={48}
            color={GlobalStyles.colors.white900}
            onPress={() => navigation.navigate("Signup")}
          />
          <Icon
            name="power-outline"
            title="LOGIN"
            size={48}
            color="green"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={styles.privacy}>
          <LinkButton onPress={() => navigation.navigate("Privacy")}>
            Privacy Policy
          </LinkButton>
        </View>
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
    margin: 12,
    gap: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 12,
  },
  privacy: {
    marginBottom: 24,
  },
});
