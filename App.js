import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Loading from './screens/loading';
import Login from './screens/login';
import DashBoard from './screens/dashboard';
import AppNavigator from './routes';

const App = () =>{
  return(
    <AppNavigator/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    backgroundColor: '#eee',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default App;
