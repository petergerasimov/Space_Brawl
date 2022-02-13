import Footer from '../components/Footer';
import Slides from '../components/tutorial/Slides';
import Scene from './Scene';
import { filters } from 'pixi.js';

export default class Tutorial extends Scene {
  constructor() {
    super();
  }
  async onCreated() {
    const blurFilter = new filters.BlurFilter();
    blurFilter.blur = 100;
    this.background.filters = [blurFilter];

    this._slides = new Slides([
      { key: '↑', instructions: 'Press "up" to activate upper shield' },
      { key: '↓', instructions: 'Press "down" to activate lower shield' },
    ]);

    // key.x = -window.innerWidth / 2;
    // key.y = window.innerHeight / 2;

    this.addChild(this._slides);

    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);
  }

  get finish() {
    return new Promise((res) => this._slides.on('slides_completed', res));
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
