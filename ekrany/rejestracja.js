import { StyleSheet, Text, View, Button, TextInput,SafeAreaView,Alert,TouchableOpacity } from 'react-native';
import React ,{ useState,useEffect} from 'react';
import axios from 'axios';
import { useAkt } from './aktualizacja';

const Rejestracja=({navigation})=>{
    const{akt,newakt} = useAkt();
    const[name,setname] = useState('');
    const[login,setlogin] = useState('');
    const[haslo,sethaslo] = useState('');
    const[haslo2,sethaslo2] = useState('');
    const{link} = useAkt();

    const[list,setList] = useState();

    useEffect(()=>{
      axios.get(link+'/users')
    .then(response =>{
      //console.log("Odczyt rejestracja",response.data);
      setList(response.data);
    })
    .catch(error=>{
      console.log("Błąd :",error);
    });
    },[akt]);

    const addUser=()=>{
    axios.post(link+'/users',{id: list.length+1, login:login,haslo:haslo, name:name})
    .then(response =>{
      //console.log("Zapis rejestracja",response.data);
      setList(response.data);
    })
    .catch(error=>{
      console.log("Błąd :",error);
    });
    };
    
    const onLogowanie=()=>
    {
      navigation.navigate('Logowanie');
    };

    const rejestruj=()=>{
        const czyLoginIstnieje = list.find((uzytkownik) =>
        uzytkownik.login === login&&true);
        console.log("login:",czyLoginIstnieje);

        if(czyLoginIstnieje){
            Alert.alert('Błąd logowania', 'Login istnieje');
            setlogin('');
        }
        else if(haslo!=haslo2){
            Alert.alert('Błąd logowania', 'Hasła są różne');
            sethaslo2();
        }
        else{
            setlogin('');
            sethaslo('');
            sethaslo2('');
            addUser();
            newakt();
            navigation.navigate('Zakladka',{userId: list.length+1});
        }
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
    <View style={styles.container}>
      <View style={styles.content}>
          <Text style = {styles.logo}>XBook</Text>

          <TextInput 
           onChangeText={(text)=>setname(text)}
           value = {name}
           placeholder="Full Name"
           style = {styles.input}
           />

          <TextInput 
           onChangeText={(text)=>setlogin(text)}
           value = {login}
           placeholder="Login"
           style = {styles.input}
           />
            <TextInput 
           onChangeText={(text)=>sethaslo(text)}
           value = {haslo}
           placeholder="Password"
           style = {styles.input}
           secureTextEntry
           />
           <TextInput 
           onChangeText={(text)=>sethaslo2(text)}
           value = {haslo2}
           placeholder="Confirm Pssword"
           style = {styles.input}
           secureTextEntry
           />

          <TouchableOpacity style={styles.registerButton} onPress={rejestruj}>
            <Text style={styles.registerButtonText}>Zarejestruj się</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Masz już konto?</Text>
            <TouchableOpacity style={styles.loginButton} onPress={onLogowanie}>
              <Text style={styles.loginButtonText}>Zaloguj się</Text>
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
    backgroundColor: '#3498db', // Kolor tła ekranu rejestracji
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
    width: '100%',
    height: 40,
    backgroundColor: '#2980b9', // Kolor tła pola tekstowego
    marginBottom: 20,
    color: '#ffffff',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: '#e74c3c', // Kolor przycisku rejestracji
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: '#ffffff',
    marginRight: 5,
  },
  loginButton: {
    backgroundColor: '#2ecc71', // Kolor przycisku logowania
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});


export default Rejestracja;
  
  
