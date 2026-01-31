import { HUNTER_HUNTER } from "@hiatus/libs/comics/hunterHunter"
import { MADE_IN_ABYSS } from "@hiatus/libs/comics/madeInAbyss"
import { ONE_PUNCH_MAN } from "@hiatus/libs/comics/onePunchMan"

export type ComicSerialType = "month" | "week" | "irregular"
type ComicProperties = {
  ID: string
  TITLE: string
  AUTHOR_TWITTER: string
  CSV_FILEPATH: string
  SERIAL_TYPE: ComicSerialType
}

export type Comic = MADE_IN_ABYSS | HUNTER_HUNTER | ONE_PUNCH_MAN
export type ComicCsvFilePath = Comic["CSV_FILEPATH"]

export const Comics = {
  MADE_IN_ABYSS: MADE_IN_ABYSS,
  HUNTER_HUNTER: HUNTER_HUNTER,
  ONE_PUNCH_MAN: ONE_PUNCH_MAN,
} satisfies Record<Comic["ID"], ComicProperties>
export type Comics = typeof Comics
