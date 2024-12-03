import { UFO } from "../../units/ufo";


class UFOSpawn {
  spawnTimeout = 1000;
  lastSpawn = null;
  player = null;

  setPLayer(player) {
    this.player = player;
  }

  updateTimeout(newTimeout) {
    this.spawnTimeout = newTimeout;
  }

  reset() {
    // this.
  }

  spawn() {
    const spawnTime = +new Date();
    if (this.lastSpawn && this.lastSpawn + this.spawnTimeout > spawnTime) {
      return;
    }

    const ufo = new UFO({
      name: 'ufo',
      w: 50,
      h: 50,
      speed: 100,
    });

    ufo.init();
    ufo.setPlayer(this.player);

    this.lastSpawn = spawnTime;

    return ufo;
  }
}

export default new UFOSpawn();