import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProductCard from '../components/ProductCard'
import NavigationBar from '../components/NavigationBar'
import retrieveSession from '../hooks/retrieveSession';

export default function UserWishlist({ navigation }: RootTabScreenProps<'UserWishlist'>) {
  const [products, setProducts] = useState();
  const [session, setSession] = React.useState({
    id: "",
    user:"",
    token:""
  });

  const getWishlist = async () => {
      let response = await axios.get('https://app4me4u.herokuapp.com/api/user/'+ session.id +'/wishlist');
      setProducts(response.data);
  };

  const getData = async () => {
    const sess = await retrieveSession();
      console.log(sess)
      setSession(sess);
    }

  React.useEffect(() => {
    getData();
    
  }, []);
  getWishlist();
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.flex}>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <ProductCard 
              navigation={navigation} 
              id={item._id}
              name={item.name} 
              guardado={false} 
              arrayTratos={item.exchange} /*imageUri={item.img[0].url}*//>
          )}
          keyExtractor={item => item.id}
          />
      </ScrollView>
      <NavigationBar  navigation={navigation} casa={true}/>
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


