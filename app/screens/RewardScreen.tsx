import * as React from 'react';
import { useState } from 'react';

import { Button, Platform,ScrollView, Image, StyleSheet,Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';


import axios from 'axios';


export default function RewardScreen({ navigation, route }: RootTabScreenProps<'RewardScreen'>) {
  
  //Se recibe el id del usuario del que se quiere saber los puntos y transacciones

//  const id = route.params;
const [id, setid] = useState('61ba2e3f85c2c10306f0117a'); //HK -> borrar y descomentar linea de arriba



  const [email, setEmail] = useState('');
  const [reward, setReward] = useState('');
  const [gift, setGift] = useState(-1);
  const [loans, setLoans] = useState(-1);
  const [exchanges, setExchanges] = useState(-1);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [transaccionesTotales, setTransaccionesTotales] = useState(0);
  //  "gift":0,"loans":0,"exchanges"
  
//const [id, setid] = useState(user_id);
 
  


  const getUserInfo = async () => {
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + id );

    setGift(response.data.gift);
    setLoans(response.data.loans);
    setExchanges(response.data.exchanges);

    setEmail(response.data.email);

    setEcoPoints(response.data.ecoPoints);

    setTransaccionesTotales(gift + loans + exchanges);


  };


  const getRewards = async () => {

    //devuelve 400- bad request
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + id + '/rewards');  //getUserRewards por transacción cualquiera
    
    console.log(response);

    //en caso de ganar un trofeo
/*    if(gift == 7 || loans == 7 || exchanges == 7){


      Alert.alert(
        "Misión cumplida!",
        "Has obtenido puntos extra.",
        [ {text: "Ok"} ]

      );
    }*/
    

    

 
    
//  router.route('/user/:id/rewards')
//.get(userController.getUserRewards)

//  setReward('Trofeos');


  };


  
  getUserInfo();

  return (
    <>
      <View style = {styles.container}>            
      <Text style={styles.titleText}> Trofeos de {email} </Text>

      <View style = {styles.container2}>


        <Text style={styles.text3}>
              Ecos: <Text style={styles.text2}>{ecoPoints}</Text> 🍃
        </Text>

          <Text style={styles.text}>
          Regalos hechos: <Text style={styles.text2}>{gift}</Text> 
        </Text>

        <Text style={styles.text}>
          Prestamos hechos:  <Text style={styles.text2}>{loans}</Text> 
        </Text>

        <Text style={styles.text}>
        Intercambios hechos:  <Text style={styles.text2}>{exchanges}</Text> 
        </Text>

        <Text style={styles.text}>
        transacciones totales:  <Text style={styles.text2}>{transaccionesTotales}</Text> 
        </Text>

        
      </View>                    

    </View>                    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',

    backgroundColor: '#a2cff0',
  }, 
  container2: {

    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 50

  }, 
  cameraImage: {
    width: '100%', 
    height: '75%', 
    borderRadius: 7,
    alignItems: 'flex-start'
        
  },
  icono: {
    width: 30, 
    height: '100%',     
    alignItems: 'flex-start'    ,
    marginHorizontal: 2,
        
  },
  touchable: {
    width: '20%', 
    height: '100%',     
    borderRadius: 10,
    borderColor: 'green',
    alignItems: 'flex-start'           
  },
  title: {
    fontSize: 16,
    color: 'black',
    marginTop: '2%',
    marginLeft: '5%',
    width: '90%',
  },  
  titleText: {
    padding: 10,
    textAlign: "center",
    //fontFamily: "Cochin",
    fontSize: 27,
    fontWeight: "bold",
    textDecorationLine: "underline",
    width: '100%'
  },
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
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
  text3: {
    textAlign: 'center',
    //fontFamily: "Cochin",
    fontSize: 25,
    margin:10,
    fontStyle: 'italic'
  },
});


/*
{"gift":0,"loans":0,"exchanges":0,"followers":[],"followed":[],"wishlist":[],
"commentsRecived":[],"commentsDone":[],
"_id":"61a2500c9b1c6cb5e2e0aa90","name":"rateUser","email":"rateUser@gmail.com","pwd":"12346","role":"USER",
"level":"1","ecoPoints":"10","score":"0","rateScore":10,"totalRateScore":0,"tradesRated":1,
"products":[],"latitude":37.78825,"longitude":-122.4324,"__v":0

*/