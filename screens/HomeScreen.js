// screens/HomeScreen.js
import React, {useState} from 'react';
import { View, Button, Text, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    
    const generateDates = () => {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        dates.push(moment().add(i, 'days').format('YYYY-MM-DD'));
      }
      return dates;
    };
  
    const renderDateItem = ({ item }) => {
      const isSelected = item === selectedDate;
      return (
        <View style={[styles.dateItem, isSelected && styles.selectedDateItem]}>
          <Text 
            style={[styles.dateText, isSelected && styles.selectedDateText]}
            onPress={() => setSelectedDate(item)}
          >
            {moment(item).format('ddd')}
          </Text>
          <Text 
            style={[styles.dateText, isSelected && styles.selectedDateText]}
            onPress={() => setSelectedDate(item)}
          >
            {moment(item).format('D')}
          </Text>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={generateDates()}
          renderItem={renderDateItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.calendarContainer}
        />
        <View style={styles.content}>
          <Text style={styles.selectedDateLabel}>Selected Date: {selectedDate}</Text>
                   <Text>Welcome to the Survey Quiz</Text>
                   <Button
                     title="Start Quiz"
                     onPress={() => navigation.navigate('Quiz')}
                   />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 0,
      paddingTop: 20,
    },
    calendarContainer: {
      paddingHorizontal: 10,
    },
    dateItem: {
      alignItems: 'center',
      padding: 10,
      margin: 5,
      borderRadius: 5,
      backgroundColor: '#f0f0f0',
      height: 60
    },
    selectedDateItem: {
      backgroundColor: '#6200ea',
    },
    dateText: {
      fontSize: 16,
      color: '#000',
    },
    selectedDateText: {
      color: '#fff',
    },
    content: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    selectedDateLabel: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default HomeScreen;


// export default function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Welcome to the Survey Quiz</Text>
//       <Button
//         title="Start Quiz"
//         onPress={() => navigation.navigate('Quiz')}
//       />
//     </View>
//   );
// }
