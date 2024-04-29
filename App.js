import { StyleSheet, Text, View, Button } from 'react-native';
import React ,{ useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stos from './navigacje/Stos'

export default function App() {
  

  return (
    <NavigationContainer>
        <Stos/>
    </NavigationContainer>
  );
};

