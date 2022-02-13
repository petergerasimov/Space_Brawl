import Footer from '../components/Footer';
import Scene from './Scene';
import { Graphics, filters, Text } from 'pixi.js';
import { gsap, SteppedEase } from 'gsap/all';

export default class Countdown extends Scene {
  constructor() {
    super();
  }
  async onCreated() {
    this.name = 'countdown';

    const footer = new Footer();
    const blurFilter = new filters.BlurFilter();
    blurFilter.blur = 100;
    // blurFilter.quality = 20 // this makes my gpu go wild
    this.background.filters = [blurFilter];
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);

    this._number = 3;
    this._tween = null;

    this._numberCountdown();
  }
  /**
   *
   * @private
   * @memberof Countdown
   */
  _numberCountdown() {
    const graphics = new Graphics();

    graphics.lineStyle(10, 0xffffff, 1);
    graphics.beginFill(0xffffff, 0.5);
    graphics.drawCircle(0, 0, 200);
    graphics.endFill();

    this.addChild(graphics);

    const numText = new Text(this._number.toString(), {
      fontSize: 150,
      fill: 0xffffff,
    });
    numText.anchor.set(0.5);
    this.addChild(numText);

    this._tween = gsap.to(numText, {text: '0', duration: this._number, ease: SteppedEase.config(this._number)});
  }

  get finish() {
    return this._tween;
  }
  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars
  }
}
