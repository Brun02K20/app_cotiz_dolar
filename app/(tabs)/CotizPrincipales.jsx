import { View, Text, useColorScheme, ActivityIndicator, TextInput, Pressable, Switch } from 'react-native'
import React, {useState, useEffect} from 'react'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { getDolarBlue } from '../../services/getDolarBlue';
import { getDolarOficial } from '../../services/getDolarOficial';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

export default function CotizPrincipales() {
  const colorScheme = useColorScheme();
  const [dolarOficial, setDolarOficial] = useState(null);
  const [dolarBlue, setDolarBlue] = useState(null);
  const [cantidadDolares, setCantidadDolares] = useState('');
  const [cantidadPesos, setCantidadPesos] = useState('');
  const [usarDolarBlue, setUsarDolarBlue] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [inputHabilitado, setInputHabilitado] = useState('dolares');

  useEffect(() => {
    const traerDolares = async () => {
      const oficial = await getDolarOficial();
      const blue = await getDolarBlue();
      setDolarOficial(oficial);
      setDolarBlue(blue);
    };

    traerDolares();
  }, []);

  const handleCheckboxChange = () => {
    setUsarDolarBlue(!usarDolarBlue);
  };

  useEffect(() => {
    let valor = 0;
    if (inputHabilitado === 'dolares') {
      valor = cantidadDolares;
    } else {
      valor = cantidadPesos;
    }
    handleInputChange(valor);
  }, [usarDolarBlue]);

  useEffect(() => {
    console.log("usarDolarBlue: ", usarDolarBlue);
  }, [usarDolarBlue])

  const handleSwitchInputs = () => {
    setInputHabilitado(inputHabilitado === 'dolares' ? 'pesos' : 'dolares');
  };

  const handleInputChange = (value) => {
    const tasaCambio = usarDolarBlue ? dolarBlue?.compra : dolarOficial?.compra;
    console.log("tasa de cambio usada: ", tasaCambio);
    if (inputHabilitado === 'dolares') {
      setCantidadDolares(value);
      setCantidadPesos(value ? (value * tasaCambio).toFixed(2) : '');
    } else {
      setCantidadPesos(value);
      setCantidadDolares(value ? (value / tasaCambio).toFixed(2) : '');
    }
  };

  if (!dolarOficial || !dolarBlue) {
    return <ActivityIndicator size="large" color="#111111" className="mt-8" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className="bg-slate-950 my-4 px-4 mx-4 py-4 rounded-lg">
        <Text className="text-white text-center text-xl mt-2 mb-2">Cotizaciones Principales 💵</Text>
        <View className="mt-4">
          <View className="flex flex-row justify-between py-2">
            <Text className="text-white text-center flex-1">Tipo de Cambio</Text>
            <Text className="text-white text-center flex-1">Compra</Text>
            <Text className="text-white text-center flex-1">Venta</Text>
          </View>
          <View className="flex flex-row justify-between py-2">
            <Text className="text-white text-center flex-1">{dolarOficial.casa.toUpperCase()}</Text>
            <Text className="text-white text-center flex-1">{dolarOficial.compra}</Text>
            <Text className="text-white text-center flex-1">{dolarOficial.venta}</Text>
          </View>
          <View className="flex flex-row justify-between py-2">
            <Text className="text-white text-center flex-1">{dolarBlue.casa.toUpperCase()}</Text>
            <Text className="text-white text-center flex-1">{dolarBlue.compra}</Text>
            <Text className="text-white text-center flex-1">{dolarBlue.venta}</Text>
          </View>
        </View>
        <View className="mt-4">
          {inputHabilitado === 'dolares' ? (
            <>
              <TextInput
                className="bg-white p-2 rounded mb-2"
                placeholder="Cantidad de Dólares"
                keyboardType="numeric"
                value={cantidadDolares}
                onChangeText={handleInputChange}
              />
              <TextInput
                className="bg-gray-300 p-2 rounded mb-2"
                placeholder="Cantidad de Pesos"
                keyboardType="numeric"
                value={cantidadPesos}
                editable={false}
              />
            </>
          ) : (
            <>
              <TextInput
                className="bg-white p-2 rounded mb-2"
                placeholder="Cantidad de Pesos"
                keyboardType="numeric"
                value={cantidadPesos}
                onChangeText={handleInputChange}
              />
              <TextInput
                className="bg-gray-300 p-2 rounded mb-2"
                placeholder="Cantidad de Dólares"
                keyboardType="numeric"
                value={cantidadDolares}
                editable={false}
              />
            </>
          )}
          <View className="flex flex-row items-center mb-2">
            <Switch
              value={usarDolarBlue}
              onValueChange={handleCheckboxChange}
            />
            <Text className="text-white ml-2">Usar Dólar Blue</Text>
          </View>
          <Pressable 
            onPress={handleSwitchInputs}  
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            >
            <FontAwesome6 
              name="arrows-rotate" 
              size={24} 
              color={!isPressed ? 'white' : 'gray'}
            />
          </Pressable>
        </View>
      </View>
    </ThemeProvider>
  );
}