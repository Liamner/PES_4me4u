import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function MainScreen({ navigation, route, token }) {
    const { Id, userId, email, pwd, role } = route.params;
    return (
        <View style={styles.main}>
            <Text>Hola {userId} </Text>
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
