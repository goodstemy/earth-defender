let canvas;
let ctx;

export const getCanvas = () => {
  if (!canvas) {
    canvas = document.querySelector('#canvas');
    canvas.setAttribute('style', 'image-rendering: optimizeQuality; image-rendering: pixelated;');
  }

  return canvas;
};

export const getContext = () => {
  if (!ctx) {
    ctx = canvas.getContext('2d');
  }

  return ctx;
};

getCanvas();
getContext();