import { Sprite, Texture, Graphics, Container } from 'pixi.js';
import { collisions } from './collisions';

const EVENTS = {
  COLLISION: 'collision',
};

export default class Shield extends Container {
  constructor() {
    super();

    this.body = new Sprite();
    this.body.texture = Texture.from('shield-inactive');
    this.addChild(this.body);

    this.body.anchor.set(0.5);
    this._active = false;

    // a, b and c are for the lines ab and bc used for collision
    
    this._a = new Graphics();
    this._a.beginFill(0xFF0000, 0);
    this._a.drawRect(-80, 85, 1, 1);
    this._a.endFill();

    this._b = new Graphics();
    this._b.beginFill(0xFF0000, 0);
    this._b.drawRect(-32, -32, 1, 1);
    this._b.endFill();

    this._c = new Graphics();
    this._c.beginFill(0xFF0000, 0);
    this._c.drawRect(85, -80, 1, 1);
    this._c.endFill();

    this.addChild(this._a, this._b, this._c);

    // Textures have a different rotation
    this._rotationFactor = -Math.PI / 2;
  }
  static get events() {
    return EVENTS;
  }
  activate() {
    if (!this._active) {
      this.body.texture = Texture.from('shield-active');
      this.body.rotation += this._rotationFactor;
      this._active = true;
    }
    
  }
  deactivate() {
    if (this._active) {
      this.body.texture = Texture.from('shield-inactive');
      this.body.rotation -= this._rotationFactor;
      this._active = false;
    }
  }
  collidesWith(rect) {
    const a = {x: this._a.getBounds().x, y: this._a.getBounds().y };
    const b = {x: this._b.getBounds().x, y: this._b.getBounds().y };
    const c = {x: this._c.getBounds().x, y: this._c.getBounds().y };
    const ab = {a, b};
    const bc = {a: b, b: c};

    if ((collisions.lineRect(ab, rect) || collisions.lineRect(bc, rect)) && this._active) {
      this.emit(Shield.events.COLLISION);
      
      return true;
    }

    return false;
  }
  get isActive() {
    return this._active;
  }
}