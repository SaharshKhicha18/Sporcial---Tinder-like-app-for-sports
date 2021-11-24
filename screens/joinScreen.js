import * as React from 'react';
import {
  Text,
  View,
  Alert,
  SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';


export default class App extends React.Component {
  lastTap = null;
  visible = false;
  styles = StyleSheet.create({
    header: {
      backgroundColor: 'red',
      height: hp('9%'),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center'
  },
  arrow: {
      color: 'white',
      fontSize: hp('4%'),
      marginHorizontal: wp('3%')
  }
  });
  IMAGES = [
    require("./images/1.jpg"),
    require("./images/2.jpg"),
    require("./images/3.jpg"),
    require("./images/4.jpg"),
    
  ];

 openMenu = () => {
    this.setState({
      visible:  true});
  }
  closeMenu = () => {
    if (this.state.visible){
      this.setState({
        visible: false});
      }
      else {
        return;
      }
  }

    constructor(props){
        super(props);
        //getting database data here
     
        
        
        this.state = {
          activeIndex:0,
          //all events are here
          allEvents: this.props.navigation.state.params.res,

          userid: this.props.navigation.state.params.userId,
          
          carouselItems: 
          [
          {
              name:"Badminton",
              location: "Flora Ho Sports Centre",
              DandT: "Tue Nov 30 2021 18:00:00 GMT+0800 (HKT)",
              Des: "Need 3 people for an hour of Badminton at Flora Ho centre (preferably HKU students)",
              image: this.IMAGES[0]
          },
          {
              name:"Football",
              location: "Kowloon Tsai Park",
              DandT: "Thu Dec 2 2021 12:00:00 GMT+0800 (HKT)",
              Des: "14 people needed - friendly matches",
              image: this.IMAGES[1]
          },
          {
              name:"Volleyball",
              location: "Stanley Ho Sports Centre",
              DandT: "Wed Dec 8 2021 07:30:00 GMT+0800 (HKT)",
              Des: "Already have 6 people, need 6 more",
              image: this.IMAGES[2]
          },
          {
              name:"Tennis",
              location: "Jordan Valley Tennis Court",
              DandT: "Sat Dec 11 2021 10:00:00 GMT+0800 (HKT)",
              Des: "Tennis tournament! Players, Referees etc. needed",
              image: this.IMAGES[3]
          },
        ]
      }
    }
    handleDoubleTap=(hostID, eventID, pID)=>{
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 300;
      if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
        this.lastTap = null;
        if (hostID === this.state.userid) {
          
          Alert.alert(
                "Event Registeration Failure",
                "You are the host of this event, so you cannot join this one.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        else{
          //make sure to save participant in event somehow
          //then show joined events and WE ARE DONE

          //send userid, event id to add to database
          //add userid to participant id in string
          console.log(pID + this.state.userid)

          axios.post('http://10.0.2.2:3002/add-participants', {
                participantID: pID + this.state.userid,
                eventID: eventID,
            }).then((response) => {

                var res = JSON.parse(JSON.stringify(response.data))

            }).catch((err) => {
                console.log('error: ', err)
            })

          this.log();
        }
        

      } else {
        this.lastTap = now;
      }
    }
    log(){
      
      console.log("SUCCESS");
    }
    _renderItem = ({item,index}) => {


          //   Alert.alert(
          //     "EVENT CREATED",
          //     "Please check 'My Events' in the Navigation bar to view your events",
          //     [
          //         {
          //             text: "Cancel",
          //             onPress: () => console.log("Cancel Pressed"),
          //             style: "cancel"
          //         },
          //         { text: "OK", onPress: () => console.log("OK Pressed") }
          //     ]
          // );
      
      return (
        
        <TouchableOpacity onPress={() => this.handleDoubleTap(item.hostID, item.eventID, item.participantIDs)}>
        <View style={{
            backgroundColor:'#fff0f0',
            borderRadius: 5,
            height: hp('100%'),
            //marginLeft: wp('5%'),
            //marginRight: wp('5%')
}}>
              <Image style={{ width: '100%', height: '45%' }}
              source={item.image}/>
          <Text style={{fontSize: 25, color: 'black', padding: 12}}>{item.name}</Text>
          <Text style={{color:'black', paddingLeft: 15, paddingTop: 3, fontWeight: 'bold'}}>Location: </Text>
          <Text style={{color:'black', paddingLeft: 15, paddingTop: 3}}>{item.location}</Text>
          <Text style={{color:'black', paddingLeft: 15, paddingTop: 3, fontWeight: 'bold'}}>Date and Time: </Text>
          <Text style={{color:'black', paddingLeft: 15, paddingTop: 3}}>{item.DandT}</Text>
          <Text style={{color:'black', paddingLeft: 15, paddingTop: 3, fontWeight: 'bold'}}>Description:</Text>
          <Text style={{color:'black', paddingLeft: 15, paddingTop: 3}}>{item.Des}</Text>
        </View>
        </TouchableOpacity>
        
      )
        
  }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
            <View style={this.styles.header}>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('homescreen')}>
                <Icon name= 'arrow-left' style = {this.styles.arrow} />
                </TouchableOpacity>
                <Image source={require('./images/logo.png')} />
                //<TouchableOpacity onPress = {() => this.props.navigation.navigate('myevents', {userid: this.state.userid, allEvents: this.state.allEvents})} style = {{marginLeft: wp('10%')}}>
                <TouchableOpacity onPress = {this.openMenu} style = {{marginLeft: wp('10%')}}>
                  <Icon name = 'bars' style = {this.styles.arrow}/></TouchableOpacity>
                <Provider>
                  <View
                    style={{
                      paddingTop: 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      position: 'relative',
                      
                    }}>
                    <Menu 
                      visible={this.state.visible}
                      onDismiss={this.closeMenu}
                      anchor={<TouchableOpacity onPress = {this.setState.visible = !this.setState.visible} >
                      <Icon name= 'bars' style = {this.styles.arrow}/>
                      </TouchableOpacity>}>
                      <Menu.Item  onPress={() => {}} title="My Events" />
                      <Menu.Item  onPress={() => {}} title="Log Out" />
                    </Menu>
                  </View>
                  </Provider>
                
        </View>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', 
                         //paddingTop: hp('3%'), paddingBottom: hp('3%')  
                        }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  // data={this.state.allEvents}
                  data={this.state.carouselItems}
                  sliderWidth={200}
                  itemWidth={wp('100%')}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}
