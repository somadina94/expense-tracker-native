import { Text, TextInput, View, StyleSheet } from "react-native";
import GlobalStyles from "../../util/GlobalStyles";

function Input({ label, invalid, style, textInputConfig, disabled }) {
  const textInputStyles = [styles.textInput, style];
  const labelStyles = [styles.label];

  if (invalid) {
    textInputStyles.push(styles.invalidInput);
    labelStyles.push(styles.invalidLabel);
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={labelStyles}>{label}</Text>
      <TextInput
        placeholderTextColor={GlobalStyles.colors.gray200}
        style={[textInputStyles]}
        {...textInputConfig}
        editable={disabled}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.gray800,
    marginBottom: 4,
  },
  textInput: {
    color: GlobalStyles.colors.gray800,
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.gray800,
    borderRadius: 4,
    height: 32,
    paddingHorizontal: 4,
  },
  invalidInput: {
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.error800,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error800,
  },
});
