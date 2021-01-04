/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import StackNavigator from './src/navigator/StackNavigator'
import VoiceTest from './src/main/VoiceTest'
const App: () => React$Node = () => {
  return (
    <>
      <StackNavigator/>

    </>
  );
};

export default App;
