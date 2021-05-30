import React, {useState, useEffect, useMemo} from 'react'
import { TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { View, Text, TextInput } from '../components/Themed';
import withContextHOC from '../utils/withContextHOC';
import useCategories from '../hooks/useCategories';
import { FontAwesome5 } from '@expo/vector-icons';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import RNPickerSelect from 'react-native-picker-select';
import {ICONS} from '../assets/data/icons';
import CategoriesDAO from '../modules/CategoriesDAO';

function TabThreeScreen({config, db}) {
  const categoriesDAO = new CategoriesDAO(db);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const styles = useMemo(() => getStyles(config), []);
  const categories = useCategories(db);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#fff');
  const [icon, setIcon] = useState('question');

  function save() {
    if (category) {
      categoriesDAO.update({name: categoryName, color: categoryColor, icon}, {id: category});
    }
    setOpen(false)
  }

  return (
    <View style={styles.container}>
      <Text style={{...styles.textCenter, fontSize: 25}}>Categories</Text>
      <View style={styles.categoryList}>
        {categories && categories.map(({name, color, icon, id}, key) => (
          <TouchableOpacity
            onPress={() => {
              setCategory(id);
              setCategoryName(name);
              setOpen(true);
              setCategoryColor(color);
              setIcon(icon);
            }}
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

        <TouchableOpacity style={styles.categoryOption}>
          <Text style={{...styles.textCenter, color: '#ddd'}}>
            <FontAwesome5 name="plus" size={38} />
          </Text>
          <Text style={{...styles.textCenter, color: '#ddd'}}>
            New category
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.2)" />
      <Modal
        visible={open}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.categoryForm} bc="bc">
          <Text style={{fontSize: 20}}>{category ? 'Edit category' : 'New category'}</Text>
          <TextInput
            autoFocus={!category}
            placeholder="Category name"
            value={categoryName}
            onChangeText={setCategoryName}
            style={styles.input}
            placeholderTextColor="#555"
          />
          <ColorPicker
            onColorChange={color => setCategoryColor(fromHsv(color))}
            style={styles.colorPicker}
            color={categoryColor}
          />
          <Text>Icon</Text>
          <RNPickerSelect
            onValueChange={icon => setIcon(icon)}
            items={ICONS.map(name => ({label: name, value: name}))}
          >
            <Text>{icon ? (<FontAwesome5 name={icon} size={50} />) : 'Select icon'}</Text>
          </RNPickerSelect>
          <View style={styles.buttons} bc="bc">
            <TouchableOpacity onPress={() => setOpen(false)} style={styles.button}>
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={save} style={styles.button}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (config) => StyleSheet.create({
  categoryList: {
    marginTop: 3,
    padding: 3,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 3,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  categoryOption: {
    minWidth: config.width * 0.24,
    maxWidth: config.width * 0.24,
    width: config.width * 0.24,
    height: config.height * 0.11,
    // backgroundColor: '#888',
    flex: 1,
    paddingTop: 10,
    borderColor: '#555',
    borderWidth: 1,
  },
  separator: {
    marginVertical: 20,
    height: 2
  },
  textCenter: {
    fontSize: 13,
    color: '#222',
    textAlign: 'center',
    padding: 5
  },
  categoryForm: {
    alignItems: 'center',
    display: 'flex',
    width: config.width * 0.8,
    height: config.height * 0.55,
    marginLeft: config.width * 0.1,
    marginTop: config.height * 0.1,
    padding: config.height * 0.01
  },
  input: {
    marginVertical: 5,
    fontSize: 25,
    width: '80%',
    borderBottomWidth: 2,
  },
  colorPicker: {
    marginVertical: 20,
    flex: 1,
    width: '60%'
  },
  buttons: {
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: config.width * 0.75,
  },
  button: {
    width: config.width * 0.35,
    padding: config.height * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
  }
});

export default withContextHOC(['config', 'db', 'setState'], TabThreeScreen);
