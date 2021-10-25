import * as React from 'react';
import { StyleSheet, Button, Alert, TouchableOpacity, FlatList} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import axios from 'axios'
export default function DeleteButtonScreen({ navigation }: RootTabScreenProps<'DeleteButton'>) {
  //Datos
  const [data, setData] = React.useState([
    {
    id: "616d6282bc69ccaa2163570e"
    }
  ]);


  const APIDeleteProduct= (id: string) =>{

//    https://app4me4u.herokuapp.com/api/product/delete/:id
    const response = axios.delete('https://app4me4u.herokuapp.com/api/product/delete/' + id /*616d6282bc69ccaa2163570e*/)
      .then(res => {
        console.log(res);})
  }

  //función que se encarga de borrar el boton que se ha pulsado
  const removeItem = (id: string) => {
    APIDeleteProduct(id)

    setData((prevData) => { 
      return prevData.filter (data => data.id  != id); 
    });
  };



  //Alerta de confirmación de borrado
  const deleteConfirmationAlert = (id: string) =>
    Alert.alert(
      "Alerta",
      "¿Está seguro de que desea borrar el producto seleccionado?",
      [
        {
          text: "No",
//          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Sí", onPress: () => removeItem(id) }
      ]
    );


  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>†Delete Button†</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
 






      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        horizontal={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
/*
            //otra opción para un boton de borrar con otro tipo de objeto
            <TouchableOpacity

              style={styles.button}
              onPress={() => deleteConfirmationAlert(item.id)}
            >
              <Text>Borrar</Text>
            </TouchableOpacity>
            
*/
          <Button
          onPress={() => deleteConfirmationAlert(item.id)}
          title = "Borrar"
          color="#FF0000"//color de fondo rojo
          />
          );
        }}
      />



    </View>
  );
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
  },
  flatList: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
  }
});
