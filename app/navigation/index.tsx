/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

import Login from '../screens/LandingPage';
import ChatView from '../screens/ChatView';
import ChatList from '../screens/ChatList';
import SignUp from '../screens/EmailSignUp';
import SignIn from '../screens/EmailSignIn'
import Main from '../screens/MainScreen'
import EditProduct from '../screens/ProductEdit';
import ProductRead from '../screens/ProductRead';
import DeleteButton from '../screens/DeleteButtonScreen';
import ActualizarEstadoProducto from '../screens/ActualizarEstadoProducto';
import ProductCardId from '../screens/ProductCardScreen';
import TestScreen from '../screens/TestScreen';
import FirstScreen from '../screens/FirstScreen';
import CreateProduct from '../screens/ProductCreate';
import ViewUser from '../screens/UserRead';	
import FollowersScreen from '../screens/FollowersScreen';	
import FollowedScreen from '../screens/FollowedScreen';	
import RateUser from '../screens/UserRate';
import SearchProduct from '../screens/SearchProduct';
import ReportProduct from '../screens/ReportProduct';
import ReportUser from '../screens/ReportUser';


//to incorporar
import UserWishlist from '../screens/UserWishlist';
import NavigationBar from '../components/NavigationBar';
import UserUpdateScreen from '../screens/UserUpdate';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import UserProducts from '../screens/UserProducts';

import RootNavigator from './root';



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

/*
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false}} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />     
      <Stack.Screen name="CreateProduct" component={CreateProduct} options={{ headerShown: false }} />    
      <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} />    
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="UserRead" component={ViewUser} options={{ headerShown: false }} />
        <Stack.Screen name="UserWishlist" component={UserWishlist} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
*/

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
