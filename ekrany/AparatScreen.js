import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button,StyleSheet,SafeAreaView,Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { FontAwesome5,MaterialCommunityIcons,AntDesign,Ionicons   } from '@expo/vector-icons';
import { useAkt } from './aktualizacja';
import axios, { all } from 'axios';

const YourCameraComponent = ({route}) => {
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(false);
  const [flash,setFlash] = useState(Camera.Constants.FlashMode.off);
  const{link} = useAkt();

if(!hasPermission&&!permissionResponse){
  return <View/>;
}


if(!hasPermission.granted){
  return(
    <View>
      <Text>Aby kozystać z kamery musisz przyznac uprawnienia</Text>
      <Button title='Przyznaj Uprawnienia' onPress={()=>{
        setHasPermission();
        requestPermission();
      }}/>
    </View>
  );
}


let takePic = async () => {


  let newPhoto = await cameraRef.takePictureAsync({mirrorImage: false});
  setPhoto(newPhoto);
 
};

const uploadImage = async () => {
  try {

    const imageBinary = await FileSystem.readAsStringAsync(photo.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await axios.post
    const response = await axios.post(link+'/photos', {
      photo:imageBinary,
      id: route.params.userId
    });

    console.log(response.data);
    setPhoto(undefined);
  } catch (error) {
    await axios.delete(link+'/photos/'+route.params.userId);
    uploadImage();
  }
};



if (photo) {


  let savePhoto = () => {
    uploadImage();
   // MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
     // setPhoto(undefined);
   // });
  };


  return (
    <SafeAreaView style={styles.body}>
      <Image style={{ width: '100%',height: '75%',resizeMode: 'center' }} source={{ uri: photo.uri }} />


      <View style = {styles.decyzja}>
      <TouchableOpacity onPress={() => setPhoto(undefined)} style ={styles.przycisk2}>
          <AntDesign name="closecircleo" size={50} color="white" />
        </TouchableOpacity>


        <TouchableOpacity onPress={savePhoto} style ={styles.przycisk2}>
          <AntDesign name="checkcircleo" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


  const flipCamera=()=>{
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };


  const zmienFlash=()=>{
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };


  const Lampa = ()=>{
    if(flash){
      return (
        <Ionicons name="flash-sharp" size={24} color="white" />
      );
    }
    else{
      return (
        <Ionicons name="flash-off-sharp" size={24} color="white" />
      );
    }
  };


  return (
    <View style={styles.body}>
      <View style = {styles.dodatki}>
        <TouchableOpacity onPress={zmienFlash}>
          <Lampa/>
        </TouchableOpacity>
      </View>
      <Camera
        style={{
          flex: 1,
          width: '100%',
          height: '50%',
          resizeMode: 'center',
        }}


        type={type}


        ref={(ref) => {
          cameraRef = ref;
        }}
        useCamera2Api={true}
        flashMode={flash}
      >


        <View style={styles.widok}/>
      </Camera>


      <View style={styles.przyciski}>


        <View style = {styles.przycisk2}>
          <TouchableOpacity onPress={takePic} >
            <FontAwesome5 name="dot-circle" size={50} color="white" />
          </TouchableOpacity>
        </View>


        <View style = {styles.przycisk1}>
          <TouchableOpacity onPress={flipCamera}>
            <MaterialCommunityIcons name="camera-flip" size={26} color="white" />
          </TouchableOpacity>
        </View>


      </View>
    </View>
  );
};


const styles = StyleSheet.create({


  body:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor:'black',
  },


  text:{
    fontSize: 18,
    marginBottom: 10,
    color: 'black'
  },


  widok:{
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },


  przyciski:{
    justifyContent: 'flex-start',
    width: '100%',
    height: '25%',
  },


  przycisk1:{
    flex: 0.5,width: '95%',justifyContent:'flex-start',alignItems:'flex-end',
  },


  przycisk2:{
    flex: 1.1, justifyContent: 'center', alignItems: 'center',width: '100%',
  },


  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },


  decyzja:{
    flexDirection:'row',
    justifyContent:'space-around',
    width: '100%',
    height: '25%',
  },


  dodatki:{
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '95%',
    height: '10%',
    marginBottom: '3%',
  },




});


export default YourCameraComponent;



