import Vue from 'vue';

import { TLevelDesignerState } from '@/types/TLevelDesignerState';

import { canvas } from '@/classes/Canvas';
import { levelsRepository } from '@/classes/LevelsRepository';
import { unitFactory } from '@/classes/UnitFactory';

class LevelDesigner {
  #state: TLevelDesignerState = Vue.observable({
    interactiveCellSize: 0,
    levelNumber: 0,
    units: [] as any[], // currently used units
    start: [0, 0], // [x, y] - coords of point that units start
    assets: { // assets to preload
      road: '',
    },
  });

  private get cellSize() {
    return this.#state.interactiveCellSize;
  }

  private get level() {
    return this.#state.levelNumber;
  }

  private get startCoords() {
    return {
      x: this.#state.start[0],
      y: this.#state.start[1],
    };
  }

  private get assets() {
    return this.#state.assets;
  }

  public async init(canvasWidth: number, level: number) {
    this.setLevelNumber(level);
    this.setStartUnitCoords();
    this.setInteractiveCellSize(canvasWidth);
    await this.loadAssets();
  }

  public setLevelNumber(levelNumber: number) {
    this.#state.levelNumber = levelNumber;
  }

  public drawRoad() {
    const { roadMap } = levelsRepository.get(this.level);

    for (let i = 0; i < roadMap.length; i += 1) {
      canvas.context.drawImage(
        this.assets.road,
        roadMap[i].posX * this.cellSize,
        roadMap[i].posY * this.cellSize,
        this.cellSize + 1, // plus one to hide emptiness between cells
        this.cellSize + 1, // plus one to hide emptiness between cells
      );
    }
  }

  public async createUnit(unitNumber: number) {
    const { units } = levelsRepository.get(this.level);

    const unitName = units[unitNumber];
    const UnitConstructor = unitFactory.get(unitName);

    const unitX = Math.round(this.startCoords.x * this.cellSize);
    const unitY = Math.round(this.startCoords.y * this.cellSize);
    const unit = new UnitConstructor(
      this.cellSize,
      unitX,
      unitY,
    );

    await unit.loadImage();

    this.#state.units.push(unit);

    return unit;
  }

  public drawUnit(unitNumber: number) {
    const unit = this.#state.units[unitNumber];

    unit.draw();
  }

  public moveUnit(unitNumber: number) {
    const unit = this.#state.units[unitNumber];

    unit.move();
  }

  private loadAssets() {
    /* road background image */
    const { roadImage } = levelsRepository.get(this.level);
    this.#state.assets.road = new Image(this.cellSize, this.cellSize);
    this.#state.assets.road.src = roadImage;

    return new Promise((resolve) => {
      this.#state.assets.road.onload = () => resolve();
    });
  }

  private setStartUnitCoords() {
    const { roadMap } = levelsRepository.get(this.level);
    const roadFirstCell = roadMap[0];

    this.#state.start[0] = roadFirstCell.posX;
    this.#state.start[1] = roadFirstCell.posY;
  }

  private setInteractiveCellSize(canvasWidth: number) {
    /*
      canvas have
      25 interactive cells on X and
      16 on Y with current ratio
    */
    this.#state.interactiveCellSize = Math.round(canvasWidth / 25);
  }
}

const levelDesigner = new LevelDesigner();

export { levelDesigner };
