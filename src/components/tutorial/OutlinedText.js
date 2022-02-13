import { Container, Graphics, Text } from 'pixi.js';

export default class OutlinedText extends Container {
  constructor(text) {
    super();

    const color = 0xffffff;

    this.text = new Text(text, {
      fontSize: 30,
      fill: color,
    });
    this.text.anchor.set(0.5);
    
    const outlineWidth = this.text.width * 1.25;
    const outlineHeight = this.text.height * 1.5;

    const outline = new Graphics();
    outline.lineStyle(3, color, 1);
    outline.beginFill(color, 0);
    outline.drawRoundedRect(-outlineWidth / 2, -outlineHeight / 2, outlineWidth, outlineHeight, 50);
    outline.endFill();

    this.addChild(this.text, outline);
  }
  setText(text) {
    this.text.text = text;
  }
}