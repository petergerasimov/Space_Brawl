import { Container, Sprite } from 'pixi.js';
import ProgressBar from '../ProgressBar';

const EVENTS = {
  EMPTY: 'empty'
};

export default class Healthbar extends Container {
  constructor() {
    super();
    this._startWidth = 117;
    
    const outline = Sprite.from('rover-health-bar');
    outline.anchor.set(0.5);
    this.addChild(outline);

    this._bar = null;
    this._addBar();

    this._bar.on('empty', () => {
      this.emit(Healthbar.events.EMPTY);
    });

  }
  static get events() {
    return EVENTS;
  }
  /**
   *
   * @private
   * @memberof Healthbar
   */
  _addBar() {
    const bodyH = 13;
    this._bar = new ProgressBar(100, this._startWidth, bodyH, bodyH / 2, 0xd4f800);
    this.addChild(this._bar);
  }
  subtractHealth(value) {
    if (this._bar.value > 0) {
      this._bar.updateValue(this._bar.value - value);
    }
  }
}