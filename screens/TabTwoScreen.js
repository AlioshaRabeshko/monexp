import React, {useEffect, useMemo, useState} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import withContextHOC from '../utils/withContextHOC';
import useChartData from '../components/TabOneComponents/charts/useChartData';
import { FontAwesome5 } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import moment from 'moment';

function TabTwoScreen({config, db}) {
  const dateRange = useMemo(() => ({start: moment().subtract(1, 'year'), end: moment()}), []);
  const categories = useChartData(db, dateRange);
  const data = useMemo(() => {
    if (!categories.records) {
      return [];
    }
    const data = categories.records.reduce((acc, current) => {
      if (acc[moment(current.date).format('DD MMMM YYYY')]) {
        acc[moment(current.date).format('DD MMMM YYYY')].push(current);
      } else {
        acc[moment(current.date).format('DD MMMM YYYY')] = [current];
      }
      return acc;
    }, {});

    return Object.entries(data).sort((a, b) => Date.parse(a[0]) < Date.parse(b[0]));
  }, [categories]);
  const styles = useMemo(() => getStyles(config), []);
  return (
    <ScrollView style={styles.container}>
      {data.map(([date, records], key) => (
        <React.Fragment key={key}>
          <Text>{date}</Text>
          {records.map((record, key) => (
            <View style={styles.listItem} key={key}>
              <View style={{...styles.categoryIcon, backgroundColor: record.categoryColor}}>
                <Text style={styles.textCenter}>
                  {record.category}
                </Text>
                <Text style={styles.textCenter}>
                  <FontAwesome5 name={record.categoryIcon} size={30} />
                </Text>
              </View>
              <View style={styles.description}>
                <Text style={styles.descriptionText}>{record.description}</Text>
                <Text style={{fontSize: 25, textAlign: 'right'}}>{record.amount}{config.currency}</Text>
              </View>
              <View>
              </View>
            </View>
          ))}
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.2)" />
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const getStyles = (config) => StyleSheet.create({
  container: {
    width: config.width,
    flex: 1,
    padding: 5
  },
  listItem: {
    padding: 5,
    borderColor: '#555',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryIcon: {
    width: config.width * 0.18,
    padding: 3
  },
  textCenter: {
    color: '#222',
    textAlign: 'center'
  },
  separator: {
    marginVertical: 20,
    height: 2
  },
  description: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  descriptionText: {
    width: config.width * 0.58,
    paddingHorizontal: 10,
    fontSize: 10,
  }
});

export default withContextHOC(['config', 'db', 'dateRange', 'setState'], TabTwoScreen);
