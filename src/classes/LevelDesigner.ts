import Vue from 'vue';

import { TLevelDesignerState } from '@/types/TLevelDesignerState';
import { TMapsItem } from '@/types/TMapsItem';

import { Unit } from '@/classes/units/Unit';
import { canvas } from '@/classes/Canvas';
import { levelsRepository } from '@/classes/LevelsRepository';
import { UnitFactory } from '@/classes/UnitFactory';

class LevelDesigner {
  #state: TLevelDesignerState = Vue.observable({
    levelNumber: 0,
    units: [] as Unit[], // currently used units
    start: [0, 0], // [x, y] - coords of point that units start
    assets: { // assets to preload
      road: new Image(),
    },
  });

  get spawnDelay() {
    return levelsRepository.get(this.level).spawnDelay; // ms
  }

  get unitsCount() {
    return levelsRepository.get(this.level).units.length;
  }

  private get level() {
    return this.#state.levelNumber;
  }

  private get startCoords() {
    return {
      x: this.#state.start[0] * LevelDesigner.cellSize,
      y: this.#state.start[1] * LevelDesigner.cellSize,
    };
  }

  private get assets() {
    return this.#state.assets;
  }

  private static get cellSize() {
    return canvas.interactiveCellSize;
  }

  public async init(level: number) {
    this.#state.levelNumber = level;

    this.setStartCoords();
    await this.loadAssets();
  }

  public drawRoad() {
    const { roadMap } = levelsRepository.get(this.level);

    roadMap.forEach((map: TMapsItem) => {
      const xWithRatio = map.posX * LevelDesigner.cellSize;
      const yWithRatio = map.posY * LevelDesigner.cellSize;
      const width = LevelDesigner.cellSize;
      const height = width;

      canvas.context.drawImage(
        this.assets.road,
        xWithRatio,
        yWithRatio,
        width,
        height,
      );
    });
  }

  public drawUnits() {
    this.#state.units.forEach((unit: Unit) => {
      unit.draw();
    });
  }

  public async createUnit(unitIdx: number) {
    const unit: Unit = UnitFactory.createUnit(
      this.getUnitNameByIndex(unitIdx),
      LevelDesigner.cellSize,
      this.startCoords.x,
      this.startCoords.y,
    );

    await unit.loadImage();

    this.#state.units.push(unit);
  }

  public moveUnits() {
    this.#state.units.forEach((unit: Unit) => {
      unit.move();
    });
  }

  private loadAssets() {
    /* road background image */
    const { roadImage } = levelsRepository.get(this.level);

    this.#state.assets.road = new Image(
      LevelDesigner.cellSize,
      LevelDesigner.cellSize,
    );
    this.#state.assets.road.src = roadImage;

    return new Promise((resolve) => {
      this.#state.assets.road.onload = () => resolve();
    });
  }

  private setStartCoords() {
    const { roadMap } = levelsRepository.get(this.level);

    this.#state.start[0] = roadMap[0].posX;
    this.#state.start[1] = roadMap[0].posY;
  }

  private getUnitNameByIndex(index: number) {
    const { units } = levelsRepository.get(this.level);

    return units[index];
  }
}

const levelDesigner = new LevelDesigner();

export { levelDesigner };
