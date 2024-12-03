import { drawStars } from '../common/background';
import { getContext } from '../common/canvas';
import UFOSpawn from '../spawners/ufo';
import BulletSpawn from '../spawners/bullet';
import Player from '../player';

export default class Renderer {
  pause = false;
  startTs;
  player = new Player();
  entities = new Map();
  enemies = new Map();
  screen;

  constructor(entities, screen) {
    this.entities = entities;
    this.screen = screen;

    UFOSpawn.setPLayer(this.player);
  }

  start() {
    this.pause = false;

    this.render(+new Date());
  }

  stop() {
    this.pause = true;
  }

  render(date) {
    if (!this.startTs) {
      this.startTs = date;
    }

    if (this.pause) {
      return;
    }

    if (this.player.dead) {
      this.screen.showGameOver();
      this.stop();
      this.player.reset();
      this.entities = new Map();
      UFOSpawn.reset();
      BulletSpawn.reset();
      return;
    }

    const ctx = getContext();
    const now = +new Date();
    const dt = (now - this.startTs) / 1000;

    this.startTs = now;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawStars();
    this.player.drawHP();

    const ufo = UFOSpawn.spawn();
    !!ufo && this.enemies.set(ufo) && BulletSpawn.addEnemy(ufo);

    const bullet = BulletSpawn.spawn();
    !!bullet && this.entities.set(bullet);

    for (const entity of this.entities.keys()) {
      if (entity.deleted) {
        this.entities.delete(entity);
        continue;
      }

      entity.move(dt);
      entity.draw();
    }

    for (const entity of this.enemies.keys()) {
      if (entity.deleted) {
        this.enemies.delete(entity);
        continue;
      }

      entity.move(dt);
      entity.draw();
    }

    requestAnimationFrame(() => this.render());
  }
};
