import { getCanvas, getContext } from './common/canvas';
import { resize } from './common/utils';
import Screen from './screens';
import assetLoader from './loader/asset';

/**
 * 1. Moon as defence upgrade
 * 2. Add levels and level 1
 * 3. Add hp for earth and enemies
 * 4. Make game over and success screens
 */

const entities = new Map();
let screen
// const screen = new Screen(entities);

const init = async () => {
  resize();
  console.log('assets loading...');
  await assetLoader.load();
  screen = new Screen(entities);
  await screen.showMain();
  console.log('assets loaded');

  // render(+new Date());
};

window.addEventListener('resize', resize);
window.addEventListener('load', init);
