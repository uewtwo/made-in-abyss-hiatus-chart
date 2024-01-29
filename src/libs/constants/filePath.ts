import { TITLE } from "@/libs/constants/title"

export const FilePath = {
  MADE_IN_ABYSS: "public/made-in-abyss-hiatus.csv",
} as const satisfies Record<keyof typeof TITLE, string>
