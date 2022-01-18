import Footer from "../components/Footer";
import Slide from "../components/tutorial/Slide";
import Scene from "./Scene";


export default class Tutorial extends Scene {
  async onCreated() {
    const footer = new Footer();
    const blurFilter= new PIXI.filters.BlurFilter();
    blurFilter.blur = 100
    // blurFilter.quality = 20 // this makes my gpu go wild
    this.background.filters = [blurFilter];
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);


    const slide = new Slide("A", "ala bala");
    // key.x = -window.innerWidth / 2;
    // key.y = window.innerHeight / 2;

    this.addChild(slide)
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // eslint-disable-line no-unused-vars
  }
}
