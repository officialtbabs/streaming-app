import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type BottomTabNavigationStackParamList = {
  home: undefined;
  shorts: undefined;
  rewards: undefined;
  profile: undefined;
};

export type BottomTabNavigationProps = NativeStackNavigationProp<
  BottomTabNavigationStackParamList,
  'home'
>;

export type MainNavigationStackParamList = {
  bottomTab: NavigatorScreenParams<BottomTabNavigationStackParamList>;
};

export type MainBottomTabNavigationProps = NativeStackNavigationProp<
  MainNavigationStackParamList,
  'bottomTab'
>;

export type Movie = {
  id: string;
  title: string;
  genres?: string[];
  cover: any;
  isPaused?: boolean;
  showPoster?: boolean;
  seekTime?: number;
};
