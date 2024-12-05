import { getContext } from "../../common/canvas";
import { BaseUnit } from "../base-unit";
import assetLoader from "../../loader/asset";
import { lenOfVec, randomIntBetween } from "../../common/utils";

function normalizeAngle(angle) {
  return (angle + Math.PI * 2) % (Math.PI * 2);
}

export class UFO extends BaseUnit {
  hp = 3;
  sideX;
  sideY;
  initialX;
  initialY;
  targetX;
  targetY;
  L;
  willBeDead = false;
  player;

  constructor(p) {
    super(p);
  }

  setPlayer(player) {
    this.player = player;
  }

  addDamage(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
      this.deleted = true;
    }
  }

  init() {
    super.init();

    this.sideX =
      randomIntBetween(1, 2) === 1 ? 0 - this.w : window.innerWidth + this.w;
    this.sideY =
      randomIntBetween(1, 2) === 1 ? 0 - this.h : window.innerHeight + this.h;

    this.targetX = window.innerWidth / 2;
    this.targetY = window.innerHeight / 2;

    if (randomIntBetween(1, 10) > 5) {
      this.x = this.sideX;
      this.y = randomIntBetween(0, window.innerHeight + this.h);
    } else {
      this.x = randomIntBetween(0, window.innerWidth + this.w);
      this.y = this.sideY;
    }

    this.initialX = this.x;
    this.initialY = this.y;
  }

  move(dt) {
    if (this.deleted) {
      return;
    }

    const L = lenOfVec(this.targetX, this.x, this.targetY, this.y);

    if (L <= 50) {
      this.deleted = true;
      this.player.reduceHP();
      return;
    }

    this.L = L;

    let dirX = this.targetX - this.x;
    let dirY = this.targetY - this.y;

    // console.log(this.targetX, this.targetY)
    // console.log(L, dirX, dirY)

    if (L != 0) {
      dirX /= L;
      dirY /= L;
    }

    this.x += dirX * this.speed * dt;
    this.y += dirY * this.speed * dt;
  }

  draw() {
    if (this.deleted) {
      return;
    }

    const ctx = getContext();
    ctx.save();
    const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);

    ctx.translate(this.x, this.y);
    // ctx.rotate(this.sideX <= 0 ? angle : angle + Math.sin(Math.PI));
    ctx.rotate(Math.abs(angle) > 2.5 ? angle + Math.PI : angle);
    ctx.drawImage(
      this.loadedAsset,
      -this.loadedAsset.width / 2,
      -this.loadedAsset.height / 2,
      this.loadedAsset.width,
      this.loadedAsset.height,
    );

    ctx.restore();
    // ctx.font = "20px serif";
    // ctx.fillStyle = "white";
    // ctx.fillText(angle.toFixed(6), this.x, this.y);
    // ctx.fillText(`${this.x.toFixed(2)},${this.y.toFixed(2)}`, this.x, this.y);
  }

  destroy() {
    this.deleted = true;
  }
}
