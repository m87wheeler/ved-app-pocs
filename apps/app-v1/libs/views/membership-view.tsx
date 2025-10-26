import { Text } from "react-native";
import { ViewContainer } from "../components/view-container";
import { LinkButton } from "../components/ui/link-button";
import { useEffect } from "react";
import { api } from "../api";

export function MembershipView() {
  useEffect(() => {
    async function fetchMembership() {
      try {
        const membership = await api.member.get("martin@test.com");
        console.log("Membership data:", membership);
      } catch (error) {
        console.error("Error fetching membership data:", error);
      }
    }
    fetchMembership();
  }, []);

  return (
    <ViewContainer scrollable>
      <Text>MM+ Dashboard</Text>
      <LinkButton href="/">Go to Account Page</LinkButton>
    </ViewContainer>
  );
}
