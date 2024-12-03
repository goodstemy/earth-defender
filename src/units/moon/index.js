import { getContext } from "../../common/canvas";
import { BaseUnit } from "../base-unit";

export class Moon extends BaseUnit {
  centerX = 0;
  centerY = 0;
  radius = 100;
  angle = 0;
  radiusChange = 0.01;

  constructor(p) {
    super(p);
    /**
     * x=r*cos(theta)
     * y=r*sin(theta)
     */

    // this.x = ;
    // this.y =;
    this.centerX = window.innerWidth / 2 - this.w/2;
    this.centerY = window.innerHeight / 2 - this.h/2;
  }

  move() {
    this.x = this.centerX + this.radius * Math.cos(this.angle);
    this.y = this.centerY - this.radius * Math.sin(this.angle);

    this.angle += 0.01;

    if (this.radius >= 120) {
      this.radiusChange *= -1;
    }

    if (this.radius <= 80) {
      this.radiusChange *= -1;
    }

    this.radius += this.radiusChange;
  }

  draw(dt) {
    const ctx = getContext();

    ctx.drawImage(this.loadedAsset, this.x, this.y, this.loadedAsset.width, this.loadedAsset.height);
  }
}