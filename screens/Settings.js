import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Icon from "../components/icon/Icon";
import GlobalStyles from "../util/GlobalStyles";

function Settings({ navigation }) {
  return (
    <ImageBackground
      style={styles.screen}
      source={require("../assets/details-bg.jpg")}
    >
      <View style={styles.nav}>
        <Icon
          name="person-outline"
          title="Update Account"
          size={24}
          color={GlobalStyles.colors.white900}
          onPress={() => navigation.navigate("UpdateAccount")}
        />
        <Icon
          name="key-outline"
          title="Update Password"
          size={24}
          color={GlobalStyles.colors.white900}
          onPress={() => navigation.navigate("UpdatePassword")}
        />
      </View>
    </ImageBackground>
  );
}

export default Settings;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary800,
    margin: 12,
    borderRadius: 12,
    padding: 12,
  },
});
