import {PieChart} from "react-native-chart-kit";
import React, {useMemo} from 'react'

function PieChartComponent({config, reportData}) {
  const data = useMemo(() => {
    if(!reportData.records){
      return [];
    }

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
    return Object.values(groupedData);
  }, [reportData]);


  return (
    <PieChart
      data={data}
      width={config.width}
      height={config.chartHeight}
      chartConfig={{
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      accessor="amount"
      backgroundColor="#eee"
      center={[20, 0]}
    />
  );
}

export default PieChartComponent;