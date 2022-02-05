import { Container, Graphics } from 'pixi.js';

export default class Indicator extends Container {
  constructor(size) {
    super();

    this.name = 'indicator';
    this.size = size;
    this.offset = 50;
    this.radius = 5;
    this.graphics = new Graphics();
    this.addChild(this.graphics);
    this.foreground = 0xffffff;
    this.background = 0x999999;

    this._addPoints();

  }

  /**
   * @private
   */
  _addPoints() {

    this.select(0);

  }
  /**
   * @param {Number} index
   */
  select(index) {
    this.graphics.clear();

    // const width = this.radius * 2 + (this.size - 1) * this.offset;

    for (let i = 0; i < this.size; i++) {
      if (i === index) {
        this.graphics.beginFill(this.foreground, 1);
      } else {
        this.graphics.beginFill(this.background, 1);
      }
      this.graphics.drawEllipse(i * this.offset, 0, this.radius, this.radius);
      this.graphics.endFill();
    }
    this.graphics.position.x = -this.width / 2 + this.radius;
  }
}
