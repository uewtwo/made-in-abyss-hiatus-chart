// @ts-ignore
import CalHeatmap from "cal-heatmap"
// @ts-ignore
import Legend from "cal-heatmap/plugins/Legend"
// @ts-ignore
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel"
import "cal-heatmap/cal-heatmap.css"
import { useEffect } from "react"
import { title } from "process"
import { hiatus, usePlotCalHeatmap } from "@/hooks/usePlotCalHeatmap"

export const HiatusHeatmap: React.FC<{
  calHeatmap: CalHeatmap
  title: string
  hiatuses: hiatus[]
  twitterAccount: string
}> = ({ calHeatmap, title, hiatuses, twitterAccount }) => {
  usePlotCalHeatmap(calHeatmap, hiatuses)
  return (
    <>
      <div>{title}</div>
      <div id="cal-heatmap" /> {/* ここにカレンダーが描画される */}
      <div id="cal-heatmap-legend" />
    </>
  )
  // ツイッター埋め込みとかをここに書く
}
