import Vue from 'vue';

import { TLevelDesignerState } from '@/types/TLevelDesignerState';
import { TMapsItem } from '@/types/TMapsItem';
import { TLevelDataset } from '@/types/TLevelDataset';

import { Unit } from '@/classes/units/Unit';
import { canvas } from '@/classes/Canvas';
import { levelsRepository } from '@/classes/LevelsRepository';
import { UnitFactory } from '@/classes/UnitFactory';

class LevelDesigner {
  #state: TLevelDesignerState = Vue.observable({
    levelNumber: 0,
    levelDataset: {} as TLevelDataset,
    units: [] as Unit[], // currently used units
    start: [0, 0], // [x, y] - coords of point that units start
    assets: { // assets to preload
      road: new Image(),
    },
  });

  private get level() {
    return this.#state.levelNumber;
  }

  private get dataset(): TLevelDataset {
    return this.#state.levelDataset;
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
    this.changeLevel(level);
    this.setStartCoords();
    await this.loadAssets();
  }

  public drawRoad() {
    this.dataset.roadMap.forEach((map: TMapsItem) => {
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

  private changeLevel(level: number) {
    this.#state.levelNumber = level;

    const {
      roadImage, roadMap, units, spawnDelay,
    } = levelsRepository.get(this.level);

    this.#state.levelDataset.roadImage = roadImage;
    this.#state.levelDataset.roadMap = roadMap;
    this.#state.levelDataset.units = units;
    this.#state.levelDataset.spawnDelay = spawnDelay;
  }

  private loadAssets() {
    this.#state.assets.road = new Image(
      LevelDesigner.cellSize,
      LevelDesigner.cellSize,
    );
    this.#state.assets.road.src = this.dataset.roadImage;

    return new Promise((resolve) => {
      this.#state.assets.road.onload = () => resolve();
    });
  }

  private setStartCoords() {
    this.#state.start[0] = this.dataset.roadMap[0].posX;
    this.#state.start[1] = this.dataset.roadMap[0].posY;
  }

  private getUnitNameByIndex(index: number) {
    return this.dataset.units[index];
  }
}

const levelDesigner = new LevelDesigner();

export { levelDesigner };
