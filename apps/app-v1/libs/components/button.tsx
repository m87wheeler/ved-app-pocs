import { Pressable, PressableProps, Text, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Typography } from "./typography";

type Props = Readonly<{
  title: string;
  style?: ViewStyle;
}> &
  PressableProps;

export function Button({ title, style, ...props }: Props) {
  return (
    <Pressable {...props} style={[$styles.button, style]}>
      <Typography style={$styles.text}>{title}</Typography>
    </Pressable>
  );
}

const $styles = StyleSheet.create((_) => ({
  button: {
    paddingBlock: _.padding.sm,
    paddingInline: _.padding.md,
    borderWidth: _.border.md,
    borderRadius: _.radius.sm,
    borderColor: _.colors.brand.primary,
    backgroundColor: _.colors.brand.primary,
  },
  text: {
    color: _.colors.text.onBrand,
    fontWeight: _.fontWeight.medium,
    textAlign: "center",
  },
}));
