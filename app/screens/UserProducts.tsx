import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Text, Platform, TouchableHighlight, Button } from 'react-native';

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



  const [ownProfileAux,  setOwnProfileAux] = useState('');

   var id = route.params;



  const [products, setProducts] = useState([]);

  const [wishlist, setWishlist] = useState([]);

  const [email, setEmail] = useState('');

  const getProducts = async () => {


    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/'+session.id);

      setProducts(response.data.products);//lista de ids de productos en la

      
      setEmail(response.data.email);
     
      

      if (response.data.wishlist != null) setWishlist(response.data.wishlist);


      

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

    id = route.params;


    getData();
    var aux;

    
    if ( id === session.id) {
      aux = id
      setOwnProfileAux('N');

      
    }
    else {
      setOwnProfileAux('S');
      aux = session.id

      

    }

    

    console.log('nuestro perfil? ' + ownProfileAux);

    id = aux;




    getProducts();

 

    


  }, []);
  
  return (
    <View>

      <ScrollView>

      { (ownProfileAux == 'S')?
        <Text style={styles.titleText}> Mis productos </Text>
        :
        <Text style={styles.titleText}> Productos de {email} </Text>

      }

        <Button 
                 onPress={() => getProducts() } 
                 title = 'Cargar'
                 color="#a2cff0" //azul iconico
        />
          
        <FlatList
          numColumns = {2}
          data={products}
          renderItem={({ item }) => ( 
            <>
            <View style={styles.container2}>

            { 
            (wishlist == [] )?
                  <ProductCardId 
                  id={item}
                  uid={id} 
                  guardado= {false}

              />
            :
                  <ProductCardId 
                  id={item}
                  uid={id} 
                  guardado= {wishlist.includes(item) }

              />
            }

 
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


