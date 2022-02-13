import { Container, Sprite, Text } from 'pixi.js';

export default class Key extends Container {
  constructor(keyToPress) {
    super();

    this.body = Sprite.from('key-default');
    this.body.anchor.set(0.5);

    this.char = new Text(keyToPress, {
      fontSize: 150,
      fill: 0xffffff,
    });
    this.char.anchor.set(0.5);

    this.addChild(this.body, this.char);
  }
}