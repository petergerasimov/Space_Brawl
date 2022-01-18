import { Container, Graphics, Sprite } from "pixi.js";

import gsap from "gsap";

export default class Key extends Container {
  constructor() {
    super();

    this.name = "key";

    this._addKey();

  }

  /**
   * @private
   */
  _addKey() {
    const bg = Sprite.from("key-default");
    bg.x -= bg.width / 2
    bg.y -= bg.height / 2
    this.addChild(bg);
  }

  
}
