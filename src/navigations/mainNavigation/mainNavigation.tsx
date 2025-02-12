import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomTabNavigation from '../bottomNavigaton/bottomNavigation';
import {MainNavigationStackParamList} from '../../constants/types/types';

const MainNavigationStack =
  createNativeStackNavigator<MainNavigationStackParamList>();

const MainNavigation = () => {
  return (
    <MainNavigationStack.Navigator screenOptions={{headerShown: false}}>
      <MainNavigationStack.Screen
        name="bottomTab"
        component={BottomTabNavigation}
      />
    </MainNavigationStack.Navigator>
  );
};

export default MainNavigation;
