import { isTemplateElement } from '@babel/types';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableHighlight, ScrollView, Alert, Button } from 'react-native';
import { CustomMap, CustomMarker} from '../components/MapComponents';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';
import DeleteUser from '../components/DeleteUser';
import FollowersScreen from '../screens/FollowersScreen';

import axios from 'axios';




export default function ViewUserScreenScreen({ route, navigation }: RootTabScreenProps<'ViewUserScreen'>) {

    //Datos de un usuario

/*
  //llamada para cuando se pase el parametro en la funcion
    const {user_id} = route.params;  
    const [id, setId] = useState(user_id);
*/
    const [id, setId] = useState('61b109e710b12937fee3ebcd'); //eliminar en la versión final
   

    const [email, setEmail] = useState('Cargando...');
    const [level, setLevel] = useState('Cargando...');
    const [ecoPoints, setEcoPoints] = useState('Cargando...');
    const [score, setScore] = useState('Cargando...');

    const [followers, setFollowers] = useState([]);
    const [followed, setFollowed] = useState([]);

    const [followersSize, setFollowersSize] = useState(0);
    const [followedSize, setFollowedSize] = useState(0);

    

    const [latitude, setLatitude] = useState(39.03385);
    const [longitude, setLongitude] = useState(125.75432);

    


    const [products, setproducts] = React.useState([
      {
        id: '61768a008b251b960db42a49',
        name: 'HarryPotter',
        state: 'available'
      },
      {
        id: "2",
        name: "Coche",
        state: "reserved"
      },
      {
        id: "3",
        name: "Libro",
        state: "provide"
      }
    ]);



    const userImage: string = 'https://64.media.tumblr.com/7edd9fa2812d2b50d054f3f6cd2feb6e/tumblr_inline_nso5kh0ba41si53ec_1280.png'
    const [currentPage, setCurrentPage] = useState(1);


    //Funciones
    const Scroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
        const width = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
    
        const currentNumber = Math.floor((contentOffset + 1) / width) + 1;
        setCurrentPage(currentNumber);
      };

      React.useEffect(() => {
        getUserInfo();
      }, []);

  const getUserInfo = async () => {
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + id );
    
    //Datos de usuario
    setEmail(response.data.email);

    setFollowers(response.data.followers);
    setFollowed(response.data.followed);

    setFollowersSize(response.data.followers.length);
    setFollowedSize(response.data.followed.length);

    setLevel(response.data.level);



    setEcoPoints(response.data.ecoPoints);
    setScore(response.data.score);

    if(response.data.latitude == null) setLatitude(39.03385);
    else setLatitude(response.data.latitude);

    if(response.data.longitude == null) setLongitude(125.75432);
    else setLongitude(response.data.longitude);
    
    
    //images
    //https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png

/*    
   //en caso de tener datos desconocidos

   if(response.data.XXX == null) setXXX('Desconocido');
    else setXXX(response.data.XXX);
    */



  };
  
  const onPressFollowers = () => {
    if (followersSize == 0){
      Alert.alert(
      "Error" ,
      "Este usuario no tine ningún seguidor",
      [{text: "Aceptar"}]
      )
    }
    else{
      navigation.navigate('FollowersScreen', {list: followers} );
    }
  };



  const onPressFollowed = () => {
    if (followedSize == 0){
      Alert.alert(
      "Error" ,
      "Este usuario no es seguido por nadie",
      [{text: "Aceptar"}]
      )
    }
    else{
      navigation.navigate('FollowedScreen', {list: followed} );
    }
  };





  



  return(
    <View style ={styles.container}>
      <ScrollView>
        
        <Image
            style={styles.image}
            source={{
                uri: userImage,
            }}
        />
        
        <Text style={styles.text}>
            Correo: <Text style={styles.text2}>{email}</Text>
        </Text>


          <View style={styles.container2}>
          <Text style={styles.text} onPress={onPressFollowers}>
              Followers: <Text style={styles.text2}>{followersSize}</Text>
          </Text>
          <Text>        </Text>
          <Text style={styles.text} onPress={onPressFollowed}>
              Followed: <Text style={styles.text2}>{followedSize}</Text>
          </Text>   
        </View>


        <Text style={styles.text}>
            Nivel: <Text style={styles.text2}>{level}</Text>
        </Text>

        <Text style={styles.text}>
            Ecos: <Text style={styles.text2}>{ecoPoints}</Text> 🍃
        </Text>

        <Text style={styles.text}>
            Puntuación: <Text style={styles.text2}>{score}</Text> ⭐
        </Text>




        <CustomMap
          style={styles.mapview}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <CustomMarker
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
          ></CustomMarker>
        </CustomMap>






        <Text style={styles.titleText}>Tus productos</Text>

        <FlatList
          numColumns = {1}
          data={products}
          renderItem={({ item }) => ( 
            <>
            <Text style={styles.productText}>
              <Text style={styles.deleteButton} onPress={() => Alert.alert(
                    "BORRAR",
                    "id:"+ item.id ,
                    [{text: "Aceptar"}]
                  )}>Borrar
              </Text>
              <Text>   </Text>
              
              <Text onPress={() => Alert.alert(
                    "MODIFICAR ESTADO",
                    "id:"+ item.id ,
                    [{text: "Aceptar"}]
                  )}>Estado: {item.state}</Text>
              <Text>   </Text>
              <Text onPress={() => Alert.alert(
                    "NAVEGACION A VER PRODUCTO",
                    "id:"+ item.id ,
                    [{text: "Aceptar"}]
                  )}
              >{item.name}</Text>
            </Text>
            </>
          )}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd={Scroll}
        />
        
        {/*
        //Descomentarizar cuando se haga merge con HU 49_Borrar_mi_Usuario,
        <Text onPress={() => navigation.navigate('Login')}>     
          <DeleteUser children= id></DeleteUser>>
        </Text>
        */}
        

      </ScrollView>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    padding: 0
    
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    //fontFamily: "Cochin",
    fontSize: 20,
    margin:10,
    fontStyle: 'italic'
  },
  text2: {
    fontWeight: "bold",
    fontStyle: "normal"
  },

  image: {
    width: Layout.width,
    height: Layout.width,
    marginBottom: 10
  },
  titleText: {
    padding: 10,
    textAlign: "center",
    //fontFamily: "Cochin",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  productText: {
    textAlign: 'left',
    //fontFamily: "Cochin",
    fontSize: 20,
    margin:10,
  },
  deleteButton: {
    alignItems: "center",
    //backgroundColor: "#DD0000",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    color: "red"
  },
  mapview: {
    width: '80%',
    height: Layout.width - 175,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 20,
    
  }

});






