import { DBPromotion } from "@ved-poc-monorepo/shared";
import { Button, StyleSheet, Text, View } from "react-native";
import { api } from "../api";

type Props = Readonly<{
  memberId: string;
  promo: DBPromotion;
}>;

export function PromotionCard({ memberId, promo }: Props) {
  const { id: promoId, title, discountType, amount, validUntil, code } = promo;

  const formatDiscount = (): string => {
    if (discountType === "percentage") {
      return `${amount}% Off`;
    } else if (discountType === "fixed") {
      return `£$${amount.toFixed(2)} Off`;
    }
    return "No discount";
  };

  const handlePromptRedemption = async () => {
    // Placeholder for redemption logic
    alert(`Redeeming promotion code: ${promoId}`);

    try {
      const sessionBridge = await api.sessionBridge.create(memberId, promoId);
      if (!sessionBridge) {
        throw new Error("Failed to create session bridge");
      }

      const {
        key: sessionKey,
        memberId: sessionMemberId,
        promoId: sessionPromoId,
      } = sessionBridge ?? {};
      if (!sessionKey || !sessionMemberId || !promoId) {
        throw new Error("Invalid session bridge data");
      }

      const webUrl = new URL(process.env.EXPO_PUBLIC_WEB_ORIGIN || "");
      if (!webUrl) {
        throw new Error("Web origin URL is not defined");
      }

      webUrl.pathname = "/redeem";
      webUrl.searchParams.append("key", sessionKey);
      webUrl.searchParams.append("memberId", sessionMemberId);
      webUrl.searchParams.append("promoId", sessionPromoId);

      // Open the web URL in the browser
      alert(`Open this URL in browser to redeem: ${webUrl.toString()}`);
    } catch (error) {
      console.error("Error redeeming promotion:", error);
    }
  };

  return (
    <View style={$styles.card}>
      <Text style={$styles.title}>{title}</Text>
      <Text style={$styles.discount}>{formatDiscount()}</Text>
      <Text style={$styles.validity}>
        Valid Until: {new Date(validUntil).toDateString()}
      </Text>
      <Text style={$styles.code}>Code: {code}</Text>
      <Button title="Redeem Now" onPress={handlePromptRedemption} />
    </View>
  );
}

const $styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#d0d0d0",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  discount: {
    fontSize: 16,
    color: "#007AFF",
  },
  validity: {
    fontSize: 14,
    color: "#555555",
  },
  code: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    padding: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    textAlign: "center",
  },
});
