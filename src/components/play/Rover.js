import { Container, Sprite } from 'pixi.js';
import Healthbar from './Healthbar';
import Shield from './Shield';
import { collisions } from './collisions';

const EVENTS = {
  COLLISION_BODY: 'collision_body',
  COLLISION_UPSHIELD: 'collision_upshield',
  COLLISION_DOWNSHIELD: 'collision_downshield',
};

export default class Rover extends Container {
  constructor() {
    super();

    this._shadow = Sprite.from('rover-shadow');
    this._shadow.y = 60;
    this._shadow.anchor.set(0.5);

    this._body = Sprite.from('rover');
    this._body.anchor.set(0.5);

    this.lowerShield = null;
    this.upperShield = null;

    this._addShields();

    this.lowerShield.on('collision', () => this.emit(Rover.events.COLLISION_DOWNSHIELD));
    this.upperShield.on('collision', () => this.emit(Rover.events.COLLISION_UPSHIELD));

    this.healthbar = new Healthbar();
    this.healthbar.x = -9;
    this.healthbar.y = -74;

    // this.upperShield.activate();
    this.lowerShield.activate();
    // this._upperShield.activate();

    this.addChild(this._body, this._shadow, this.healthbar);
  }
  static get events() {
    return EVENTS;
  }
  get collidables() {
    return [this, this.lowerShield, this.upperShield];
  }
  _addShields() {
    this.lowerShield = new Shield();
    this.lowerShield.x = -118;
    this.lowerShield.y = -24;
    this.lowerShield.rotation = 5.5;
    this.lowerShield.scale.set(0.85);

    this.upperShield = new Shield();
    this.upperShield.x = -16;
    this.upperShield.y = -126;
    this.upperShield.rotation = 5.5 + Math.PI / 2;
    this.upperShield.scale.set(0.85);

    this.addChild(this.lowerShield, this.upperShield);
  }

  /**
   * @param {Reactangle} rect
   * @return {Boolean} 
   * @memberof Rover
   */
  collidesWith(rect) {
    if (collisions.rectRect(rect, this._body.getBounds())) {
      this.emit(Rover.events.COLLISION_BODY);

      return true;
    }

    return false;
  }
}