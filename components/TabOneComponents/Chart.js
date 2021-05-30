import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { View, Text } from '../Themed';
import withContextHOC from '../../utils/withContextHOC';
import LineChartComponent from './charts/LineChartComponent';
import PieChartComponent from './charts/PieChartComponent';
import BarChartComponent from './charts/BarChartComponent';
import HeadMapChartComponent from './charts/HeadMapChartComponent';
import useChartData from './charts/useChartData';

const CHARTS = {
  line: {component: LineChartComponent, label: 'Line Chart', dimensions: ['date']},
  pie: {component: PieChartComponent, label: 'Pie Chart', dimensions: ['category']},
  bar: {component: BarChartComponent, label: 'Bar Chart', dimensions: ['category', 'date']},
  headMap: {component: HeadMapChartComponent, label: 'Head Map', dimensions: ['category', 'date']},
}

function Chart({config, db, dateRange, setState}) {
  const [showChartList, setShowChartList] = useState(false);
  const [chartType, setChartType] = useState('pie');
  const reportData = useChartData(db, dateRange);
  const Component = CHARTS[chartType].component;
  useEffect(() => setState({chartType}), [chartType])
  return (
    <React.Fragment>
      {showChartList && (
        <View style={styles.chartList}>
        {Object.entries(CHARTS).map(([chartType, {label, dimensions}], key) => (
          <TouchableOpacity key={key} style={styles.chartOption} onPress={() => {
            setChartType(chartType);
            setShowChartList(show => !show);
          }}>
            <Text style={styles.textCenter}>{label}</Text>
            <Text style={styles.chartDimension}>({dimensions.join(',')})</Text>
          </TouchableOpacity>
        ))}
        </View>
      )}
      <TouchableOpacity onPress={() => setShowChartList(show => !show)}>
        <Component {...{config, reportData, dateRange, db}}/>
      </TouchableOpacity>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  chartList: {
    position: 'absolute',
    marginTop: 80,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  chartOption: {
    flex: 1,
    padding: 10,
    borderRightColor: '#555',
    borderRightWidth: 1,
    borderLeftColor: '#555',
    borderLeftWidth: 1
  },
  chartDimension: {
    fontSize: 10,
    textAlign: 'center'
  },
  textCenter: {
    textAlign: 'center'
  }
});

export default withContextHOC(['config', 'db', 'dateRange', 'setState'], Chart);