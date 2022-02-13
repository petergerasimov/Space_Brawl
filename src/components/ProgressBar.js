import { Container, Graphics } from 'pixi.js';
import gsap from 'gsap';

const EVENTS = {
  EMPTY: 'empty',
  FULL: 'full'
};

export default class ProgressBar extends Container {
  constructor(startValue, width, height, radius, color) {
    super();

    this.value = startValue;
    this._width = width;
    this._height = height;
    this._radius = radius;
    this._color = color;
    
    const startWidth = this._width * (this.value / 100);

    this._bar = new Graphics();
    this._bar.beginFill(this._color, 1);
    this._bar.drawRoundedRect(-startWidth / 2, -this._height / 2, startWidth, this._height, this._radius);
    this._bar.endFill();
    this.addChild(this._bar);

  }
  static get events() {
    return EVENTS;
  }
  /**
   * @param {Number} to where to update to
   * @memberof ProgressBar
   */
  updateValue(to) {
    gsap.to(this, {
      value: to,
      onUpdate: () => {
        // Old way of updating (faster but looks worse)
        // const oldW = this._bar.width;
        // this._bar.width = (this.value / 100) * this._width;
        // this._bar.x += (this._bar.width - oldW) / 2;

        const oldW = this._bar.width;
        const newW = (this.value / 100) * this._width;
        this._bar.clear();
        this._bar.beginFill(this._color, 1);
        this._bar.drawRoundedRect(-newW / 2, -this._height / 2, newW, this._height, this._radius);
        this._bar.endFill();
        this._bar.x += (this._bar.width - oldW) / 2;
      },
      onComplete: () => {
        if (this.value <= 0) {
          this.emit(ProgressBar.events.EMPTY);
        } else if (this.value >= 100) {
          this.emit(ProgressBar.events.FULL);
        }
      }
    });
  }
}