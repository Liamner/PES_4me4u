import { isTemplateElement } from '@babel/types';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableHighlight, TouchableOpacity, ScrollView, Alert, Button } from 'react-native';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';

import axios from 'axios';


export default function ViewUserScreenScreen({ navigation }: RootTabScreenProps<'ViewUserScreen'>) {
  //Datos
/*    const [data, setData] = React.useState([
        {
        userId: 'identificadorInedintificable',    
        email: 'a@mail.algo',    
        pwd: 'contraseña',//contraseña
        role:'USER',
        location: 'BARCELONA',
        level: '1',
        postalCode: '08028',
        ecoPoints: '10',
        score: '5.0'
        }
    ]);*/
    //Datos de un usuario
    const email = 'a@mail.algo'
    const location = 'BARCELONA'
    const level = '1'
    const postalCode = '08028'
    const ecoPoints = '10'
    const score = '5.0'


    const [products, setproducts] = React.useState([
      {
        id: '61768a008b251b960db42a49',
        name: 'HarryPotter',
        state: 'available'
      },
      {
        id: "2",
        name: "Coche",
        state: "reserved"
      },
      {
        id: "3",
        name: "Libro",
        state: "provide"
      }
    ]);



    const userImage: string = 'https://64.media.tumblr.com/7edd9fa2812d2b50d054f3f6cd2feb6e/tumblr_inline_nso5kh0ba41si53ec_1280.png'
    const [currentPage, setCurrentPage] = useState(1);


    //Funciones
    const Scroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
        const width = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
    
        const currentNumber = Math.floor((contentOffset + 1) / width) + 1;
        setCurrentPage(currentNumber);
      };






  return(
    <View style ={styles.container}>
      <ScrollView>
        
        <Image
            style={styles.image}
            source={{
                uri: userImage,
            }}
        />
        
        <Text style={styles.text}>
            Correo: <Text style={styles.text2}>{email}</Text>
        </Text>
      
        <Text style={styles.text}>
            Localización: <Text style={styles.text2}>{location}</Text>
        </Text>

        <Text style={styles.text}>
            Nivel: <Text style={styles.text2}>{level}</Text>
        </Text>

        <Text style={styles.text}>
            Código postal: <Text style={styles.text2}>{postalCode}</Text>
        </Text>

        <Text style={styles.text}>
            Ecos: <Text style={styles.text2}>{ecoPoints}</Text> 🍃
        </Text>

        <Text style={styles.text}>
            Puntuación: <Text style={styles.text2}>{score}</Text> ⭐
        </Text>

        <Text style={styles.titleText}>Tus productos</Text>




        <FlatList
          numColumns = {1}
          data={products}
          renderItem={({ item }) => ( 
            <>

            <Text style={styles.productText}>
              <Text style={styles.deleteButton} onPress={() => Alert.alert(
                    "Alerta",
                    "id:"+ item.id ,
                    [{text: "Aceptar"}]
                  )}>Borrar
                  </Text>  Estado: {item.state}   {item.name} </Text>

    
            </>
          )}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd={Scroll}
        />

        <Text></Text>

      </ScrollView>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    fontFamily: "Cochin",
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
    fontFamily: "Cochin",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  productText: {
    textAlign: 'left',
    fontFamily: "Cochin",
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

});




















/*

  const putUpdateStatus = async (id: string, new_state: string) => {
    // 'available', 'reserved', 'provide'
    // disponible , reservado,  prestado

    axios.put('https://app4me4u.herokuapp.com/api/product/updateState/' + id, { state: new_state } )
      .then(response => {
        //setData(response.data as {});
    })
    .catch(function (error) {
      console.log(error);
  });




};

//En caso de recibir el id como variable      /${id}`,    en lugar de /61645afb7f09d55d235f9c83

//Funcion que actualiza el estado de un producto en funcion del new_state pasado
const updateStatus = (item: { id: string; name: string; state: string; }, new_state: string) => {
  item.state = new_state
  putUpdateStatus(item.id, new_state);
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

*/