import React ,{ useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logowanie from '../ekrany/logowanie';
import Zakladka from './drawer';
import Rejestracja from '../ekrany/rejestracja';
import { AktProvider } from '../ekrany/aktualizacja';
import AddPost from '../ekrany/addPost';
import ChatScreen from '../ekrany/ChatScreen';


const stos = createNativeStackNavigator();


const Stos=()=>{
    return(
        <AktProvider>
        <stos.Navigator>
        <stos.Screen name='Logowanie' component={Logowanie} options={{headerShown:false}}/>
        <stos.Screen name='Rejestracja' component={Rejestracja} options={{headerShown:false}}/>
        <stos.Screen name='Zakladka' component={Zakladka} options={{headerShown: false}}/>
        </stos.Navigator>
        </AktProvider>
    );
}

export default Stos;