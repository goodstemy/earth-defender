import { resize } from "./common/utils";
import { World } from "./world";

const init = async () => {
  resize();

  const world = new World();
  await world.load();
};

window.addEventListener("load", init);
