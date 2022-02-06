import { Container, Sprite } from 'pixi.js';
import Healthbar from './Healthbar';
import Shield from './Shield';

export default class Rover extends Container {
  constructor() {
    super();

    this._shadow = Sprite.from('rover-shadow');
    this._shadow.y = 60;
    this._shadow.anchor.set(0.5);

    this._body = Sprite.from('rover');
    this._body.anchor.set(0.5);

    this._lowerShield = null;
    this._upperShield = null;

    this._addShields();

    this.healthbar = new Healthbar();
    this.healthbar.x = -9;
    this.healthbar.y = -74;

    this._upperShield.activate();
    // this._upperShield.activate();

    this.addChild(this._body, this._shadow, this.healthbar);
  }

  _addShields() {
    this._lowerShield = new Shield();
    this._lowerShield.x = -118;
    this._lowerShield.y = -24;
    this._lowerShield.rotation = 5.5;
    this._lowerShield.scale.set(0.85);

    this._upperShield = new Shield();
    this._upperShield.x = -16;
    this._upperShield.y = -126;
    this._upperShield.rotation = 5.5 + Math.PI / 2;
    this._upperShield.scale.set(0.85);

    this.addChild(this._lowerShield, this._upperShield);
  }
}