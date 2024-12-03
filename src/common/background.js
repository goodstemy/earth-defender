import { getContext } from "./canvas";
import { randomFloatBetween, randomIntBetween } from "./utils";

const stars = [];
const STARS_COUNT = 100;

export const generateStars = () => {
	for (let i = 0; i < STARS_COUNT; i++) {
		const x = randomIntBetween(0, window.innerWidth);
		const y = randomIntBetween(0, window.innerHeight);
		const radius = randomFloatBetween(0.2, 1.5);

		stars.push([x, y, radius]);
	}

	return stars;
};

export const drawStars = () => {
  const ctx = getContext();

	ctx.save();

	for (let i = 0; i < stars.length; i++) {	
		const x = stars[i][0];
		const y = stars[i][1];
		const radius = stars[i][2];

		ctx.fillStyle = `rgba(255, 255, 255, ${radius < 1 ? radius : 1})`;

		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	ctx.restore();
};