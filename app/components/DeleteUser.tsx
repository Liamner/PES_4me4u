import React, { Component } from "react";
import {Alert, Button, StyleSheet, View } from "react-native";

import axios from 'axios'
import { not } from "react-native-reanimated";
import navigation from "../navigation";


// import DeleteUser from '../components/DeleteUser';
// <DeleteUser children=  "ID-DEL-USUARIO" />
/*
 <View>
    <DeleteUser children= "617c460aef55c17ade814365"></DeleteUser>
</View>
 */

class DeleteUser extends Component {
      state = { isHungry: true };

    //Datos

    APIDeleteUser= (id: {} | null | undefined) =>{
        if(id != null){

            //    https://app4me4u.herokuapp.com/api/deleteUser/:id
        const response = axios.delete('https://app4me4u.herokuapp.com/api/deleteUser/61952cf8ad3b69daa6c98e70' )
        //const response = axios.delete('https://app4me4u.herokuapp.com/api/deleteUser/' + id )
        
            .then(res => {
            console.log(res);})
    }
        }




    //Alerta de confirmación de borrado
    deleteUserConfirmationAlert = (id: {} | null | undefined) =>
    Alert.alert(
        "Alerta",
        "¿Está seguro de que desea borrar el producto seleccionado?",
        [
        {
            text: "No",
//          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Sí", onPress: () => this.APIDeleteUser(id) }
        ]
    );

  render() {
    return (
        <View>

            <Button
                onPress={() => this.deleteUserConfirmationAlert(( this.props.children))}
                title = "Eliminar mi cuenta"
                color="#FF0000"//color de fondo rojo
            />

       </View>
    );
  }
}


  
const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    title: {
    fontSize: 20,
    fontWeight: 'bold',
    },
    separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    },
    button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    }
});

export default DeleteUser;
