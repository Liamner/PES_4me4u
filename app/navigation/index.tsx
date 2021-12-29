/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

import Login from '../screens/LandingPage';
import SignUp from '../screens/EmailSignUp';
import SignIn from '../screens/EmailSignIn'
import Main from '../screens/MainScreen'
import EditProduct from '../screens/ProductEdit';
import ProductRead from '../screens/ProductRead';
import DeleteButton from '../screens/DeleteButtonScreen';
import ActualizarEstadoProducto from '../screens/ActualizarEstadoProducto';
import ProductCard from '../screens/ProductCardScreen';
import TestScreen from '../screens/TestScreen';
import FirstScreen from '../screens/FirstScreen';
import CreateProduct from '../screens/ProductCreate';
import ViewUser from '../screens/UserRead';	
import FollowersScreen from '../screens/FollowersScreen';	
import FollowedScreen from '../screens/FollowedScreen';	
import RateUser from '../screens/UserRate';
import SearchProduct from '../screens/SearchProduct';


import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
     {/* </RootNavigator>*/}
     <LoginNavigator/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />     
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="UserRead" component={ViewUser} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}


const LoginStack = createNativeStackNavigator();

function LoginNavigator() {
  return(
    <LoginStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#009387'
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold'
        }
    }}>
        <LoginStack.Screen name="Login" component = {Login} options={{headerShown: false}}/>
        <LoginStack.Screen name="SignIn" component = {SignIn} options={{headerShown: false}}/>
        <LoginStack.Screen name="SignUp" component = {SignUp} options={{title: 'SignUp', headerShown: false}}/>
        <LoginStack.Screen name="Main" component = {Main} options={{headerShown: false}}/>
        <LoginStack.Screen name="BottomTab" component = {RootNavigator} options={{headerShown: false}}/>
    </LoginStack.Navigator>
  );
}


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator

      initialRouteName="CreateProduct"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      
      <BottomTab.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{
          title: 'Nuevo Producto',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

       <BottomTab.Screen
         name="RateUser"
         component={RateUser}
         options={{
           title: 'Valorar usuario',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
        />
   
     </BottomTab.Navigator>
   );
 }
 
 /**
  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  */
 function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>['name'];
   color: string;
 }) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
 }
 