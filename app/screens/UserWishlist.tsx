import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

import ProductCardId from '../components/ProductCardId';




import { StyleSheet, ScrollView, FlatList, TouchableOpacity, Text, Button } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import NavigationBar from '../components/NavigationBar';
import retrieveSession from '../hooks/retrieveSession';

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


      let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + uid + '/wishlist');
      // setProductsId(response.data.wishlist); //lista de ids de productos en la



      

      setProductsId(response.data); //lista de ids de productos en la



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
            numColumns = {2}
            data={productsId}
            renderItem={({ item }) => ( 
  
              <View style={styles.container2}>
            
                <ProductCardId
                  id={item}
                  uid={uid} 
                  guardado={true}
                />


              </View>
            
            )}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onMomentumScrollEnd={Scroll}

            
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


