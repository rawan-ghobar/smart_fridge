import React from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes/routes';

const fetchFonts = () => {
  return Font.loadAsync({
    'Outfit-Regular': require('./assets/fonts/Outfit/static/Outfit-Regular.ttf'),
    'Outfit-Bold': require('./assets/fonts/Outfit/static/Outfit-Bold.ttf'),
    'Outfit-SemiBold': require('./assets/fonts/Outfit/static/Outfit-SemiBold.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return <Routes />;
}