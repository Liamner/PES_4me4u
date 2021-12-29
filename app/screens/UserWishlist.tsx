import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Text } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProductCardId from '../components/ProductCardId';

import retrieveSession from '../hooks/retrieveSession'


export default function UserWishlist({ navigation }: RootTabScreenProps<'UserWishlist'>) {
  
  const [session, setSession] = React.useState({
    id: "",
    user:"",
    token:""
  });

  const [productsId, setProductsId] = useState('si me ves, algo malo ha pasado');

  const [uid, setUid] =  useState('61b48cfd6dac17ee8ff33050'); //id del usuario

  const getWishlist = async () => {
      let response = await axios.get('https://app4me4u.herokuapp.com/api/user/'+uid+'/wishlist');
      setProductsId(response.data); //lista de ids de productos en la


      console.log('wishlist response: ' + response.data..length);
      console.log('wishlist: ' + productsId.length);

      productsId.forEach(element => {
        console.log(element);
      });

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
//    setUid(session.id);     //HK -> descomentar

    getWishlist();
  }, []);
  
  return (
    <View>
      <ScrollView>

    
        <Text> gato</Text>
    

        <Text style={styles.titleText}> Productos deseados</Text>
          <FlatList
            numColumns = {2}
            data={productsId}
            renderItem={({ item }) => ( 
              <>
                { (item == null)? <> </> : 
                      <ProductCardId
                        id={item.id} 
                        uid={uid}  
                      />
                }      
              </>
            )}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onMomentumScrollEnd={Scroll}
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
  titleText: {
    padding: 10,
    textAlign: "center",
    //fontFamily: "Cochin",
    fontSize: 27,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  productText: {
    textAlign: 'left',
    //fontFamily: "Cochin",
    fontSize: 20,
    margin:10,
  },
});


