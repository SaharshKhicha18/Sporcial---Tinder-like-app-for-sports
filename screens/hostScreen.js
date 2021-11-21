import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button, Text, TextInput, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HostScreen = ({ navigation, route }) => {
    return (
      <View style ={styles.container}>
        <View style={styles.header}>
                <TouchableOpacity onPress = {() => navigation.navigate('homescreen')}>
                <Icon name= 'arrow-left' style = {styles.arrow} />
                </TouchableOpacity>
                <Image source={require('./images/logo.png')} />
        </View>
        <SafeAreaView style = {styles.butt}>
             <Button 
            title = "Host an event!"
            onPress = {()=>
                navigation.navigate('eventform')
            }
            color = '#FFB3B3'
            
        />
        </SafeAreaView>
        <SafeAreaView style = {styles.butt}>
         <Button 
            title = "Join an event!"
            onPress = {()=>
                navigation.navigate('joinscreen')
            }
            color = '#FFB3B3'
        />
        </SafeAreaView>
      </View>
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
      marginTop: 60,
      backgroundColor: '#FFB3B3',
      height: 200,
      width: 150,
    },
    container: {
      flex: 1,
      alignItems: 'center'

  },
  arrow: {
    color: 'white',
    fontSize: hp('4%'),
    marginHorizontal: wp('3%')
  },
  header: {
    backgroundColor: 'red',
    height: hp('9%'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
},
  });
  export default HostScreen;