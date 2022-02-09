import Footer from '../components/Footer';
import Scene from './Scene';
import { Sprite } from 'pixi.js';
import Rover from '../components/play/Rover';
import Rocket from '../components/play/Rocket';

export default class Play extends Scene {
  async onCreated() {
    this.background.filters = [];

    this._addPlanets();

    this._player = new Rover();
    this._player.x = 448;
    this._player.y = 66;

    this._enemy = new Rover();
    this._enemy.x = -687;
    this._enemy.y = -158;
    this._enemy.rotation = Math.PI;

    this._rocket = new Rocket();
    this._rocket.x = -483;
    this._rocket.y = -150;
    await this._rocket.init();
    this._rocket.attachColliders(...this._player.collidables, ...this._enemy.collidables);
    this._rocket.move();

    this._player.on('collision_body', () => {
      this._player.healthbar.updateHealth(50);
    });
    this._player.on('collision_downshield', () => {
      console.log('HIT LOWER SHIELD');
      // const rBounds = this._rocket.getBounds();
      // this._rocket.x = rBounds.x + rBounds.width / 2;
      // this._rocket.y = rBounds.y + rBounds.height / 2;
      this._rocket.x += this._rocket._body.x - 50;
      this._rocket.y += this._rocket._body.y;
      this._rocket._body.x = 0;
      this._rocket._body.y = 0;
      console.log(this._rocket.tl);
      this._rocket.move(true);
      console.log(this._rocket.tl);
      
    });

    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(this._player, this._enemy, this._rocket, footer);
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
