import { ApiService } from "@ved-poc-monorepo/api";

export const api = new ApiService(process.env.EXPO_PUBLIC_API_URL || "");
