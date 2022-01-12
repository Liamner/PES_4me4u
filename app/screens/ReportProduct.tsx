import * as React from 'react';
import {ScrollView, StyleSheet, Pressable, Picker} from 'react-native';
import  Slider  from '@react-native-community/slider';
import axios from 'axios';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { TextInput, Checkbox } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import { resolvePlugin } from '@babel/core';
import '../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import NavigationBar from '../components/NavigationBar';
import retrieveSession from '../hooks/retrieveSession';


export default function ReportProduct({ navigation, route }: RootTabScreenProps<'ReportProduct'>) {
  const [descripcion, onChangeComment] = React.useState("");
  const [sliderValue] = React.useState(4)
  const [sliderRate, setSliderRate] = React.useState(sliderValue);

  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] =useState('cat');

  
  const { prodId, userId } = route.params;
  

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
  
  const [session, setSession] = React.useState({
    id: "",
    user:"",
    token:""
  });

  const getData = async () => {
    try {
      const value = await retrieveSession()
      if (value !== null) {
        setSession(value)
        console.log('user: ' + session.user)
      }
      else {
        console.log("empty")
      }
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });

    return willFocusSubscription;
  }, []);

  const sendApi = async () => {
    console.log("sending")
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }

    console.log(userId);
    console.log(prodId);
   
    let response = await axios.post('https://app4me4u.herokuapp.com/api/report/create', {
      userReported: userId,
     
      description: descripcion,
      relatedProduct: prodId
    }, config).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
    navigation.goBack()
  }
  
  return (
    <>
    <ScrollView>
        <View style={styles.container}>
            <Text style={[styles.title, { marginTop: 20 }]}> {t('¿Cuál es el problema con este producto?')}</Text>


            <TextInput
                label="Comentario"
                style={styles.textInput}
                onChangeText={onChangeComment}
                value={descripcion}
            />
        

            <View
            style={{
                flexDirection: "row",
                marginTop: 30
            }}>

        </ View>

        <Pressable style={[styles.button, { backgroundColor: '#a2cff0' }]} onPress={sendApi} ><Text> {t('Guardar denuncia!')} </Text></Pressable>
        {/* <Pressable style={[styles.button, { backgroundColor: '#a2cfff' }]} onPress={sendApi} ><Text> {t('Cancelar')} </Text></Pressable> */}
      </View>
    </ScrollView>
    <NavigationBar  navigation={navigation} upload={true}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    width: '90%',
    backgroundColor: '#a2cff0',
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
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
    marginTop: 15,
    width: '90%',
  },
  picker: {
    marginVertical: 10,
    height: 60,
    width: '80%',
  },
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  slider: {
    width: '80',
    opacity: 1,
    height: 50,
    marginTop: 10,
  },
});