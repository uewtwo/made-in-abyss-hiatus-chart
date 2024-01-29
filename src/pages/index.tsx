import { Inter } from "next/font/google"

import { HiatusHeatmap } from "@/templates/HiatusHeatmap"
import { hiatus } from "@/hooks/usePlotCalHeatmap"

// @ts-ignore
import CalHeatmap from "cal-heatmap"
import { readCsv } from "@/libs/utils/csv"
import { FilePath } from "@/libs/constants/filePath"
import { TITLE } from "@/libs/constants/title"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ hiatuses }: { hiatuses: hiatus[] }) {
  const cal = new CalHeatmap()
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <HiatusHeatmap
        calHeatmap={cal}
        title="Made in Abyss"
        twitterAccount="@tukushiA"
        hiatuses={hiatuses}
      />
    </main>
  )
}

export async function getStaticProps() {
  return { props: { hiatuses: await readCsv(TITLE.MADE_IN_ABYSS) } }
}
