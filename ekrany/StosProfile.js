import React ,{ useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profil from './profile';
import znajomi from './znajomi';

const stos = createNativeStackNavigator();

const Stosprofile=({route})=>{
    return(
        <stos.Navigator>
            <stos.Screen name='Profil' component={Profil} initialParams={{ userId: route.params.userId,user: route.params.userId }}
            options={{headerShown:false}}/>
            <stos.Screen name='znajomi' component={znajomi} initialParams={{ userId: route.params.userId }}
            options={{headerShown: false}}/>
        </stos.Navigator>
    );
}

export default Stosprofile;