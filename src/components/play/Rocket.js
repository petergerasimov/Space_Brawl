import { Container, Sprite } from 'pixi.js';
import gsap, { MotionPathPlugin } from 'gsap/all';
import collisions from './collisions';

const EVENTS = {
  COLLISION: 'collision',
};

export default class Rocket extends Container {
  constructor() {
    super();

    gsap.registerPlugin(MotionPathPlugin);

    this._body = Sprite.from('rocket');
    this._body.anchor.set(0.5);
    this.addChild(this._body);

    this._paths = [];
    this.tl = gsap.timeline();
    this.lastCollider = null;

    // this.init();

  }
  async init() {
    const svgIds = Array.from(Array(10).keys());
    const rawData = await Promise.all(svgIds.map((x) => fetch(`./src/assets/path-${x + 1}.svg`)));
    const textData = await Promise.all(rawData.map((x) => x.text()));
    this._paths = textData.map((x) => this._parseSVG(x));
  }
  static get events() {
    return EVENTS;
  }
  /**
   *
   * @private
   * @param {String} svgData
   * @return {Array} 
   * @memberof Rocket
   */
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

    const arrData = MotionPathPlugin.getRawPath(svgData);
    this._pathToOrigin(arrData[0]);
    // console.log(arrData);

    return arrData[0];
  }

  /**
   *
   * @private
   * @param {Array} pathArr
   * @memberof Rocket
   */
  _pathToOrigin(pathArr) {
    const currStart = pathArr.slice(0, 2);
    for (let i = 0; i < pathArr.length; i += 2) {
      pathArr[i] -= currStart[0];
      pathArr[i + 1] -= currStart[1];
    }
  }

  move(...colliders) {
    const pathID = Math.floor(Math.random() * this._paths.length);

    this.tl
      .to(this._body, {
        duration: 3,
        motionPath:
        {
          path: this._paths[pathID],
          autoRotate: Math.PI / 2,
          alignOrigin: [0.5, 0.5],
          useRadians: true,
        },
        onUpdate: () => {
          for (const collider of colliders) {
            if (collisions.rectRect(collider.getBounds(), this._body.getBounds())) {
              // console.log("HIT");
              this.lastCollider = collider;
              this.emit(Rocket.events.COLLISION);
              
              this.tl.pause();
            }
          }
        }
      });
  }

}