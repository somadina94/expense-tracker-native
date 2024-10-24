import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../../util/GlobalStyles";

function Icon({ title, name, size, color, onPress, lightMode, disabled }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.icon, pressed && styles.pressed]}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons name={name} size={size} color={color} />
      <Text style={[styles.title, lightMode && styles.darkTitle]}>{title}</Text>
    </Pressable>
  );
}

export default Icon;

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    gap: 4,
  },
  title: {
    color: GlobalStyles.colors.secondry800,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.5,
  },
  darkTitle: {
    color: GlobalStyles.colors.gray800,
  },
});
