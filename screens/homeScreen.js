import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button, Text, TextInput, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation, route }) => {

  const {id, name} = navigation.state.params

  // console.warn(id)
  // console.warn(name)
  //console.warn(name)

    return (
      <View style ={styles.container}>
        <View style={styles.header}>
                <TouchableOpacity onPress = {() => navigation.navigate('loginScreen')}>
                <Icon name= 'arrow-left' style = {styles.arrow} />
                </TouchableOpacity>
                <Image source={require('./images/logo.png')} />
        </View>
        <Text style={styles.bigT}> Welcome To Sporcial, {name} </Text> 
        <SafeAreaView >
        <TouchableOpacity
         onPress = {()=>
          navigation.navigate('eventform')
      }
         >
            <Image style={styles.imagestyle}
            source={require('./images/hostImage.png')} />

               
        </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView >
         <TouchableOpacity
         onPress = {()=>
          navigation.navigate('joinscreen')
      }
         >
            <Image style={styles.imagestyle}
            source={require('./images/joinImage.png')} />
               
        </TouchableOpacity>
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
    container: {
      flex: 1,
      alignItems: 'center'

  },
  imagestyle: {
    justifyContent: 'center',
    height: 250,
    width: 300
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
bigT: {
    textAlign: 'center',
    textShadowRadius: 5,
    color: 'red',
    fontStyle: 'italic',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40
}
  });
  export default HomeScreen;
