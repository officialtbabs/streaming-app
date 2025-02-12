import React, {FC, ReactNode} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TextComponent from '../../components/text/TextComponent';
import Animated from 'react-native-reanimated';
import pallete from '../../constants/colors/pallete';
import Box from '../../components/box/Box';
import ComingSoon from '../../screens/comingSoon/ComingSoon';
import Home from '../../screens/bottomScreens/Home';
import {BottomTabNavigationStackParamList} from '../../constants/types/types';
import {isIos} from '../../constants/utils/utils';
import {useAppSelector} from '../../constants/utils/hooks';
import HomeSvgIcon from '../../assets/icons/HomeSvgIcon';
import ShortsSvgIcon from '../../assets/icons/ShortsSvgIcon';
import RewardSvgIcon from '../../assets/icons/RewardSvgIcon';
import ProfileSvgIcon from '../../assets/icons/ProfileSvgIcon';
import Shorts from '../../screens/bottomScreens/Shorts';

const BottomTabNavigationStack =
  createBottomTabNavigator<BottomTabNavigationStackParamList>();

const TabBarIcon: FC<{
  icon: ReactNode | null;
}> = ({icon}) => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  return (
    <Box style={[globalStyles.h6, globalStyles.w6]}>
      <Animated.View
        style={[globalStyles.justifyCenter, globalStyles.itemsCenter]}>
        {icon}
      </Animated.View>
    </Box>
  );
};

interface bottomTextInterface {
  title: string;
  color: string;
}

const BottomTabText: FC<bottomTextInterface> = ({color, title}) => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  return (
    <Box style={[globalStyles.mt1]}>
      <TextComponent
        style={[
          globalStyles.fontLight,
          globalStyles.textXs,
          globalStyles.leading4,
          isIos() && globalStyles.fontLight,
          {color},
        ]}>
        {title}
      </TextComponent>
    </Box>
  );
};

const BottomTabNavigation = () => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  const renderTabBarLabel =
    (title: string) =>
    ({color}: {color: string}) =>
      <BottomTabText title={title} color={color} />;

  return (
    <BottomTabNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: pallete.rose_600,
        tabBarInactiveTintColor: pallete.gray_400,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          ...globalStyles.h24p75,
          ...globalStyles.bgBlack,
          ...globalStyles.pt1,
        }, // Tailwind classes
      }}>
      <BottomTabNavigationStack.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: renderTabBarLabel('Home'),
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={
                <HomeSvgIcon
                  color={focused ? pallete.rose_600 : pallete.gray_400}
                />
              }
            />
          ),
        }}
      />

      <BottomTabNavigationStack.Screen
        name="shorts"
        component={Shorts}
        options={{
          tabBarLabel: renderTabBarLabel('Shorts'),
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={
                <ShortsSvgIcon
                  color={focused ? pallete.rose_600 : pallete.gray_400}
                />
              }
            />
          ),
        }}
      />

      <BottomTabNavigationStack.Screen
        name="rewards"
        component={ComingSoon}
        options={{
          tabBarLabel: renderTabBarLabel('Rewards'),
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={
                <RewardSvgIcon
                  color={focused ? pallete.rose_600 : pallete.gray_400}
                />
              }
            />
          ),
        }}
      />

      <BottomTabNavigationStack.Screen
        name="profile"
        component={ComingSoon}
        options={{
          tabBarLabel: renderTabBarLabel('Profile'),
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={
                <ProfileSvgIcon
                  color={focused ? pallete.rose_600 : pallete.gray_400}
                />
              }
            />
          ),
        }}
      />
    </BottomTabNavigationStack.Navigator>
  );
};

export default BottomTabNavigation;
