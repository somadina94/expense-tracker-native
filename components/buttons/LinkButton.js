import { Pressable, View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../util/GlobalStyles";

function LinkButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default LinkButton;

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  text: {
    color: GlobalStyles.colors.gray800,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.4,
  },
});
