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
import StaggeredHeadsScreen from './src/presentation/staggered-heads/screens/StaggeredHeadsScreen';

const App = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Corners" component={CornersScreen} />
        <Drawer.Screen name="StaggerHeads" component={StaggeredHeadsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
