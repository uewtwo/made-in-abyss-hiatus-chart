import Head from "next/head"
import { generateDefaultSeo } from "next-seo/pages"
import { useTranslation } from "next-i18next/pages"
import { defaultOrigin } from "@hiatus/libs/common/url"

/** デフォルトのロケール */
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "ja"

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
  const siteTitle = t("$MADE_IN_ABYSS_PAGE_TITLE")

  const siteDescription = t("$MADE_IN_ABYSS_PAGE_DESC")
  const canonical = buildLocalizedUrlFromLocale("/", defaultLocale)

  return (
    <Head>
      {generateDefaultSeo({
        defaultTitle: siteTitle,
        description: siteDescription,
        canonical,
        openGraph: {
          type: "website",
          locale: defaultLocale,
          url: canonical,
          site_name: siteTitle,
          title: siteTitle,
          description: siteDescription,
        },
        twitter: {
          handle: "@uewtwo",
        },
      })}
    </Head>
  )
}
