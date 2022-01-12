import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Text, Platform, TouchableHighlight, Button } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProductCard from '../components/ProductCard';

import retrieveSession from '../hooks/retrieveSession'



export default function UserProducts({ navigation, route }: RootTabScreenProps<'UserProducts'>) {
  var userid = route.params;
  const [session, setSession] = React.useState({
    id: "",
    user: "",
    token: ""
  });
  const [ownProfileAux, setOwnProfileAux] = useState('');
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + userid + '/wishlist', config);
    setProducts(response.data);//lista de ids de productos en la
  };


  const getData = async () => {
    const sess = await retrieveSession();
    console.log(sess)
    setSession(sess);
  };


  const [currentPage, setCurrentPage] = useState(1);

  const Scroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const currentNumber = Math.floor((contentOffset + 1) / width) + 1;
    setCurrentPage(currentNumber);
  };

  React.useEffect(() => {
    getData();
    if (userid === session.id) {
      setOwnProfileAux('N');
    }
    else {
      setOwnProfileAux('S');
    }
    console.log('nuestro perfil? ' + ownProfileAux);
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({ item }) => (
          <ProductCard id={item._id} navigation={navigation} name={item.name} arrayTratos={item.exchange} imageUri={item.img[0].url} uid={session.id} token={session.token} />
        )}
        keyExtractor={item => item._id}
      />


    </View>

  );
}

const styles = StyleSheet.create({
  separator: { marginLeft: 10 },
  container: {
    flex: 1
  },
  container3: {
    width: '50%',
    borderRadius: 10,
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: '#f3f1ed',
  },

  titleText: {
    padding: 10,
    textAlign: "center",
    fontSize: 27,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  productText: {
    textAlign: 'left',
    fontSize: 20,
  },
});