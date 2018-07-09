
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  ListView,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import History from '../History/History'
import About from '../About/About'
import TaskCard from './CmDriverTaskCard';
import TaskDetail from './CmDriverTaskDetailViewController';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../Tabs/TabBar';

var reverse = require('lodash.reverse');
const {height,width} = Dimensions.get('window');
//database
const  Realm = require('realm');
//for production use this line
// let realm = new Realm();



export default class TaskList extends Component {
  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      data:[],
      dataSource: this.ds.cloneWithRows([]),
      showTaskDetail:false,
    }
    this._renderTaskItem = this._renderTaskItem.bind(this);
    this._updateDataSource = this._updateDataSource.bind(this);
    this._openComment = this._openComment.bind(this);
    this._closeComment = this._closeComment.bind(this);
  }
  componentDidMount(){

    //for module
    //!Importent remove this line from product
      this._updateDataSource();
    //
    realm.addListener('change', () => {
        this._updateDataSource();
    });
  }
  componentWillUnmount(){
    realm.removeAllListeners();
  }
  _openComment(oid,status,order,restaurant,address){
    this.setState({
        showTaskDetail:true,
        od_oid:oid,
        od_status:status,
        od_order:order,
        od_restaurant:restaurant,
        od_address:address,
    })
    this.props.showOfflineBtn();
  }
  _closeComment(){
    this.setState({
        showTaskDetail:false,
        od_oid:"",
        od_status:"",
        od_order:"",
        od_restaurant:"",
        od_address:"",
    })
    this.props.showOfflineBtn();
  }
  _updateDataSource(){
    let bdate = realm.objectForPrimaryKey('AppUserInfo','bdate').value;
    const bdateFilter = 'bdate = "'+bdate+'"';
    // this.orders = realm.objects('Orders').filtered(bdateFilter).sorted('oid',true);
    this.orders = realm.objects('Orders').sorted('oid',true);
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.orders),
    })

  }
  _renderTaskItem (item,index)  {
    return(
      <TaskCard oid={item.oid}
                status={item.order.status}
                order={item.order}
                restaurant={item.restaurant}
                address={item.address}
                orderChange={this.props.orderChange}
                openMap = {this.props.openMap}
                closeMap = {this.props.closeMap}
                openComment = {this._openComment}/>
    )
  }
  _renderTaskList(){
    if(!this.orders || this.orders.length == 0) {
      return <Image  source={require('../../Image/no_order.png')}
                     style={{top:height*0.2,height:height*0.6,width:height*0.6*0.5, alignSelf:'center'}}/>
    }
    if(this.orders.length >0){
      return(
             <ListView dataSource={this.state.dataSource}
                initialListSize={300}
                pageSize={4}
                renderRow={(item) => this._renderTaskItem(item)}
                scrollEnabled={true}
                scrollRenderAheadDistance={500}
                enableEmptySections={true}
                refreshControl={
                  <RefreshControl
		 								refreshing={this.props.refreshingTask}
		 								onRefresh={this.props.refreshTask}
		 								tintColor="#ff8b00"
		 								title="Refreshing..."
		 								titleColor="#ff8b00"
		 							/>
                }
              />
            )
    }
  }
  // <View style={{flex:1,height:1,backgroundColor:'#d1d2d4'}}/>
  _renderTaskDetail(){
    if(this.state.showTaskDetail){
      return(
        <TaskDetail close = {this._closeComment}
                    oid={this.state.od_oid}
                    status={this.state.od_order.status}
                    order={this.state.od_order}
                    restaurant={this.state.od_restaurant}
                    address={this.state.od_address}
                    orderChange={this.props.orderChange}
                    openMap = {this.props.openMap}
                    closeMap = {this.props.closeMap}/>
      )
    }
  }
  render() {
    return (
      <ScrollableTabView
                tabBarBackgroundColor={'#fff'}
                tabBarActiveTextColor={'#ff8b00'}
                tabBarTextStyle={{fontSize:12, top:5}}
                tabBarInactiveTextColor={'#666666'}
                initialPage={0}
                prerenderingSiblingsNumber={3}
                renderTabBar={() => <TabBar />}
                tabBarPosition={'bottom'}
                contentProps={{
                 keyboardDismissMode: "on-drag",
                 keyboardShouldPersistTaps: 'always'
                }}>

               <Animated.View tabLabel="Order" style={[this.props.styles,{marginTop:67,flex:1}]}>
                 {this._renderTaskList()}
                 {this._renderTaskDetail()}
               </Animated.View>

               <History tabLabel="History" style={[this.props.styles,{marginTop:67,flex:1}]}>
                 {this._renderTaskList()}
                 {this._renderTaskDetail()}
               </History>

               <About tabLabel="About" style={[this.props.styles,{marginTop:67,flex:1}]}>
                 {this._renderTaskList()}
                 {this._renderTaskDetail()}
               </About>

 		 </ScrollableTabView>


    );
  }
}


const AppUserInfoSchema = {
      name: 'AppUserInfo',
      primaryKey: 'param',
      properties: {
        param:       'string',
        value:      'string'
      }
    }

const OrderDetialSchema = {
  name: 'OrderDetial',
  primaryKey: 'oid',
  properties: {
    oid:'string',
    comment:'string',
    created:'string',
    dlexp:'string',
    rid:'string',
    status:'string',
    total:'string'
  }
};
const RestaurantInfoSchema = {
  name: 'RestaurantInfo',
  primaryKey: 'rid',
  properties: {
      rid:'string',
      addr:"string",
      lat:"string",
      lng:"string",
      name:"string",
      postal:"string",
      tel:"string",
      unit:"string"
  }
};
const UserAddressSchema = {
  name: 'UserAddress',
  primaryKey: 'uaid',
  properties: {
      uaid:'string',
      addr:"string",
      buzz:"string",
      lat:"string",
      lng:"string",
      name:"string",
      postal:"string",
      tel:"string",
      unit:"string"
  }
};
const OrdersSchema = {
  name: 'Orders',
  primaryKey: 'oid',
  properties: {
    oid:'string',
    bdate:'string',
    order:'OrderDetial',
    restaurant:'RestaurantInfo',
    address:'UserAddress'
  }
};


let realm = new Realm({schema: [AppUserInfoSchema,OrderDetialSchema,RestaurantInfoSchema,UserAddressSchema,OrdersSchema]});
console.log(realm.path)
