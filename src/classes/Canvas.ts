import Vue from 'vue';
import { TCanvasState } from '@/types/TCanvasState';
import { TCanvasStyles } from '@/types/TCanvasStyles';
import { CANVAS_MAX_WIDTH } from '@/constants';

const ratio = 1.5625;
class Canvas {
  #state: TCanvasState = Vue.observable({
    el: null as HTMLCanvasElement | null,
    ctx: null as CanvasRenderingContext2D | null,
    width: 0,
    height: 0,
    offsetTop: 0,
  });

  get el(): HTMLCanvasElement {
    return this.#state.el! || {
      styles: {},
      offsetTop: 0,
    };
  }

  get context(): CanvasRenderingContext2D {
    return this.#state.ctx!;
  }

  get width() {
    return this.#state.width;
  }

  get height() {
    return this.#state.height;
  }

  get offsetTop() {
    return this.#state.offsetTop;
  }

  get styles(): TCanvasStyles {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
    };
  }

  public async init() {
    this.setElement();
    this.setContext();
    await this.setSizes();
    this.setOffsetTop();

    return Promise.resolve();
  }

  public clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  private setElement() {
    this.#state.el = document.getElementById('canvas') as HTMLCanvasElement;
  }

  private setContext() {
    this.#state.ctx = this.el.getContext('2d');
  }

  private static getHeightDependsOnWidth(width: number) {
    return width / ratio;
  }

  private setSizes() {
    return new Promise((resolve) => {
      const maxWidth = CANVAS_MAX_WIDTH;
      const minWidth = window.innerWidth;
      const maxHeight = window.innerHeight;

      let width = Math.min(minWidth, maxWidth);
      let height = Canvas.getHeightDependsOnWidth(width);

      /*
        decreasing the width until we can
        calculate height that meet ratio
      */
      while (height > maxHeight) {
        width -= 1;
        height = Canvas.getHeightDependsOnWidth(width);
      }

      /* pure values we can use */
      this.#state.width = width;
      this.#state.height = height;

      /* canvas element attributes */
      this.#state.el!.width = width;
      this.#state.el!.height = height;

      resolve();
    });
  }

  private setOffsetTop() {
    this.#state.offsetTop = this.el.offsetTop;
  }
}

const canvas = new Canvas();

export { canvas };