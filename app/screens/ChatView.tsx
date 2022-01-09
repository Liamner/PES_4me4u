import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Pressable, TextInput, Button } from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import retrieveSession from '../hooks/retrieveSession';

export default function ChatView({ navigation, route }: RootTabScreenProps<'ChatView'>) {
  var converid = route.params;
  var chatMessage
  const [msgs, setMsgs] = useState("hola")
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
        console.log(value)
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
    let response = await axios.get('https://app4me4u.herokuapp.com/api/conversation/' + converid, config);
    setMsgs(response.data);
  };

  React.useEffect(() => {
    getData();
    getConversation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Message: ' + newMessage)
    const message = {
      sender: session.id,
      text: newMessage,
      conversationId: converid,
    };
    console.log(message);

    try {
      const res = await axios.post("https://app4me4u.herokuapp.com/api/message", message);
      setMsgs([...msgs, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <View style={styles.container}>
      <Text>{msgs}</Text>
      <TextInput
        style={{ height: 40, borderWidth: 2, top: 600 }}
        autoCorrect={false}
        onChangeText={setNewMessage}
        value={newMessage}
      />
      <Button title="Send" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginVertical: 5,
  },
});
