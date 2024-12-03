import assetLoader from '../../loader/asset';

export class BaseUnit {
  loadedAsset;
  name;
  speed;
  x;
  y;
  w;
  h;
  initialized = false;
  deleted = false;

  constructor({ name, speed, w, h }) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.speed = speed;
  }

  async init() {
    this.loadedAsset = assetLoader.get(this.name);
    this.initialized = true;
  }

  move() {
    throw new Error(`${this.name} not initialized!`);
  }

  draw() {
    if (!this.initialized) {
      throw new Error(`${this.name} not initialized!`);
    }
  }

  getType() {
    throw new Error(`${this.name} not provided type!`);
  }
}
