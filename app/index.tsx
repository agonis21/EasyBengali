import { SafeAreaView, Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Touchable, TouchableWithoutFeedback,TouchableOpacity, Dimensions } from "react-native";
import React, {useState, useEffect} from "react"
import { Svg, Path } from 'react-native-svg';

import TestComponent from "./TestComponent";

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();


// Bengali Vowels (স্বরবর্ণ)
const bengaliVowels: string[] = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'];

// Bengali Consonants (ব্যঞ্জনবর্ণ)
const bengaliConsonants: string[] = [
  'ক', 'খ', 'গ', 'ঘ', 'ঙ', 
  'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 
  'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 
  'ত', 'থ', 'দ', 'ধ', 'ন', 
  'প', 'ফ', 'ব', 'ভ', 'ম', 
  'য', 'র', 'ল', 'শ', 'ষ', 
  'স', 'হ', 'ড়', 'ঢ়', 'য়'
];

// Bengali Numbers (সংখ্যা)
const bengaliNumbers: string[] = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

// Combine all into a single array
const bengaliAlphabet: string[] = [...bengaliNumbers, ...bengaliVowels, ...bengaliConsonants];

const DEFAULT_FONT: string = "Ani.ttf";



export default function EasyBengali() {

  const [loaded, error] = Font.useFonts({
    'Ani': require('../assets/fonts/Ani.ttf'),
    'Akaash': require('../assets/fonts/AkaashNormal.ttf'),
    'Jamrul': require('../assets/fonts/JamrulNormal.ttf'),
    'Mukti': require('../assets/fonts/Mukti.ttf'),
    'Jugantor': require('../assets/fonts/JugantorMJ-Bold.ttf')
  })



  const [isModalVisible, setIsModalVisible] = useState(false);

  const [paths, setPaths] = useState<string[][]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);

  const onTouchEnd = () => {
    paths.push(currentPath);
    setCurrentPath([]);
    setClearButtonClicked(false);
  };

  const onTouchMove = (event) => {
    const newPath = [...currentPath];
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    newPath.push(newPoint);
    setCurrentPath(newPath);
  };

  const handleClearButtonClick = () => {
    setPaths([]);
    setCurrentPath([]);
    setClearButtonClicked(true);
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView>
      {/* <TestComponent name="ahsem" /> */}

      <View style={styles.profileContainer}>
        <View style={styles.profileCard}></View>
      </View>

      <ScrollView>
      <View style={styles.section}>
        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionHeading}>Numbers</Text>
          <Text style={styles.sectionHeading}>00/10</Text>
        </View>
        
        <FlatList
        data={bengaliNumbers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
        numColumns={5} // Set the number of columns for the grid
        contentContainerStyle={styles.list}
      />
      </View>
      

      <View style={styles.section}>
        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionHeading}>Vowels</Text>
          <Text style={styles.sectionHeading}>00/11</Text>
        </View>
        <FlatList
        data={bengaliVowels}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
        numColumns={5} // Set the number of columns for the grid
        contentContainerStyle={styles.list}
      />
      </View>
      


      <View style={styles.section}>
        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionHeading}>Consonants</Text>
          <Text style={styles.sectionHeading}>00/35</Text>
        </View>
        <FlatList
        data={bengaliConsonants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
        numColumns={5} // Set the number of columns for the grid
        contentContainerStyle={styles.list}
      />
      </View>
      </ScrollView>
      

      <Modal 
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <SafeAreaView style={{flex: 1, backgroundColor: "lightblue"}}>
          <Button title="Close" color="midnightblue" onPress={() => setIsModalVisible(false)}/>

          <View style={styles.svgContainer} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <Svg height={Dimensions.get('window').height * 0.5} width={Dimensions.get('window').height * 0.5}>
              <Path
              d={paths.join('')}
              stroke={isClearButtonClicked ? 'transparent' : 'red'}
              fill={'transparent'}
              strokeWidth={3}
              strokeLinejoin={'round'}
              strokeLinecap={'round'}
            />
            {paths.length > 0 &&
              paths.map((item, index) => (
                <Path
                  key={`path-${index}`}
                  d={currentPath.join('')}
                  stroke={isClearButtonClicked ? 'transparent' : 'red'}
                  fill={'transparent'}
                  strokeWidth={2}
                  strokeLinejoin={'round'}
                  strokeLinecap={'round'}
                />
                ))}
            </Svg>
          </View>

          <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
            <Text>CLEAR</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },

  profileContainer: {
    backgroundColor: '#ddd',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },

  profileCard: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
  },

  list: {
    justifyContent: 'center',
  },
  
  section: {
    flexGrow: 1,
  },

  sectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, 

  sectionHeading: {
    textAlign: 'left',

    fontSize: 36,
    fontWeight: '800',
    color: '#ED321Eff',
    padding: 10,
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width - (5*10) )/5,  // Adjust the width for 5 columns
    height: 60,
    margin: 5,

    

    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ED321Eff',
    borderStyle: 'dashed',
    borderRadius: 5,
  },
  text: {
    fontSize: 28,
    color: '#ED321Eff',

    fontFamily: 'Jugantor',
  },
  svgContainer: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    zIndex: -10
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});