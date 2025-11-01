import { View, type ViewProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Props = Readonly<{
  background?: "brand";
  close?: "top" | "bottom" | "all";
  inline?: "center" | "start" | "end";
  block?: "center" | "start" | "end";
}> &
  ViewProps;

export function Section({
  background,
  close,
  inline,
  block,
  style,
  children,
  ...props
}: Props) {
  $styles.useVariants({ background, close, inline, block });

  return (
    <View style={[$styles.section, style]} {...props}>
      {children}
    </View>
  );
}

const $styles = StyleSheet.create((_) => ({
  section: {
    paddingBlock: _.padding.lg,
    paddingInline: _.padding.md,
    variants: {
      background: {
        brand: {
          backgroundColor: _.colors.brand.primary,
        },
        default: {
          backgroundColor: "transparent",
        },
      },
      close: {
        top: {
          paddingTop: 0,
        },
        bottom: {
          paddingBottom: 0,
        },
        all: {
          paddingInline: 0,
        },
      },
      inline: {
        center: {
          alignItems: "center",
        },
        start: {
          alignItems: "flex-start",
        },
        end: {
          alignItems: "flex-end",
        },
      },
      block: {
        center: {
          justifyContent: "center",
        },
        start: {
          justifyContent: "flex-start",
        },
        end: {
          justifyContent: "flex-end",
        },
        default: {
          justifyContent: "flex-start",
        },
      },
    },
  },
}));
