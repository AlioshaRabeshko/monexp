import {BarChart} from "react-native-chart-kit";
import React, {useMemo} from 'react'

function BarChartComponent({config, reportData}) {
  const data = useMemo(() => {
    if(!reportData.records){
      return [];
    }
    const labels = reportData.records.reduce((acc, current) => {
      if (!acc.includes(current.category)) {
        acc.push(current.category);
      }
      return acc;
    }, [])

    const groupedData = reportData.records.reduce((acc, current) => {
      if (acc[current.category]) {
        acc[current.category].amount += current.amount;
      } else {
        acc[current.category || 'Others'] = {
          amount: current.amount,
          name: current.category || 'Others',
          category: current.category || 'Others',
          color: current.color || '#eee',
          legendFontColor: '#6F6F6F',
          legendFontSize: 12
        }
      }
      return acc;
    }, {})
    return {labels, datasets: [{data: Object.entries(groupedData).map(([id, data]) => data.amount)}]};
  }, [reportData]);

  return (
    <BarChart
      data={data}
      width={config.width}
      height={config.chartHeight}
      yAxisLabel="$"
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#eee",
        backgroundGradientTo: "#eee",
        color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(44, 44, 44, ${opacity})`,
      }}
      verticalLabelRotation={10}
      backgroundColor="#eee"
    />
  )
}

export default BarChartComponent;