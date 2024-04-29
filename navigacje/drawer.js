import React ,{ useState} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons,Ionicons,AntDesign,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';


import Stosustawienia from "../ekrany/Stosustawienia";
import Notify from '../ekrany/notify';
import SearchUser from '../ekrany/searchUser';
import Profil from '../ekrany/profile';
import StosDodanie from '../ekrany/stosDodanie';
import StosMessenger from '../ekrany/StosMessenger';
import Stosprofile from '../ekrany/StosProfile';
import { createStackNavigator } from '@react-navigation/stack';
import { AktProvider } from '../ekrany/aktualizacja';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();



const Zakladka=({route})=>{

    return(
        
      <AktProvider>
        <Tab.Navigator
        backBehavior = 'history'
        screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarItemStyle: {  },
            tabBarStyle: { backgroundColor: '#3498db',paddingTop: 20 },
            tabBarShowLabel :false,
            lazy: true,
          }}
        >
            <Tab.Screen name='StosDodanie' component={StosDodanie} initialParams={{ userId: route.params.userId }}
            options={{
                swipeEnabled: false,
                tabBarIcon: () => (
                    <MaterialIcons name="home" size={25} color="black" />
                ),
              }}/>

            <Tab.Screen name='SearchUser' component={SearchUser} options={{
                swipeEnabled: false,
                tabBarIcon: () => (
                    <FontAwesome name="search" size={24} color="black" />
                ),
              }}/>

            <Tab.Screen name='Notify' component={Notify} initialParams={{ userId: route.params.userId }}
            options={{
                swipeEnabled: false,
                tabBarIcon: () => (
                    <Ionicons name="notifications" size={24} color="black" />
                ),
              }}/>

            <Tab.Screen name='StosMessenger' component={StosMessenger} initialParams={{ userId: route.params.userId }} 
            options={{
                swipeEnabled: false,
                tabBarIcon: () => (
                    <MaterialIcons name="message" size={24} color="black" />
                ),
              }}/>

            <Tab.Screen name='Stosprofile' component={Stosprofile} initialParams={{ userId: route.params.userId,user: route.params.userId}}
            options={{
                swipeEnabled: false,
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="account" size={24} color="black" />
                ),
              }}/>

            <Tab.Screen name='Stosustawienia' component={Stosustawienia} initialParams={{ userId: route.params.userId }} 
            options={{
                swipeEnabled: false,
                tabBarIcon: () => (
                    <AntDesign name="setting" size={24} color="black" />
                ),
              }}/>
        </Tab.Navigator>
        </AktProvider>
    );
};

export default Zakladka;