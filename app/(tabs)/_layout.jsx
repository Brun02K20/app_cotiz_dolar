import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tabs screenOptions={{ tabBarActiveTintColor: 'white' }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
          />
          <Tabs.Screen
            name="CotizPrincipales"
            options={{
              title: 'Principales',
              tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="chart-bar" color={color} />,
            }}
          />
          <Tabs.Screen
            name="MasCotizaciones"
            options={{
              title: 'Más Cotizaciones',
              tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="money-bill-wave" color={color} />,
            }}
          />
          <Tabs.Screen
            name="Historico"
            options={{
              title: 'Histórico',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="euro" color={color} />,
            }}
          />
        </Tabs>
    </ThemeProvider>


    
  );
}
