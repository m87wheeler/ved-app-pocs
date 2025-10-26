import { Text } from "react-native";
import { ViewContainer } from "../components/view-container";
import { LinkButton } from "../components/ui/link-button";

export function AccountView() {
  return (
    <ViewContainer scrollable>
      <Text>Account Page</Text>
      <Text>This is our first test PR</Text>
      <LinkButton href="/membership">I Have A Membership</LinkButton>
    </ViewContainer>
  );
}
