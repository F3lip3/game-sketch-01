/* eslint-disable no-restricted-globals */
export function getSpeed(value, max, maxLevel) {
  if (maxLevel <= 1) return 1;

  const speedBlock = max / maxLevel;

  let speed = 0;

  // eslint-disable-next-line no-plusplus
  for (let level = 1; level <= maxLevel; level++) {
    if (value <= speedBlock * level) {
      speed = level;
      break;
    }
  }

  return speed;
}

export function getXY(dx, dy, max) {
  const x = Math.abs(dx);
  const y = Math.abs(dy);
  const h = getHypotenuse(x, y);
  if (h <= max) {
    return { dx, dy };
  }

  const angle = getAngle(y, h);
  const newY = getY(max, angle);
  const newX = getX(max, newY);

  const xMod = dx > 0 ? 1 : -1;
  const yMod = dy > 0 ? 1 : -1;

  return {
    dx: newX * xMod,
    dy: newY * yMod
  };
}

function getAngle(y, h) {
  return Math.asin(y / h);
}

function getHypotenuse(x, y) {
  return Math.sqrt(x ** 2 + y ** 2);
}

function getX(h, y) {
  return Math.sqrt(h ** 2 - y ** 2);
}

function getY(h, angle) {
  return h * Math.sin(angle);
}
