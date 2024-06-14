"use client";

import { useWastedTime } from "@/hooks/useWastedTime";
import { Bar, Line, Chart as MixedChart } from "react-chartjs-2";

import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

function sumAtIndex(array: number[]) {
  let total = 0;

  return array.map((element) => {
    total += element;
    return total;
  });
}

export function Chart() {
  const [{ hoursWasted, labels }, currentTime] = useWastedTime();

  return (
    <>
      <h2 className="pb-5" suppressHydrationWarning>
        Current Time:{" "}
        <p className="font-extrabold inline" suppressHydrationWarning>
          {currentTime.format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </h2>
      <MixedChart
        type="bar"
        data={{
          datasets: [
            {
              type: "line",
              data: sumAtIndex(hoursWasted),
              label: "Total Hours Wasted",
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 1,
            },
            {
              type: "bar",
              data: hoursWasted,
              label: "Hours Wasted per Day",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1,
            },
          ],
          labels,
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </>
  );
}
