import { Container, Graphics, Sprite, Text } from 'pixi.js';

import TextButton from '../TextButton';
import Indicator from './Indicator';
import Key from './Key';
import OutlinedText from './OutlinedText';

const EVENTS = {
  SLIDES_COMPLETED: 'slides_completed',
};

export default class Slide extends Container {
  /**
   * @param {Array} slides
   */
  constructor(slides) {
    super();

    this.name = 'slide';
    this.slides = slides;
    this._index = 0;
    
    this._key = new Key(this.slides[0].key);
    this._key.y = -198;
    
    this._instructions = new OutlinedText(this.slides[0].instructions);
    this._instructions.y = 47;

    this._indicator = new Indicator(this.slides.length);
    this._indicator.y = 115;

    const button = new TextButton('NEXT', 15, 50, 0xffffff);
    
    button.y = 298;
    button.on('click', () => this._updateSlide());

    this.addChild(this._key, this._instructions, this._indicator, button);
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
    this._instructions.setText(this.slides[this._index].instructions);
    this._key.char.text = this.slides[this._index].key;
  }

}
