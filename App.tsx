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
import KittenCardsScreen from './src/presentation/kitten-cards/screens/KittenCardsScreen';
import StaggerFormItemsScreen from './src/presentation/stagger-form-items/screens/StaggerFormItemsScreen';
import {RootStack} from './src/presentation/shared/types';
import ProgressBarScreen from './src/presentation/progress-bar/screens/ProgressBarScreen';
import QuestionnaireScreen from './src/presentation/questionnaire/screens/QuestionnaireScreen';
import TransitionElementScreen from './src/presentation/transition-element/screens/TransitionElementScreen';

const App = () => {
  const Drawer = createDrawerNavigator<RootStack>();
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Corners" component={CornersScreen} />
        <Drawer.Screen name="StaggerHeads" component={StaggeredHeadsScreen} />
        <Drawer.Screen name="KittenCards" component={KittenCardsScreen} />
        <Drawer.Screen
          name="StaggerFormItems"
          component={StaggerFormItemsScreen}
        />
        <Drawer.Screen name="ProgressBar" component={ProgressBarScreen} />
        <Drawer.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Drawer.Screen
          name="TransitionElement"
          component={TransitionElementScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
