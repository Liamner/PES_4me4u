import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ChatList({ navigation }: RootTabScreenProps<'ChatList'>) {
  const [chats, setChats] = useState();

  const getConversation = async () => {
    const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmI4MDg2Yjc0OGU4Y2I1MTViNzk4ZiIsInVzZXJuYW1lIjoidGVzdFVzZXIiLCJpYXQiOjE2NDA3OTg0NDQsImV4cCI6MTY0MDk3MTI0NH0.KIPbKJw1Bc0UF3Ld4feu3rWFEml9lD8IMl-TNVMU6dQ`
        }
      }
      let response = await axios.get('https://app4me4u.herokuapp.com/api/conversation/user', config);
      setChats(response.data);
  };

  React.useEffect(() => {
    getConversation();
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.flex}>
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <Pressable onPress={()=>navigation.navigate('ChatView', item._id)}>
                <><Text>{item._id}</Text><Text>{item.members[0]}</Text><Text>{item.members[1]}</Text><Text>----</Text></>
            </Pressable>
          )}
          keyExtractor={item => item._id}
          />
      </ScrollView>
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