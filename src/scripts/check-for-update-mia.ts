import puppeteer from "puppeteer"
import { readCsv, writeCsv } from "../libs/common/csv"
import { Comic } from "../libs/comics/comics"
import { assertNever } from "../libs/common/error"
import { MADE_IN_ABYSS } from "../libs/comics/madeInAbyss"
import { HiatusData } from "@hiatus/hooks/usePlotCalHeatmap"

type Update = {
  episode: string
  publishedDate: Date
}
async function getUpdate(comic: Comic) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()
    await page.goto(comic.URL, { waitUntil: 'networkidle2', timeout: 60000 })

    // Wait for dynamic content to load
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Extract episode information
    const episodeData = await page.evaluate(() => {
      const episodeElements = document.querySelectorAll('.series-eplist-item-h-text')
      if (!episodeElements || episodeElements.length === 0) return null

      // Get the first episode (latest)
      const latestEpisodeTitle = episodeElements[0]?.textContent?.trim()
      if (!latestEpisodeTitle) return null

      // Get date from episode meta
      const dateElement = document.querySelector('.series-eplist-item-meta-date')
      const publishedDateStr = dateElement?.textContent?.trim() || null

      return {
        episodeTitle: latestEpisodeTitle,
        dateString: publishedDateStr
      }
    })

    if (!episodeData) return

    // Parse episode number from title (e.g., "71話" -> "71")
    const episodeMatch = episodeData.episodeTitle.match(/(\d+)話/)
    if (!episodeMatch) return

    const episode = episodeMatch[1]

    // Parse date string (YYYY/MM/DD format)
    // If not available, use current date as fallback
    let publishedDate: Date
    if (episodeData.dateString) {
      // Convert "2025/10/17" to Date
      const parts = episodeData.dateString.split('/')
      publishedDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
    } else {
      publishedDate = new Date()
    }

    return {
      episode,
      publishedDate,
    }
  } finally {
    await browser.close()
  }
}

async function updateData(comic: Comic, update: Update) {
  const today = new Date()
  const storedHiatuses = await readCsv(comic.CSV_FILEPATH)
  if (!storedHiatuses) return
  const latestHiatus = storedHiatuses[storedHiatuses.length - 1]
  const latestYearMonth = `${latestHiatus.year}-${latestHiatus.month}`
  const todayYearMonth = getYearMonth(today)

  let newHiatus: HiatusData[] = []
  if (comic.SERIAL_TYPE === "month") {
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
  } else if (comic.SERIAL_TYPE === "week") {
    return
  } else if (comic.SERIAL_TYPE === "irregular") {
    return
  } else {
    assertNever(comic)
  }

  return
}

function getYearMonth(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}`
}

;(async () => {
  const comic = MADE_IN_ABYSS
  const update = await getUpdate(comic)
  if (!update) return
  await updateData(comic, update)
})()
