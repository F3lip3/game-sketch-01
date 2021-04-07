import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import { getSpeed, getXY } from './math';

import { Plate, Handler } from './styles';

const GamePad = ({ size = 120, maxSpeedLevel = 3, onChange, ...props }) => {
  const [pan] = useState(new Animated.ValueXY());

  const handlePanChange = useCallback(
    ({ x, y }) => {
      if (x !== 0 && y !== 0) {
        const output = {};
        if (Math.abs(x) > Math.abs(y)) {
          output.direction = x > 0 ? 'right' : 'left';
          output.speed = getSpeed(Math.abs(x), size / 2, maxSpeedLevel);
        } else {
          output.direction = y > 0 ? 'down' : 'up';
          output.speed = getSpeed(Math.abs(y), size / 2, maxSpeedLevel);
        }
        onChange(output);
      }
    },
    [maxSpeedLevel, onChange, size]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x._value,
            y: pan.y._value
          });
        },
        onPanResponderMove: (evt, gestureState) => {
          const max = size / 2;
          const { dx, dy } = gestureState;
          const newPosition = getXY(dx, dy, max);

          Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false
          })(evt, newPosition);
        },
        onPanResponderRelease: () => {
          pan.setValue({ x: 0, y: 0 });
        }
      }),
    [pan, size]
  );

  useEffect(() => {
    pan.addListener(handlePanChange);
  }, [handlePanChange, pan]);

  return (
    <Plate size={size} {...props}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <Handler size={size} {...panResponder.panHandlers} />
      </Animated.View>
    </Plate>
  );
};

export default GamePad;
