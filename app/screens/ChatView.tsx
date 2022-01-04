import * as React from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, ScrollView, FlatList, Pressable, TextInput, Button } from 'react-native';
import axios from 'axios';
import { io } from "socket.io-client";

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ChatView({ navigation, route }: RootTabScreenProps<'ChatView'>) {
  var converid = route.params;
  var chatMessage
  var userId = '61bb8086b748e8cb515b798f';
  const [msgs, setMsgs] = useState("hola")
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null)
  //const socket = useRef();

  React.useEffect(() => {
    setSocket(io("ws://localhost:3000")); 
    //socket.current = io("ws://localhost:8900");
    /*socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });*/
  }, []);

  const getConversation = async () => {
    const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmI4MDg2Yjc0OGU4Y2I1MTViNzk4ZiIsInVzZXJuYW1lIjoidGVzdFVzZXIiLCJpYXQiOjE2NDA5NDc1NDksImV4cCI6MTY0MTEyMDM0OX0.AWMjcMCkG73TJfYb8YNXEK_PX0sXFLgEvJdxSZn2OI0`
        }
      }
      let response = await axios.get('https://app4me4u.herokuapp.com/api/conversation/' + converid, config);
      setMsgs(response.data);
  };

  React.useEffect(() => {
    getConversation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Message: ' + newMessage)
    const message = {
      //sender: userId,
      text: newMessage,
      conversationId: '61cc98ab39dfda8fcf98e883',
    };
    console.log(message)

    /*const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );*/

    /*socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: '61cc40614188001e3b5cab3d',
      text: newMessage,
    });*/

    try {
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmI4MDg2Yjc0OGU4Y2I1MTViNzk4ZiIsInVzZXJuYW1lIjoidGVzdFVzZXIiLCJpYXQiOjE2NDA5NDc1NDksImV4cCI6MTY0MTEyMDM0OX0.AWMjcMCkG73TJfYb8YNXEK_PX0sXFLgEvJdxSZn2OI0`
        }
      }
      const res = await axios.post("http://app4me4u.herokuapp.com/api/message", message, config);
      //setMessages([...messages, res.data]);
      //setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <View style={styles.container}>
      <Text>{msgs}</Text>
      <TextInput
          style={{height: 40, borderWidth: 2, top: 600}}
          autoCorrect={false}
          
         // onSubmitEditing={() => handleSubmit}
          
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
