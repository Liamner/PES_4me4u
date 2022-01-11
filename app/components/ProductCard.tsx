import React, { Component } from "react";
import { Alert, Button, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import axios from 'axios'
import { not } from "react-native-reanimated";
import navigation from "../navigation";
import { functionExpression } from "@babel/types";
import Icon from "react-native-vector-icons/Ionicons";

type CardProps = {
  navigation: any,
  id: string,
  uid: string,
  name: string,
  guardado: boolean,
  imageUri?: string,
  arrayTratos: string[],
  token: string
}

export function ProductCard({ navigation, id, uid, name, guardado, imageUri, arrayTratos, token }: CardProps) {
  var prestar = false;
  var intercambiar = false;
  var dar = false;
  arrayTratos.forEach(element => {
    if (element == "exchange") intercambiar = true;
    if (element == "present") dar = true;
    if (element == "provide") prestar = true
  });
  const guardarProducto = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    await axios.put('https://app4me4u.herokuapp.com/api/user/' + uid + '/AddToWishlist', {
      idProduct: id
    }, config).then(function (response) {
      console.log(response);
      guardado = true;
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const noGuardarProducto = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    await axios.delete('https://app4me4u.herokuapp.com/api/user/' + uid + '/DeleteFromWishlist', {
      idProduct: id
    }, config).then(function (response) {
      console.log(response);
      guardado = false;
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("ProductRead", {pid: id, reload: false})}>
          <Image source={{ uri: imageUri }} style={styles.cameraImage} />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: '100%',
            height: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "#f3f1ed",
              flexDirection: "row",
              width: '80%',
              height: '100%',
              alignContent: 'flex-end',
              paddingLeft: 10,
            }} >
            {prestar && <Icon name='time-outline' size={30} />}
            {intercambiar && <Icon name='repeat-outline' size={30} />}
            {dar && <Icon name='gift-outline' size={30} />}
          </View>

          <View
            style={{
              backgroundColor: "#f3f1ed",
              flexDirection: "row",
              width: '20%',
              height: '100%',
            }} >
            
            {/*guardado && <TouchableOpacity style={{
              width: 30,
              height: '100%',

            }} onPress={noGuardarProducto}>
              <Icon name='heart' size={30} color={'red'} />
            </TouchableOpacity>}
            {!guardado && <TouchableOpacity style={{
              width: 30,
              height: '100%',
            }} onPress={guardarProducto}>
              <Icon name='heart-outline' size={30} color={'black'} />
            </TouchableOpacity>*/}

            {guardado?
              <TouchableOpacity style={{
                width: 30,
                height: '100%',
              }} onPress={noGuardarProducto}>
                <Icon name='heart' size={30} color={'red'} />
              </TouchableOpacity>
            :
              <TouchableOpacity style={{
                width: 30,
                height: '100%',
              }} onPress={guardarProducto}>
                <Icon name='heart-outline' size={30} color={'black'} />
              </TouchableOpacity>
            }

          </View>
        </View>
        <Text style={styles.title}>{name}</Text>
      </View>
    </>
  )

}
const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: 290,
    borderRadius: 10,
    backgroundColor: '#f3f1ed',
    margin: '1%'
  },
  cameraImage: {
    width: '100%',
    height: 220,
    borderRadius: 7,
    alignItems: 'flex-start'

  },
  icono: {
    width: 30,
    height: '100%',
    alignItems: 'flex-start',
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


export default ProductCard;