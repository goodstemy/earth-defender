import earthPng from '../../../assets/earth.png';
import moonPng from '../../../assets/moon.png';
import bulletPng from '../../../assets/bullet.png';
import ufoPng from '../../../assets/ufo.png';
import heartPng from '../../../assets/heart.png';
import emptyHeartPng from '../../../assets/empty-heart.png';

export default new class AssetLoader {
  #cache = {};

  constructor() {}

  async load() {
    await Promise.all([
      this._load(earthPng, 'earth'),
      this._load(moonPng, 'moon', 50, 50),
      this._load(bulletPng, 'bullet', 50, 50),
      this._load(ufoPng, 'ufo', 50, 50),
      this._load(heartPng, 'heart', 30, 30),
      this._load(emptyHeartPng, 'empty-heart', 30, 30),
    ]);
  }

  async _load(asset, name, w = 100, h = 100) {
    return new Promise((resolve) => {
      const img = new Image();

      let _asset;
  
      img.onload = () => {
        _asset = img;
        _asset.width = w;
        _asset.height = h;
  
        this.#cache[name] = _asset;
        resolve();
      };
  
      img.onerror = (err) => console.error(err);
  
      img.src = asset;
    });
  }

  get(name) {
    if (!this.#cache[name]) {
      throw new Error(`Can't find any asset with name = ${name}`);
    }

    return this.#cache[name];
  }
}