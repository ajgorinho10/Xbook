import { StyleSheet, Text, View, Button, TextInput,RefreshControl ,SafeAreaView, Image,FlatList,ScrollView,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons} from '@expo/vector-icons';
import { EvilIcons,AntDesign } from '@expo/vector-icons';
import axios, { all } from 'axios';
import { useAkt } from './aktualizacja';


export default function Awatar({ userId,w,h }) {

  const{link,akt} = useAkt();
  const[imageData,setImageData] = useState(null);

    const photo = async()=>{
      try {
        const response = await axios.get(link+'/photos/'+userId);
        const imageData = response.data.photo;  // Zakładając, że dane binarne są dostępne pod kluczem 'image'
        
        //console.log('urzytkownik: '+userId);
        setImageData(imageData);
      } catch (error) {
        setImageData(undefined);
      }
    }

    useEffect(()=>{
      photo();
    },[]);

    useEffect(()=>{
        photo();
      },[akt]);

  const userImage = require('../icons/user.png');
  return (
    <SafeAreaView>
        {imageData ? (
                    <Image source={{ uri: `data:image/jpeg;base64,${imageData}` }} style={{ width: w, height: h,borderRadius: 50}} />
                    ):(
                    <Image source={userImage} style={{ width: w, height: h }} />
                    )}
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});