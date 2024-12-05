import { getContext } from "../../common/canvas";

const ctx = getContext();

export class DamageInfo {
  text;
  x;
  y;
  showFrames = 24;
  deleted = false;

  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
  }

  move(dt) {
    this.showFrames--;
  }

  draw() {
    if (this.showFrames <= 0) {
      this.deleted = true;
      return;
    }

    ctx.font = "15px serif";
    // ctx.fillStyle = "rgba(255, 0, 0, 1)";
    ctx.fillStyle = "red";
    ctx.fillText("-1", this.x, this.y);
    //
  }
}
