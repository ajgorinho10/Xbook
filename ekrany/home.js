import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAkt } from './aktualizacja';
import Awatar from './awatar';

const Home = ({ navigation, route }) => {
  const { link } = useAkt();
  const { newakt } = useAkt();
  const [posty, setPosty] = useState([]);
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { isDark } = useAkt();

  const fetchPost = async () => {
    try {
      const response = await axios.get(link + '/posty');
      const reversedData = response.data.slice().reverse();
      setPosty(reversedData);
      console.log(response.data);
    } catch (error) {
      console.log('Błąd1 :', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(link + '/users');
      setUsers(response.data);
    } catch (error) {
      console.log('Błąd2 :', error);
    }
  };

  const aktualizacja = async ({ item }, like) => {
    try {
      await axios.put(link + '/posty/' + item.id, {
        userId: item.userId,
        content: item.content,
        data: '07.12.2023',
        like: like,
        czylike: true,
      });
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPost();
  }, []);

  const MyButton = ({ onPress, text, marginTop }) => {
    return (
      <View>
        <TouchableOpacity style={{ ...styles.przyciski, marginTop: marginTop }} onPress={onPress}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const handleLikePress = (itemId) => {
    setPosty((prevData) => {
      return prevData.map((item) => {
        if (item.id === itemId) {
          if (item.czylike == true) {
            aktualizacja({ item }, item.like + 1);
            item.czylike = false;
            return { ...item, like: item.like + 1 };
          } else {
            item.czylike = true;
            aktualizacja({ item }, item.like - 1);
            return { ...item, like: item.like - 1 };
          }
        } else {
          return item;
        }
      });
    });
  };

  const onRefresh = React.useCallback(() => {
    newakt();
    fetchUsers();
    fetchPost();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = (item) => {
    const index = users.findIndex((uzytkownik) => uzytkownik.id === item.userId);
    if (users[0]?.name === undefined) {
      return <View key={item.id}></View>;
    }

    return (
      <View style={styles.postRamka} key={item.id}>
        <View style={styles.postnaglowek}>
          <View style={styles.postnaglowek}>
            <Awatar userId={item.userId} w={50} h={50} />
            <Text style={styles.username}>{users[index]?.name || ''}</Text>
          </View>
          <Text style={styles.timeAgo}>{item.data}</Text>
        </View>

        <View style={styles.postText}>
          <Text style={{ fontSize: 16 }}>{item.content}</Text>
        </View>

        <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
          <TouchableOpacity onPress={() => handleLikePress(item.id)}>
            <EvilIcons name="like" size={24} color="blue" />
          </TouchableOpacity>
          <Text style={{ paddingLeft: 10 }}>{item.like}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: isDark, height: '100%' }}>
      <MyButton text="Dodaj Post" onPress={() => navigation.navigate('AddPost')} marginTop={10} />
      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.head}>
          {posty.map((item) => renderItem(item))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  scrollView: {
    zIndex: 90,
  },
  head: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  przyciski: {
    position: 'absolute',
    top: 650,
    right: 20,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    zIndex: 999,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postRamka: {
    marginTop: 15,
    backgroundColor: '#e6e6e6',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeAgo: {
    color: '#888',
  },
  postnaglowek: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
    width: 300,
    minHeight: 70,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
});

export default Home;
