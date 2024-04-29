import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity,RefreshControl } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React ,{ useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAkt } from './aktualizacja';
import { ScrollView } from 'react-native-gesture-handler';
import Awatar from './awatar';


export default function Notify({ navigation,route }) {

    const {isDark}=useAkt();
    const[usersData,setUsers] = useState([]);
    const[zaproszenia,setZaproszenia] = useState([]);
    const{link,akt} = useAkt();
    const [refreshing, setRefreshing] = React.useState(false);

    const Dodaj = async (itemId,user1,user2) => {
      try{
        await axios.put(link+'/znajomi/'+itemId,{
          user1: user1,
          user2: user2,
          x: 2,
        });

        const nowa = zaproszenia.filter(element => element.id !== itemId);
        setZaproszenia(nowa);
        }
        catch(error){
          console.error('Error adding friends', error);
          }
      };

    const usun = async (itemId) => {
      try{
        await axios.delete(link+'/znajomi/'+itemId);
        const nowa = zaproszenia.filter(element => element.id !== itemId);
        setZaproszenia(nowa);
      }catch(error){
        console.error('Error deleting friends', error);
        }

      };

      const fetchUser = async()=>{
        try {
          const response = await axios.get(link+'/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching friends', error);
        }
      }
      
      const fetchZnajomi = async()=>{
        try {
          const response = await axios.get(link+'/znajomi');
          const nowaLista = response.data.filter(element => (element.user1 === route.params.userId || element.user2 === route.params.userId) && element.x != 2);
          //console.log(nowaLista);
          setZaproszenia(nowaLista);
        } catch (error) {
          console.error('Error fetching friends request', error);
        }
      }

      useEffect(()=>{
        fetchZnajomi();
        fetchUser();
        //console.log('siema',route.params.userId);
      },[]);

      const onRefresh = () => {
        fetchUser();
        fetchZnajomi();
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      };


    
    return(
        <SafeAreaView style={[styles.head,{backgroundColor:isDark}]}>
          <GestureHandlerRootView>
          <ScrollView       
            scrollEnabled={true} 
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            
            <Text style={[styles.naglowek,{color: isDark == 'black'? 'white':'black'}]}> Zaproszenia do znajomych </Text>

            {zaproszenia.map(item=>{
              const indeksElementu = usersData.findIndex(element => (element.id === item.user1 || element.id === item.user2) && element.id != route.params.userId);
                return(
                    <View style = {styles.ramka} key = {item.id}>
                        
                        <View style = {{flexDirection: 'row'}}>

                            <TouchableOpacity style={styles.znajomy} onPress={()=>navigation.navigate('Profil',{userId: usersData[indeksElementu].id})}>
                              <View style={styles.profileImage}>
                                <Awatar userId={usersData[indeksElementu].id} w={50} h={50} />
                              </View>
                            </TouchableOpacity>

                            <View>
                              <Text style = {{fontSize: 20,marginLeft: 10}}>{usersData[indeksElementu].name}</Text>

                              <View style={styles.przyciski}>
                                <TouchableOpacity onPress={()=>usun(item.id)} style={styles.guzik}>
                                <Ionicons name="person-remove" size={24} color="#ff1a1a" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>Dodaj(item.id,item.user1,item.user2)} style={styles.guzik}>
                                <Ionicons name="person-add" size={24} color="#39ac39" />
                                </TouchableOpacity>       
                              </View>

                            </View>

                        </View>

                  </View>
                )
            })}
            </ScrollView>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    head: {
        //backgroundColor: '#cccccc',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 40,
        height: '100%',
    },

    guzik:{
      borderRadius: 10,
      backgroundColor: '#ffffff',
      padding: 5,
    },

    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginRight: 10,
    },

    scrollView:{
      alignItems: 'center',
      paddingTop: 10,
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

    ramka:{
        borderWidth:0,
        marginTop: 10,
        padding:10,
        width: 350,
        borderRadius: 25,
        justifyContent:'center',
        alignItems:'center',
        height: 100,
        backgroundColor:'#e6e6e6',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 3,
    },

    znajomy:{
        backgroundColor:'#ffffff',
        width: 'auto',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        borderRadius:50,
        paddingLeft:10,
    },

    przyciski:{
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'row',
        width: 230,
        paddingHorizontal: 20,
    },

  });
