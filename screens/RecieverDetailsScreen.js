import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Header,Icon,Card} from 'react-native-elements';

import firebase from 'firebase';
import db from '../config';

export default class RecieverDetailScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam('details')["user_id"],
            requestId:this.props.navigation.getParam('details')["request_id"],
            bookName:this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting:this.props.navigation.getParam('details')["reason_to_request"],
            recieverName:"",
            recieverContact:"",
            recieverAddress:"",
            recieverRequestDockId:""
        }
    }
getRecieverDetails(){
    db.collection('users').where('email_id','==',this.state.recieverId).get().then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
            recieverName:doc.data().first_name,
            recieverContact:doc.data().contact,
            recieverAddress:doc.data().address,
        })
    })

})
db.collection('requested_books').were('request_id','==',this.setState.requestId).get().then(snapshot=>{
    snapshot.forEach(doc=>{
        this.setState({recieverRequestDocId:doc.id})
    })
})}

getUserDetails=(userId)=>{
    db.collection("users").where("email_id","==",userId).get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
            this.setState({
                userName:doc.data().first_name+""+doc.data().last_name
            })
        })
    })
}


updateBookStatus=()=>{
    db.collection('all_donations').add({
        "book_name"     :this.state.bookName,
        "request_id"    :this.state.requestId,
        "requested_by"  :this.state.recieverName,
        "donor_id:this" :state.userId,
        "request_status":"donorInterested"   
     })
}

addNotification=()=>{
    var message=this.state.userName+"Has shown interest in donating the book"
    db.collection("all_notifications").add({
        "targeted_user_id": this.state.recieverId,
        "donor_id":         this.state.userId,
        "request_id":       this.state.requestId,
        "book_name":        this.state.bookName,
        "date":             firebase.firestore.fieldValue.serverTimeStamp,
        "notification_status":"unRead",
        "message":           message
    })
}

componentDidMount(){
    this.getRecieverDetails();
    this.getUserDetails(this.state.userId);
}

 render(){
     return(
         <View style={styles.container}>
             <View style={{flex:0.1}}>
                 <Header
                 leftComponent={<Icon name="arrow-left" type="feather" color="blue" onPress={()=>this.props.navigation.goBack()}/>}
                 centerComponent={{text:"donateBooks",style:{color:"black",fontSize:20,fontWeigh:bold}}}
                 backgroundColor="lightGreen"/>
             </View>
            
             <View style={{flex:0.3}}>

            <Card
            title={"Book Information"}
            titleStyle={{fontSize:20}}>
                <Card>
                    <Text style={{fontWeight:'bold'}}>Name:{this.state.bookName}</Text>

                </Card>
                <Card>
                    <Text style={{fontweight:'bold'}}>Reason:{this.state.reason_for_requesting}</Text>
                </Card>
            </Card>            
             </View>

        <View style={{flex:0.3}}>
            <Card
            title={"ReceiverInformation"}
            titleStyle={{fonstSize:20}}>
                <Card>
                    <Text style={{fontWeight:'bold'}}>Name:{this.state.receiverName}</Text>
                </Card>
                <Card>
                    <Text style={{fontWeight:'bold'}}>Contact:{this.state.receiverContact}</Text>
                </Card>
                <Card>
                    <Text style={{fontWeight:'bold'}}>Address:{this.state.receiverAddress}</Text>
                </Card>
            </Card>
        </View>


<View style={styles.buttonCointainer}>
    {
        this.state.recieverId !== this.state.userId ?(
            <TouchableOpacity
            style={styles.button}
            onPress={()=>{
                this.updateBookStatus()
                this.addNotification()
                this.props.navigation.navigate("myDonations")
            }}>
                <Text>
                    I want to donate
                </Text>
            </TouchableOpacity>
        )
        :null
    }
</View>

 </View>

     )
 }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
   buttonContainer:{
flex:0.3,
justifyContent:'center',
alignItems:'center'
   },
   button:{
       width:200,
       height:50,
       justifyContent:'center',
       alignItems:'center',
       borderRadius:10,
       backgroundColor:'purple',
       shadowColor:'black',
       shadowOffset:{
           width:0,
           height:8
       },
       elivation:16
   } 
})

