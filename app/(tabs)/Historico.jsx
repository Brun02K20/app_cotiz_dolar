import React, { useState, useEffect } from 'react';
import { View, Text, useColorScheme, ActivityIndicator, Modal, Pressable } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { historicosServices } from '../../services/getHistoricos';
// import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
const LineChart = require("react-native-gifted-charts").LineChart;

export default function Historico() {
  const colorScheme = useColorScheme();
  const screenWidth = Dimensions.get("window").width;

  const [oficialHistorico, setOficialHistorico] = useState(null);
  const [blueHistorico, setBlueHistorico] = useState(null);
  const [valorModal, setValorModal] = useState(null);

  useEffect(() => {
    const traerHistoricos = async () => {
      setOficialHistorico(await historicosServices.getOficialHistorico());
      setBlueHistorico(await historicosServices.getBlueHistorico());
    };
    traerHistoricos();
  }, []);

  useEffect(() => {
    console.log("OH: ", oficialHistorico);
    console.log("BH: ", blueHistorico);
  }, [oficialHistorico, blueHistorico]);

  const [modalVisible, setModalVisible] = useState(false);

  if (!oficialHistorico || !blueHistorico) {
    return <ActivityIndicator size="large" color="#111111" className="mt-8" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className="bg-slate-950 my-4 px-4 mx-4 py-4 rounded-lg">
        <Text className="text-white text-center text-xl mt-2 mb-2">Histórico</Text>
        {(oficialHistorico && blueHistorico) && (
          // <LineChart
          //   style={{ borderRadius: 16, paddingTop: 28 }}
          //   data={{
          //     datasets: [
          //       {
          //         data: oficialHistorico.slice(-15).map((item) => item.venta),
          //         strokeWidth: 2,
          //         color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Color verde para oficialHistorico
          //       },
          //       {
          //         data: blueHistorico.slice(-15).map((item) => item.venta),
          //         strokeWidth: 2,
          //         color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Color anaranjado para blueHistorico
          //       }
          //     ],
          //     // legend: ["Valor de Compra Oficial", "Valor de Compra Blue"] // Leyenda opcional
          //   }}
          //   width={screenWidth - 64}
          //   height={350}
          //   chartConfig={{
          //     backgroundColor: "#1cc910",
          //     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          //   }}
          //   withShadow={false}
          //   withVerticalLines={false}
          //   verticalLabelRotation={90}
          //   onDataPointClick={({ value, dataset, index }) => {
          //     setModalVisible(true);
          //     setValorModal(value);
          //   }}
          // />
          <LineChart 
            data={oficialHistorico.slice(-15).map((item) => {return {value: item.venta}})}
            data2={blueHistorico.slice(-15).map((item) => {return {value: item.venta}})}
            width={screenWidth - 128}
            height={300}
            color1='rgba(26, 255, 146, 1)'
            color2='rgba(255, 165, 0, 1)'
            dataPointsColor1='rgba(26, 20, 200, 1)'
            dataPointsColor2='rgba(255, 100, 0, 1)'
            isAnimated={true}
            dataPointRadius={15}
            yAxisColor="white"
            xAxisColor="white"
            yAxisTextStyle={{color: 'white'}}
            spacing={20}
            initialSpacing={5}
            disableScroll={true}
            maxValue={1600}
            onPress={({value, item }) => {
              setModalVisible(true);
              setValorModal(value)
            }}
            />
        )}
        <View className="flex justify-center flex-row my-2">
          <Text style={{color: "rgba(26, 255, 146, 1)"}} className="mx-2">Valor de Venta Dolar Oficial</Text>
          <Text style={{color: "rgba(255, 165, 0, 1)"}} className="mx-2">Valor de Venta Dolar Blue</Text>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center mt-6">
          <View className="m-5 bg-slate-700 rounded-lg p-7 items-center shadow-md border border-white">
            <Text className="mb-1 text-center text-white text-lg">Valor: ${valorModal}</Text>
            <Pressable
              className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full items-center justify-center border border-black"
              onPress={() => {setModalVisible(!modalVisible); setValorModal(null)}}>
              <FontAwesome name="close" size={16} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </ThemeProvider>
  );
}
