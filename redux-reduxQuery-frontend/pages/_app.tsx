import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { store } from "@/domain/store";
import { Provider } from "react-redux";
import { Setup } from "@/domain/setup";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Setup>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Setup>
    </Provider>
  );
}
