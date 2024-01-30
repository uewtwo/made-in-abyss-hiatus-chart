import { Inter } from "next/font/google"

import { HiatusHeatmap } from "@hiatus/templates/HiatusHeatmap"
import { HiatusData } from "@hiatus/hooks/usePlotCalHeatmap"

import { readCsv } from "@hiatus/libs/utils/csv"
import { Comic } from "@hiatus/libs/constants/comics"
import { MADE_IN_ABYSS } from "@hiatus/libs/constants/madeInAbyss"
import { MetaTag } from "@hiatus/templates/MetaTag"
import { OfficialSiteLink } from "@hiatus/templates/OfficialSiteLink"
import { RelatedLinks } from "@hiatus/templates/RelatedLinks"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ comic, hiatuses }: { comic: Comic; hiatuses: HiatusData[] }) {
  const title = "メイドインアビス休載グラフ"
  const description = "メイドインアビスの休載グラフです。"
  const linkText = "メイドインアビス: WEBコミック公式サイト"
  return (
    <>
      <MetaTag title={title} description={description} />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <HiatusHeatmap
          title={comic.TITLE}
          authorTwitter={comic.AUTHOR_TWITTER}
          hiatuses={hiatuses}
        />

        <OfficialSiteLink officialSiteUrl={comic.URL} linkText={linkText} />
        <RelatedLinks comic={comic} />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const comic = MADE_IN_ABYSS
  return {
    props: {
      comic,
      hiatuses: await readCsv(comic.CSV_FILEPATH),
    },
  }
}
