import fs from "fs"
import csv from "csv-parser"
import { FilePath } from "@/libs/constants/filePath"
import { TITLE } from "@/libs/constants/title"

export async function readCsv<T extends Record<string, string | number>>(
  path: keyof typeof TITLE
): Promise<T[]> {
  const hiatuses: T[] = []
  const filePath: (typeof FilePath)[keyof typeof FilePath] = FilePath[path]

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: T) => {
        hiatuses.push(data)
      })
      .on("end", () => {
        resolve(hiatuses)
      })
      .on("error", (error) => {
        reject(error)
      })
  })
}

export async function writeCsv<T extends Record<string, string | number>>(
  path: (typeof FilePath)[keyof typeof FilePath],
  data: T[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(path)
    // TODO writerちゃんと書く、データ型もちゃんと書く、エピソードいくつかと日付だけで良いはず
    writer.write("year,month,episode\n")
    data.forEach((datum) => {
      writer.write(`${datum.year},${datum.month},${datum.episode}\n`)
    })
    writer.end()
    resolve()
  })
}
