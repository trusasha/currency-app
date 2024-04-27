import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider, QueryClient} from 'react-query';
import {MainStack} from 'navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
