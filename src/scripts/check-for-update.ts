import axios from "axios"
import { parse } from "node-html-parser"
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
  // TODO: switch文でcomic毎に更新あるか確認するロジック分ける
  const html = await axios.get(comic.URL)
  const parsedHtml = parse(html.data)
  if (!parsedHtml) return

  const publishedDateStr = parsedHtml.querySelector(".read__detail .episode__text")?.innerText
  if (!publishedDateStr) return
  const publishedDate = new Date(publishedDateStr.replaceAll(/[年月]/g, "-").replaceAll("日", ""))

  const episodeStr = parsedHtml.querySelector(".read__detail .episode")?.innerText
  if (!episodeStr) return

  const episodeMain = episodeStr.match(/第[0-9]+話/g)
  if (episodeMain) {
    const episode = episodeMain[0].replaceAll(/[第話]/g, "")
    return {
      episode,
      publishedDate,
    }
  }

  const episodeSub = episodeStr.match(/＃[0-9]/g)
  if (episodeSub) {
    const episode = episodeSub[0].replaceAll(/[＃]/g, "x")
    return {
      episode,
      publishedDate,
    }
  }

  return
}

async function updateData(comic: Comic, update: Update) {
  const today = new Date()
  const storedHiatuses = await readCsv(comic.CSV_FILEPATH)
  if (!storedHiatuses) return
  const latestHiatus = storedHiatuses[storedHiatuses.length - 1]
  const latestYearMonth = `${latestHiatus.year}-${latestHiatus.month}`

  let newHiatus: HiatusData[] | undefined
  if (comic.SERIAL_TYPE === "month") {
    if (latestYearMonth === `${getYearMonth(today)}`) {
      // 今月のデータがあるので、新規エピソードならアップデートする
      if (!latestHiatus.hiatus) return
      if (latestYearMonth === getYearMonth(update.publishedDate)) {
        newHiatus = storedHiatuses.slice(0, -1)
        newHiatus.push({
          year: latestHiatus.year,
          month: latestHiatus.month,
          hiatus: 1,
          episode: update.episode,
        })
      }

      // 今月データがあって、漫画更新日付が今月ではないので何もしない
      return
    }

    // 今月のデータがないので、今日の月と漫画更新月が一致していればhiatus: falseで追加
    // 今日の月と漫画更新付きが一致していなければhiatus: trueで追加（月初で漫画更新がないパターン）
    newHiatus = storedHiatuses
    const { hiatus, episode } =
      getYearMonth(today) === getYearMonth(update.publishedDate)
        ? ({ hiatus: 0, episode: update.episode } as const)
        : ({ hiatus: 1, episode: "" } as const)
    newHiatus.push({
      year: today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString(),
      hiatus,
      episode,
    })
  } else if (comic.SERIAL_TYPE === "week") {
    return
  } else {
    assertNever(comic)
  }

  if (newHiatus) {
    await writeCsv(comic.CSV_FILEPATH, newHiatus)
  }

  return

  //公開日に該当するデータがあるかチェック
  //あれば何もせず終わり、なければ一番下にデータ追加
  //01日の場合のみ、とりあえずデータ作成しておく
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
