import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import retrieveSession from '../hooks/retrieveSession'

export default function MainScreen({ navigation, route}) {
    const { Id, userId, email, pwd, role } = route.params;
    const [session, setSession] = React.useState({
        id: "",
        user:"",
        token:""
    })

    const getData = async () => {
      const sess = await retrieveSession();
      //console.log(sess)
        setSession(sess);
      }

      React.useEffect(() => {
        getData();
      }, []);  

    return (
        <View style={styles.main}>
            <Text>Hola {userId} </Text>
            <Text>id: {session.id}</Text>
            <Text>token: {session.token}</Text>
            <Text>nombre: {session.user}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
