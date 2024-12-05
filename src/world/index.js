import assetLoader from "../loader/asset";
import Player from "../player";
import Renderer from "../renderer";
import Screen from "../screens";
import UFOSpawn from "../spawners/ufo";
import BulletSpawn from "../spawners/bullet";
import { getContext } from "../common/canvas";

export class World {
  level = 1;
  entities = new Map();
  /**
   * @type {Screen}
   */
  screen;
  /**
   * @type {Renderer}
   */
  renderer;
  /**
   * @type {Player}
   */
  player;

  constructor() {}

  async load() {
    console.log("assets loading...");
    await assetLoader.load();
    console.log("assets loaded");
    this.screen = new Screen(this.entities);
    this.player = new Player();
    this.renderer = new Renderer(this.entities, this.player);

    this.screen.showMain(this.start.bind(this));
  }

  async start() {
    await this.screen.showLevel(this.level);
    this.renderer.start(this.restart.bind(this));
  }

  restart() {
    this.renderer.stop();
    this.entities = new Map();
    this.screen = new Screen(this.entities);
    this.player = new Player();
    this.renderer = new Renderer(this.entities, this.player);
    const context = getContext();
    UFOSpawn.reset();
    BulletSpawn.reset();
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.screen.showGameOver(() => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      this.screen.showMain(this.start.bind(this));
    });
  }
}
