import React, { Component } from "react";
import {Alert, Button, StyleSheet, View } from "react-native";

import axios from 'axios'
import { not } from "react-native-reanimated";
import navigation from "../navigation";
import SignUp from '../screens/SignUpScreen';


// import deleteUser from '../components/DeleteUser';
// <deleteUser children=  "ID-DEL-USUARIO" />

class deleteUser extends Component {
      state = { isHungry: true };

    //Datos

    APIDeleteUser= (id: {} | null | undefined) =>{

//    https://app4me4u.herokuapp.com/api/deleteUser/:id
        const response = axios.delete('https://app4me4u.herokuapp.com/api/deleteUser/' + id /*61928e13b1d6953346cad476*/)
            .then(res => {
            console.log(res);})
    }

    //función que se encarga de borrar el boton que se ha pulsado
    removeUser = (id: {} | null | undefined) => {
        if (id != null){
            this.APIDeleteUser(id.toString)
            //navigation.navigate("SignUp")
            //AÑADIR TRATAMIENTO PARA UNA VEZ CERRADA LA CUENTA
        }

    };

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
        { text: "Sí", onPress: () => this.removeUser(id) }
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

export default deleteUser;
