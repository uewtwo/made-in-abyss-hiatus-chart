import { Inter } from "next/font/google"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import nextI18NextConfig from "@hiatus/../next-i18next.config.js"

import { HiatusHeatmap } from "@hiatus/components/templates/HiatusHeatmap"
import { HiatusData } from "@hiatus/hooks/usePlotCalHeatmap"

import { readCsv } from "@hiatus/libs/common/csv"
import { Comic } from "@hiatus/libs/comics/comics"
import { MADE_IN_ABYSS } from "@hiatus/libs/comics/madeInAbyss"
import { DefaultMetaTag } from "@hiatus/components/templates/DefaultMetaTag"
import { OfficialSiteLink } from "@hiatus/components/templates/OfficialSiteLink"
import { RelatedLinks } from "@hiatus/components/templates/RelatedLinks"
import { i18nextNameSpaces } from "@hiatus/libs/common/translations"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ comic, hiatuses }: { comic: Comic; hiatuses: HiatusData[] }) {
  // const { locale } = useRouter()

  const linkText = "$MADE_IN_ABYSS_OFFICIAL_LINK_TEXT"
  const chartTitle = "$MADE_IN_ABYSS_CHART_TITLE"
  return (
    <>
      <DefaultMetaTag />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <HiatusHeatmap chartTitle={chartTitle} hiatuses={hiatuses} />

        <OfficialSiteLink officialSiteUrl={comic.URL} linkText={linkText} />
        <RelatedLinks comic={comic} />
      </main>
    </>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale!, i18nextNameSpaces, nextI18NextConfig)
  const comic = MADE_IN_ABYSS
  return {
    props: {
      ...translations,
      comic,
      hiatuses: await readCsv(comic.CSV_FILEPATH),
    },
  }
}
