/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  UserRead: undefined;
  ViewUser: undefined;
  CreateProduct: undefined;
  TestScreen: undefined;
  FirstScreen: undefined;
  FollowersScreen: undefined;
  FollowedScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  ActualizarEstadoProducto: undefined;
  TabTwo: undefined;
  EditProduct: undefined;
  ViewProduct: undefined;
  DeleteButton: undefined;
  CreateProduct: undefined;
  ProductCard: undefined;
  TestScreen: undefined;
  FirstScreen: undefined;
  ViewUserScreen: undefined;
  FollowersScreen: undefined;
  FollowedScreen: undefined;
  ViewUser: undefined;
  ProductRead: undefined;
  RateUser: undefined;
  UserUpdate:undefined;
  SearchProduct:undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
