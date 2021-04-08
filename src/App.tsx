import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import { GameEngineProps } from './@types/GameEngineProps';
import GamePad, { IGamePadOutput } from './components/GamePad';
import Sprite from './components/Sprite';
import SpriteSystem from './components/Sprite/system';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6280af',
    alignItems: 'center',
    justifyContent: 'center'
  },
  game: {
    flex: 1,
    backgroundColor: '#303030',
    width: '100%'
  },
  gamepad: {
    position: 'absolute',
    bottom: 30,
    left: 30
  }
});

const App: React.FC = () => {
  const [engine, setEngine] = useState<GameEngineProps>();

  const handleMovement = useCallback(
    ({ direction, speed }: IGamePadOutput) => {
      if (engine) {
        engine.dispatch({ type: `move_${direction}`, speed });
      }
    },
    [engine]
  );

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <GameEngine
          ref={ref => setEngine(ref as GameEngineProps)}
          style={styles.game}
          systems={[SpriteSystem]}
          entities={{
            player: {
              futureX: 0,
              futureY: 0,
              x: 0,
              y: 0,
              renderer: Sprite
            }
          }}
        >
          <StatusBar hidden />
        </GameEngine>
        <GamePad
          maxSpeedLevel={3}
          onChange={handleMovement}
          size={120}
          style={styles.gamepad}
        />
      </View>
    </>
  );
};

export default App;
