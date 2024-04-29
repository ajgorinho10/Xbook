import { StyleSheet, Text, View, Button, TextInput,SafeAreaView,TouchableOpacity,FlatList } from 'react-native';
import React ,{ useEffect, useState} from 'react';
import axios, { all } from 'axios';
import { useAkt } from './aktualizacja';
import { AntDesign } from '@expo/vector-icons';

export default function AddPost({ navigation,route }) {
    const[text,setText] = useState('');
    const{link} = useAkt();
    const{isDark} = useAkt();

    const sendPost = async () => {
        try {
          await axios.post(link+'/posty', {
            userId: route.params.userId,
            content: text,
            data: new Date().toLocaleString(),
            like : 0,
            czylike: true,
          });
          setText('');
          navigation.goBack();
        } catch (error) {
          console.error('Error sending message', error);
        }
      };

      const MyButton1 = ({ onPress,marginTop }) => {
        return (
        <View>
            <TouchableOpacity
            style={{...styles.przyciski,marginTop: marginTop}}
            onPress={onPress}
            >

            <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        );
      };

      const MyButton2 = ({ marginTop }) => {
        return (
        <View>
            <TouchableOpacity
            style={{...styles.przyciski,marginTop: marginTop}}
            onPress={()=>{
              sendPost();
            }}
            >

            <AntDesign name="check" size={24} color="black" />
            </TouchableOpacity>
          </View>
        );
      };

    return(
        <View style = {[styles.head,{backgroundColor: isDark}]}>
            <Text style={[styles.naglowek,{color: isDark == 'black'? 'white':'black'}]}>Dodaj Post</Text>

            <View style = {styles.tekstinput}>
            <TextInput
            value={text}
            onChangeText={setText}
            placeholder='Wprowadz tekst'
            multiline
            maxLength={255}
            />
            </View>

            <View style = {styles.przyciski1}>
            <MyButton1  onPress={navigation.goBack}/>
            <MyButton2  />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        //backgroundColor: '#cccccc',
        paddingTop:10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 40,
        height: '100%',
    },

    naglowek:{
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      width: 'auto',
      padding: 10,
      marginBottom: 0,

      color: '#000000',
      fontSize: 30,
      fontWeight: 'bold',
      fontWeight: '200',
  },

    tekstinput:{
        backgroundColor: '#e6e6e6',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 0,
        borderRadius: 30,
        marginTop:20,
        padding:20,
        borderColor: 'black',
        width: 300,
        height: 200,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 3,
    },

    przyciski1:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
    },

    przyciski:{
      backgroundColor: '#3498db',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
      width:80,
    },

    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },

  });