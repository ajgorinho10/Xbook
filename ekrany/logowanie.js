import { StyleSheet, Text, View, Button, TextInput,SafeAreaView,Alert,TouchableOpacity } from 'react-native';
import React ,{ useEffect, useState} from 'react';
import axios from 'axios';
import { useAkt } from './aktualizacja';

const Logowanie=({navigation})=>{
    const{akt} = useAkt();
    const{link} = useAkt();
    const[login,setlogin] = useState('');
    const[haslo,sethaslo] = useState('');
    const[list,setList] = useState();

    useEffect(()=>{
        axios.get(link+'/users')
      .then(response =>{
        //console.log("Odczyt lista login",response.data);
        setList(response.data);
      })
      .catch(error=>{
        console.log("Błąd :",error);
      });
      },[akt]);

    const logging=()=>{
        const znalezionyUzytkownik = list.find((uzytkownik) =>
            uzytkownik.login === login && uzytkownik.haslo === haslo);

            if(znalezionyUzytkownik){
                navigation.navigate('Zakladka', { userId: znalezionyUzytkownik.id,user: znalezionyUzytkownik.id });
            }
            else{
                Alert.alert('Błąd logowania', 'Błędny login lub haslo');
            }
            sethaslo('');
            setlogin('');       
    };

    const MyButton = ({ onPress,text,marginTop }) => {
        return (
          <TouchableOpacity
            style={{...styles.przyciski,marginTop: marginTop}}
            onPress={onPress}
          >
            <Text style={{ color: 'black', textAlign: 'center',fontSize: 23 }}>{text}</Text>
          </TouchableOpacity>
        );
      };

    return(
    <View style = {styles.container}>
      <View style = {styles.container}>
        
        <Text style = {styles.logo}>XBook</Text>

            <TextInput 
            onChangeText={(text)=>setlogin(text)}
            value = {login}
            placeholder="Wprowadz login"
            style = {styles.input}
            />

            <TextInput 
            onChangeText={(text)=>sethaslo(text)}
            value = {haslo}
            placeholder="Wprowadz haslo"
            style = {styles.input}
            secureTextEntry
            />
        

          <TouchableOpacity style={styles.loginButton} onPress={logging}>
            <Text style={styles.loginButtonText}>Zaloguj się</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Nie masz konta?</Text>
            <TouchableOpacity style={styles.registerButton} onPress={()=>navigation.navigate('Rejestracja')}>
                <Text style={styles.registerButtonText}>Zarejestruj się</Text>
            </TouchableOpacity>
          </View>


    </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // Kolor tła ekranu logowania
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#2980b9', // Kolor tła pola tekstowego
    marginBottom: 20,
    color: '#ffffff',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#2ecc71', // Kolor przycisku logowania
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  registerText: {
    color: '#ffffff',
    marginRight: 5,
  },
  registerButton: {
    backgroundColor: '#e74c3c', // Kolor przycisku rejestracji
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  });



export default Logowanie;
  
  
