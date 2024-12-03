import { getCanvas, getContext } from './canvas';

const randomBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

export const randomIntBetween = (min, max) => {
  return Math.floor(randomBetween(min, max));
};

export const randomFloatBetween = (min, max) => {
  return randomBetween(min, max);
};

export const sleep = async (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));

export const resize = () => {
  const canvas = getCanvas();

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

export const drawCrosshair = () => {
  const ctx = getContext();

  ctx.fillStyle = 'red';
  ctx.rect(window.innerWidth / 2 - 50, window.innerHeight / 2 + 1, 100, 2);
  ctx.rect(window.innerWidth / 2 - 1, window.innerHeight / 2 - 50, 2, 100);
  ctx.fill();
};

export const lenOfVec = (targetX, unitX, targetY, unitY) => {
  return Math.sqrt(Math.pow(targetX - unitX, 2) + Math.pow(targetY - unitY, 2));
};
