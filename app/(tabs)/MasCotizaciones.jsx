import { View, Text, ActivityIndicator, useColorScheme } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getAll } from '../../services/getAll';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function MasCotizaciones() {
  const colorScheme = useColorScheme();
    const [dolares, setDolares] = useState(null);

    useEffect(() => {
      const traerDolares = async () => {
        setDolares(await getAll());
      }
      traerDolares();
    }, [])

    const formatDate = (isoString) => {
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    if (!dolares) {
      return <ActivityIndicator size="large" color="#111111" className="mt-8" />;
    }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className="bg-slate-950 my-4 px-4 mx-4 py-4 rounded-lg">
        <Text className="text-white text-center text-xl mt-2 mb-2">Más Cotizaciones 💵</Text>
        <View className="mt-4">
          <View className="flex flex-row justify-between py-2">
            <Text className="text-white text-center flex-1">Tipo de Cambio</Text>
            <Text className="text-white text-center flex-1">Compra</Text>
            <Text className="text-white text-center flex-1">Venta</Text>
            <Text className="text-white text-center flex-1">Última Actualización</Text>
          </View>
          {dolares.map((dolar) => (
            <View className="flex flex-row justify-between py-2" key={dolar.casa}>
              <Text className="text-white text-center flex-1">{dolar.nombre}</Text>
              <Text className="text-white text-center flex-1">${dolar.compra}</Text>
              <Text className="text-white text-center flex-1">${dolar.venta}</Text>
              <Text className="text-white text-center flex-1">{formatDate(dolar.fechaActualizacion)}</Text>
            </View>
          ))}
        </View>
      </View>
    </ThemeProvider>
    
  )
}