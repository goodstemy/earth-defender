import { getContext } from '../common/canvas';
import assetLoader from '../loader/asset';

const context = getContext();

export default class Player {
  loadedAsset = null;
  loadedAssetEmpty = null;
  maxHP = 3;
  minHP = 0;
  hp = 3;
  dead = false;

  constructor() {
    this.loadedAsset = assetLoader.get('heart');
    this.loadedAssetEmpty = assetLoader.get('empty-heart');
  }
  
  reset() {
    this.hp = 3;
    this.maxHP = 3;
    this.dead = false;
  }

  drawHP() {
    for (let i = 0, x = 0; i < this.maxHP; i++, x = i * 50) {
      if (i+1 <= this.hp) {
        context.drawImage(this.loadedAsset, x, 0, 50, 50);
      } else {
        context.drawImage(this.loadedAssetEmpty, x, 0, 50, 50);
      }
    }
  }

  reduceHP() {
    this.hp = Math.max(this.minHP, this.hp - 1);

    if (this.hp <= 0) {
      this.dead = true;
    }
  }

  increaseHP() {
    this.hp = Math.min(this.maxHP, this.hp + 1);
  }
}