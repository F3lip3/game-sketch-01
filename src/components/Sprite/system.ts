/* eslint-disable prefer-destructuring */
import { GameEngineSystem } from 'react-native-game-engine';

import { SpriteProps } from '.';

type TEvent = {
  type: string;
  speed: number;
};

interface IMovementProps {
  buffer: TEvent & { value: number };
  event?: TEvent;
  step_size: number;
  haste: number;
}

let player: SpriteProps;

const movement: IMovementProps = {
  buffer: {
    speed: 0,
    type: '',
    value: 0
  },
  event: undefined,
  step_size: 32,
  haste: 1
};

const actions = {
  move_down: (speed: number): SpriteProps => {
    return {
      ...player,
      y: player.y + speed,
      direction: 'down'
    };
  },
  move_left: (speed: number): SpriteProps => {
    return {
      ...player,
      x: player.x - speed,
      direction: 'left'
    };
  },
  move_right: (speed: number): SpriteProps => {
    return {
      ...player,
      x: player.x + speed,
      direction: 'right'
    };
  },
  move_up: (speed: number): SpriteProps => {
    return {
      ...player,
      y: player.y - speed,
      direction: 'up'
    };
  }
};

const getSpeed = (index: number): number => {
  const speeds = [0, 1, 2, 4, 8, 16];
  return speeds[index];
};

const SpriteSystem: GameEngineSystem = (entities, { events }) => {
  player = entities.player;

  // store movement event and speed
  if (events.length && player) {
    const { type, speed: index = 0 }: TEvent = events.pop();
    if (actions[type]) {
      movement.event = {
        speed: getSpeed(index),
        type
      };
    } else {
      movement.event.speed = 0;
    }
  }

  // destructured movement
  const { buffer, event, step_size, haste } = movement;

  // loop inside buffer to complete a full step
  if (buffer.value > 0 && event) {
    movement.buffer.value += buffer.speed * haste;
    if (buffer.value >= step_size) {
      movement.buffer.value = 0;
    }
    return {
      ...entities,
      player: actions[buffer.type](buffer.speed * haste)
    };
  }

  // loop in last event if the use keeps gamepad in the same position
  if (event) {
    const { type, speed } = event;
    if (type && speed) {
      movement.buffer = {
        type,
        speed,
        value: speed
      };
      return {
        ...entities,
        player: actions[type](speed * haste)
      };
    }
  }

  return entities;
};

export default SpriteSystem;
