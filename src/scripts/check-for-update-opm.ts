import axios from "axios"
import iconv from "iconv-lite"
import { parse } from "node-html-parser"
import { readCsv, writeCsv, HiatusData } from "../libs/common/csv"
import { Comics } from "../libs/comics/comics"

type Update = {
  episode: string
  publishedDate: Date
}

async function getUpdate() {
  const comic = Comics.ONE_PUNCH_MAN

  // Fetch the page with Shift-JIS encoding
  const response = await axios.get(comic.URL, {
    responseType: "arraybuffer",
  })

  // Convert Shift-JIS to UTF-8
  const html = iconv.decode(Buffer.from(response.data), "Shift-JIS")
  const parsedHtml = parse(html)
  if (!parsedHtml) return

  // Extract update information: "2025年10月30日 156話更新"
  const updateText = parsedHtml.querySelector("body")?.text
  if (!updateText) return

  // Match pattern: YYYY年MM月DD日 NNN話更新
  const updateMatch = updateText.match(/(\d{4})年(\d{1,2})月(\d{1,2})日\s+(\d+)話更新/)
  if (!updateMatch) return

  const [, year, month, day, episode] = updateMatch
  const publishedDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  )

  return {
    episode,
    publishedDate,
  }
}

async function updateData(update: Update) {
  const comic = Comics.ONE_PUNCH_MAN
  const today = new Date()
  const storedHiatuses = await readCsv(comic.CSV_FILEPATH)
  if (!storedHiatuses) return
  const latestHiatus = storedHiatuses[storedHiatuses.length - 1]
  const latestYearMonth = `${latestHiatus.year}-${latestHiatus.month}`
  const todayYearMonth = getYearMonth(today)

  let newHiatus: HiatusData[] = []

  // One Punch Man is irregular, so we use monthly tracking
  if (latestYearMonth === todayYearMonth) {
    // Today's month already exists in CSV
    if (!latestHiatus.hiatus) {
      // Already has episode data, nothing to do
      return
    }
    // Has hiatus=1, check if we should update it to hiatus=0
    if (latestYearMonth !== getYearMonth(update.publishedDate)) {
      // Episode is not from this month, keep hiatus=1
      return
    }

    // Episode is from this month, update hiatus=1 to hiatus=0
    newHiatus = storedHiatuses.slice(0, -1)
    const updateRow = {
      year: latestHiatus.year,
      month: latestHiatus.month,
      hiatus: 0,
      episode: update.episode,
    } as const
    newHiatus.push(updateRow)
    console.log("update data", updateRow)

    if (newHiatus.length >= storedHiatuses.length) {
      await writeCsv(comic.CSV_FILEPATH, newHiatus)
    }

    return
  } else {
    // Today's month doesn't exist in CSV, add new row
    newHiatus = storedHiatuses.map((hiatus) => ({ ...hiatus }))
    const { hiatus, episode } =
      todayYearMonth === getYearMonth(update.publishedDate)
        ? ({ hiatus: 0, episode: update.episode } as const)
        : ({ hiatus: 1, episode: "" } as const)
    const updateRow = {
      year: today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString(),
      hiatus,
      episode,
    }
    newHiatus.push(updateRow)
    console.log("add new data", updateRow)

    if (newHiatus.length >= storedHiatuses.length) {
      await writeCsv(comic.CSV_FILEPATH, newHiatus)
    }

    return
  }
}

function getYearMonth(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}`
}

;(async () => {
  const update = await getUpdate()
  if (update) {
    console.log("Update found:", update)
    await updateData(update)
  } else {
    console.log("No update found")
  }
})()
