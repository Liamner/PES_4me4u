import React from 'react'
import {StyleSheet,
    Button
} from 'react-native'
import { Text, View } from '../components/Themed';

 export default function Login({navigation}) {
    return (
        <View style = {styles.container}>
            <Text>Welcome to Login Screen</Text>
            <Button title= "Go to sign up"
            onPress={()=>navigation.navigate("SignUp") }
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
})
