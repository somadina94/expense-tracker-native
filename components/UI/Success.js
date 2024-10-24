import { View, StyleSheet } from "react-native";

import Icon from "../icon/Icon";
import GlobalStyles from "../../util/GlobalStyles";

function Success({ message, onPress }) {
  return (
    <View style={styles.screen}>
      <View>
        <Icon
          name="checkmark-circle-outline"
          size={120}
          color={GlobalStyles.colors.accent800}
          title={message}
        />
      </View>
      <Icon
        name="arrow-forward-circle-outline"
        size={48}
        color={GlobalStyles.colors.gray200}
        title="Done"
        onPress={onPress}
      />
    </View>
  );
}

export default Success;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    paddingTop: 100,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  success: {
    alignSelf: "center",
  },
  confirm: {},
});
