import { getContext } from "../../common/canvas";
import { BaseUnit } from "../base-unit";
import { Bullet } from "../bullet";

export class Earth extends BaseUnit {
  degrees = 0;
  degreesChange = 0.11;
  timeoutBetweenShots = 1000;
  canShoot = true;

  constructor(p) {
    super(p);

    setInterval(() => {
      // const bullet = new Bullet({});
    }, this.timeoutBetweenShots);
  }

  move() {
    this.degrees += this.degreesChange;
  }

  draw(dt) {
    const ctx = getContext();
    ctx.save();

  //	ctx.font = `${EARTH_RADIUS}px serif`;
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    ctx.rotate(this.degrees * Math.PI/180);
    ctx.drawImage(this.loadedAsset, -this.loadedAsset.width/2, -this.loadedAsset.height/2, this.loadedAsset.width, this.loadedAsset.height);
    
    //ctx.fillText("🌏", window.innerWidth / 2 - EARTH_RADIUS/2, window.innerHeight / 2 + EARTH_RADIUS/2);
  //	ctx.fillText("🌏", 0 - EARTH_RADIUS/2, 0+EARTH_RADIUS/2-10);
    //ctx.fillText("🌏", 0-36, 0);
  
    ctx.restore();
  }
}