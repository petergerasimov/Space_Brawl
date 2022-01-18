import { Container, Graphics, Sprite, Text } from "pixi.js";

import gsap from "gsap";

export default class Slide extends Container {
  /**
   * @param {String} keyToPress
   */
  constructor(keyToPress, instructions) {
    super();

    this.name = "key";
    this.keyToPress = keyToPress;
    this.instructions = instructions

    this._addKey();
    this._addLetter();
    this._addInstructions();

  }

  /**
   * @private
   */
  _addKey() {
    this.key = Sprite.from("key-default");
    this.key.anchor.set(0.5);
    this.key.scale.set(0.75);
    this.addChild(this.key);
  }
  /**
   * @private
   */
  _addLetter() {
    const char = new Text(this.keyToPress, {
      fontSize: 150,
      fill: 0xffffff,
    });
    char.anchor.set(0.5)
    this.addChild(char);
  }
  /**
   * @private
   */
   _addInstructions() {
    const char = new Text(`Press "${this.keyToPress}" to ${this.instructions}`, {
      fontSize: 50,
      fill: 0xffffff,
    });
    char.anchor.set(0.5)
    char.position.y += this.key.height / 1.5
    this.addChild(char);
  }

  
}
