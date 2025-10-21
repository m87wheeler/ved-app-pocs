import {
  ScrollView as NativeScrollView,
  View as NativeView,
  StyleSheet,
  type ViewProps,
  type ScrollViewProps,
} from "react-native";

type Props = Readonly<{
  scrollable?: boolean;
}> &
  (ScrollViewProps | ViewProps);

export function ViewContainer({
  scrollable,
  children,
  style,
  ...props
}: Props) {
  if (scrollable) {
    return (
      <NativeScrollView {...props} style={[$styles.view, style]}>
        {children}
      </NativeScrollView>
    );
  }

  return (
    <NativeView {...props} style={[$styles.view, style]}>
      {children}
    </NativeView>
  );
}

const $styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 8,
  },
});
