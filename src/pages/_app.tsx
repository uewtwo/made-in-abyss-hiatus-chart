import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@hiatus/styles/globals.css"

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default appWithTranslation(App)
