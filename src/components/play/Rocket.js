import { Container, Sprite } from 'pixi.js';
import gsap, { MotionPathPlugin } from 'gsap/all';

export default class Rocket extends Container {
  constructor() {
    super();

    this._body = Sprite.from('rocket');
    this._body.anchor.set(0.5);
    this.addChild(this._body);

    this._paths = [];

    // this.init();
    
  }
  async init() {
    const svgIds = Array.from(Array(10).keys());
    const rawData = await Promise.all(svgIds.map((x) => fetch(`./src/assets/path-${x + 1}.svg`)));
    const textData = await Promise.all(rawData.map((x) => x.text()));
    this._paths = textData.map((x) => this._parseSVG(x));
  }

  _parseSVG(svgData) {
    // remove first tag
    let i = 0;
    for (; i < svgData.length; i++) {
      if (svgData[i] === '>') break;
    }
    svgData = svgData.slice(i + 1);

    // get the item between the first two quotes which should be the path
    const quoteIds = [];
    for (let j = 0; j < svgData.length; j++) {
      if (svgData[j] === '\"') quoteIds.push(j);
    }
    svgData = svgData.slice(quoteIds[0], quoteIds[1] + 1);

    return svgData;
  }

  move() {
    const pathID = Math.floor(Math.random() * this._paths.length);
    const toRotate = { x: 0, y: 0, rotation: 0};

    gsap.registerPlugin(MotionPathPlugin);
    gsap.to(toRotate, {
      duration: 10,
      motionPath: 
      {
        path: this._paths[pathID],
        autoRotate: 90,
        alignOrigin: [0.5, 0.5],
      },
      onUpdate: () => {
        this.x = toRotate.x;
        this.y = toRotate.y;
        this.angle = toRotate.rotation;
      }
    });
  }

}