import { HUNTER_HUNTER } from "@hiatus/libs/comics/hunterHunter"
import { MADE_IN_ABYSS } from "@hiatus/libs/comics/madeInAbyss"

export type ComicSerialType = "month" | "week"
type ComicProperties = {
  ID: string
  TITLE: string
  AUTHOR_TWITTER: string
  CSV_FILEPATH: string
  SERIAL_TYPE: ComicSerialType
}

export type Comic = MADE_IN_ABYSS | HUNTER_HUNTER
export type ComicCsvFilePath = Comic["CSV_FILEPATH"]

export const Comics = {
  MADE_IN_ABYSS: MADE_IN_ABYSS,
  HUNTER_HUNTER: HUNTER_HUNTER,
} satisfies Record<Comic["ID"], ComicProperties>
export type Comics = typeof Comics
