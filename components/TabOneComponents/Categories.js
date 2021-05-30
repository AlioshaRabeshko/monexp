import React, {useState, useEffect, useMemo} from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { View, Text } from '../Themed';
import withContextHOC from '../../utils/withContextHOC';
import useCategories from '../../hooks/useCategories';
import { FontAwesome5 } from '@expo/vector-icons';

function Categories({config, db, dateRange, setState}) {
  const styles = useMemo(() => getStyles(config), []);
  const categories = useCategories(db);

  function selectCategory(category) {
    setState({category});
  }

  return (
    <View style={styles.categoryList}>
      {categories && categories.map(({name, color, icon, id}, key) => (
        <TouchableOpacity
          onPress={() => selectCategory({name, color, icon, id})}
          style={{...styles.categoryOption, backgroundColor: color}}
          key={key}
        >
          <Text style={styles.textCenter}>
            <FontAwesome5 name={icon} size={38} />
          </Text>
          <Text style={styles.textCenter}>
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const getStyles = (config) => StyleSheet.create({
  categoryList: {
    marginTop: 3,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 3,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  categoryOption: {
    minWidth: config.width * 0.25,
    maxWidth: config.width * 0.25,
    width: config.width * 0.25,
    height: config.height * 0.1,
    // backgroundColor: '#888',
    flex: 1,
    paddingTop: 10,
    borderColor: '#555',
    borderWidth: 1,
  },
  textCenter: {
    fontSize: 13,
    color: '#222',
    textAlign: 'center'
  }
});

export default withContextHOC(['config', 'db', 'setState'], Categories);