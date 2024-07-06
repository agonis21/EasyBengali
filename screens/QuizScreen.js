// screens/QuizScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet } from 'react-native';


const questions = [
  {
    question: "How familiar are you with Bengali?",
    options: [
        'Not familiar at all', 
        'I can understand Bengali',
        'I can speak Bengali',
        'I can read Bengali',
        'I can write Bengali'
    ],
  },
  {
    question: "What do you want to learn?",
    options: [
        'I want to understand Bengali', 
        'I want to speak Bengali', 
        'I want to read Bengali', 
        'I want to write Bengali'
    ],
  },
];

export default function QuizScreen({navigation}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // handle end of quiz
      alert('Quiz Completed');
      navigation.navigate('Home')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionButton: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
  },
});