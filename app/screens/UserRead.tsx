import { isTemplateElement } from '@babel/types';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableHighlight, ScrollView, Alert, Button } from 'react-native';
import { CustomMap, CustomMarker} from '../components/MapComponents';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';
import retrieveSession from '../hooks/retrieveSession'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

import '../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';

/*
wishlist -> provada
(boton te lleva a ver los productos) -> productos de un usuario en pestaña aparte
boton para cambiar idiomas

*/


  export default function ViewUserScreenScreen({ navigation, route}: RootTabScreenProps<'ViewUser'>) {
    
    //id del usuario que se recibe y se desea ver
    // var userid: string | null | undefined;

    var userid = route.params;
    //var userid = '61c215918e402966b2c13e8d'; 

    //Datos de un usuario
    const [email, setEmail] = useState('Cargando...');
    const [name, setName]= useState('Cargando...');
    const [location, setLocation] = useState('Cargando...');
    const [level, setLevel] = useState('Cargando...');
    const [postalCode, setPostalCode] = useState('Cargando...');
    const [ecoPoints, setEcoPoints] = useState('Cargando...');
    const [score, setScore] = useState('Cargando...');
    const [latitude, setLatitude] = useState(39.03385);
    const [longitude, setLongitude] = useState(125.75432);

    //sesion
    const [session, setSession] = React.useState({
      id: "",
      user:"",
      token:""
    });
    
    const [ownProfile, setOwnProfile] = useState(true);
    const [ownProfileAux,  setOwnProfileAux] = useState('S');

    const [following, setFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [followed, setFollowed] = useState([]);

    const [followersSize, setFollowersSize] = useState(0);
    const [followedSize, setFollowedSize] = useState(0);


    
    const [selectedLanguage, setSelectedLanguage] = React.useState();

    const {t, i18n} = useTranslation();
    const [currentLanguage,setLanguage] =useState('');
  
    
    //const [id, setid] = useState('61ba2a4f6bd96835a7895b33'); 
  
    const changeLanguage = value => {
      i18n
        .changeLanguage(value)
        .then(() => setLanguage(value))
        .catch(err => console.log(err));
    };

    var auxiliar =  {id:  '', ownProfileAux:  '' } ;

  const getData = async () => {
    const sess = await retrieveSession();
      console.log(sess)
      setSession(sess);
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


  const getUserInfo = async () => {
    let aux
    if (userid != null || userid === "") {
      aux = userid
    }
    else {
      aux = session.id
    }

    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + aux);

    setEmail(response.data.email);
    setName(response.data.userId);
    if(aux !== session.id)
      setOwnProfile(false); //HK -> a de ser false
      setOwnProfileAux('N');
    console.log('nuestro perfil? ' + ownProfile);

    userid = aux;

    console.log('sol ' + userid + ' sol');

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
    console.log("seguidores " + followed);
    if (response.data.followers == null){
       setFollowers([]);
       setFollowersSize(0);
    }
    else{
       setFollowers(response.data.followers);
       setFollowersSize(response.data.followers.length);
    }


    if(response.data.followed == null){
       setFollowed([]);
       setFollowedSize(0);

    }
    else{
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
    const body1 = {email: email}
    let response = axios
    .post("https://app4me4u.herokuapp.com/api/user/" + session.id + "/follow", body1)
    .then(function (response){
      console.log("siguiendo a " + response.data.userID)
    })
    .catch(function(error){
      console.log(error);
    });

    setFollowing(true);
    // añadir follower, usuario del perfil es seguido por el usuario logueado
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

    // Alert.alert(
    //   "Desea cargar este perfil?" ,
    //   "puede contener datos extraños?",
    //   [{ text: 'cargar', onPress: () => getUserInfo() }]
    //   )


    auxiliar =  {id:  userid, ownProfileAux:  ownProfileAux } ;
    console.log(session.id + ' ' + session.token + ' ' + session.user);


    console.log('cosa: ' +  userid + ' '+ ownProfileAux );

    

  }, []);  

  
 

  return(
    <>

      <ScrollView>
        <View style ={styles.container}>

      {ownProfile? 

        
          <View style={{ alignItems: 'center',
          justifyContent: 'center'}}>
            <TouchableOpacity
            onPress={() => {
              getUserInfo();
          }}>
            <Text style={styles.titleText}> {t('Mi perfil')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("UserUpdate", session.id);
                }}
                style={{width: 150,  marginTop: 5}}
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
          <View style={{ alignItems: 'center',
          justifyContent: 'center'}}>
            <TouchableOpacity
            onPress={() => {
              getUserInfo();
          }}>
            <Text style={styles.titleText}> Perfil ajeno</Text>
            </TouchableOpacity>
          </View>          
        }
        

        <Text style={styles.text}>
            {t('Correo:')} <Text style={styles.text2}>{email}</Text>
        </Text>


        {ownProfile? 
          <></>
          :
          <View style={{ alignItems: 'center',
           justifyContent: 'center'}}>
             {following? 
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



        <View style={styles.container2}>
          <Text style={styles.text} onPress={onPressFollowers}>
              {t('Seguidores')}: <Text style={styles.text2}>{followersSize}</Text>
          </Text>
          <Text>        </Text>
          <Text style={styles.text} onPress={onPressFollowed}>
              {t('Seguidos')}: <Text style={styles.text2}>{followedSize}</Text>
          </Text>   
        </View>
    
        <Text style={styles.text}>
            {t('Nivel')}: <Text style={styles.text2}>{level}</Text>
        </Text>

        <Text style={styles.text}>
            Ecos: <Text style={styles.text2}>{ecoPoints}</Text> 🍃
        </Text>

        <Text style={styles.text}>
            {t('Puntuación')}: <Text style={styles.text2}>{score}</Text> ⭐
        </Text>


       



          <Button 
                 onPress={() =>  navigation.navigate( 'UserProducts', {id: userid/*, ownProfileAux: ownProfileAux*/}) } 
                 title = {t('Mis productos')}
                 color="#a2cff0" //azul iconico
          />

          {ownProfile?  
          // ir a wishlist si es tu perfil
            <Button
              onPress={() => navigation.navigate('UserWishlist', userid)}
              title={t("Productos deseados")}
              color="#a2cff0" //azul iconico
            />
          : <></>  }



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


        {/*
        //Descomentarizar cuando se haga merge con HU 49_Borrar_mi_Usuario,
        <Text onPress={() => navigation.navigate('Login')}>     
          <DeleteUser children= id></DeleteUser>>
        </Text>
        */}
        
        {ownProfile?  
          // Cambiar de idioma
          <>
            {/* <Text style={styles.titlePicker}> Idioma </Text> */}

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
            
            </>
          : 
          
          <Button
            onPress={() => {Alert.alert(
              "Denunciado" ,
              "Has reportado a este usuario",
              [{text: "Aceptar"}]
              )}}
            title="Reportar usuario"
            color="#FF0000" //azul iconico
          />
        
        }

        </View>
      </ScrollView>
      <NavigationBar  navigation={navigation} profile={true}/>
      </>
  );


}

const styles = StyleSheet.create({
  container: {
//    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
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
    margin : 10,
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


