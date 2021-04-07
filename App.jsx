import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GamePad from './src/components/GamePad';

export default function App() {
  const [direction, setDirection] = useState('');
  const [speed, setSpeed] = useState(0);

  const handleMovement = useCallback(({ direction, speed }) => {
    setDirection(direction);
    setSpeed(speed);
  }, []);

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <Text>{direction}</Text>
        <Text>{speed}</Text>
        <GamePad
          maxSpeedLevel={2}
          onChange={handleMovement}
          size={120}
          style={styles.gamepad}
        />
        <StatusBar hidden />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6280af',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gamepad: {
    position: 'absolute',
    bottom: 30,
    left: 30
  }
});
