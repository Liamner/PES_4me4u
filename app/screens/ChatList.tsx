import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function UserWishlist({ navigation }: RootTabScreenProps<'ChatList'>) {
  const [chats, setChats] = useState();
   const id = '61c9bf59a5563eb22f9e84c3'

  const getConversation = async () => {
    const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzliZjU5YTU1NjNlYjIyZjllODRjMyIsInVzZXJuYW1lIjoibiIsImlhdCI6MTY0MDYxMTY3OCwiZXhwIjoxNjQwNzg0NDc4fQ.KeW8CdZu4O7gLMZaiG1e97IPPLi0fTpJBCdLPGmhsw8`
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
            <Pressable onPress={()=>navigation.navigate('ChatView')}>
                <><Text>{item._id}</Text><Text>{item.members[0]}</Text><Text>{item.members[1]}</Text></>
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
