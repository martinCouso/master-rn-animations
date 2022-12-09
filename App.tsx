/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import CornersScreen from './src/presentation/corners/screens/CornersScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const App = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Corners" component={CornersScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
