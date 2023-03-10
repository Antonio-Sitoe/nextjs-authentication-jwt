import { AppProps } from "next/app";
import { AuthContextProvider } from "../contexts/AuthContext";

import "../global.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
