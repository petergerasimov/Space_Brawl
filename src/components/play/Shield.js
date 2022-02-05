import { Sprite, Texture } from 'pixi.js';

export default class Shield extends Sprite {
  constructor() {
    super();

    this.texture = Texture.from('shield-inactive');

    this.anchor.set(0.5);
    this._active = false;

    // Textures have a different rotation
    this._rotationFactor = -Math.PI / 2;
  }
  activate() {
    if (!this._active) {
      this.texture = Texture.from('shield-active');
      this.rotation += this._rotationFactor;
      this._active = true;
    }
    
  }
  deactivate() {
    if (this._active) {
      this.texture = Texture.from('shield-inactive');
      this.rotation -= this._rotationFactor;
      this._active = false;
    }
  }

  get isActive() {
    return this._active;
  }
}