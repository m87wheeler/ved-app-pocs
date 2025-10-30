import { Text, View } from "react-native";
import { ViewContainer } from "../components/view-container";
import { LinkButton } from "../components/ui/link-button";
import { useEffect, useState } from "react";
import { api } from "../api";
import { DBMember, DBPromotion, MemberDTO } from "@ved-poc-monorepo/shared";
import { PromotionCard } from "../components/promotion-card";

export function MembershipView() {
  const { data, error, loading } = useMembershipData();

  return (
    <ViewContainer scrollable>
      <Text>MM+ Dashboard</Text>
      <LinkButton href="/">Go to Account Page</LinkButton>
      {loading || !data ? (
        <Text>Loading data...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <MembershipInfo data={data} />
      )}
    </ViewContainer>
  );
}

type MembershipInfoProps = Readonly<{
  data: DBMember;
}>;

function MembershipInfo({ data }: MembershipInfoProps) {
  return (
    <View>
      <Text>Membership Level: {data.level}</Text>
      <Text>Promotions:</Text>
      {data.promotions.length === 0 ? (
        <Text>No promotions available.</Text>
      ) : (
        data.promotions.map((promo: DBPromotion) => (
          <PromotionCard key={promo.code} promo={promo} memberId={data.email} />
        ))
      )}
    </View>
  );
}

function useMembershipData() {
  const [data, setData] = useState<DBMember | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMembership() {
      try {
        setLoading(true);
        setError(null);

        const membership = await api.member.get();
        if (!membership) {
          throw new Error("No membership data found");
        }

        setData(membership);
      } catch (error) {
        console.error("Error fetching membership data:", error);
        setError(error instanceof Error ? error : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    }
    fetchMembership();
  }, []);

  return { data, error, loading };
}
