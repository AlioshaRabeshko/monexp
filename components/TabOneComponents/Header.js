import React, {useState, useContext} from 'react';
import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Text, View } from '../Themed';
import usePreview from '../../hooks/usePreview';
import configContext from '../../utils/configContext';
import stateContext from '../../utils/stateContext';
import {getDateRange} from '../../utils/utils';

function Header() {
  const {db, config} = useContext(configContext);
  const {dateRange, chartType, category, setState} = useContext(stateContext);
  const [withDatePicker, setWithDatePicker] = useState(false);
  const [range, setRange] = useState(dateRange);
  const [previewOptions, setPreviewOptions] = useState(['balance']);
  const preview = usePreview(db, previewOptions);
  const styles = getStyles(config);

  function selectRange(range) {
    setState({dateRange: getDateRange(range)})
    setRange(getDateRange(range));
    setWithDatePicker(false);
  }

  return (
    <View style={styles.header} bc="bc">
      <Modal
        visible={withDatePicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.dateModal} bc="bc">
          <Text>{range.startF} - {range.endF}</Text>
          <View style={styles.rangeSelectContainer}  bc="bc">
            <TouchableOpacity onPress={() => selectRange('month')}>
              <View style={styles.rangeSelect} {...range.range === 'month' ? {bc: 'selected'} : {}}>
                <Text>Month</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectRange('week')}>
              <View style={styles.rangeSelect} {...range.range === 'week' ? {bc: 'selected'} : {}}>
                <Text>Week</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => selectRange('3months')}>
              <View style={styles.rangeSelect} {...range.range === '3months' ? {bc: 'selected'} : {}}>
                <Text>3 months</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => selectRange('year')}>
              <View style={styles.rangeSelect} {...range.range === 'year' ? {bc: 'selected'} : {}}>
                <Text>Year</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setWithDatePicker(false)}>
            <View style={styles.closeButton}>
              <Text>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text onPress={() => setWithDatePicker(true)} style={styles.dateRange}>
        {(chartType !== 'headMap' && !category) && (
          range.range === 'day' ? range.startF : `${range.startF} - ${range.endF}`
        )}
      </Text>
      <Text style={styles.balance}>Balance: {preview.balance} {config && config.currency}</Text>
    </View>
  );
}

const getStyles = (config) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    width: config.width,
    padding: config.height * 0.02
  },
  balance: {
    fontSize: 20
  },
  dateRange: {
    marginTop: 5
  },
  dateModal: {
    alignItems: 'center',
    display: 'flex',
    width: config.width * 0.7,
    height: config.height * 0.35,
    marginLeft: config.width * 0.15,
    marginTop: config.height * 0.2,
    padding: config.height * 0.01
  },
  rangeSelectContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: config.height * 0.01,
    marginBottom: config.height * 0.01
  },
  rangeSelect: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: config.width * 0.3,
    height: config.height * 0.1
  },
  closeButton: {
    width: config.width * 0.5,
    padding: config.height * 0.015,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Header;
