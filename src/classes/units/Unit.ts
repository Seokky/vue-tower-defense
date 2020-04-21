import Vue from 'vue';

import { TUnitState } from '@/types/TUnitState';
import { TUnitPayload } from '@/types/TUnitPayload';

import { DEFAULT_UNIT_HEALTH, DEFAULT_UNIT_SPEED } from '@/constants';

import { canvas } from '@/classes/Canvas';

export class Unit {
  #state: TUnitState = Vue.observable({
    health: 0,
    speed: 0,
    image: {
      width: 0,
      height: 0,
      el: null as null | HTMLImageElement,
      src: '',
    },
    x: 0,
    y: 0,
  });

  constructor(payload: TUnitPayload, cellSize: number) {
    this.#state.health = payload.health || DEFAULT_UNIT_HEALTH;
    this.#state.speed = payload.speed || DEFAULT_UNIT_SPEED;
    this.#state.x = payload.x;
    this.#state.y = payload.y;

    this.#state.image.width = cellSize;
    this.#state.image.height = cellSize;
    this.#state.image.src = payload.image;
  }

  get health() {
    return this.#state.health;
  }

  get speed() {
    return this.#state.speed;
  }

  public async loadImage() {
    this.#state.image.el = new Image();
    this.#state.image.el.src = this.#state.image.src;

    return new Promise((resolve) => {
      this.#state.image.el!.onload = () => resolve();
    });
  }

  public draw() {
    const { x, y } = this.#state;
    const { width, height, el } = this.#state.image;

    canvas.context.drawImage(
      el as HTMLImageElement,
      x,
      y,
      width,
      height,
    );
  }

  public move() {
    this.#state.x += this.speed;
  }
}
