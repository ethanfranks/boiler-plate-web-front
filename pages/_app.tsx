import { AuthProvider } from "@/components/AuthProvider";
import "@/styles/globals.css";
import darkTheme from "@/styles/themes/darkTheme";
import lightTheme from "@/styles/themes/lightTheme";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import type { AppProps } from "next/app";
import { useMemo } from "react";

interface ExtendedAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: ExtendedAppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </CssBaseline>
      </ThemeProvider>
    </CacheProvider>
  );
}
