import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button, Text, TextInput, Alert, ScrollView, Picker, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { render } from '@react-three/fiber';

const Form = ({ navigation, route }) => {

  const {id, name} = navigation.state.params

  const [allVal, setallVal] = useState([{
    eventN: null, 
    locate: "", 
    dandt: "", 
    sportT: "", 
    descript: ""
  }])

  // useEffect(() => {
  //   // console.log('Fruit', fruit);
  // }, allVal)

  const [date, setDate] = useState( new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");
  const [sp, setSP] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setDate(currentDate)
    setallVal({...allVal, dandt: (currentDate.toString()) })
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  // console.log('here')
  // console.log(allVal)

  const addEvent  = () => {
    console.warn(allVal)

    

    // console.warn(allVal['0'].eventN)
    if (allVal.descript && allVal.eventN && allVal.locate &&
      allVal.dandt && allVal.sportT) {


    axios.post('http://10.0.2.2:3002/add-event', {
      description: allVal.descript,
      name: allVal.eventN,
      location: allVal.locate,
      dateTime: allVal.dandt,
      hostID: id,
      sport: allVal.sportT,
      participantIDs: id

            }).then((response) => {

          
                    // show SUCCESS alert
                  
                
                
            }).catch((err) => {
               
                console.log('error: ', err)
            })

            Alert.alert(
              "EVENT CREATED",
              "Please check 'My Events' in the Navigation bar to view your events",
              [
                  {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
          );
          }
          else{
            Alert.alert(
              "EVENT CREATION FAILED",
              "Please make sure you have filled all the fields on this form",
              [
                  {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
          );
          }

        }

    
  
    return (
      
      <View style ={styles.container}>
      <View style={styles.header}>
                <TouchableOpacity onPress = {() => navigation.navigate('hostscreen')}>
                <Icon name= 'arrow-left' style = {styles.arrow} />
                </TouchableOpacity>
                <Image source={require('./images/logo.png')} />
      </View>
      <ScrollView>
        <SafeAreaView>
         <Text style={styles.big}> Host Event </Text>
         <Text style = {styles.eventName}>
           Name of the Event
         </Text>
         <TextInput style={styles.input}
         placeholder= "Event Name"
         onChangeText={(text) => setallVal({ ...allVal, eventN: text })}
         />

         
         <Text style={styles.normText}>
           Location
         </Text >
         <TextInput style={styles.input} 
         placeholder= "Location" 
         onChangeText={(text) => setallVal({ ...allVal, locate: text })}
         >
           {selectedValue}
         </TextInput>
         <View>
           <Picker
             selectedValue = {selectedValue}
             onValueChange= {(itemValue) => setallVal({...allVal, locate: itemValue}, setSelectedValue(itemValue))}
             >
              <Picker.Item label="" value="" />
              <Picker.Item label="Flora Ho Sports Centre" value="Flora Ho Sports Centre" />
              <Picker.Item label="Kowloon Tsai Park" value="Kowloon Tsai Park" />
              <Picker.Item label="Stanley Ho Sports Centre" value="Stanley Ho Sports Centre" />
              <Picker.Item label="Jordan Valley Tennis Court" value="Jordan Valley Tennis Court" />
           </Picker>
         </View>
         
         <Text style = {styles.normText}>
           Date and Time
         </Text>
         <TextInput 
         style={styles.input}
         onChangeText={(text) => setallVal({...allVal, dandt: text })}
         > 
         {date.toString()}
         </TextInput>


        <View>
        <View>
        <Button onPress={showDatepicker} title="Show date picker!" color='red'/>
        </View>
        <View>
        <Button onPress={showTimepicker} title="Show time picker!" color='red' />
      </View>
      <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      </View>
        </View>



         <Text style = {styles.normText}>
           Type of Sport
         </Text>
         <TextInput style={styles.input}
         placeholder= "Sport Type"
         onChangeText={(text) => setallVal({ ...allVal, sportT: text })}
         >
          {sp}
         </TextInput>

         <View>
           <Picker
             sp = {sp}
             onValueChange= {(itemValue) => setallVal({...allVal, sportT: itemValue}, setSP(itemValue))}
             >
              <Picker.Item label="Football" value="Football" />
              <Picker.Item label="Basketball" value="Basketball" />
              <Picker.Item label="Tennis" value="Tennis" />
              <Picker.Item label="VolleyBall" value="Volleyball" />
           </Picker>
         </View>

         <Text style = {styles.normText}>
           Description
         </Text>
         <TextInput 
         style={styles.desc}
         onChangeText={(text) => setallVal({ ...allVal, descript: text })}
         >
          
         </TextInput>
        <TouchableOpacity style = {styles.butt} onPress={() => addEvent()}> 
         <Text style= {styles.buttText}> Create! </Text>
        </TouchableOpacity>
        </SafeAreaView>
        </ScrollView>
        </View>
    );
  };

  const styles = StyleSheet.create({
    big: {
      textAlign: 'center',
      textShadowRadius: 5,
      color: 'red',
      fontStyle: 'italic',
      fontSize: 40,
      fontWeight: 'bold',
    },
    eventName: {
      marginTop: 10, 
      fontWeight: 'bold',
      fontSize: 17,
      marginLeft: 8

    },
    normText: {
      fontWeight: 'bold',
      fontSize: 17,
      marginLeft: 8
    },
    input: {
      height: 40,
      margin: 6,
      borderColor: '#FFB3B3',
      backgroundColor: '#FFB3B3',
      borderWidth: 1,
      padding: 10,
      width: 340,
      marginBottom: 20
    },
    butt: {
      backgroundColor: 'red',
      width: 200,
      height: 40,
      marginTop: 20,
      marginBottom: 20,
      justifyContent: 'center',
      alignSelf: 'center'
      
    },
    buttText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
    desc: {
      height: 140,
      margin: 6,
      borderColor: '#FFB3B3',
      backgroundColor: '#FFB3B3',
      borderWidth: 1,
    },
    container: {
      flex: 1,
      alignContent: 'center',
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

  export default Form;
