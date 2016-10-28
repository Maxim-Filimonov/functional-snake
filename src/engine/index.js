import { update as updateBg, draw as drawBg } from 'actors/background';
import { setup as setupSnake, update as updateSnake, draw as drawSnake } from 'actors/snake';

import listenToInput from './input';

export function setup({ state = {}, setState = () => {} }) {
  listenToInput(setState);

  return {
    ...state,
    ...setupSnake,
    game: {
      width: 60,
      height: 60,
      scale: 10,
    },
  };
}

export function update({ timestamp = 0, state = {} }) {
  return [
    updateBg,
    updateSnake,
  ].map(
    f =>
      Object.assign({}, f({ timestamp, state }))
  ).reduce(
    (a, b) =>
      Object.assign({}, a, b)
  );
}

export function draw({ state = {}, canvas = null }) {
  [
    drawBg,
    drawSnake,
  ].forEach(f => f({ state, canvas }));
}
