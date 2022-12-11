import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {RootStack} from '../types';

const useReloadScreen = (screen: keyof RootStack) => {
  const navigation = useNavigation<NavigationProp<RootStack>>();

  return useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: screen,
        },
      ],
    });
  }, [navigation, screen]);
};

export default useReloadScreen;
