import { Comic } from "@hiatus/libs/comics/comics"
import { useTranslation } from "next-i18next"
import React from "react"
import { Follow } from "react-twitter-widgets"

export const RelatedLinks: React.FC<{ comic: Comic }> = ({ comic }) => {
  const { t } = useTranslation("common")
  return (
    <div className="flex flex-col items-center justify-center pt-3">
      <h2 className="text-2xl">{t("$RELATED_LINKS")}</h2>
      <ul className="flex flex-col items-center justify-center">
        <li>
          <div className="flex flex-row">
            <div className="text-xl font-bold underline mr-2">author:</div>
            <div className="flex flex-col items-center justify-center">
              <Follow username={comic.AUTHOR_TWITTER}></Follow>
            </div>
          </div>
        </li>
        <li>
          <div className="flex flex-row">
            <div className="text-xl font-bold underline mr-2">developer:</div>
            <div className="flex flex-col items-center justify-center">
              <Follow username="uewtwo"></Follow>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
