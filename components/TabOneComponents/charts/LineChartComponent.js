import {LineChart} from "react-native-chart-kit";
import React, {useMemo} from 'react'
import moment from 'moment';

function LineChartComponent({config, reportData, dateRange}) {

  const labels = useMemo(() => {
    switch (dateRange.range) {
      case 'month':
        const days = [1];
        const daysOfMonth = moment(dateRange.start).daysInMonth()
        const every  = Math.round(daysOfMonth / 10);
        for (let i = 1; i <= daysOfMonth; i++) {
          days.push(Math.round(i % every) === 0 ? i : ' ')
        }
        return days
      case 'year':
        return ['Ja', 'Fe', 'Mr', 'Ap', 'Ma', 'Jn', 'Jl', 'Au', 'Se', 'Oc', 'No', 'De'];
      case 'week':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      default:
        break;
    }
  }, [dateRange]);

  const data = useMemo(() => {
    if (!reportData.records || !labels){
      return [];
    }
    
    const groupBy = labels.length !== 12 ? labels.length !== 7 ? 'date' : 'day' : 'month';
    const format = groupBy === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD';
    return labels.map((label, id) => {
      const foundRecords = reportData.records.filter(({amount, date}) => {
        return moment().set(groupBy, id).format(format) === moment(date).format(format)
      })
      return foundRecords.reduce((amount, current) => amount += current.amount, 0);
    })
  }, [reportData, labels]);

  return (
    <LineChart
      data={{
        labels: labels ? labels : [0, 2],
        datasets: [{data: data.length ? data : [0, 0]}]
      }}
      width={config.width}
      height={config.chartHeight}
      yAxisSuffix={config.currency}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#eee",
        backgroundGradientTo: "#eee",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(44, 44, 44, ${opacity})`,
        style: {borderRadius: 28},
        propsForDots: {
          r: "2",
          strokeWidth: "1",
          stroke: "#ffa726"
        }
      }}
      bezier
    />
  );
}

export default LineChartComponent;