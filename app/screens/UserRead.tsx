import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, Alert, Button, AsyncStorage, FlatList } from 'react-native';
import { CustomMap, CustomMarker } from '../components/MapComponents';


import { Text, View } from '../components/Themed';


import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';
import retrieveSession from '../hooks/retrieveSession'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import UserProducts from './UserProducts';

import '../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';

/*
wishlist -> provada
(boton te lleva a ver los productos) -> productos de un usuario en pestaña aparte
boton para cambiar idiomas

*/


export default function ViewUserScreenScreen({ navigation, route }: RootTabScreenProps<'ViewUser'>) {

  var userid = route.params;

  //Datos de un usuario
  const [id, setId] = useState('');
  const [email, setEmail] = useState('Cargando...');
  const [name, setName] = useState('Cargando...');
  const [level, setLevel] = useState('Cargando...');

  const [ecoPoints, setEcoPoints] = useState('Cargando...');
  const [score, setScore] = useState('Cargando...');
  const [products, setProducts] = useState([]);
  const [latitude, setLatitude] = useState(39.03385);
  const [longitude, setLongitude] = useState(125.75432);

  //sesion
  const [session, setSession] = React.useState({
    id: "",
    user: "",
    token: ""
  });

  const [ownProfile, setOwnProfile] = useState(true);
  const [ownProfileAux, setOwnProfileAux] = useState('S');

  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followed, setFollowed] = useState([]);

  const [followersSize, setFollowersSize] = useState(0);
  const [followedSize, setFollowedSize] = useState(0);



  const [selectedLanguage, setSelectedLanguage] = React.useState();

  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('');


  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  var auxiliar = { id: '', ownProfileAux: '' };

  const getData = async () => {
    try {
      const value = await retrieveSession()
      if (value !== null) {
        setSession(value)
        if (userid === undefined) {
          userid = value.id
          setId(value.id)
          console.log(userid)
        }
        if (userid !== value.id)
          setOwnProfile(false); //HK -> a de ser false
        setOwnProfileAux('N');
      }
      else {
        console.log("empty")
      }
    } catch (e) {
      console.log(e)
    }
    console.log(session)
    getUserInfo();
    getProducts();
  }




  //    const [wishlist, setWishlist] = React.useState([]);




  const [currentPage, setCurrentPage] = useState(1);


  //Funciones
  const Scroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const currentNumber = Math.floor((contentOffset + 1) / width) + 1;
    setCurrentPage(currentNumber);
  };

  const getProducts = async () => {
    console.log(userid)
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + userid + '/products');
    setProducts(response.data);
  };


  const getUserInfo = async () => {
    console.log('userid: ' + userid)
    console.log(session)



    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + userid);

    setEmail(response.data.email);
    setName(response.data.userId);

    console.log('nuestro perfil? ' + ownProfile);

    console.log('sol ' + userid + ' sol');

    setLevel(response.data.level);

    setEcoPoints(response.data.ecoPoints);
    setScore(response.data.score);

    if (response.data.latitude == null) setLatitude(39.03385);
    else setLatitude(response.data.latitude);

    if (response.data.longitude == null) setLongitude(125.75432);
    else setLongitude(response.data.longitude);

    setFollowers(response.data.followers);
    setFollowed(response.data.followed);
    console.log("seguidores " + followed);
    if (response.data.followers == null) {
      setFollowers([]);
      setFollowersSize(0);
    }
    else {
      setFollowers(response.data.followers);
      setFollowersSize(response.data.followers.length);
    }


    if (response.data.followed == null) {
      setFollowed([]);
      setFollowedSize(0);

    }
    else {
      setFollowed(response.data.followed);
      setFollowedSize(response.data.followed.length);
    }



    /*    
       //en caso de tener datos desconocidos
       if(response.data.XXX == null) setXXX('Desconocido');
        else setXXX(response.data.XXX);
        */

  };




  async function followUser() {
    // añadir followed (a quien sigues), usuario logueado sigue al usuario del perfil
    const body = { email: email }
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }
    let response = axios
      .post("https://app4me4u.herokuapp.com/api/user/" + session.id + "/follow", body, config)
      .then(function (response) {
        console.log("siguiendo a " + response.data.userID)
      })
      .catch(function (error) {
        console.log(error);
      });
    setFollowing(!following);
    // añadir follower, usuario del perfil es seguido por el usuario logueado
  }

  const onPressFollowers = () => {
    if (followersSize == 0) {
      Alert.alert(
        "Error",
        "Este usuario no tine ningún seguidor",
        [{ text: "Aceptar" }]
      )
    }
    else {
      navigation.navigate('FollowersScreen', { list: followers });
    }
  };



  const onPressFollowed = () => {
    if (followedSize == 0) {
      Alert.alert(
        "Error",
        "Este usuario no es seguido por nadie",
        [{ text: "Aceptar" }]
      )
    }
    else {
      navigation.navigate('FollowedScreen', { list: followed });
    }
  };

  React.useEffect(() => {
    getData();

  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.text2}>{name}    {t('Nivel')}:{level}   </Text>
          {ownProfile ?
            <View style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UserUpdate", session.id);
                }}
                style={{ width: 150, marginTop: 5 }}
              >
                <LinearGradient
                  colors={['#a2cff0', '#ADE8F4']}
                  style={styles.followButon}
                >
                  <Text style={[styles.textFollow,
                  { color: '#fff' }]}>
                    Editar Perfil
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            :
            <View style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {following ?
                <TouchableOpacity
                  onPress={() => {
                    followUser();
                  }}
                  style={{ width: 150 }}
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
                  style={{ width: 150 }}
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
        </View>

        {ownProfile ?
          <></>
          :
          <View style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>

          </View>
        }
        <View style={styles.row}>
          <Text style={styles.text} onPress={onPressFollowers}>
            {t('Seguidores')}: <Text style={styles.text2}>{followersSize}</Text>
          </Text>
          <Text>        </Text>
          <Text style={styles.text} onPress={onPressFollowed}>
            {t('Seguidos')}: <Text style={styles.text2}>{followedSize}</Text>
          </Text>
        </View>
        <View style={styles.row}>
          {ownProfile ?
            <Text style={styles.text}>
              Ecos: <Text style={styles.text2}>{ecoPoints} 🍃  </Text>
            </Text>
            :
            <></>
          }

          <Text style={styles.text}>
            {t('Puntuación')}: <Text style={styles.text2}>{score} ⭐</Text>
          </Text>
        </View>
        {ownProfile ?
          // ir a wishlist si es tu perfil
          <Button
            onPress={() => navigation.navigate('UserWishlist', id)}
            title={t("Productos deseados")}
            color="#a2cff0" //azul iconico
          />
          :
          <></>}

        {latitude !== undefined ?
        <>
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
        </>
        :
        <></>
        }

        <Text style={styles.text}>{t('Mis productos')}</Text>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <ProductCard id={item._id} navigation={navigation} name={item.name} arrayTratos={item.exchange} imageUri={item.img[0].url} uid={session.id} token={session.token} />
          )}
          keyExtractor={item => item._id}
        />

        {/*
        //Descomentarizar cuando se haga merge con HU 49_Borrar_mi_Usuario,
        <Text onPress={() => navigation.navigate('Login')}>     
          <DeleteUser children= id></DeleteUser>>
        </Text>
        */}

        {ownProfile ?
          // Cambiar de idioma
          <Picker
            selectedValue={currentLanguage}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              changeLanguage(itemValue)
            }>
            <Picker.Item label={t("Cambiar el idioma...")} value={i18n.language} />
            <Picker.Item label="Castellano" value="es" />
            <Picker.Item label="Catalán" value="cat" />
          </Picker>
          :

          <Button
            onPress={() => {
              Alert.alert(
                "Denunciado",
                "Has reportado a este usuario",
                [{ text: "Aceptar" }]
              )
            }}
            title="Reportar usuario"
            color="#FF0000" //azul iconico
          />

        }
      </ScrollView>
      {ownProfile ?
        <NavigationBar navigation={navigation} profile={true} />
        :
        <NavigationBar navigation={navigation} />
      }

    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 5,
  },
  container2: {
    //    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    padding: 0

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    width: '25%',
    backgroundColor: '#a2cff0',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: "normal"
  },
  text2: {
    fontSize: 20,
    fontWeight: "bold",
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
    fontSize: 27,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  productText: {
    textAlign: 'left',
    //fontFamily: "Cochin",
    fontSize: 20,
    margin: 10,
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
  titlePicker: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    width: '90%',
  },
  picker: {
    marginVertical: 10,
    height: 60,
    width: '90%',
  },

});


