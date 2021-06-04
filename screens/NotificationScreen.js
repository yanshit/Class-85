import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

import {listItem,Icon, ListItem} from 'react-native-elements';
import SwipeAbleFlatList from '../components/SwipeAbleFlatList';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';
import { render } from 'react-dom';
import { Header } from 'react-native/Libraries/NewAppScreen';


export default class NotificationScreen extends Component{
    constructor(){
        super(props);

        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef=null

    }

    getNotifications=()=>{
        this.notificationRef=db.collection('all_notifications').where('notification_status','==','unread')
        .where('targeted_user_id','==',this.state.userId).onSnapShot((snapshot)=>{
            var allNotifications=[]
            snapshot.docs.map((doc)=>{
                var notification=doc.data()
                notification["doc_id"]=doc.id
                allNotifications.push(notification)
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }

    componentDidMount(){
        this.getNotifications();
    }
    
    componentWillUnmount(){
        this.notificationRef();
    }

    keyExtractor=(item,index)=>index.toString()
    


renderItem=({item,index})=>{
    return(
        <ListItem
        key={index}
        leftElement={<Icon name="book" type="font_awesome" color="black"/>}
        title={item.book_name}
        titleStyle={{color:"green",fontWeight:"bold"}}
        subtitle={item.message}
        bottomDivider/>
    )
}

render(){
    return(
        <View style={StyleSheet.container}>
            <View style={{flex:0.1}}>
                <MyHeader title={"Notification"} navigation={this.props.navigation}/>
            </View>
            
        <View style={{flex:0.9}}>
            {
                this.state.allNotifications.length===0 ?
                (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:25}}>
                            You have no new notifications
                        </Text>
                    </View>
                ):
                (
                    <SwipeAbleFlatList allNotifications={this.state.allNotifications}/>
                )
            }
        </View>

        </View>
    )
}
}

const styles=StyleSheet.create({
    container:{
        flex:1
    }
})