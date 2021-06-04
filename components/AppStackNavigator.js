import {createStackNavigator} from 'react-navigation-stack';
import BookDonateScreen from '../screens/BookDonateScreen';
import RecieverDetailScreen from '../screens/RecieverDetailScreen';




export const appStackNavigator=createStackNavigator({
    BookDonateList:{
        screen:BookDonateScreen,
        navigationOptions:{
        headerShown:false,
        }
    },
    RecieverDetailScreen:{
        screen:RecieverDetailScreen,
        navigationOptions:{
        headerShown:false,
        }
    }
},
{
    initialRouteName:"BookDonateList"
}



)