/*
{"gift":0,"loans":0,"exchanges":0,"_id":"61b109e710b12937fee3ebcd","userId":"Paul","email":"paul@gmail.com",
"pwd":"$2b$10$UErVQlOWUkduGiIUfiRYxuud/Z3aFJmCDSzcBTu3Laks8S38fMJI6","role":"USER","latitude":37.78825,"longitude":-122.4324,
"level":"1","ecoPoints":"10","score":"5.0","products":[],
"followers":[],
"followed":[
      {"wishlist":[],"_id":"61a39004e1e02fe6d177692b","name":"Jose","email":"jose@gmail.com","pwd":"$2b$10$04GfyVk4N062cwm6oQP07e8Cyka12FpYWGOEmM32A/Yrv/hUiX4qK","role":"USER","level":"1","ecoPoints":"10","score":"5.0","products":[],"latitude":37.78825,"longitude":-122.4324,"followers":[],"followed":[],"__v":0},
      {"wishlist":[],"_id":"61a3855a5cd77458b48896ed","name":"Daniel","email":"dani@gmail.com","pwd":"$2b$10$Ssae08HTU.c51d.zfnhbS.d2AeqFiudfrouNXIIFYC6Va6P/vj54e","role":"USER","level":"1","ecoPoints":"10","score":"5.0","products":[],"latitude":37.78825,"longitude":-122.4324,"followers":[],"followed":[],"__v":0},
      {"wishlist":[],"_id":"61a37fb87cdb71a69b9dd3d5","name":"Maria","email":"maria@gmail.com","pwd":"$2b$10$8Al7CcQvOKLTvGZBMQBM0.P41lojxYTX0.mZm1nXipdtrpNwQXLV6","role":"USER","level":"1","ecoPoints":"10","score":"5.0","products":[],"latitude":37.78825,"longitude":-122.4324,"followers":[],"followed":[],"__v":0},
      {"_id":"61a3624f0790a82b35224d4b","name":"Ana","email":"ana@gmail.com","pwd":"$2b$10$Kz7BnPmS1LKL7qRWvsw9H.wWDN6KiL/aZp4HfHqqWF4DnP85V6WHK","role":"USER","level":"1","ecoPoints":"10","score":"5.0","products":[],"latitude":37.78825,"longitude":-122.4324,"followers":[{"_id":"61a39004e1e02fe6d177692b","name":"Jose","email":"jose@gmail.com","pwd":"$2b$10$04GfyVk4N062cwm6oQP07e8Cyka12FpYWGOEmM32A/Yrv/hUiX4qK","role":"USER","level":"1","ecoPoints":"10","score":"5.0","products":[],"latitude":37.78825,"longitude":-122.4324,"followers":[],"followed":[],"__v":0}],"followed":[{"_id":"61a37fb87cdb71a69b9dd3d5","name":"Maria","email":"maria@gmail.com","pwd":"$2b$10$8Al7CcQvOKLTvGZBMQBM0.P41lojxYTX0.mZm1nXipdtrpNwQXLV6","role":"USER","level":"1","ecoPoints":"10","score":"5.0","products":[],"latitude":37.78825,"longitude":-122.4324,"followers":[],"followed":[],"__v":0},{"_id":"61a3855a5cd77458b48896ed","name":"Daniel","email":"dani@gmail.com","pwd":"$2b$10$Ssae08HTU.c51d.zfnhbS.d2AeqFiudfrouNXIIFYC6Va6P/vj54e","role":"USER","level":"1","ecoPoints":"10","score":"5.0","products":[],"latitude":37.78825,"longitude":-122.4324,"followers":[],"followed":[],"__v":0}],"__v":16,"wishlist":[{"publishingDate":"2021-11-29T20:22:18.166Z","_id":"619e6fd140d15287ffe42aca","img":["619e6fd340d15287ffe42acb","619e6fd440d15287ffe42acd","619e6fd640d15287ffe42acf"],"state":"available","name":"nombre","categories":"61797e24b4a4d195aa14be8d","description":"A","exchange":"6193a583e47e769eeaa7a978","__v":0}]}
    ],
"wishlist":[],"__v":4}
*/