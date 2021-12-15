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
import retrieveSession from '../hooks/retrieveSession'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';


//export default function ViewUserScreenScreen({ navigation}: RootTabScreenProps<'ViewUser'>) {
  export default function ViewUserScreenScreen({ navigation, route}: RootTabScreenProps<'ViewUser'>) {
    var userid = route.params;
    //Datos de un usuario

    //const [id, setid] = useState(user_id);
    const [email, setEmail] = useState('Cargando...');
    const [location, setLocation] = useState('Cargando...');
    const [level, setLevel] = useState('Cargando...');
    const [postalCode, setPostalCode] = useState('Cargando...');
    const [ecoPoints, setEcoPoints] = useState('Cargando...');
    const [score, setScore] = useState('Cargando...');
    const [latitude, setLatitude] = useState(39.03385);
    const [longitude, setLongitude] = useState(125.75432);
    const [session, setSession] = React.useState({
      id: "",
      user:"",
      token:""
    });
    const [ownProfile, setOwnProfile] = useState(true);
    const [following, setFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [followed, setFollowed] = useState([]);

    const [followersSize, setFollowersSize] = useState(0);
    const [followedSize, setFollowedSize] = useState(0);

  const getData = async () => {
    const sess = await retrieveSession();
      console.log(sess)
      setSession(sess);
    }

  
   /* 
    const email = 'a@mail.algo'
    const location = 'Pyongyang'
    const level = '1'
    const postalCode = '08028'
    const ecoPoints = '10'
    const score = '5.0'
    const latitude = 39.03385
    const longitude = 125.75432
*/

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


  const getUserInfo = async () => {
    let aux
    if (userid != null || userid === "") {
      aux = userid
    }
    else {
      aux = session.id
    }
    //console.log(session.id);
    //console.log(aux);
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + aux);
    setEmail(response.data.email);
    if(aux !== session.id)
      setOwnProfile(false);
    console.log(ownProfile);
    if(response.data.location == null) setLocation('Desconocido');
    else setLocation(response.data.location);

    setLevel(response.data.level);

    if(response.data.postalCode == null) setPostalCode('Desconocido');
    else setPostalCode(response.data.postalCode);

    setEcoPoints(response.data.ecoPoints);
    setScore(response.data.score);

    if(response.data.latitude == null) setLatitude(39.03385);
    else setLatitude(response.data.latitude);

    if(response.data.longitude == null) setLongitude(125.75432);
    else setLongitude(response.data.longitude);
    
   setFollowers(response.data.followers);
    setFollowed(response.data.followed);

    setFollowersSize(response.data.followers.length);
    setFollowedSize(response.data.followed.length);
    //images
    //https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png

/*    
   //en caso de tener datos desconocidos
   if(response.data.XXX == null) setXXX('Desconocido');
    else setXXX(response.data.XXX);
    */


  };

  async function followUser() {
    // añadir followed (a quien sigues), usuario logueado sigue al usuario del perfil
    const body1 = {email: email}
    let response = axios
    .post("https://app4me4u.herokuapp.com/api/user/" + session.id + "/AddFollowed", body1)
    .then(function (response){
      console.log("siguiendo a " + response.data.userID)
    })
    .catch(function(error){
      console.log(error);
    });

    setFollowing(true);
    // añadir follower, usuario del perfil es seguido por el usuario logueado
  }

  function unfollowUser() {
    const body1 = {email: email}
    let response = axios
    .post("https://app4me4u.herokuapp.com/api/user/" + session.id + "/unfollow", body1)
    .then(function (response){
      console.log("dejando de seguir a" + response.data.userID)
    })
    .catch(function(error){
      console.log(error);
    });

    setFollowing(false);
  }

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
  
  React.useEffect(() => {
    getData();
    getUserInfo();
  }, []);  

  
 

  return(
    <View style ={styles.container}>
      <ScrollView>
        
        <Image
            style={styles.image}
            source={{
                uri: userImage,
            }}
        />
        {ownProfile? 
          <View style={{ alignItems: 'center',
          justifyContent: 'center'}}>
            <TouchableOpacity
            onPress={() => {
              getUserInfo();
          }}>
            <Text style={styles.text2}> Mi perfil</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={{ alignItems: 'center',
           justifyContent: 'center'}}>
             {following? 
              <TouchableOpacity
                onPress={() => {
                    unfollowUser();
                }}
                style={{width: 150 }}
              >
                <LinearGradient
                    colors={['#a2cff0', '#ADE8F4']}
                    style={styles.followButon}
                >
                    <Text style={[styles.textFollow,
                    { color: '#fff' }]}>
                        Dejar de seguir
                    </Text>
                </LinearGradient>
              </TouchableOpacity>
             :
             <TouchableOpacity
             onPress={() => {
                 followUser();
             }}
             style={{width: 150 }}
           >
             <LinearGradient
                 colors={['#a2cff0', '#ADE8F4']}
                 style={styles.followButon}
             >
                 <Text style={[styles.textFollow,
                 { color: '#fff' }]}>
                     Seguir
                 </Text>
             </LinearGradient>
           </TouchableOpacity>
            } 
          </View>
          
        }
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

        <Text style={styles.text}>
            Localización: <Text style={styles.text2}>{location}</Text>
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

        <Text style={styles.text}>
            Código postal: <Text style={styles.text2}>{postalCode}</Text>
        </Text>




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
    
  },
  followButon: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textFollow: {
  fontSize: 18,
  fontWeight: 'bold'
},

});