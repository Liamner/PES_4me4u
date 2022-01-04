import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Text, Platform, TouchableHighlight } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProductCardId from '../components/ProductCardId';

import retrieveSession from '../hooks/retrieveSession'


import ProductDelete from '../components/ProductDelete';



export default function UserProducts({ navigation, route }: RootTabScreenProps<'UserProducts'>) {
  
  const [session, setSession] = React.useState({
    id: "",
    user:"",
    token:""
  });

  // const id = navigation.getParams('id','Error');

  //var id ;
  //var ownProfileAux ;

   const {id, ownProfileAux} = route.params;

  // const {auxiliar} = route.params;
  // var id, ownProfileAux;

  // const id = '61d1c011f5d0f2261e75160e';
  // const ownProfileAux = 'S';

  const [products, setProducts] = useState([]);

  const [email, setEmail] = useState('');

  const getProducts = async () => {
    console.log('id '+ id)

    console.log('AAAA');
    console.log(id);
    console.log(ownProfileAux);
    console.log('AAAA');
      let response = await axios.get('https://app4me4u.herokuapp.com/api/user/'+id);

      setProducts(response.data.products);//lista de ids de productos en la
      // console.log('products response: ' + response.data.products.length);
      // console.log('products: ' + response.data.products.length);

      setEmail(response.data.email);
      console.log('email response: ' + response.data.email);
      console.log('email: ' + email);

 


      products.forEach(element => {
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

  //  id = auxiliar.id;

  //   ownProfileAux= auxiliar.ownProfileAux;

    getData();

    getProducts();

 

    console.log('AAAA');
    console.log(id);
    console.log(ownProfileAux);
    console.log('AAAA');



  }, []);
  
  return (
    <View>

      <ScrollView>

      { (ownProfileAux == 'S')?
        <Text style={styles.titleText}> Mis productos </Text>
        :
        <Text style={styles.titleText}> Productos de {email} </Text>

      }

        <FlatList
          numColumns = {2}
          data={products}
          renderItem={({ item }) => ( 
            <>
            <View style={styles.container2}>

              <ProductCardId 
                  id={item}
                  uid={id} 
              />
 
              { (ownProfileAux == 'S')?
                                <ProductDelete id= {item} token = {session.token} />
                : <></> } 
            </View>
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
  separator:{ marginLeft: 10 },
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '0%',
    flexDirection: 'column',
  },
  container2: {
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 0,
    
    width: '50%',
//    height: 310,

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
    //fontFamily: "Cochin",
    fontSize: 27,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  productText: {
    textAlign: 'left',
    //fontFamily: "Cochin",
    fontSize: 20,
  },
});


