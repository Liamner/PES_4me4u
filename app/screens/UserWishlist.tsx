import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';





import { StyleSheet, ScrollView, FlatList, TouchableOpacity, Text, Button } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import NavigationBar from '../components/NavigationBar';
import retrieveSession from '../hooks/retrieveSession';
import ProductCard from '../components/ProductCard';

export default function UserWishlist({ navigation }: RootTabScreenProps<'UserWishlist'>) {

  const [session, setSession] = React.useState({
    id: "",
    user:"",
    token:""
  });

  
  const [productsId, setProductsId] = useState([]);

  var [uid, setUid] = useState('');

  const getWishlist = async () => {
      
      setUid(session.id);  

      const config = {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      }

      let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + session.id + '/wishlist', config);
      // setProductsId(response.data.wishlist); //lista de ids de productos en la



      

      setProductsId(response.data); //lista de ids de productos en la

      console.log(response.data);
      console.log('uid; ' + uid);
      console.log('session id; ' + session.id);
      console.log('token; ' + session.token);

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


    getWishlist();



    
  }, []);
  
  return (

    <View>
      <ScrollView>


    
        <Text style={styles.titleText}> Productos deseados</Text>
    
        <Button 
                 onPress={() => getWishlist() } 
                 title = 'Cargar'
                 color="#a2cff0" //azul iconico
        />


        <Text style={styles.titleText}>   </Text>



      <FlatList
        numColumns={2}
        data={productsId}
        renderItem={({ item }) => (
          <ProductCard id={item._id} navigation={navigation} name={item.name} guardado={true} arrayTratos={item.exchange} imageUri={item.img[0].url} uid={session.id} token={session.token} />
        )}
        keyExtractor={item => item._id}
      />


          <Text style={styles.titleText}>   </Text>


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
  container2: {
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 0,
    width: '50%',
//    height: 310,
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
    fontSize: 27,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  productText: {
    textAlign: 'left',
    fontSize: 20,
    margin: 10
  },
});


