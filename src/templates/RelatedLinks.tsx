import { Comic } from "@hiatus/libs/constants/comics"
import React from "react"
import { Follow } from "react-twitter-widgets"

export const RelatedLinks: React.FC<{ comic: Comic }> = ({ comic }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-3">
      <h2 className="text-2xl">関連リンク</h2>
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
