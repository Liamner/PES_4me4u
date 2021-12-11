import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProductCard from './ProductCardScreen';

export default function UserWishlist({ navigation }: RootTabScreenProps<'UserWishlist'>) {
  const [products, setProducts] = useState();

  const uid = '61b48cfd6dac17ee8ff33050';

  const getWishlist = async () => {
      let response = await axios.get('https://app4me4u.herokuapp.com/api/user/'+uid+'/wishlist');
      setProducts(response.data);
      console.log(products);
   };

   getWishlist();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.flex}>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <ProductCard name={item.name} guardado={false} arrayTratos={item.exchange} /*imageUri={item.img[0].url}*//>
          )}
          keyExtractor={item => item.id}
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


