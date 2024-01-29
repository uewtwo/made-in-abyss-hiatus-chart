import { Inter } from "next/font/google"

import { HiatusHeatmap } from "@hiatus/templates/HiatusHeatmap"
import { HiatusData } from "@hiatus/hooks/usePlotCalHeatmap"

import { readCsv } from "@hiatus/libs/utils/csv"
import { Comic } from "@hiatus/libs/constants/comics"
import { MADE_IN_ABYSS } from "@hiatus/libs/constants/madeInAbyss"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ comic, hiatuses }: { comic: Comic; hiatuses: HiatusData[] }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <HiatusHeatmap title={comic.TITLE} authorTwitter={comic.AUTHOR_TWITTER} hiatuses={hiatuses} />
    </main>
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
