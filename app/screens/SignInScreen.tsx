import React from 'react'
import { Platform, StyleSheet, 
    Text, 
    View,
    TextInput,
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from 'react-native-reanimated';

export default function SignInScreen({navigation}) {
    
    const [data, setData] = React.useState({
        email:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if(val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        }
        else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.text_header}>¡Bienvenido a 4me4u!</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        size={20}
                    /> 
                    <TextInput
                        placeholder="Tu Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            size={20}
                            color="green" 
                        />
                    </Animatable.View>
                    : null}
                </View>

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Contraseña
                </Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        size={20}
                    />
                    <TextInput
                        placeholder="Tu contraseña"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather 
                            name="eye-off"
                            size={20}
                            color="grey" 
                            />
                            :
                            <Feather 
                            name="eye"
                            size={20}
                            color="grey" 
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                            onPress={()=>navigation.navigate("BottomTab")}
                            style={{width: 250}}
                    >
                        <LinearGradient
                            colors = {['#a2cff0','#ADE8F4']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, 
                                {color: '#fff'}]}>
                                    Iniciar sesión
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate("SignUp")}
                        style={[styles.signIn, {
                            borderColor: '#a2cff0',
                            borderWidth: 1,
                            width: 250,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign,
                             {color: '#a2cff0'}]}
                        >Registrarse
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#a2cff0'
      },
      header: {
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 50
      },
      footer: {
          flex: Platform.OS === 'ios' ? 3 : 5,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
      text_header: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 30
      },
      text_footer: {
          color: '#05375a',
          fontSize: 18
      },
      action: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : -12,
          paddingLeft: 10,
          color: '#05375a',
      },
      button: {
          alignItems: 'center',
          marginTop: 50
      },
      signIn: {
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10
      },
      textSign: {
          fontSize: 18,
          fontWeight: 'bold'
      },
      textPrivate: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 20
      },
      color_textPrivate: {
          color: 'grey'
      }
});