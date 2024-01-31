import common from "../public/locales/ja/common.json"
import metaTag from "../public/locales/ja/metaTag.json"
import { i18nextNameSpaces } from "../src/libs/common/translations"

export const resources = {
  common,
  metaTag,
} as const satisfies Record<(typeof i18nextNameSpaces)[number], Object>
