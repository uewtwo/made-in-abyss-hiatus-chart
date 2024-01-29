// @ts-ignore
import CalHeatmap from "cal-heatmap"
// @ts-ignore
import Legend from "cal-heatmap/plugins/Legend"
// @ts-ignore
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel"
import "cal-heatmap/cal-heatmap.css"
import { useEffect } from "react"

export type HiatusData = {
  year: string
  month: string
  hiatus: 0 | 1
  episode: string
}

const calHeatmap = new CalHeatmap()
export const usePlotCalHeatmap = (hiatuses: HiatusData[]) => {
  useEffect(() => {
    const createCalHeatmap = () => {
      calHeatmap.destroy()
      const range = new Date().getFullYear() - 2012 + 1
      calHeatmap.paint(
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
          },
          subDomain: {
            type: "month",
            label: (_date: Date, value?: string) => {
              // if (!value) {
              //   return
              // }
              // console.log("_date", _date.getDate)
              // console.log(value)
              // return value[0] === "Published" ? value[1] : ""
            },
            gutter: 1,
            width: 30,
            height: 30,
            radius: 3,
          },
          date: {
            start: new Date(2012, 10),
            max: new Date(),
          },

          data: {
            source: hiatuses,
            x: (datum: { year: number | number; month: number }) =>
              +new Date(+datum.year, +datum.month),
            y: (datum: { episode: string; hiatus: string }) => {
              return Number(datum.hiatus) ? "Hiatus" : "Published"
              // } else if (Number(datum.episode) > 0) {
              //   return 1
              // } else {
              //   return 2
              // }
            },
            groupY: (datum: { hiatus: string }[]) => {
              return datum[0]
            },
          },
          verticalOrientation: true,
          scale: {
            color: {
              type: "ordinal",
              range: ["#434DFD", "#F5B0B0"],
              // @ts-ignore
              domain: ["Published", "Hiatus"],
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
