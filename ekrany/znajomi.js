import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAkt } from './aktualizacja';
import Awatar from './awatar';

const Znajomi = ({ route, navigation }) => {
  const { isDark } = useAkt();
  const [usersData, setUsers] = useState([]);
  const [zaproszenia, setZaproszenia] = useState([]);
  const { link } = useAkt();

  useEffect(() => {
    fetchZnajomi();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(link + '/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching friends', error);
    }
  };

  const fetchZnajomi = async () => {
    try {
      const response = await axios.get(link + '/znajomi');
      const tmp = response.data;
      const nowaLista = tmp.filter(
        (element) => (element.user1 === route.params.userId || element.user2 === route.params.userId) && element.x === 2
      );
      setZaproszenia(nowaLista);
    } catch (error) {
      console.error('Error fetching friends request', error);
    }
  };

  const usun = async (itemId) => {
    try {
      await axios.delete(link + '/znajomi/' + itemId);
      const nowa = zaproszenia.filter((element) => element.id !== itemId);
      setZaproszenia(nowa);
    } catch (error) {
      console.error('Error deleting friends', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark }]}>
      <Text style={[styles.naglowek, { color: isDark == 'black' ? 'white' : 'black' }]}> Znajomi </Text>
      <FlatList
        data={zaproszenia}
        style={styles.flatlist}
        renderItem={({ item }) => {
          const indeksElementu = usersData.findIndex(
            (element) => (element.id === item.user1 || element.id === item.user2) && element.id !== route.params.userId
          );
          return (
            <View style={styles.lista}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.znajomy}>
                  <Awatar userId={usersData[indeksElementu]?.id || null} w={50} h={50} />
                </View>

                <Text style={{ marginLeft: 10, fontSize: 30 }}>{usersData[indeksElementu]?.name || null}</Text>

                {route.params.userId === route.params.user ? (
                  <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => usun(item.id)}>
                    <Ionicons name="person-remove" size={24} color="#ff1a1a" />
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  naglowek: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 'auto',
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    fontWeight: '200',
    marginBottom: 10,
  },

  znajomy: {
    backgroundColor: '#ffffff',
    width: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    padding: 5,
    marginLeft: 0,
  },

  flatlist: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    borderColor: '#ffffff',
  },

  lista: {
    borderWidth: 0,
    padding: 10,
    width: 330,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 100,
    backgroundColor: '#e6e6e6',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,

    margin: 5,
  },
});

export default Znajomi;
