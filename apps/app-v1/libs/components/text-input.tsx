import {
  TextInput as NativeTextInput,
  type TextInputProps,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Props = Readonly<{}> & TextInputProps;

export function TextInput({ style, ...props }: Props) {
  return (
    <NativeTextInput
      {...props}
      autoCapitalize="none"
      style={[$styles.input, style]}
    />
  );
}

const $styles = StyleSheet.create((_) => ({
  input: {
    paddingBlock: _.padding.sm,
    paddingInline: _.padding.md,
    backgroundColor: _.colors.background.base,
    borderWidth: _.border.md,
    borderRadius: _.radius.sm,
    borderColor: _.colors.brand.primary,
    fontSize: _.fontSize.md,
    fontFamily: _.fontFamily.body,
  },
}));
