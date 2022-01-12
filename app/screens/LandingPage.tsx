import * as React from 'react';
import { useState } from 'react';
import '../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';


import {StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
    Pressable,
    Picker,
} from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Google from "expo-google-app-auth";

const logoImage = require('../assets/images/logo.png')


 export default function Login({navigation}) {
    const {t, i18n} = useTranslation();
    const [currentLanguage,setLanguage] =useState('es');


    const changeLanguage = value => {
        i18n
          .changeLanguage(value)
          .then(() => setLanguage(value))
          .catch(err => console.log(err));
      };

    const googleSignIn = () => {
        const config = {
        iosClientId: `1060758600491-889umes3uujo3ufbh1gqm6h4mrqd39gq.apps.googleusercontent.com`,
        androidClientId: `1060758600491-6fhgq3lg64qljt93gdgvs5ekp6ur5r83.apps.googleusercontent.com`,
        scopes: ['profile', 'email']
        };

        Google
        .logInAsync(config)
        .then((result) => {
            const {type, user} = result;
            if (type === 'success') {
                //console.log(result.accessToken);
                let u = {
                    Id: result.user.id,
                    userId: result.user.name, 
                    email: result.user.email,
                    pwd: '',
                    role: 'USER'
                }
                navigation.navigate("Main", u);
            }
            else {
                console.log('error')
            }
        })
        .catch(error => {
            console.log(error);
        })        
    };

    return (
        <View style = {styles.container}>
            
            <View style = {styles.header}>
                <Image style= {styles.logo} 
                source = {logoImage}
                />
                <Text style = {styles.title}>{t('Presta, Intercambia y Regala')}</Text>
            </View>

            <View style = {styles.footer}>

                <TouchableOpacity 
                onPress={()=>googleSignIn()}
                >
                    <LinearGradient
                        colors={['#ffffff', '#ffffff']}
                        style={[styles.button, {borderWidth: 1, borderColor: '#a2cff0'}]}
                    >
                       <FontAwesome
                        color = '#000'
                        name = "google"
                        size = {20}
                        />
                            <Text style = {styles.google}>{t(' Continuar con Google')}</Text>
                        </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>navigation.navigate("SignIn") }
                >
                    <LinearGradient
                        colors={['#d90429', '#ef233c']}
                        style={styles.button}
                    >
                       <MaterialIcons
                        color = '#fff'
                        name = "email"
                        size = {20}
                        />
                            <Text style = {styles.whiteText}>{t(' Continuar con Email')}</Text>
                        </LinearGradient>
                </TouchableOpacity>

        

                <Picker
                    selectedValue={currentLanguage}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        changeLanguage(itemValue)
                    }>
                    <Picker.Item label={t("Seleccione un idioma...")} value="es" />          
                    <Picker.Item label="Castellano" value="es" />
                    <Picker.Item label="Catalán" value="cat" />
                </Picker>

            </View>
        </View>
    );
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
      },
      header: {
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center'
      },
      footer: {
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
      },
      logo: {
          width: height_logo,
          height: height_logo
      },
      title: {
          fontSize: 20,
          fontWeight: 'bold'
      },
      google: {
          color: '#000'
      },
      whiteText: {
          color: '#fff'
      },
      picker: {
        marginVertical: 10,
        height: 60,
        width: '90%',
      },
      button:{
          width: 200,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
      }
});
