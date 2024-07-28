import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function index() {

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className="bg-slate-950 my-4 px-4 mx-4 py-4 rounded-lg">
        <Text className="text-white text-center text-2xl mb-2">BIENVENIDO! 😃</Text>
        <Text className="text-white text-lg mb-2">En esta aplicación vas a poder consultar todo respecto a la cotización del dolar en Argentina. 🤑 </Text>
        <Text className="text-white mb-2">
          Las opciones que incluimos son: 
        </Text>
        <Text className="text-white mb-2">
        - Cotizaciones Principales: acá vas a poder saber a cuanto está el dolar oficial, el dolar blue, y realizar conversiones de pesos a estas cotizaciones.
        </Text>
        <Text className="text-white mb-2">
        - Más Cotizaciones: acá vas a poder conocer el valor de las demás cotizaciones que se manejan en el país, como el dolar Tarjeta, Mayorista, Bolsa, etc.
        </Text>
        <Text className="text-white mb-2">
        - Histórico: acá vas a poder consultar la cotización del dólar oficial y blue de los últimos 15 días.
        </Text>
      </View>
    </ThemeProvider>
    
  )
}