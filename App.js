import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState, useEffect} from 'react';
import { getAll } from './services/getAll';

export default function App() {

const [dolares, setDolares] = useState(null)

  useEffect(() => {
    const getDolares = async () => {
      setDolares(await getAll())
    }
    getDolares()
  }, [])

  useEffect(() => {
    console.log(dolares)
  }, [dolares])
  

  return (
    <View style={styles.container}>
      <Text>HOLA MUNDO!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
