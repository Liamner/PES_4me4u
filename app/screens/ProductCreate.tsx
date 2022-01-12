import * as React from 'react';
import { Button, Platform, ScrollView, Image, StyleSheet, Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios, { AxiosResponse } from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '../components/Themed';
import { Checkbox } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import { resolvePlugin } from '@babel/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from '../components/NavigationBar';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import retrieveSession from '../hooks/retrieveSession';

export default function CreateProduct({ navigation }: RootTabScreenProps<'CreateProduct'>) {
  const [pid, setProductID] = React.useState('');
  const [name, onChangeName] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [checkedDonar, setCheckedDonar] = React.useState(false);
  const [checkedIntercambiar, setCheckedIntercambiar] = React.useState(false);
  const [checkedPrestar, setCheckedPrestar] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [image3, setImage3] = React.useState(null);
  const [image4, setImage4] = React.useState(null);
  const [image5, setImage5] = React.useState(null);
  const [image6, setImage6] = React.useState(null);
  const imageArray = [image, image2, image3, image4, image5, image6];
  const [session, setSession] = React.useState({
    id: "",
    user: "",
    token: ""
  })

  const { t, i18n } = useTranslation();

  const getData = async () => {
    try {
      const value = await retrieveSession()
      if (value !== null) {
        setSession(value)
        console.log(value)
      }
      else {
        console.log("empty")
      }
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    getData();
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Lo sentimos, necesitamos los permisos de la cámara para que esto funcione!');
        }
      }
    })();
  }, []);

  const setImageById = (id: Number, uri: string) => {
    if (uri != '') {
      if (id == 1) setImage(uri)
      if (id == 2) setImage2(uri)
      if (id == 3) setImage3(uri)
      if (id == 4) setImage4(uri)
      if (id == 5) setImage5(uri)
      if (id == 6) setImage6(uri)
    }
    else {
      if (id == 1) setImage(null)
      if (id == 2) setImage2(null)
      if (id == 3) setImage3(null)
      if (id == 4) setImage4(null)
      if (id == 5) setImage5(null)
      if (id == 6) setImage6(null)
    }
  }


  const unPickImage = async (id: Number) => {
    Alert.alert(
      t('¿Que quieres hacer con tu foto?'),
      '',
      [
        {
          text: t('Eliminar foto'),
          onPress: () => {
            setImageById(id, '');
          },
          style: 'default',
        },
        {
          text: t('Cambiar foto'),
          onPress: () => {
            //setImageById(id, '');
            pickImage(id);
          }
        },
      ],
      { cancelable: false },
    );

  }

  const pickImage = async (id?: Number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageById(id, '');

      if (id == 1) {
        setImage(result.uri);
        newImages.push(result.uri);
      }
      else if (id == 2) {
        setImage2(result.uri);
        newImages.push(result.uri);
      }
      else if (id == 3) {
        setImage3(result.uri);
        newImages.push(result.uri);
      }
      else if (id == 4) {
        setImage4(result.uri);
        newImages.push(result.uri);
      }
      else if (id == 5) {
        setImage5(result.uri);
        newImages.push(result.uri);
      }
      else if (id == 6) {
        setImage6(result.uri);
        newImages.push(result.uri);
      }
    }
  };

  const setImages = async (response: AxiosResponse<unknown, any>) => {
    console.log(newImages);

    newImages.forEach(async (element) => {
      console.log('Empieza post de ' + element);
      const uri = element;
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append('img', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      console.log(formData);

      console.log('pid: ' + response.data._id);

      await axios
        .post('https://app4me4u.herokuapp.com/api/image/' + response.data._id, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(function (response) {
          console.log("New images posted")
          //console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    });

    Alert.alert(
      "Producto creado",
      "El producto ha sido creado",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ])

  }

  const sendApi = async () => {

    var aux: string[] = [];
    var contar = 0;
    // if (checkedIntercambiar) aux.push("exchange");
    // if (checkedPrestar) aux.push("provide");
    // if (checkedDonar) aux.push("present");
    // if (aux.length  == 0) aux.push("present");
    
    if (checkedIntercambiar){
       aux.push("exchange");
       contar = contar + 1;
      }
    if (checkedPrestar){
       aux.push("provide");
       contar = contar + 1;
      }
    if (checkedDonar){
       aux.push("present");
       contar = contar + 1;
      }

      var sendExchange;
    if (contar  == 0){
      sendExchange = "present";
    } 
    else if (contar == 1){
      if (checkedIntercambiar) sendExchange = "exchange";
      else if (checkedPrestar) sendExchange = "provide";
      else if (checkedDonar)   sendExchange = "present";
    }
    else{
       sendExchange = aux;
      }

    console.log(sendExchange);
    
    console.log("sending product")
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }
    
    await axios.post('https://app4me4u.herokuapp.com/api/product/create', {
      name: name,
      categories: selectedCategory,
      description: description,
      exchange: sendExchange,
      state: "available",
    }, config)
      .then(function (response) {
        setImages(response);
        
      })
      .catch(function (error) {
        console.log(error);
      });



  }
  return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <TextInput
            placeholder={t("Nombre del Producto")}
            style={styles.textInput}
            onChangeText={onChangeName}
            value={name}
          />
          <TextInput
            placeholder={t("Descripción")}
            style={styles.textInput}
            onChangeText={onChangeDescription}
            value={description}
          />
          <Text
            style={styles.title}> {t('Categorias')} </Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) =>
              setSelectedCategory(itemValue)
            }>
            <Picker.Item label={t("Seleccione un categoría...")} value="default" />
            <Picker.Item label={t("Moda")} value="fashion" />
            <Picker.Item label={t("Informática")} value="computer" />
            <Picker.Item label={t("Electrodomesticos")} value="homeApplicances" />
            <Picker.Item label={t("Ocio")} value="sports" />
            <Picker.Item label={t("Hogar")} value="home" />
            <Picker.Item label={t("Consolas y videojuegos")} value="videogames" />
            <Picker.Item label={t("Cine, libros, música")} value="movies" />
            <Picker.Item label={t("Niños y bebés")} value="children" />
            <Picker.Item label={t("Construcción y reformas")} value="construction" />
            <Picker.Item label={t("Mascotas")} value="pets" />
            <Picker.Item label={t("Juegos y juguetes")} value="games" />
            <Picker.Item label={t("Otros")} value="other" />
          </Picker>
          <Text style={[styles.title, { marginTop: 20 }]}> {t('¿Que quieres hacer con tu producto?')}</Text>
          <View style={styles.row}>
            <View
              style={styles.checkbox}>
              <Checkbox
                status={checkedDonar ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedDonar(!checkedDonar);
                }}
              />
              <Text >{t('Donar')}</Text>
            </View>
            <View
              style={styles.checkbox}>
              <Checkbox
                status={checkedPrestar ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedPrestar(!checkedPrestar);
                }}
              />
              <Text >{t('Prestar')}</Text>
            </View>
            <View
              style={styles.checkbox}>
              <Checkbox
                status={checkedIntercambiar ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedIntercambiar(!checkedIntercambiar);
                }}
              />
              <Text >{t('Intercambiar')}</Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: "row",
              marginTop: 1
            }}>

            {image &&
              <TouchableOpacity onPress={() => unPickImage(1)}>
                <Image style={styles.image} source={{ uri: image }} />
              </TouchableOpacity>}
            {!image &&
              <TouchableOpacity style={styles.notImage} onPress={() => pickImage(1)}>
                <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
              </TouchableOpacity>}
            {image2 &&
              <TouchableOpacity onPress={() => unPickImage(2)}>
                <Image style={styles.image} source={{ uri: image2 }} />
              </TouchableOpacity>}
            {!image2 &&
              <TouchableOpacity style={styles.notImage} onPress={() => pickImage(2)}>
                <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
              </TouchableOpacity>}
            {image3 &&
              <TouchableOpacity onPress={() => unPickImage(3)}>
                <Image style={styles.image} source={{ uri: image3 }} />
              </TouchableOpacity>}
            {!image3 &&
              <TouchableOpacity style={styles.notImage} onPress={() => pickImage(3)}>
                <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
              </TouchableOpacity>}
          </ View>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: "row",
              marginTop: 10
            }}>
            {image4 &&
              <TouchableOpacity onPress={() => unPickImage(4)}>
                <Image style={styles.image} source={{ uri: image4 }} />
              </TouchableOpacity>}
            {!image4 &&
              <TouchableOpacity style={styles.notImage} onPress={() => pickImage(4)}>
                <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
              </TouchableOpacity>}
            {image5 &&
              <TouchableOpacity onPress={() => unPickImage(5)}>
                <Image style={styles.image} source={{ uri: image5 }} />
              </TouchableOpacity>}
            {!image5 &&
              <TouchableOpacity style={styles.notImage} onPress={() => pickImage(5)}>
                <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
              </TouchableOpacity>}
            {image6 &&
              <TouchableOpacity onPress={() => unPickImage(6)}>
                <Image style={styles.image} source={{ uri: image6 }} />
              </TouchableOpacity>}
            {!image6 &&
              <TouchableOpacity style={styles.notImage} onPress={() => pickImage(6)}>
                <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
              </TouchableOpacity>}
          </View>
          <Pressable style={[styles.button, { backgroundColor: '#a2cff0' }]} onPress={sendApi} ><Text> {t('Subir Producto!')}</Text></Pressable>
          <Text> </Text>
        </ScrollView>
        <NavigationBar navigation={navigation} upload={true} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icono: {
    width: 35,
    height: 35,
  },
  navigator: {
    borderRadius: 5,
    height: 45,
    borderColor: '#5e5c57',
    borderWidth: 1,
    backgroundColor: '#e2e2e1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  row: {
    height: 100,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 20,
    marginBottom: 80,
    borderRadius: 4,
    elevation: 3,
    width: '90%',
    backgroundColor: '#a2cff0',
  },
  checkbox: {
    flexDirection: "row",
    alignItems: 'center',
    width: '30%'
  },
  image: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
  },
  cameraImage: {
    width: 90,
    height: 90,
    marginTop: 1,
    marginLeft: 2,
    borderRadius: 3
  },
  notImage: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    width: '98%',
  },
  picker: {
    marginVertical: 2,
    height: 60,
    width: '98%',
    alignSelf: 'center',
  },
  textInput: {
    alignSelf: 'center',
    color: 'black',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#efefef',
    marginVertical: 8,
    height: 60,
    padding: 5,
    width: '98%',
  },
});
