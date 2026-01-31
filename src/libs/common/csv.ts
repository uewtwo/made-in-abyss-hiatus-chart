import fs from "fs"
import csv from "csv-parser"

import { HiatusData } from "@hiatus/hooks/usePlotCalHeatmap"
import { ComicCsvFilePath } from "@hiatus/libs/comics/comics"

export type { HiatusData }

const csvHeaders = ["year", "month", "hiatus", "episode"] as const
export async function readCsv(path: ComicCsvFilePath): Promise<HiatusData[]> {
  // toJsonとかを指定できるようにしたら偉い
  const hiatuses: HiatusData[] = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv({ skipLines: 1, headers: csvHeaders }))
      .on("data", (data: HiatusData) => {
        hiatuses.push(data)
      })
      .on("end", () => {
        // sortとかしたら偉い
        resolve(hiatuses)
      })
      .on("error", (error) => {
        reject(error)
      })
  })
}

export async function writeCsv(path: ComicCsvFilePath, data: HiatusData[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(path)
    writer.on("finish", () => {
      resolve()
    })
    writer.on("error", (error) => {
      reject(error)
    })
    writer.write(csvHeaders.join(",") + "\n")
    data.forEach((item) => {
      writer.write(`${item.year},${item.month},${item.hiatus},${item.episode}\n`)
    })
    writer.end()
  })
}
