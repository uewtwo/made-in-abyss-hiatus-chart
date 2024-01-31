import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import "@hiatus/styles/globals.css"

export function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)
