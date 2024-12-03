import { getContext } from "../../common/canvas";
import { Bullet } from "../../units/bullet";


class BulletSpawn {
  spawnTimeout = 4000;
  lastSpawn = null;
  enemies = new Map();

  addEnemy(enemy) {
    this.enemies.set(enemy);
  }

  delEnemy(enemy) {
    this.enemies.delete(enemy);
  }

  reset() {
    this.enemies = new Map();
  }

  findNearestEnemy() {
    let L = Infinity;
    let nearestEnemy;

    for (const enemy of this.enemies.keys()) {
      if (enemy.deleted) {
        this.enemies.delete(enemy);
        continue;
      }

      if (enemy.willBeDead) {
        continue;
      }

      if (enemy.L < L) {
        L = enemy.L;
        nearestEnemy = enemy;
      }
    }

    return nearestEnemy;
  }

  spawn() {
    // context.fillStyle = 'white';
    // context.font = "40px serif";
    // context.fillText(`enemies count = ${this.enemies.size}`, 200, 40);

    // console.log('enemies count =', this.enemies.size);
    const spawnTime = +new Date();
    if (this.lastSpawn && this.lastSpawn + this.spawnTimeout > spawnTime) {
      return;
    }

    const nearestEnemy = this.findNearestEnemy(this.enemies);

    if (!nearestEnemy) {
      return;
    }

    const bullet = new Bullet({
      name: 'bullet',
      w: 50,
      h: 50,
      speed: 100,
    });

    bullet.init();
    bullet.setTarget(nearestEnemy);

    nearestEnemy.willBeDead = true;

    this.lastSpawn = spawnTime;

    return bullet;
  }
}

export default new BulletSpawn();