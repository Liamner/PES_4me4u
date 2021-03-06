import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Pressable, Image } from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import retrieveSession from '../hooks/retrieveSession';
import NavigationBar from '../components/NavigationBar';
import '../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';

export default function ChatList({ navigation }: RootTabScreenProps<'ChatList'>) {
  const [chats, setChats] = useState();

  const { t, i18n } = useTranslation();

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
        getConversation(value.token);
      }
      else {
        console.log("empty")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getConversation = async (token) => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    let response = await axios.get('https://app4me4u.herokuapp.com/api/conversation/mine', config);
    setChats(response.data);
    console.log(response.data)
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <Pressable onPress={() => {navigation.navigate('ChatView', {
              id: item._id,
              productId: item.productId._id,
              productName: item.productId.name,
              productImg: item.productId.img[0].url,
              exchange: item.productId.exchange,
              members: item.members
              })}}>
              <View style={styles.row}>
                <View style={{ width: '40%' }}>
                  <Image source={{ uri: item.productId.img[0].url }} style={styles.image} />
                </View>
                <View style={{ width: '46%' }}>
                  <Text style={styles.title} numberOfLines={2}>{item.productId.name}</Text>
                  
                  {item.members[0]._id != session.id ?
                    <Text>{t('Hablando con ')}{item.members[0].userId}</Text>
                    :
                    <Text>{t('Hablando con ')} {item.members[1].userId}</Text>
                  }
                  {item.productId.userId == session.id ?
                    <Text>{t('sobre tu producto ')}</Text>
                    :
                    <Text>{t('sobre su producto ')}</Text>
                  }
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={item => item._id}
        />
      <NavigationBar navigation={navigation} chat={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  flex: {
    flex: 1,
  },
  row: {
    height: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginHorizontal: '2%',
    marginVertical: 5,
  },
  image: {
    width: 140,
    height: '100%',
    borderRadius: 7,
  },
  title: {
    fontSize: 25,
  },
});
