import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import AuthGuard from "@/domain/auth/components/authGuard";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/domain/auth/store/authStore";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getAuthorityFromToken } from "@/domain/auth/utils/getAuthorityFromToken";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const setAuthority = useAuthStore((state) => state.setAuthority);

  useEffect(() => {
    const currentToken = Cookies.get("token");

    if (currentToken) {
      const authority = getAuthorityFromToken(currentToken);
      setAuthority(authority);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
