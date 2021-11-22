import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';


import Carousel from 'react-native-snap-carousel';


export default class App extends React.Component {
  lastTap = null;
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
    require("./images/3.jpg"),
    require("./images/2.jpg"),
    require("./images/4.jpg"),
    require("./images/5.jpg"),
    require("./images/1.jpg"),
  ];

    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
              image: this.IMAGES[0]
          },
          {
              title:"Item 2",
              text: "Text 2",
              image: this.IMAGES[1]
          },
          {
              title:"Item 3",
              text: "Text 3",
              image: this.IMAGES[2]
          },
          {
              title:"Item 4",
              text: "Text 4",
              image: this.IMAGES[3]
          },
          {
              title:"Item 5",
              text: "Text 5",
              image: this.IMAGES[4]
          },
        ]
      }
    }
    handleDoubleTap=()=>{
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 300;
      if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
        this.lastTap = null;
        this.log();
      } else {
        this.lastTap = now;
      }
    }
    log(){
      console.log("SUCCESS");
    }
    _renderItem = ({item,index}) => {
      return (
        <TouchableOpacity onPress={this.handleDoubleTap}>
        <View style={{
            backgroundColor:'#fff0f0',
            borderRadius: 5,
            height: hp('80%'),
            marginLeft: 25,
            marginRight: 25}}>
              <Image style={{ width: '100%', height: '70%' }}
              source={item.image}/>
          <Text style={{fontSize: 30, color: 'black'}}>{item.title}</Text>
          <Text style={{color:'black'}}>{item.text}</Text>
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
        </View>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', paddingTop: 50 }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={200}
                  itemWidth={410}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}