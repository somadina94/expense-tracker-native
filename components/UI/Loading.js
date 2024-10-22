import { ActivityIndicator, StyleSheet, View } from "react-native";

import GlobalStyles from "../../util/GlobalStyles";

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.white900} />
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
