// @ts-ignore
import CalHeatmap from "cal-heatmap"
// @ts-ignore
import Legend from "cal-heatmap/plugins/Legend"
// @ts-ignore
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel"
import "cal-heatmap/cal-heatmap.css"
import { useEffect } from "react"

export type hiatus = Record<string, string | number>
export const HiatusHeatmap: React.FC<{ hiatuses: hiatus[] }> = ({
  hiatuses,
}) => {
  useCalHeatmap(hiatuses)
  return (
    <>
      <div>Made In Abyss Hiatus Chart</div>
      <div id="cal-heatmap" />
      <div id="cal-heatmap-legend" />
    </>
  )
}

const useCalHeatmap = (hiatuses: hiatus[]) => {
  const cal = new CalHeatmap()
  useEffect(() => {
    const createCalHeatmap = () => {
      const range = new Date().getFullYear() - 2012 + 1
      cal.paint(
        {
          itemSelector: "#cal-heatmap",
          range,
          domain: {
            type: "year",
            gutter: 5,
            label: {
              text: "YYYY",
              textAlign: "middle",
              position: "left",
              width: 30,
              height: 30,
            },
            sort: "desc",
            width: 30,
            height: 30,
          },
          subDomain: {
            type: "month",
            label: (date: Date, value: number) => {
              // return value
            },
            gutter: 1,
            width: 30,
            height: 30,
            radius: 3,
          },
          date: {
            start: new Date(2012, 10),
            end: new Date(),
          },

          data: {
            source: hiatuses,
            x: (datum: { year: number | number; month: number }) =>
              +new Date(+datum.year, +datum.month),
            y: (datum: { episode: string }) => {
              if (datum.episode === "") {
                return "Hiatus"
              } else return "Published"
              // } else if (Number(datum.episode) > 0) {
              //   return 1
              // } else {
              //   return 2
              // }
            },
            groupY: (datum: { episode: string }[]) => {
              return datum[0]
            },
          },
          verticalOrientation: true,
          scale: {
            color: {
              type: "ordinal",
              range: ["#F5B0B0", "#434DFD"],
              domain: ["Hiatus", "Published"],
            },
          },
        },
        [
          [Legend, { itemSelector: "#cal-heatmap-legend", width: 400 }],
          [
            CalendarLabel,
            {
              position: "bottom",
              textAlign: "middle",
              text: () => ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            },
          ],
        ]
      )
    }

    createCalHeatmap()
  }, [hiatuses])

  return null
}
