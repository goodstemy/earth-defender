import { drawStars } from "../common/background";
import { getContext } from "../common/canvas";
import UFOSpawn from "../spawners/ufo";
import BulletSpawn from "../spawners/bullet";
import { DamageInfo } from "../units/damage-info";

export default class Renderer {
  pause = false;
  startTs;
  entities = new Map();
  enemies = new Map();
  damages = new Map();
  player;
  gameOverCb;
  rafId;

  constructor(entities, player) {
    this.entities = entities;
    this.player = player;

    UFOSpawn.setPlayer(this.player);
  }

  start(gameOverCb) {
    this.pause = false;
    this.gameOverCb = gameOverCb;

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
      cancelAnimationFrame(this.rafId);
      return;
    }

    if (this.player.dead) {
      return this.gameOverCb();
      //   this.screen.showGameOver();
      //   this.stop();
      //   this.player.reset();
      //   this.entities = new Map();
      //   UFOSpawn.reset();
      //   BulletSpawn.reset();
      //   return;
    }

    const ctx = getContext();
    const now = +new Date();
    const dt = (now - this.startTs) / 1000;

    this.startTs = now;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    drawStars();
    this.player.drawHP();

    const ufo = UFOSpawn.spawn();
    const bullet = BulletSpawn.spawn((damageInfo) => {
      !!damageInfo && this.entities.set(damageInfo);
    });

    !!ufo && this.enemies.set(ufo) && BulletSpawn.addEnemy(ufo);
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

    this.rafId = requestAnimationFrame(() => this.render());
  }
}
