import { isTemplateElement } from '@babel/types';
import * as React from 'react';

import { StyleSheet, Button, FlatList, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import axios from 'axios';







export default function ActualizarEstadoProducto({ navigation }: RootTabScreenProps<'ActualizarEstadoProducto'>) {
  //Datos
  const [data, setData] = React.useState([
    {
      id: '61645afb7f09d55d235f9c8',
      name: 'HarryPotter',
      state: 'available'
    }/*,
    {
      id: "2",
      name: "Coche",
      state: "reserved"
    },
    {
      id: "3",
      name: "Libro",
      state: "provide"
    },*/
  ]);


  const putUpdateStatus = async (new_state: string) => {
    // 'available', 'reserved', 'provide'
    // disponible , reservado,  prestado
    axios.put('https://app4me4u.herokuapp.com/api/product/updateState/61645afb7f09d55d235f9c83', new_state)
      .then(response => {
        /*setData(response.data as {});*/
      })
      .catch(function (error) {
        console.log(error);
    });



  
  };

 //En caso de recibir el id como variable      /${id}`,    en lugar de /61645afb7f09d55d235f9c83
 
  //Funcion que actualiza el estado de un producto en funcion del new_state pasado
  const updateStatus = (item: { id: string; name: string; state: string; }, new_state: string) => {
    item.state = new_state
    putUpdateStatus(new_state);
    setData((prevData) => { 
      return prevData.filter (data => data.id  != null); 
    });
  };

  //Ventana que permite seleccionar el nuevo estado del objeto o volver a atras
  const updateStatusAlert = (item: { id: string; name: string; state: string; }) =>
    Alert.alert(
      "Introduce el nuevo estado",
      "Estado actual: " + item.state,
      [
        { text: 'available', onPress: () => updateStatus(item, 'available') },
        { text: 'reserved',   onPress: () => updateStatus(item, 'reserved') },
        { text: 'provide',    onPress: () => updateStatus(item, 'provide') },
        { text: 'Cancelar'}
      ]
    );


  return(
    <View style ={styles.container}>
      <FlatList
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id}
        data = {data}
        renderItem={({ item }) => (
          <>
            <Text style={styles.item}>
              {item.name} estado: {item.state}
            </Text>

            <Button
              onPress={() => updateStatusAlert(item)}
              title = "Actualizar estado"
              color="#A2CFF0" //color de fondo establecido
            />
          </>
        )}
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});
