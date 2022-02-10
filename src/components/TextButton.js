import { Container, Graphics, Text } from 'pixi.js';

export default class TextButton extends Container {

  constructor(text, size, radius, color) {
    super();

    this.name = 'textButton';

    this.radius = radius;
    this.color = color;
    this.text = text;
    this.size = size;
    this.buttonMode = true;
    this.interactive = true;
    this._createButton();
  }
  /** 
   * @private
   */
  _createButton() {

    const btext = new Text(this.text, {
      fontSize: this.size,
      fill: 0x000000,
    });
    btext.anchor.set(0.5);    
    const body = new Graphics();
    const buttonHeight = btext.height * 3;
    const buttonWidth = btext.width * 3;
    body.beginFill(this.color, 1);
    body.drawRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, this.radius);
    body.endFill();
    this.addChild(body);
    this.addChild(btext);
  }

}