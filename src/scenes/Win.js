import Footer from '../components/Footer';
import Scene from './Scene';
import { filters, Sprite } from 'pixi.js';
import TextButton from '../components/TextButton';

export default class Win extends Scene {
  constructor() {
    super();
  }
  async onCreated() {
    this.name = 'win';
    
    const blurFilter = new filters.BlurFilter();
    blurFilter.blur = 100;
    // blurFilter.quality = 20 // this makes my gpu go wild
    this.background.filters = [blurFilter];

    this._button = new TextButton('REPLAY', 15, 50, 0xffffff);
    this._button.y = 288;

    this._winsText = Sprite.from('wins');
    this._winsText.anchor.set(0.5);
    this._winsText.scale.set(0.75);
    this._winsText.y = 134;

    this._addStars();

    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;

    this.addChild(this._button, this._winsText, footer);
  }

  get finish() {
    return new Promise((res) => this._button.on('click', res));
  }

  _addStars() {
    const numberOfStars = 4;
    const stars = Array.from({length: numberOfStars}, () => {
      const star = Sprite.from(`star`);
      star.anchor.set(0.5);
      this.addChild(star);

      return star;
    });

    stars[0].x = -357;
    stars[0].y = -260;
    stars[0].scale.set(0.5);
    stars[0].angle = -35;

    stars[1].x = -583;
    stars[1].y = -38;
    stars[1].scale.set(0.2);
    stars[1].angle = -35;

    stars[2].x = 368;
    stars[2].y = -273;
    stars[2].scale.set(0.28);
    stars[2].angle = 45;

    stars[3].x = 553;
    stars[3].y = -42;
    stars[3].scale.set(0.28);
    stars[3].angle = 85;
  }
  setWinner(winner) {
    this._winner = null;
    if (winner === 1) {
      this._winner = Sprite.from('1');
      this._winner.x = -50;
    } else if (winner === 2) {
      this._winner = Sprite.from('2');
    }
    this._winner.anchor.set(0.5);
    this._winner.scale.set(0.75);
    this._winner.y = -162;

    this.addChild(this._winner);
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
