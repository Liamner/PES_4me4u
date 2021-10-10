import React from 'react'
import {StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const logoImage = require('../assets/images/logo.png')

 export default function Login({navigation}) {
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
                onPress={()=>navigation.navigate("BottomTab")}
                >
                    <LinearGradient
                        colors={['#ffffff', '#ffffff']}
                        style={[styles.button, {borderWidth: 1, borderColor: '#90e0ef'}]}
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
