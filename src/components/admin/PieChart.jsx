import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";



export const options = {
  title: "JOB WISE COST PIE CHART",
};

const PieChart = () => {
  const { pieChartData } = useSelector((state) => state.work)
  const data = useMemo(() => pieChartData, [pieChartData])
  return (
    <>
      {data && data?.length > 0 && <Chart
        className="z-0"
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />}
    </>
  );
}

export default PieChart