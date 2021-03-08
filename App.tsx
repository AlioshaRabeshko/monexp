import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {ConfigProvider as ConfigHOCProvider} from './utils/configContext';
import {StateProvider as StateHOCProvider} from './utils/stateContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ConfigHOCProvider>
          <StateHOCProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </StateHOCProvider>
        </ConfigHOCProvider>
      </SafeAreaProvider>
    );
  }
}
