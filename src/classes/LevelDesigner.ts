import Vue from 'vue';
import { TLevelDesignerState } from '@/types/TLevelDesignerState';
import { TMapsItem } from '@/types/TMapsItem';
import { painter } from '@/classes/Painter';
import { mapsRepository } from '@/classes/LevelMapsRepository';

class LevelDesigner {
  #state: TLevelDesignerState = Vue.observable({
    interactiveCellSize: 0,
  });

  public init(canvasWidth: number) {
    this.setInteractiveCellSize(canvasWidth);
  }

  public drawRoad(levelNumber: number) {
    const {
      roadMap,
      roadColor,
    } = mapsRepository.get(levelNumber);

    const cellSize = this.#state.interactiveCellSize;

    roadMap.forEach((map: TMapsItem) => {
      painter.fillRect(
        map.posX * cellSize,
        map.posY * cellSize,
        cellSize + 1, // plus one to hide emptiness between cells
        cellSize + 1, // plus one to hide emptiness between cells
        roadColor,
      );
    });
  }

  private setInteractiveCellSize(canvasWidth: number) {
    /*
      canvas includes
      25 interactive cells on X and
      16 on Y with current ratio
    */
    this.#state.interactiveCellSize = Number(
      (canvasWidth / 25).toFixed(3),
    );
  }
}

const levelDesigner = new LevelDesigner();

export { levelDesigner };
