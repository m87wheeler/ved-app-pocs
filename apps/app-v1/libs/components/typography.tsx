import { Text, type TextProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Props = Readonly<{
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";
  color?: "brand" | "on-brand";
}> &
  TextProps;

export function Typography({
  tag = "body",
  color,
  children,
  style,
  ...props
}: Props) {
  $styles.useVariants({ tag, color: color === "on-brand" ? "onBrand" : color });

  return (
    <Text style={[$styles.typography, style]} {...props}>
      {children}
    </Text>
  );
}

const $styles = StyleSheet.create((_) => ({
  typography: {
    fontFamily: _.fontFamily.heading,
    variants: {
      tag: {
        h1: {
          fontSize: _.fontSize._5xl,
          lineHeight: _.lineHeight._5xl.heading,
          fontWeight: _.fontWeight.bold,
        },
        h2: {
          fontSize: _.fontSize._4xl,
          lineHeight: _.lineHeight._4xl.heading,
          fontWeight: _.fontWeight.bold,
        },
        h3: {
          fontSize: _.fontSize._3xl,
          lineHeight: _.lineHeight._3xl.heading,
          fontWeight: _.fontWeight.semibold,
        },
        h4: {
          fontSize: _.fontSize._2xl,
          lineHeight: _.lineHeight._2xl.heading,
          fontWeight: _.fontWeight.semibold,
        },
        h5: {
          fontSize: _.fontSize.xl,
          lineHeight: _.lineHeight.xl.heading,
          fontWeight: _.fontWeight.medium,
        },
        h6: {
          fontSize: _.fontSize.lg,
          lineHeight: _.lineHeight.lg.heading,
          fontWeight: _.fontWeight.medium,
        },
        body: {
          fontFamily: _.fontFamily.body,
          fontSize: _.fontSize.md,
          lineHeight: _.lineHeight.md.body,
          fontWeight: _.fontWeight.regular,
        },
      },
      color: {
        brand: {
          color: _.colors.text.primary,
        },
        onBrand: {
          color: _.colors.text.onBrand,
        },
      },
    },
  },
}));
