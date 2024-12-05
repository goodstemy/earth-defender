import { getContext } from "../../common/canvas";
import { lenOfVec } from "../../common/utils";
import { BaseUnit } from "../base-unit";
import { DamageInfo } from "../damage-info";

const ctx = getContext();

export class Bullet extends BaseUnit {
  damage = 1;
  targetX;
  targetY;
  enemy;
  type = 1;
  addDamageCb;

  constructor(p) {
    super(p);

    this.x = window.innerWidth / 2 - this.w / 2;
    this.y = window.innerHeight / 2 - this.h / 2;
  }

  setDamageCb(addDamageCb) {
    this.addDamageCb = addDamageCb;
  }

  setTarget(enemy) {
    this.enemy = enemy;
    this.targetX = this.enemy.initialX + this.enemy.w / 2;
    this.targetY = this.enemy.initialY + this.enemy.h / 2;
  }

  move(dt) {
    const L = lenOfVec(
      this.enemy.initialX,
      this.x,
      this.enemy.initialY,
      this.y,
    );
    const Lcurrent = lenOfVec(this.enemy.x, this.x, this.enemy.y, this.y);

    // TODO: destroy after reach limit of window
    if (Lcurrent <= 25) {
      this.addDamageCb(
        new DamageInfo(`-${this.damage}`, this.enemy.x, this.enemy.y),
      );
      this.enemy.addDamage(this.damage);

      this.destroy();
      return;

      // if (this.enemy.hp <= 0) {
      //   this.enemy.destroy();
      //   this.destroy();
      //   return;
      // }
    }

    let dirX = this.targetX - this.x;
    let dirY = this.targetY - this.y;

    if (L != 0) {
      dirX /= L;
      dirY /= L;
    }

    this.x += dirX * this.speed * dt;
    this.y += dirY * this.speed * dt;
  }

  draw(dt) {
    const ctx = getContext();
    ctx.save();

    const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);

    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.drawImage(
      this.loadedAsset,
      -this.loadedAsset.width / 2,
      -this.loadedAsset.height / 2,
      this.loadedAsset.width,
      this.loadedAsset.height,
    );

    ctx.restore();
  }

  destroy() {
    this.deleted = true;
  }
}
