import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TextInput, Button, FlatList,StyleSheet,KeyboardAvoidingView,Keyboard,TouchableOpacity } from 'react-native';
import axios, { all } from 'axios';
import { useAkt } from './aktualizacja';
import { Ionicons } from '@expo/vector-icons';

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

const ChatScreen = ({ route }) => {
  const {isDark}=useAkt();
  const [newMessage, setNewMessage] = useState('');
  const [allmessages,setAllmesages] = useState([{
    senderId: 2,
    reciverId: 3,
    content: "Hehhd",
    id: 1
  }]);
  const[users,setUsers] = useState([]);
  const flatListRef = useRef(null);
  const textInputRef = useRef(null);
  const userId = route.params.userId;
  const reciverId = route.params.reciverId;
  const{link} = useAkt();
  
  const fetchMessages = async () => {
    try {
      const response = await axios.get(link+'/messages');
      //console.log('Success - Messages:', response.data);
      const movedItems = response.data.filter(item => item.senderId === userId && item.reciverId === reciverId);
      const movedItems2 = response.data.filter(item => item.senderId === reciverId && item.reciverId === userId);

      const sortedData = [...movedItems,...movedItems2].sort((a, b) => a.id - b.id);
      setAllmesages(sortedData);
      
    } catch (error) {
      //console.error('Error fetching messages', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(link+'/users');
      //console.log('Success - homeUsers:', response.data);
      const filteredElements = response.data.filter(item => item.id === route.params.reciverId);
      setUsers(filteredElements);

    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post(link+'/messages', {
        senderId: userId,
        reciverId: reciverId,
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  const scrollToBottom=()=>{
    flatListRef.current.scrollToEnd({animated: true});
  };

  const pobieranie= ()=>{
    try {
      const response = axios.get(link+'/messages');
      //console.log('Success - Messages:', response.data);
      const movedItems = response.data.filter(item => item.senderId === userId && item.reciverId === reciverId);
      const movedItems2 = response.data.filter(item => item.senderId === reciverId && item.reciverId === userId);

      const sortedData = [...movedItems,...movedItems2].sort((a, b) => a.id - b.id);
      setAllmesages(sortedData);
      
    } catch (error) {
      //console.error('Error fetching messages', error);
    }
  }

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  },[]);

  useEffect(() => {
    scrollToBottom();
  },[allmessages.length]);

 
  useInterval(fetchMessages, 1000);

  const firstUser = users[0];

  return (
    <View style = {[styles.head,{backgroundColor:isDark}]}>
      {firstUser&&(      
      <View style = {styles.nazwa} key={route.params.reciverId}>
        <Text style = {{fontSize: 18}}>{firstUser.name}</Text>
      </View>
      )}

<FlatList
        ref={flatListRef}
        data={allmessages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if(item.senderId === userId){
              return(
                  <View style = {styles.nadawca}>
                      <Text style = {styles.tekst}>{item.content}</Text>
                  </View>
              )
          }
          else{
              return(
                  <View style = {styles.odbiorca}>
                      <Text style = {styles.tekst}>{item.content}</Text>
                  </View>
              )
          }
      }}
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{ marginBottom: 50 }}
      showsVerticalScrollIndicator={false}
      />
      
      <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ padding: 20,flexDirection: 'row' }}
      >
        <TextInput
          ref={textInputRef}
          style={{ borderWidth: 0, borderRadius: 20, backgroundColor: '#e6e6e6', marginBottom: 10, padding: 10,width: 300 }}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          onPressIn={() => {
            Keyboard.dismiss();
            scrollToBottom();
          }}
        />

          <TouchableOpacity onPress={()=>{sendMessage();scrollToBottom();}} style ={{marginBottom:10,justifyContent:'center',marginLeft: 15}}>
            <Ionicons name="send" size={24} color="#3498db" />
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nazwa:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E5EA',
    padding: 10,
    marginBottom: 8,
  },

    head: {
        paddingTop:0,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: '100%',
        backgroundColor: 'white',
    },

    naglowek:{
        fontSize: 50,
    },

    nadawca:{
      alignSelf: 'flex-end',
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 8,
      marginBottom: 5,
    },

    odbiorca:{
      alignSelf: 'flex-start',
      backgroundColor: '#E5E5EA',
      padding: 10,
      borderRadius: 8,
      marginBottom: 5,
    },

    tekst:{
      fontSize: 20,
    },

  });

export default ChatScreen;