import { getCanvas, getContext } from '../common/canvas';
import { Earth } from '../units/earth';
import { generateStars } from '../common/background';
import { resize, sleep } from '../common/utils';
import { render } from '../main';
import Renderer from '../renderer';

const canvas = getCanvas();
const context = getContext();

export default class Screen {
  entities = null;

  constructor(entities) {
    this.entities = entities;
    this.menuHTML = document.querySelector('.menu_container');
    this.buttonPlayHTML = document.querySelectorAll('.button')[0];
    this.renderer = new Renderer(entities, this);
  }

  async showLevel(level = 1) {
    this.menuHTML.style.display = 'none';
    canvas.style.display = 'block';

    this.renderer.stop();

    context.fillStyle = 'white';
    context.font = "40px serif";
    context.fillText(`Level ${level}`, window.innerWidth/2-20, window.innerHeight/2-20);

    await sleep(2000);

    const earth = new Earth({
      name: 'earth',
      w: 100,
      h: 100,
      speed: 0,
    });
    // const moon = new Moon({
    //   asset: moonPng,
    //   name: 'moon',
    //   w: 50,
    //   h: 50,
    //   speed: 1,
    // });

    this.entities.set(earth);
    // entities.set(moon);

    for (const entity of this.entities.keys()) {
      entity.init();
    }

    generateStars();
    this.renderer.start();
  }

  async showMain() {
    this.menuHTML.style.display = 'flex';
    canvas.style.display = 'none';

    this.buttonPlayHTML.addEventListener('click', () => this.showLevel(1));
  }

  async showGameOver() {
    context.fillStyle = 'black';
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fill();
    context.fillStyle = 'red';
    context.font = "40px serif";
    context.fillText(`GAME OVER`, window.innerWidth/2-120, window.innerHeight/2-20);    
    context.fillStyle = 'white';
    context.font = "20px serif";
    context.fillText(`Click for menu`, window.innerWidth/2-120, window.innerHeight/2+100);

    const listener = canvas.addEventListener('click', () => {
      canvas.removeEventListener('click', listener);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      this.showMain();
    });
  }
}
