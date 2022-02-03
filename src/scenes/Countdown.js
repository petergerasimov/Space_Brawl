import Footer from '../components/Footer';
import Scene from './Scene';
import { Graphics, filters } from 'pixi.js';

export default class Countdown extends Scene {
  constructor() {
    super();
  }
  async onCreated() {
    const footer = new Footer();
    const blurFilter = new filters.BlurFilter();
    blurFilter.blur = 100;
    // blurFilter.quality = 20 // this makes my gpu go wild
    this.background.filters = [blurFilter];
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);

    this._number = 3;

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
    graphics.drawCircle(400, 250, 50);
    graphics.endFill();

    this.addChild(graphics);
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
