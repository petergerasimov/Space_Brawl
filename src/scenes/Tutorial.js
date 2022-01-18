import Footer from "../components/Footer";
import Key from "../components/tutorial/Key";
import Scene from "./Scene";

export default class Tutorial extends Scene {
  async onCreated() {
    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);


    const key = new Key();
    // key.x = -window.innerWidth / 2;
    // key.y = window.innerHeight / 2;

    this.addChild(key)
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
