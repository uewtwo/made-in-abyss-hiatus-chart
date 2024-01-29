import "cal-heatmap/cal-heatmap.css"

import { HiatusData, usePlotCalHeatmap } from "@hiatus/hooks/usePlotCalHeatmap"
import { AuthorTwitter, ComicTitle } from "@hiatus/libs/constants/comics"

export const HiatusHeatmap: React.FC<{
  title: ComicTitle
  authorTwitter: AuthorTwitter
  hiatuses: HiatusData[]
}> = ({ title, authorTwitter, hiatuses }) => {
  usePlotCalHeatmap(hiatuses)
  return (
    <>
      <div>{`${title} Hiatus Chart`}</div>
      {/* usePlotCalHeatmapによって、divに描画される */}
      <div id="cal-heatmap" />
      <div id="cal-heatmap-legend" />
      {/* usePlotCalHeatmapによって、divに描画される */}
    </>
  )
  // ツイッター埋め込みとかをここに書く
}
