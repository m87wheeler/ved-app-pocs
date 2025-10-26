import { Link, type LinkProps } from "expo-router";
import { StyleSheet } from "react-native";

type Props = Readonly<{}> & LinkProps;

export function LinkButton({ children, style, ...rest }: Props) {
  return (
    <Link {...rest} style={[$styles.link, style]}>
      {children}
    </Link>
  );
}

const $styles = StyleSheet.create({
  link: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#229CFF",
    color: "#FFFFFF",
    fontSize: 14,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: 500,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
