import { SignInForm } from "../components/sign-in-form";
import { Typography } from "../components/typography";
import { Section } from "../components/section";
import { VirginGiftsLogoWhite } from "../icons/logo";
import Constants from "expo-constants";
import { StyleSheet } from "react-native-unistyles";

export function SignInView() {
  return (
    <Section background="brand" block="center" style={{ flex: 1 }}>
      <Section inline="center">
        <VirginGiftsLogoWhite width={200} />
      </Section>
      <Section inline="center">
        <Typography tag="h4" color="on-brand">
          Sign In To Your Account
        </Typography>
      </Section>
      <Section>
        <SignInForm />
      </Section>
      <AppVersion />
    </Section>
  );
}

function AppVersion() {
  const version = Constants.manifest2?.runtimeVersion || null;
  if (!version) return null;
  return (
    <Typography color="on-brand" style={$styles.version}>
      Version {version}
    </Typography>
  );
}

const $styles = StyleSheet.create({
  version: {
    marginTop: "auto",
    alignSelf: "center",
  },
});
