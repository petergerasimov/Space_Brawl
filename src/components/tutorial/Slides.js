import { Container, Graphics, Sprite, Text } from 'pixi.js';

import TextButton from './TextButton';
import Indicator from './Indicator';

const EVENTS = {
  SLIDES_COMPLETED: 'slides_completed',
};

export default class Slide extends Container {
  /**
   * @param {String} keyToPress
   * @param {String} instructions
   */
  constructor(slides) {
    super();

    this.name = 'slide';
    this.slides = slides;
    this._index = 0;
    
    this._addKey();
    this._addLetter();
    this._addInstructions();

    this._indicator = new Indicator(this.slides.length);
    this.addChild(this._indicator);
    this._indicator.y = this.key.height - 50;

    const button = new TextButton('NEXT', 35, 50, 0xffffff);
    this.addChild(button);
    button.y += this.key.height;
    button.on('click', () => this._updateSlide());
  }

  static get events() {
    return EVENTS;
  }
  /**
   * @private
   */
  _updateSlide() {
    if (this._index < this.slides.length - 1) {
      this._index++;
      
    } else {
      this.emit(Slide.events.SLIDES_COMPLETED);
    }
    this._indicator.select(this._index);
    this.instructions.text = this.slides[this._index].instructions;
    this.keyToPress.text = this.slides[this._index].key;
  }
  /**
   * @private
   */
  _addKey() {
    this.key = Sprite.from('key-default');
    this.key.anchor.set(0.5);
    this.key.scale.set(0.75);
    this.addChild(this.key);
  }
  /**
   * @private
   */
  _addLetter() {
    this.keyToPress = new Text(this.slides[0].key, {
      fontSize: 150,
      fill: 0xffffff,
    });
    this.keyToPress.anchor.set(0.5);
    this.addChild(this.keyToPress);
  }
  /**
   * @private
   */
  _addInstructions() {
    const color = 0xffffff;

    this.instructions = new Text(`Press "${this.slides[0].key}" to ${this.slides[0].instructions}`, {
      fontSize: 30,
      fill: color,
    });
    this.instructions.anchor.set(0.5);
    this.instructions.position.y += this.key.height / 1.5;
    
    const outlineWidth = this.instructions.width * 1.25;
    const outlineHeight = this.instructions.height * 1.5;

    const outline = new Graphics();
    outline.lineStyle(2, color, 1);
    outline.beginFill(color, 0);
    outline.drawRoundedRect(-outlineWidth / 2, -outlineHeight / 2, outlineWidth, outlineHeight, 16);
    outline.endFill();

    outline.position.y = this.instructions.position.y;

    this.addChild(this.instructions, outline);
  }

}
