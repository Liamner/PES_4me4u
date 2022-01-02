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
} from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Google from "expo-google-app-auth";

const logoImage = require('../assets/images/logo.png')


 export default function Login({navigation}) {
    const {t, i18n} = useTranslation();
    const [currentLanguage,setLanguage] =useState('cat');


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
                <Text style = {styles.title}>Presta, Intercambia y Regala</Text>
            </View>

            <View style = {styles.footer}>

                <TouchableOpacity 
                onPress={()=>navigation.navigate("BottomTab") }
                >
                    <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={styles.button}
                    >
                       <FontAwesome
                        color = '#fff'
                        name = "facebook"
                        size = {20}
                        />
                            <Text style = {styles.whiteText}>  Continuar con Facebook</Text>
                        </LinearGradient>
                </TouchableOpacity>

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
                            <Text style = {styles.google}>  Continuar con Google</Text>
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
                            <Text style = {styles.whiteText}>  Continuar con Email</Text>
                        </LinearGradient>
                </TouchableOpacity>

                <Pressable
                    //onPress={() => {updateLanguage('cat')}}
                    onPress={() => changeLanguage('cat')}
                    style={{
                        backgroundColor:
                        currentLanguage === 'cat' ? '#33A850' : '#d3d3d3',
                        padding: 20,
                    }}>
                        
                    <Text>CATALAN UEEE</Text>
                    </Pressable>
                    <Pressable
                    //onPress={() => {updateLanguage('es')}}
                    onPress={() => changeLanguage('es')}
                    style={{
                        backgroundColor:
                        currentLanguage === 'es' ? '#33A850' : '#d3d3d3',
                        padding: 20,
                    }}>
            
                    <Text>CATELLANO UEE</Text>
                </Pressable>

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
      button:{
          width: 200,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
      }
});
