/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  Linking,
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
const {height,width} = Dimensions.get('window');
export default class CmDriverTaskCardAuto extends Component {
  constructor()
  {
    super();
    this._renderOrder=this._renderOrder.bind(this);
    this._renderComment=this._renderComment.bind(this);
  }
  _renderComment(){
    if(this.props.order.comment!=''){
      return(
            <Text ref={'comment'}
                  allowFontScaling={false}
                  style={{color:'#485465',fontSize:13,fontWeight:'500',marginTop:height*0.0136}}
                  numberOfLines={1}>
              Comment: {this.props.order.comment}
            </Text>
      )
    }
  }
  _renderOrder(){
    return(
      <View style={{width:width*0.965,
                    height:260,
                    backgroundColor:'#ffffff',
                    marginTop:height*0.0135,
                    alignSelf:'center',
                    shadowColor:'#000000',
                    shadowOpacity:0.1,
                    shadowOffset:{width: 2, height: 2}
                    }}>
        <View style={{width:width*0.965,height:height*0.0045,backgroundColor:'#454E58',}}/>
        <View style={{flex:1,
                      paddingTop:height*0.0136,
                      paddingLeft:width*0.0386,
                      paddingRight:width*0.0386,
                      paddingBottom:height*0.0136,

                    }}>
          <View style={{flexDirection:'row'}}>
            <View style={{width:width*0.7}}>

                <View style={{flexDirection:'row'}}>
                  <Text allowFontScaling={false} style={{fontSize:15,fontWeight:'800'}}>
                    {this.props.oid}｜Pick-up
                  </Text>
                </View>
                <TouchableOpacity onPress={this.props.openMap.bind(null,this.props.restaurant,this.props.address,'P')}>
                  <View style={{marginTop:width*0.0163,}}>
                    <Text allowFontScaling={false} style={{color:'#f68a1d',fontSize:15,fontWeight:'600',}}>
                      &nbsp;&nbsp;&nbsp; {this.props.restaurant.name}
                    </Text>
                    <Image
                        style={{height:height*0.025,
                                width:height*0.025*0.7272,
                                marginTop:height*0.0043,
                                top:-1,
                                left:0,
                                position:'absolute',
                              }}
                        source={require('../../Image/icon_location.png')}
                      />
                  </View>
                <Text allowFontScaling={false} style={{marginTop:width*0.005,fontSize:13,color:'#485465'}}>
                  {this.props.restaurant.addr}
                </Text>
               </TouchableOpacity>
            </View>

          </View>

          <TouchableOpacity onPress={this.props.openComment.bind(null,this.props.oid,
                                                    this.props.status,
                                                    this.props.order,
                                                    this.props.restaurant,
                                                    this.props.address)}>

            <View style={{flexDirection:'row',marginTop:height*0.01,justifyContent: 'space-between'}}>

              <TouchableOpacity onPress={()=>{Linking.openURL('tel:' + this.props.restaurant.tel)}}>
                <View style={[styles.actionButton, {flex: 1, flexDirection: 'row'}]}>
                  <Image style={styles.actionButtonImage} source={require('./Image/restaurant.png')}/>
                  <Text style={styles.actionButtonText}>{this.props.restaurant.tel}</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity onPress={()=>{Linking.openURL('tel:' + this.props.address.tel)}}>
                  <View style={[styles.actionButton, {flexDirection: 'row'}]}>
                    <Image style={styles.actionButtonImage} source={require('./Image/user.png')}/>
                    <Text style={styles.actionButtonText}>{this.props.address.tel}</Text>
                  </View>
              </TouchableOpacity>

            </View>

            <View style={{flexDirection:'row',marginTop:height*0.012}}>

              <Text allowFontScaling={false} style={styles.infoText}>
                Order Time: {this.props.order.created}
              </Text>
              <Text allowFontScaling={false} style={[styles.infoText, {color: '#f68a1d'}]}>
                Pick-up Time: 12:50
              </Text>

            </View>

            <View style={{flexDirection:'row',marginTop:height*0.01}}>

              <Text allowFontScaling={false} style={[styles.infoText, {color: '#f68a1d'}]}>
                Total: ${this.props.order.total}
              </Text>
              <Text allowFontScaling={false} style={styles.infoText}>
                Delivery Fee: ${this.props.order.dlexp}
              </Text>
            </View>

            <View style={styles.separatorLine}></View>

            <View style={{flexDirection:'column',marginTop:height*0.01, height: 40}}>
              <Text allowFontScaling={false} style={styles.infoText}>
                User: {this.props.address.unit}{this.props.address.addr}
              </Text>
              {this._renderComment()}
            </View>

          </TouchableOpacity>


          <View style={{flexDirection:'row',marginTop:height*0.01, justifyContent: 'space-between'}}>
            <TouchableOpacity style={{}} onPress={this.props.openComment.bind(null,this.props.oid,
                                                      this.props.status,
                                                      this.props.order,
                                                      this.props.restaurant,
                                                      this.props.address)}>
                <View style={[styles.orderDetailButton, {alignSelf: 'center', flexDirection: 'row'}]}>
                  <Image style={styles.orderDetailButtonImage} source={require('./Image/orderdetail.png')}/>
                  <Text style={styles.orderDetailButtonText}>Order Detail ></Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.props.orderChange.bind(null,this.props.oid,'P','30')}>
                <View style={[styles.actionButton,
                    {
                      flexDirection: 'row',
                      backgroundColor: '#EA8037',
                      alignContent: 'center',
                      width: 110,
                      borderWidth: 0,}]}>
                  <Text style={[styles.actionButtonText, {fontSize: 16, color: 'white', lineHeight: 16}]}>Pick-up</Text>
                </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
  render() {
    return (
      <View>
        {this._renderOrder()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonText: {
    color: 'grey',
    fontSize: 12,

  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
    width: 130,
    paddingTop: 4,
    paddingBottom:4,
  },
  actionButtonImage: {
    marginRight: 6,
    width: 15,
    height: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  infoText: {
    flex:1,
    color:'#485465',
    fontSize:13,
    fontWeight:'500'
  },
  separatorLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.6,
    marginTop: 10,
  },
  orderDetailButtonText: {
    color: 'black',
    fontSize: 15
  },
  orderDetailButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderDetailButtonImage: {
    marginRight: 6,
    width: 18,
    height: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});