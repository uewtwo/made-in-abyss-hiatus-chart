import { Timeline } from "@hiatus/components/organisms/twitter/Timeline"
import { Comic } from "@hiatus/libs/comics/comics"
import { useTranslation } from "next-i18next"
import React from "react"

export const RelatedLinks: React.FC<{ comic: Comic }> = ({ comic }) => {
  const { t } = useTranslation("common")

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-3">
        <h2 className="text-2xl">{t("$RELATED_LINKS")}</h2>
        <div className="flex flex-wrap justify-center pt-3">
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold">Author</div>
            <Timeline username={comic.AUTHOR_TWITTER} />
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold">Developer</div>
            <Timeline username="uewtwo" />
          </div>
        </div>
      </div>
    </>
  )
}
