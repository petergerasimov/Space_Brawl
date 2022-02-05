import Footer from '../components/Footer';
import Scene from './Scene';
import { Sprite } from 'pixi.js';
import Rover from '../components/play/Rover';

export default class Play extends Scene {
  async onCreated() {
    this.background.filters = [];

    this._addPlanets();

    this._rover = new Rover();
    this.addChild(this._rover);

    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);
  }
  /**
   *
   * @private
   * @memberof Play
   */
  _addPlanets() {
    const numberOfPlanets = 4;
    const planets = Array.from({length: numberOfPlanets}, (_, i) => {
      const planet = Sprite.from(`planet-${i + 1}`);
      planet.anchor.set(0.5);
      this.addChild(planet);

      return planet;
    });

    planets[0].x = 508;
    planets[0].y = 465;

    planets[1].x = -730;
    planets[1].y = -440;

    planets[2].x = -880;
    planets[2].y = 412;

    planets[3].x = 946;
    planets[3].y = -626;
  }
  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars
  }
}
