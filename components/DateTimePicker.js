import React, {useState, useContext} from 'react';
import DatePicker from '@react-native-community/datetimepicker'
import { View, Text } from './Themed';
import moment from 'moment';

export default function Header(props) {
  const [date, setDate] = useState(new Date(moment().clone().startOf('month')));
  const [show, setShow] = useState(Boolean(props.open));

  function onChange(e) {
    setShow(false);
    if (e.type === 'set') {
      setDate(e)
    }
  }

  function open() {
    setShow(true);
  }

  return (
    <View>
      {show &&
        <DatePicker
          value={date}
          mode="datetime"
          format="YYYY-MM-DD"
          display="default"
          {...props}
          onChange={console.log}
        />
      }
    <Text onPress={open}>{moment(date).format('YYYY-MM-DD')}</Text>
    </View>
  );
}
