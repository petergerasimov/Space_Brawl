import { Container, Sprite, Graphics } from 'pixi.js';
import gsap from 'gsap';

export default class Healthbar extends Container {
  constructor() {
    super();

    this._health = 100;
    this._startWidth = 117;
    
    const outline = Sprite.from('rover-health-bar');
    outline.anchor.set(0.5);
    this.addChild(outline);

    this._bar = null;
    this._addBar();

  }
  /**
   *
   * @private
   * @memberof Healthbar
   */
  _addBar() {
    this._bar = new Graphics();
    const bodyH = 13;
    const bodyW = this._startWidth;
    const color = 0xd4f800;
    const radius = bodyH / 2;
    this._bar.beginFill(color, 1);
    this._bar.drawRoundedRect(-bodyW / 2, -bodyH / 2, bodyW, bodyH, radius);
    this._bar.endFill();
    this.addChild(this._bar);
  }
  /**
   * @param {Number} to where to update to
   * @memberof Healthbar
   */
  updateHealth(to) {
    gsap.to(this, {
      _health: to,
      onUpdate: () => {
        const oldW = this._bar.width;
        this._bar.width = (this._health / 100) * this._startWidth;
        this._bar.x += (this._bar.width - oldW) / 2;
      },
    });
  }
  subtractHealth(value) {
    this.updateHealth(this._health - value);
  }
}