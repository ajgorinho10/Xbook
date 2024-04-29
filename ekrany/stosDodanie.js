import React ,{ useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPost from '../ekrany/addPost';
import Home from './home';

const stos = createNativeStackNavigator();


const StosDodanie=({route})=>{
    return(
        <stos.Navigator>
        <stos.Screen name='Home' component={Home} initialParams={{ userId: route.params.userId }}
        options={{headerShown:false}}/>
        <stos.Screen name='AddPost' component={AddPost} initialParams={{ userId: route.params.userId }}
        options={{headerShown: false}}/>
        </stos.Navigator>
    );
}

export default StosDodanie;