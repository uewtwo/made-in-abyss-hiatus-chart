import "cal-heatmap/cal-heatmap.css"

import { HiatusData, usePlotCalHeatmap } from "@hiatus/hooks/usePlotCalHeatmap"
import { useTranslation } from "next-i18next"

export const HiatusHeatmap: React.FC<{
  chartTitle: string
  hiatuses: HiatusData[]
}> = ({ chartTitle, hiatuses }) => {
  const { t } = useTranslation("common")
  usePlotCalHeatmap(hiatuses)
  return (
    <div className="m-2">
      <div className="text-2xl font-bold m-3 text-center">{t(chartTitle)}</div>
      {/* usePlotCalHeatmapによって、divに描画される */}
      <div id="cal-heatmap" />
      <div id="cal-heatmap-legend" />
      {/* usePlotCalHeatmapによって、divに描画される */}
    </div>
  )
}
