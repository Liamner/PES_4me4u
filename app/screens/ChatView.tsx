import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function UserWishlist({ navigation, route }: RootTabScreenProps<'ChatView'>) {
  var converid = route.params;
  const [msg, setMsg] = useState("hola")

  const getConversation = async () => {
    const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzliZjU5YTU1NjNlYjIyZjllODRjMyIsInVzZXJuYW1lIjoibiIsImlhdCI6MTY0MDYxMTY3OCwiZXhwIjoxNjQwNzg0NDc4fQ.KeW8CdZu4O7gLMZaiG1e97IPPLi0fTpJBCdLPGmhsw8`
        }
      }
      let response = await axios.get('https://app4me4u.herokuapp.com/api/conversation/' + converid, config);
      setMsg(response.data);
  };

  React.useEffect(() => {
    getConversation();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{msg}</Text>
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
