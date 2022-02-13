import Assets from '../core/AssetManager';
import Scene from './Scene';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import { Sprite, Graphics } from 'pixi.js';

export default class Loading extends Scene {
  constructor() {
    super();
    this.name = 'loading';

    const color = 0xffffff;

    const progWidth = 520;
    this.progressBar = new ProgressBar(0, progWidth, 42, 26, color);
    this.progressBar.x = -progWidth / 2;
    this.progressBar.y = -21;

    const outW = 540;
    const outH = 56;
    const outline = new Graphics();
    outline.lineStyle(3, color, 1);
    outline.beginFill(0xffffff, 0);
    outline.drawRoundedRect(-outW / 2, -outH / 2, outW, outH, 32);
    outline.endFill();
    outline.y = -21;

    this.logo = Sprite.from('ooo');
    this.logo.anchor.set(0.5);
    this.logo.y = -166;

    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(this.logo, this.progressBar, outline, footer);
  }

  get finish() {
    return new Promise((res) => setTimeout(res, 0));
  }

  preload() {
    const images = {
      'key-default': Assets.images['key-default'],
      'planet-1': Assets.images['planet-1'],
      'planet-2': Assets.images['planet-2'],
      'planet-3': Assets.images['planet-3'],
      'planet-4': Assets.images['planet-4'],
      rover: Assets.images.rover,
      'rover-shadow': Assets.images['rover-shadow'],
      'rover-health-bar': Assets.images['rover-health-bar'],
      'shield-active': Assets.images['shield-active'],
      'shield-inactive': Assets.images['shield-inactive'],
      rocket: Assets.images.rocket,
      fire: Assets.images.fire,
      boom: Assets.images.boom,
      1: Assets.images['1'],
      2: Assets.images['2'],
      wins: Assets.images.wins,
      star: Assets.images.star,
      
    };
    const sounds = {};

    return super.preload({ images, sounds });
  }

  onResize(width, height) {
    // eslint-disable-line no-unused-vars
    this.loadingText.x = width / 2;
    this.loadingText.y = height / 2 + 500;
  }

  onLoadProgress(val) {
    this.progressBar.updateValue(val * 2); // ???
  }
}
