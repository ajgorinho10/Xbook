import React ,{ useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Messenger from './Messenger';
import ChatScreen from './ChatScreen';

const stos = createNativeStackNavigator();

const StosMessenger=({route})=>{
    return(
        <stos.Navigator>
            <stos.Screen name='Messenger' component={Messenger} initialParams={{ userId: route.params.userId }}
            options={{headerShown:false}}/>
            <stos.Screen name='ChatScreen' component={ChatScreen} initialParams={{ userId: route.params.userId }}
            options={{headerShown: false}}/>
        </stos.Navigator>
    );
}

export default StosMessenger;