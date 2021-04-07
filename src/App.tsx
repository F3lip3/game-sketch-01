import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
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
  // const [direction, setDirection] = useState('');
  // const [speed, setSpeed] = useState(0);

  const handleMovement = useCallback(
    ({ direction: _direction, speed: _speed }: IGamePadOutput) => {
      console.info(_direction, _speed);
      // setDirection(_direction);
      // setSpeed(_speed);
    },
    []
  );

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <GameEngine
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
          maxSpeedLevel={2}
          onChange={handleMovement}
          size={120}
          style={styles.gamepad}
        />
      </View>
    </>
  );
};

export default App;
