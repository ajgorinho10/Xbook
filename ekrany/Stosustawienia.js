import React ,{ useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AparatScreen from "./AparatScreen"
import settings from './settings';
import Motyw from './motyw';

const stos = createNativeStackNavigator();

const Stosustawienia=({route})=>{
    return(
        <stos.Navigator>
            <stos.Screen name='settings' component={settings} initialParams={{ userId: route.params.userId }}
            options={{headerShown:false}}/>
            <stos.Screen name='AparatScreen' component={AparatScreen} initialParams={{ userId: route.params.userId }}
            options={{headerShown: false}}/>      
        </stos.Navigator>
    );
}

export default Stosustawienia;