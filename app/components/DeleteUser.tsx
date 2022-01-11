import React, { Component } from "react";
import {Alert, AsyncStorage, Button, StyleSheet, View } from "react-native";

import axios from 'axios'
import { not } from "react-native-reanimated";
import navigation from "../navigation";
import retrieveSession from '../hooks/retrieveSession'

// import DeleteUser from '../components/DeleteUser';
// <DeleteUser children=  "ID-DEL-USUARIO" />
/*
 <View>
    <DeleteUser children= "61952ec8adeb9693da219fc2"></DeleteUser>
</View>
 */

class DeleteUser extends Component {
      state = { isHungry: true };

    //Datos

    APIDeleteUser= (session: {id: string, user:string, token: string}) =>{
        if(session.id != null){
            console.log('eliminar usuario: '+ session.id + ' ' + session.token)
            const config = {
                headers: {
                  Authorization: `Bearer ${session.token}`
                }
              }

            //    https://app4me4u.herokuapp.com/api/deleteUser/:id
        //const response = axios.delete('https://app4me4u.herokuapp.com/api/deleteUser/61952ec8adeb9693da219fc2' )
        const response = axios.delete('https://app4me4u.herokuapp.com/api/deleteUser/' + session.id, {
        headers: {
            Authorization: `Bearer ${session.token}`
          }
        }
        )
            .then(res => {
            console.log(res);})
        }
        
    }




    //Alerta de confirmación de borrado
    deleteUserConfirmationAlert = (session: {id: string, user:string, token: string}) =>
    Alert.alert(
        "¡Importante!",
        "¿Está seguro de que desea eliminar su cuenta de usuario?\nEsta acción es irreversible.",
        [
        {
            text: "No",
//          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Sí", onPress: () => this.APIDeleteUser(session) }
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
