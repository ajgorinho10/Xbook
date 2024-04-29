import { StyleSheet, Text, View, Button, TextInput,RefreshControl ,SafeAreaView, Image,FlatList,ScrollView,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons} from '@expo/vector-icons';
import { EvilIcons,AntDesign } from '@expo/vector-icons';
import axios, { all } from 'axios';
import { useAkt } from './aktualizacja';
import Awatar from './awatar';

export default function Profil({ route,navigation }) {

  const{link,akt} = useAkt();
  const{isDarkMode} = useAkt();
  const[znalezionyUzytkownik,setznaleziony] = useState([]);
  const[znalezioneposty,setpostyznalezione] = useState([]);
  const[znajomi,setZnajomi] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const {isDark}=useAkt();
  const{newakt} = useAkt();

  const fetchPost = async () => {
      try {
        const response = await axios.get(link+'/posty');
        //console.log('Success - Posty:', response.data);
        const sortedData = response.data.sort((a, b) => b.id - a.id);

        const updatedElements = response.data.filter(item => item.userId === route.params.userId);
        setpostyznalezione(updatedElements);
        //console.log(updatedElements);
      } catch (error) {
        console.error('Error fetching messages1', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(link+'/users');
        //console.log('Success - homeUsers:', response.data);
        const filteredElements = response.data.filter(item => item.id === route.params.userId);
        setznaleziony(filteredElements);
        //console.log(filteredElements);
      } catch (error) {
        console.error('Error fetching messages2', error);
      }
    };

    const fetchZnajomi = async()=>{
      try {
        const response = await axios.get(link+'/znajomi');
        const indeksElementu = response.data.findIndex(element => element.user2 ===  route.params.user && element.user1 === route.params.userId);
        const indeksElementu1 = response.data.findIndex(element => element.user2 ===  route.params.userId && element.user1 === route.params.user);
        //console.log('i1:'+indeksElementu);
        //console.log('i2:'+indeksElementu1);
        if(indeksElementu !== -1 || indeksElementu1 !== -1){       
          if(indeksElementu !== -1){
            await setZnajomi(response.data[indeksElementu].x);
            //console.log('x1:'+response.data[indeksElementu].x);
          }else{
            await setZnajomi(response.data[indeksElementu1].x);
            //console.log('x2:'+response.data[indeksElementu1].x);
          }
        }else{
          setZnajomi(0);
        }
      } catch (error) {
        console.error('Error fetching friends', error);
      }
    }

    useEffect(()=>{
      fetchUsers();
      fetchPost();
      fetchZnajomi();
      //console.log('siema',route.params.userId);
    },[]);

    useEffect(()=>{
      fetchUsers();
      fetchPost();
      fetchZnajomi();
      //console.log('siema',route.params.userId);
    },[route.params.userId,akt]);

    const onRefresh = () => {
      fetchUsers();
      fetchPost();
      fetchZnajomi();
      newakt();
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    };


    const renderItem = (item) => {
      return(
      <View style = {styles.postRamka} key = {item.id}>

          <View style={styles.postnaglowek}>
            <Text style={styles.timeAgo}>{item.data}</Text>
          </View>

          <View style={styles.postText}>
              <Text>{item.content}</Text>
          </View>

          <View style = {{flexDirection: 'row',paddingBottom: 5}}>
                  <EvilIcons name="like" size={24} color="black" />
              <Text style={{paddingLeft: 10}}>{item.like}</Text>
          </View>
      </View>
      ); 
    };  

     
    const MyButton = ({ onPress,text,marginTop }) => {
      return (
      <View>
          <TouchableOpacity
          style={{...styles.przyciski,marginTop: marginTop}}
          onPress={onPress}
          >

          <Text style={{ color: 'black', textAlign: 'center',fontSize: 15 }}>{text}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    const MyButtonznajomi = ({ onPress,text }) => {
      return (
      <View>
          <TouchableOpacity
          style={{...styles.profileAbout}}
          onPress={onPress}
          >

          <Text style={{ color: 'black', textAlign: 'center',fontSize: 18 }}>{text}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    const zapros= async ()=>{
      try {
        const response = await axios.get(link+'/znajomi');
        if(response.data.length>0){
          const indeksElementu = response.data.findIndex(element => element.user2 ===  route.params.user && element.user1 === route.params.userId);
          //console.log('index='+indeksElementu+' userid='+route.params.userId+' user='+route.params.user);
          if(indeksElementu !== -1){
            await axios.put(link+'/znajomi/'+(indeksElementu+1),{
              user1: route.params.userId,
              user2: route.params.user,
              x: 2,
            });
            setZnajomi(2);
          }else{
            const indeksElementu2 = response.data.findIndex(element => element.user2 ===  route.params.userId && element.user1 === route.params.user);
            //console.log('index2='+indeksElementu2+' userid='+route.params.userId+' user='+route.params.user);
            if(indeksElementu2 == -1){
              await axios.post(link+'/znajomi',{
                user1: route.params.user,
                user2: route.params.userId,
                x: 1,
              });
            }
          }
        }else{
          await axios.post(link+'/znajomi',{
            user1: route.params.user,
            user2: route.params.userId,
            x: 1,
          });
        }
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    }

  return (
    <SafeAreaView >
      <ScrollView
      style={{backgroundColor:isDark,height: '100%'}}
      scrollEnabled={true} 
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

          {znalezionyUzytkownik.map(post => (
        <View style={styles.header} key = {route.params.userId}>
          <View style={styles.profileImageContainer}>

          <Awatar userId={route.params.userId} w={200} h={200} />
       
          </View>

          

          { (route.params.userId != route.params.user) &&(znajomi != 2) ?(
            <View style={{flexDirection:'row',marginLeft: 30}}>
            <Text style={styles.profileName}>{post.name}</Text>
            <TouchableOpacity onPress={zapros} style={{flexDirection:'row'}}>
              <AntDesign name="adduser" size={30} color="green" />
            </TouchableOpacity>
            </View>
            ):(
            <View style={{flexDirection:'row',marginLeft: 0}}>
            <Text style={styles.profileName}>{post.name}</Text>
            </View>
          )}

          
        </View>
          ))}

          <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('znajomi',{userId:route.params.userId, user:route.params.user,})}} style={styles.body}>
            <Text style={styles.profileAbout}>
              Znajomi: 3
            </Text>
            <Ionicons name="ios-people-circle-outline" size={50} color="black" />
          </TouchableOpacity>
          </View>

      <View style={styles.head}>
        {znalezioneposty.map(item => renderItem(item))}
        </View>

      </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#cccccc',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
    height: '100%',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#e6e6e6', 
    borderWidth: 0,
    borderColor: 'black', 

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    marginTop: 10,
    borderRadius: 20,
    minWidth: 100,
    padding: 10,
    textAlign: 'center',
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor:'#e6e6e6',
    fontSize: 30,
    fontWeight: 'bold',
    fontWeight: '400',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  profileAbout: {
    fontSize: 18,
    marginTop: 10,
  },
  body: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
    borderRadius: 15,
    borderWidth: 0,
    marginTop: 0,
    paddingBottom:6,
    backgroundColor:'#e6e6e6',
    height: 50,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  head: {
    marginTop:8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flex:1,
},

przyciski:{
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: 300,
    backgroundColor: '#fffff',
    padding: 5,
    borderRadius: 60,
    marginBottom: 0,
    height: 35,
    borderWidth: 1,
},

postRamka:{
  backgroundColor: '#e6e6e6',
    marginTop: 0,
    padding: 10,
    borderRadius: 8,
    borderWidth: 0,
    width: 340,
    minHeight: 70,
    maxHeight: 255,
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
},

postnaglowek:{
    paddingTop: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
},

timeAgo: {
  color: '#888',
},

postText:{
  fontSize: 16,
  marginBottom: 10,
  width: 300,
  minHeight:70,
  padding: 10,
  backgroundColor: '#ffffff',
  borderRadius:10,
  marginLeft: 8,
},
});