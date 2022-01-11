import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, Pressable, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import retrieveSession from '../hooks/retrieveSession';
import NavigationBar from '../components/NavigationBar';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChatView({ navigation, route }: RootTabScreenProps<'ChatView'>) {
  var converid = route.params.id;
  var prodid = route.params.productId;
  var prodname = route.params.productName;
  var prodimg = route.params.productImg;
  const [msgs, setMsgs] = useState([])
  const [newMessage, setNewMessage] = useState("");
  const [session, setSession] = React.useState({
    id: "",
    user: "",
    token: ""
  })
  const getData = async () => {
    try {
      const value = await retrieveSession();
      if (value !== null) {
        setSession(value)
      }
      else {
        console.log("empty")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getConversation = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }
    console.log('converid: ' + converid)
    let response = await axios.get('https://app4me4u.herokuapp.com/api/conversation/' + converid, config);
    setMsgs(response.data);
  };

  React.useEffect(() => {
    getData();
    getConversation();
  }, []);

  const handleSubmit = async () => {
    console.log('Message: ' + newMessage)
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }
    try {
      const response = await axios.post("https://app4me4u.herokuapp.com/api/message", {
        conversationId: converid,
        text: newMessage
      }, config);
      setMsgs([...msgs, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('ProductRead', prodid)}>
        <View style={styles.row}>
          <View style={{ width: '25%' }}>
            <Image source={{ uri: prodimg }} style={styles.image} />
          </View>
          <View style={{ width: '75%' }}>
            <Text style={styles.title} numberOfLines={2}>{prodname}</Text>
            <View style={[styles.row, {alignSelf: 'center'}]}>
              <TouchableOpacity
                onPress={getConversation}
                style={{ width: 160, marginTop: 5 }}
              >
                <LinearGradient
                  colors={['#a2cff0', '#ADE8F4']}
                  style={styles.followButon}
                >
                  <Text style={[styles.textFollow,
                  { color: '#fff' }]}>
                    Hacer intercambio
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={getConversation}
                style={{ }}
              >
                <LinearGradient
                  colors={['#a2cff0', '#ADE8F4']}
                  style={styles.refreshButton}
                >
                  <Icon name='refresh-outline' color={'white'} size={30} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
      <FlatList
        data={msgs}
        renderItem={({ item }) => (
          <>
            {item.sender == session.id ?
              <Text style={styles.mine} numberOfLines={4}> {item.text} </Text>
              :
              <Text style={styles.other} numberOfLines={4}> {item.text} </Text>
            }
          </>
        )}
        keyExtractor={item => item._id}
      />
      <View style={[styles.row, { marginBottom: 50, height: 35 }]}>
        <TextInput
          style={{ color: 'black', borderRadius: 2, borderWidth: 1, borderColor: '#ccc', backgroundColor: '#efefef', width: '85%', marginRight: '3%', padding: 5 }}
          autoCorrect={true}
          onChangeText={setNewMessage}
          value={newMessage}
        />
        <Button title="Send" onPress={handleSubmit} color={'#a2cff0'} />
      </View>
      <NavigationBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    height: 100,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginHorizontal: '2%',
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: '100%',
    borderRadius: 7,
  },
  title: {
    fontSize: 25,
  },
  refreshButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginTop: 5,
    marginLeft: '10%'
  },
  followButon: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  textFollow: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  mine: {
    backgroundColor: '#a2cff0',
    alignSelf: 'flex-end',
    maxWidth: '75%',
    borderRadius: 7,
    padding: 5,
    marginHorizontal: '2%',
    marginVertical: '1%',
  },
  other: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    maxWidth: '75%',
    borderRadius: 7,
    padding: 5,
    marginHorizontal: '2%',
    marginVertical: '1%',
  },
});
