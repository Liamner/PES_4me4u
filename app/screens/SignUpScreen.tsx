import React from 'react'
import { Platform, StyleSheet, 
    Text, 
    View,
    TextInput,
    Alert,
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from 'react-native-reanimated';
import axios from 'axios';


export default function SignUp({navigation}) {
    const [inputData, setinputData] = React.useState({
        email:'',
        password:'',
        userId: '',
        confirmPassword:'',
        secureTextEntry: true,
        confirmSecureTextEntry: true,
        isValidEmail: false,
        emailError: false,
        isValidPassword: true,
        equalsPasswords: true,
        isValidUserId: true
    });
    const [requestError, setRequestError] = React.useState(false);

    const handlePassword = (val) => {
        if (val.trim().length >= 5) {
            setinputData({
                ... inputData,
                password: val,
                isValidPassword: true,
                equalsPasswords: (val == inputData.confirmPassword)
            });
        } else {
            setinputData({
                ... inputData,
                password: val,
                isValidPassword: false,
                equalsPasswords: (val == inputData.confirmPassword)
            });
        }
    }

    const handleConfirmPassword = (val) => {
        setinputData({
            ...inputData,
            confirmPassword: val,
            equalsPasswords: (val == inputData.password)
        });
}

    const updateSecureTextEntry = () => {
        setinputData({
            ...inputData,
            secureTextEntry: !inputData.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setinputData({
            ...inputData,
            confirmSecureTextEntry: !inputData.confirmSecureTextEntry
        });
    }

    const handleEmail = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(val) === false) {
            setinputData({
                ... inputData,
                email: val,
                isValidEmail: false,
                emailError: true
            });
        } else {
            setinputData({
                ... inputData,
                email: val,
                isValidEmail: true,
                emailError: false
            });
        }
    }

    function handleUserId(val) {
        if (val.trim().length >= 5) {
            setinputData({
                ... inputData,
                userId: val,
                isValidUserId: true
            });
        }
        else {
            setinputData({
                ... inputData,
                userId: val,
                isValidUserId: false
            });
        }
    }

    const handleSignUp = () => {
            if(!inputData.isValidEmail || !inputData.isValidPassword ||
                 !inputData.isValidUserId || !inputData.equalsPasswords) {
                     Alert.alert("Error", "Por favor compruebe que los campos son correctos")
                     console.log("Error: Por favor compruebe que los campos son correctos")
            }
            else if (inputData.password === '' || inputData.confirmPassword === '') {
                Alert.alert("Error", "La contreseña no puede ser vacía")
                console.log("Error: La contreseña no puede ser vacía")
            }
            else if (inputData.userId === '') {
                Alert.alert("Error", "El nombre puede ser vacío")
                console.log("Error: El nombre puede ser vacío")
            }
            else {
                const credentials = {
                    userId:inputData.userId,
                    email:inputData.email,
                    pwd:inputData.password,
                    };
                axios
                .post('http://localhost:5000/api/register', credentials)
                .then(function (response) {
                    const result = response.data
                    console.log(result.userId)
                    navigation.navigate("Main", result)
                })
                .catch(function (error) {
                    console.log(error);
                    setRequestError(true)
                });
            }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.text_header}>¡Únete a 4me4u!</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>

                <View style={styles.action}>
                    <MaterialIcons
                        color = '#000'
                        name = "email"
                        size = {20}
                    />
                    <TextInput
                        placeholder="Tu Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleEmail(val)}
                        onEndEditing={(e)=>handleEmail(e.nativeEvent.text)}
                    />
                    {inputData.isValidEmail ?
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
                
                {inputData.emailError ? 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text 
                            style={styles.msgError}
                        >El email no es válido.
                        </Text>
                    </Animatable.View>
                    :
                    null
                }

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Nombre</Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        size={20}
                    />
                    <TextInput
                        placeholder="Tu nombre"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleUserId(val)}
                        onEndEditing={(e)=>handleUserId(e.nativeEvent.text)}
                    />
                </View>

                {inputData.isValidUserId ? 
                        null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text 
                                style={styles.msgError}
                             >El usuario ha de tener al menos 5 caracteres.
                            </Text>
                         </Animatable.View>
                    }

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Contraseña</Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        size={20}
                    />
                    <TextInput
                        placeholder="Tu contraseña"
                        secureTextEntry={inputData.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePassword(val)}
                        onEndEditing={(e)=>handlePassword(e.nativeEvent.text)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {inputData.secureTextEntry ?
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

                {inputData.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text 
                            style={styles.msgError}
                        >La contraseña debe tener almenos 5 caracteres.
                        </Text>
                     </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Confirmación de contraseña</Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        size={20}
                    />
                    <TextInput
                        placeholder="Confirma tu contraseña"
                        secureTextEntry={inputData.confirmSecureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleConfirmPassword(val)}
                        onEndEditing={(e)=> handleConfirmPassword(e.nativeEvent.text)}
                    />
                    <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                        {inputData.confirmSecureTextEntry ?
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

                {inputData.equalsPasswords ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text 
                            style={styles.msgError}
                        >Las contraseñas no coinciden.
                        </Text>
                     </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity
                            onPress={()=>handleSignUp()}
                            style={{width: 250}}
                    >
                        <LinearGradient
                            colors = {['#a2cff0','#ADE8F4']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, 
                                {color: '#fff'}]}>
                                    Regístrate
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {requestError ? 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text 
                                style={styles.msgError}
                             >El email está en uso.
                            </Text>
                         </Animatable.View>
                      :
                      null
                    }

                    <TouchableOpacity
                        onPress={()=>navigation.goBack()}
                        style={[styles.signIn, {
                            borderColor: '#a2cff0',
                            borderWidth: 1,
                            width: 250,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign,
                             {color: '#a2cff0'}]}
                        >Volver</Text>
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
      },
      msgError: {
          color: 'red'
      },
});
