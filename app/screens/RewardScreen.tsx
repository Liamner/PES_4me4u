import * as React from 'react';
import { useState } from 'react';

import { Button, Platform,ScrollView, Image, StyleSheet,Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProductCardElement from './ProductCardElement'

import axios from 'axios';


export default function RewardScreen({ navigation }: RootTabScreenProps<'RewardScreen'>) {
  
  const [id, setid] = useState('61ba2a4f6bd96835a7895b33');
  const [email, setEmail] = useState('');
  const [reward, setReward] = useState('');

  //const [id, setid] = useState(user_id);


  const getUserInfo = async () => {
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + id );


    setEmail(response.data.email);

  };


  const getRewards = async () => {
//    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + id + "/products");  //no puede ser esta llamada
    let response = await axios.get('https://app4me4u.herokuapp.com/api//user/' + id + "/rewards");  //
    console.log(response.data.ecoPoints);
    setReward(response.data.ecoPoints );
    //10151515151515151515
    //1015151515151515151515
//  router.route('/user/:id/rewards')
//.get(userController.getUserRewards)

//  setReward('Trofeos');

    Alert.alert(
      "Trofeos obtenidos!",
      "Has obtenido todos tus trofeos",
      [
      {
          text: "Ok",
      }
      ]
  );
  };


  
  getUserInfo();

  return (
    <>
      <View>            
        <Text> Trofeos de: {email}</Text>
        <Text> {reward}</Text>


        <Button
              onPress={() => getRewards()}
              title = "Get my rewards"
              color="#A2CFF0" //color de fondo establecido
        />



      </View>                    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '50%',
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: 'white',
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
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
  },  
});


/*
{"gift":0,"loans":0,"exchanges":0,"followers":[],"followed":[],"wishlist":[],
"commentsRecived":[],"commentsDone":[],
"_id":"61a2500c9b1c6cb5e2e0aa90","name":"rateUser","email":"rateUser@gmail.com","pwd":"12346","role":"USER",
"level":"1","ecoPoints":"10","score":"0","rateScore":10,"totalRateScore":0,"tradesRated":1,
"products":[],"latitude":37.78825,"longitude":-122.4324,"__v":0

*/