import { DefaultSeo } from "next-seo"
import { useTranslation } from "next-i18next"

/** サポートするロケール */
const supportedLocales = (
  process.env.NEXT_PUBLIC_SUPPORTED_LOCALES_SEPARATE_BY_COMMA ?? "ja"
).split(",")
/** デフォルトのロケール */
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "ja"
/** オリジン */
const defaultOrigin = process.env.NEXT_PUBLIC_FRONTEND_ORIGIN ?? "http://localhost:3001"

/**
 * ロケールとパスからURLを生成する。
 * ロケールがデフォルトの場合、ロケールを省略する。
 * パスが/の場合も省略する。
 */
function buildLocalizedUrlFromLocale(path: string, locale: string): string {
  return `${defaultOrigin}${locale === defaultLocale ? "" : `/${locale}`}${
    path === "/" ? "" : path
  }`
}

export const DefaultMetaTag: React.FC = () => {
  const { t } = useTranslation("metaTag")
  // const { t } = useTranslation("metaTag")
  const siteTitle = t("$MADE_IN_ABYSS_PAGE_TITLE")

  const siteDescription = t("$MADE_IN_ABYSS_PAGE_DESC")
  const canonical = buildLocalizedUrlFromLocale("/", defaultLocale)

  return (
    <DefaultSeo
      defaultTitle={siteTitle}
      description={siteDescription}
      canonical={canonical}
      openGraph={{
        type: "website",
        locale: defaultLocale,
        url: canonical,
        site_name: siteTitle,
        title: siteTitle,
        description: siteDescription,
      }}
      twitter={{
        handle: "@uewtwo",
      }}
    />
  )
}
