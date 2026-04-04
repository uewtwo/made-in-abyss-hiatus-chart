import type { UserConfig } from "next-i18next/pages"

const config: UserConfig = {
  i18n: {
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "ja",
    locales: (process.env.NEXT_PUBLIC_SUPPORTED_LOCALES_SEPARATE_BY_COMMA || "ja").split(","),
  },
}

export default config
