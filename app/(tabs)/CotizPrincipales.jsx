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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
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
              <Text className="text-white p-1 text-lg">Cantidad de Dólares</Text>
              <TextInput
                className="bg-slate-300 text-black p-2 rounded mb-2 focus:border-black placeholder-black"
                placeholder="Cantidad de Dólares"
                keyboardType="numeric"
                value={cantidadDolares}
                onChangeText={handleInputChange}
              />
              <Text className="text-white p-1 text-lg focus:border-light-blue-500">Cantidad de Pesos</Text>
              <TextInput
                className="bg-slate-300 text-black p-2 rounded mb-2 focus:border-black placeholder-black"
                placeholder="Cantidad de Pesos"
                keyboardType="numeric"
                value={cantidadPesos}
                editable={false}
              />
            </>
          ) : (
            <>
              <Text className="text-white p-1 text-lg">Cantidad de Pesos</Text>
              <TextInput
                className="bg-slate-300 text-black p-2 rounded mb-2 focus:border-black placeholder-black"
                placeholder="Cantidad de Pesos"
                keyboardType="numeric"
                value={cantidadPesos}
                onChangeText={handleInputChange}
              />

              <Text className="text-white p-1 text-lg">Cantidad de Dólares</Text>
              <TextInput
                className="bg-slate-300 text-black p-2 rounded mb-2 focus:border-black placeholder-black"
                placeholder="Cantidad de Dólares"
                keyboardType="numeric"
                value={cantidadDolares}
                editable={false}
              />
            </>
          )}
          <View className="flex flex-row">
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
              className="w-6 mt-3 ml-40"
              >
              <FontAwesome6 
                name="arrows-rotate" 
                size={24} 
                color={!isPressed ? 'white' : 'gray'}
              />
            </Pressable>
          </View>
          <View>
            <Text className="text-white">Fecha de Actualización: {!usarDolarBlue ? formatDate(dolarOficial?.fechaActualizacion) : formatDate(dolarBlue?.fechaActualizacion)}</Text>
          </View>
        </View>
      </View>
    </ThemeProvider>
  );
}