import { StyleSheet, Text, View,FlatList,TextInput,Button,TouchableOpacity,Platform } from 'react-native';
import React ,{ useState,useEffect} from 'react';
import axios from 'axios';
import { useAkt } from './aktualizacja';
import { AntDesign } from '@expo/vector-icons';

const Settings=({route,navigation})=>{
    const[login,setlogin] = useState('');
    const[haslo,sethaslo] = useState('');
    const[status,setstatus] = useState('');
    const[list,setList] = useState();
    const{akt,newakt} = useAkt();
    const[id1,setid] = useState(0);
    const{link} = useAkt();
    const[czyOn,setOn] = useState(false);
    const{wlacz} = useAkt();
    const{wylacz} = useAkt();
    const {isDark}=useAkt();

    useEffect(()=>{
      setid(route.params.userId);
    },[]);

    useEffect(()=>{
      axios.get(link+'/users')
    .then(response =>{
      //console.log("Odczyt lista effect",response.data);
      const filtereddata = response.data.filter(item=> item.id === route.params.userId)
      //console.log("kurwa",filtereddata[0].name);
      setList(filtereddata[0].name);
    })
    .catch(error=>{
      console.log("Błąd :",error);
    });
    },[akt]);


    const zmienuser = ()=>{
      axios.put(link+'/users/'+route.params.userId,{login:login,haslo:haslo,name: list})
    .then(response =>{
      //console.log("Odczyt lista zmien",response.data);
      setstatus("Operacja wykonana pomyślnie!");
      newakt();
    })
    .catch(error=>{
      console.log("Błąd :",error);
      setstatus("Bląd Operacji! Powtórz!");
    });
    };

    const deluser=()=>{
      axios.delete(link+'/users/'+route.params.userId)
      .then(response =>{
        console.log("usun lista",response.data);
        newakt();
      })
      .catch(error=>{
        console.log("Błąd :",error);
      });
    };

    const wyloguj =()=>
    {
        navigation.navigate('Logowanie');
    };

    const onAparat=()=>
    {
        navigation.navigate('AparatScreen',{userId:id1,});
    };

    const onProfil = () =>
    {
        navigation.navigate('Profil')
    };

    const renderItem = ({ item }) => (
        <View style = {styles.tekst}>
          <Text style = {styles.tekst}>{item.login} {item.haslo}</Text>
        </View>
      );

    const OnOff = () => {
      if(czyOn){
        wlacz();
        return(
            <TouchableOpacity style = {[styles.przycisk, styles.przyciskOn]} onPress={()=>{setOn(false)}}>
              <Text> On </Text>
            </TouchableOpacity>
        )
        }else{
          wylacz();
          return(
            <TouchableOpacity style = {[styles.przycisk, styles.przyciskOff]} onPress={()=>{setOn(true)}}>
              <Text> Off </Text>
            </TouchableOpacity>
          )
        }
    }

      return (
        <View style = {[styles.head,{backgroundColor:isDark}]}>
          <TouchableOpacity style = {{...styles.przyciski,marginBottom: 1}} onPress={onProfil}>
            <Text> Przejdź do profilu </Text>
            <AntDesign name="user" size={24} color="black" />
           </TouchableOpacity>

           <View style={{...styles.przyciskiMotyw,marginBottom: 20}}>
              <View style={styles.tekstMotyw}>
                <Text style = {styles.tekst1}> Automatyczny Motyw </Text>
              </View>

              <OnOff/>
           </View>

           <TouchableOpacity style = {{...styles.przyciski,marginBottom: 30}} onPress={onAparat}>
            <Text> Zmień zdjęcie profilowe </Text>
            <AntDesign name="camera" size={24} color="black" />
           </TouchableOpacity>
          

          <Text style={{fontSize: 25}}>Zmien dane Logowania</Text>
          <View style = {styles.tekstinput}>
            <TextInput
            value={login}
            onChangeText={setlogin}
            placeholder='Wprowadz nową nazwę'
            />
          </View>

            <TextInput 
           onChangeText={(text)=>sethaslo(text)}
           value = {haslo}
           placeholder="Wprowadz nowe hasło"
           style = {styles.tekstinput}
           secureTextEntry
           />

           <TouchableOpacity style = {styles.przyciski} onPress={zmienuser}>
            <Text> Zatwierdź </Text>
            <AntDesign name="check" size={24} color="black" />
           </TouchableOpacity>
           <Text style={{marginBottom: 50}}>{status}</Text>


        <View style = {{height: 275, justifyContent: 'flex-end'}}>
           <TouchableOpacity style = {{...styles.przyciski,marginTop: 20}} onPress={wyloguj}>
            <Text> Wyloguj </Text>
            <AntDesign name="logout" size={24} color="black" />
           </TouchableOpacity>

           <TouchableOpacity style = {{...styles.przyciski,marginTop: 30}} onPress={()=>{deluser();wyloguj();}}>
            <Text> Usun Konto </Text>
            <AntDesign name="deleteuser" size={24} color="black" />
           </TouchableOpacity>
        </View>
        </View>
      );
};

const styles = StyleSheet.create({
    head: {
        paddingTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },

    tekstinput:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 3,

      width: 340,
      justifyContent: 'space-between',
      borderRadius: 10,
      marginBottom: 20,
  },

    przyciski:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 340,
        marginBottom: 10,
        backgroundColor: '#3498db',
        height: 35,

        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 3,
    },
    przycisk: {
      width: 50, 
      borderRadius: 5,
      marginHorizontal: 5,
    },

    tekst:{
        fontSize: 25,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },

    tekst1:{
      fontSize: 20,
    },

    wyloguj:{
      marginTop: 100,
      borderRadius: 30,
      padding: 30,
      width: 300,
    },
    przyciskiMotyw: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      width: 300,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,


    },
    tekstMotyw:{
      marginRight: 10,
      borderWidth: 0,
      padding: 15,
      backgroundColor: '#e6e6e6',
      borderRadius: 10,

      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 3,
    },
    przyciskOn:{
      backgroundColor: 'green',
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    przyciskOff:{
      backgroundColor: 'red',
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },

  });

export default Settings;