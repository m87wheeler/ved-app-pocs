import { useAuthStore } from "@/libs/stores/auth-store";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";
import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { api } from "@/libs/api";
import { QueryKeys } from "@/libs/api/query-keys";
import { Typography } from "@/libs/components/typography";
import { useLoadFonts } from "@/libs/hooks/use-load-fonts";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { loaded: fontsLoaded } = useLoadFonts();

  const { isAuthenticated, isPlusMember } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isPlusMember: state.isPlusMember,
    }))
  );

  return (
    <AppProviders>
      <AppContent
        fontsLoaded={fontsLoaded}
        isAuthenticated={isAuthenticated}
        isPlusMember={isPlusMember}
      />
    </AppProviders>
  );
}

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

type AppContentProps = Readonly<{
  fontsLoaded?: boolean;
  isAuthenticated: boolean;
  isPlusMember: boolean;
}>;

function AppContent({
  fontsLoaded,
  isAuthenticated,
  isPlusMember,
}: AppContentProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.HEALTHCHECK,
    queryFn: () => api.healthcheck(),
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError || !data) return <Typography>Service Unavailable</Typography>;
  if (!fontsLoaded) return <Typography>Loading Fonts...</Typography>;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* auth */}
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)/sign-in" />
        </Stack.Protected>

        {/* account */}
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(protected)" />

          {/* membership account */}
          <Stack.Protected guard={isPlusMember}>
            <Stack.Screen name="(protected)/(member)" />
          </Stack.Protected>
        </Stack.Protected>
      </Stack>
    </SafeAreaView>
  );
}
