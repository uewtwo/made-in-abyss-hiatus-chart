import { Inter } from "next/font/google"
import dynamic from "next/dynamic"

import fs from "fs"
import csv from "csv-parser"
import { HiatusHeatmap, hiatus } from "@/components/HiatusHeatmap"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ hiatuses }: { hiatuses: hiatus[] }) {
  useEffect(() => {})

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <HiatusHeatmap hiatuses={hiatuses} />
    </main>
  )
}

export async function getStaticProps() {
  const hiatuses: hiatus[] = []

  return new Promise((resolve, reject) => {
    fs.createReadStream("public/made-in-abyss-hiatus.csv")
      .pipe(csv())
      .on("data", (data: hiatus) => {
        hiatuses.push(data)
      })
      .on("end", () => {
        resolve({ props: { hiatuses } })
      })
      .on("error", (error) => {
        reject(error)
      })
  })
}
