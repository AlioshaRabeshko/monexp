import {ContributionGraph} from "react-native-chart-kit";
import React, {useMemo} from 'react'
import useChartData from './useChartData';
import moment from 'moment';

function HeadMapChartComponent({config, db}) {
  const renge = useMemo(() => ({start: moment().subtract('days', 112), end: moment}), [])
  const reportData = useChartData(db, renge);
  const data = useMemo(() => {
    if (!reportData.records){
      return [];
    }

    return Object.values(reportData.records.reduce((acc, current) => {
      if (acc[current.date]) {
        acc[current.date].count += current.amount;
      } else {
        acc[current.date] = {
          count: current.amount || 0,
          date: moment(current.date).format('YYYY-MM-DD')
        }
      }
      return acc;
    }, {}));
  }, [reportData]);
  return (
    <ContributionGraph
      values={data}
      endDate={new Date()}
      numDays={112}
      width={config.width}
      height={config.chartHeight}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#eee",
        backgroundGradientTo: "#eee",
        color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(44, 44, 44, ${opacity})`,
      }}
    />
  )
}

export default HeadMapChartComponent;