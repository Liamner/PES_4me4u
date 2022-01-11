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
  OtherUserRead: undefined;
  ViewUser: undefined;
  FollowersScreen: undefined;
  FollowedScreen: undefined;
  CreateProduct: undefined;
  TestScreen: undefined;
  FirstScreen: undefined;
  UserWishlist: undefined;
  ProductSearch: undefined;
  UserUpdate:undefined;
  ProductRead: undefined;
  UserProducts: undefined;
  ChatList: undefined;
  ChatView: undefined;
  EditProduct: undefined;
  ReportProduct: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  
  ViewProduct: undefined;
  DeleteButton: undefined;
  CreateProduct: undefined;
  ProductCardId: undefined;
  TestScreen: undefined;
  FirstScreen: undefined;
  ViewUserScreen: undefined;
  FollowersScreen: undefined;
  FollowedScreen: undefined;
  ViewUser: undefined;
  ProductRead: undefined;
  RateUser: undefined;
  SearchProduct: undefined;
  ChatList: undefined;
  ChatView: undefined;
  UserWishlist: undefined;
  UserProducts: undefined;
  UserUpdate:undefined;
  ReportProduct: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
