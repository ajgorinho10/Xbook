import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Image,TextInput } from 'react-native';
import { FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAkt } from './aktualizacja';
import Awatar from './awatar';

const Messenger = ({ navigation,route}) => {
  const [users, setUsers] = useState([]);
  const{link} = useAkt();
  const userImage = require('../icons/user.png');
  const[searchUser,setUser] = useState("");
  const {isDark}=useAkt();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(link+'/users');
      //console.log('Success - Users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const startChat = (reciverId) => {
    const userId = route.params.userId;
    navigation.navigate('ChatScreen', { userId: userId, reciverId: reciverId });
  };

  useEffect(() => {
    fetchUsers();
  }, []); 

  return (
    <View style = {[styles.body,{backgroundColor:isDark}]}>
      <Text style={[styles.naglowek,{color: isDark == 'black'? 'white':'black'}]}>Messenger</Text>

      <View style = {styles.tekstinput}>
            <TextInput
            value={searchUser}
            onChangeText={setUser}
            placeholder='Wprowadz nazwę'
            />
            <FontAwesome name="search" size={24} color="black" />
        </View>

              <FlatList
                data={users}
                style = {styles.flatlist}
                renderItem={({item})=>{
                  if(item.id != route.params.userId){
                    if(searchUser === ""){
                    return(
                        <View style = {styles.lista}>
                            <TouchableOpacity onPress={()=>startChat(item.id)} style={styles.touch}>
                                <View style={styles.znajomy}>
                                  <Awatar userId={item.id} w={70} h={70} />
                                </View>

                                <View style = {{}}>
                                    <Text style={{marginLeft: 20,fontSize: 30}}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    if(item.name.toLowerCase().includes(searchUser.toLowerCase())){
                        return(
                            <View style = {styles.lista}>
                            <TouchableOpacity onPress={()=>startChat(item.id)} style={styles.touch}>
                                <View style={styles.znajomy}>
                                    <Image source={userImage} style={styles.profileImage} />
                                </View>

                                <View style = {{}}>
                                    <Text style={{marginLeft: 20,fontSize: 30}}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )
                    }
                }}}
                keyExtractor={item=>item.id.toString()}
            />
    </View>
  );
};

const styles = StyleSheet.create({

body:{
  paddingTop: 5,
  justifyContent:'center',
  alignItems: 'center',
  //backgroundColor: '#cccccc',
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
    marginBottom: 10,
},

znajomy:{
    backgroundColor:'#ffffff',
    width: 'auto',
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:50,
    padding:5,
    marginLeft: 0,
},

touch:{
    flexDirection: 'row',
    alignItems: 'center',
},

flatlist:{
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    borderColor: '#ffffff',
},

ramka:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#e6e6e6',
},

head: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
},

profileImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 10,
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
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: 150,
},

lista:{
    borderWidth:0,
    padding:10,
    width: 330,
    borderRadius: 25,
    justifyContent:'center',
    alignItems:'flex-start',
    height: 100,
    backgroundColor:'#e6e6e6',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    
    margin: 5,
},

});

export default Messenger;