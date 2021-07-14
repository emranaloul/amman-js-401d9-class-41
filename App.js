import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, Text, View, Button, Linking } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

function App(props) {

  
  const [calendar, setCalendar] = useState([]);
  const [permissions, setPermissions] = useState(false);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR, Permissions.REMINDERS);
    setPermissions(true);
  };

 
  const showCalendar = async () => {
    const calendarList = await Calendar.getCalendarsAsync();
    setCalendar(calendarList);
  };

  const display = id => {
     
   Calendar.openEventInCalendar(id)
  };

  useEffect( () => {
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        onPress={showCalendar}
        title="Show Event"
      />

      <View style={styles.section}>
        <Text>Calendar Events</Text>
        <FlatList
          data={calendar}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Button title={item.source.name} style={styles.person} onPress={() => display(item.id)} />}
        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  person: {
    marginTop:'1em',
  },
  section: {
    margin: 10,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    marginTop: 25,
  },
});

export default App;


