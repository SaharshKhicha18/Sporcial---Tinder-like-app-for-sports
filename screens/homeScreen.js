import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button, Text, TextInput, View, StyleSheet, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation, route}) => {



  
  const {id, name} = navigation.state.params

  
  // console.warn(id)
  // console.warn(name)
  console.warn(name)
  let buttonTxt = 'Welcome to Sportial, ' + name;
   
    return (
      <Button 
        title ={buttonTxt}
        onPress={() =>
          navigation.navigate('hostscreen')
        }
        color = 'red'
      />
    );
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderColor: '#FFB3B3',
      backgroundColor: '#FFB3B3',
      borderWidth: 1,
      padding: 10,
    },
    butt: {
      backgroundColor: '#FFB3B3',
      height: 80,
    },
  });

  export default HomeScreen;