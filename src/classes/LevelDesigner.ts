import Vue from 'vue';
import { TLevelDesignerState } from '@/types/TLevelDesignerState';
import { TMapsItem } from '@/types/TMapsItem';
import { canvas } from '@/classes/Canvas';
import { mapsRepository } from '@/classes/LevelMapsRepository';

class LevelDesigner {
  #state: TLevelDesignerState = Vue.observable({
    interactiveCellSize: 0,
  });

  private get cellSize() {
    return this.#state.interactiveCellSize;
  }

  public init(canvasWidth: number) {
    this.setInteractiveCellSize(canvasWidth);
  }

  public drawRoad(levelNumber: number) {
    const {
      roadMap,
      roadImage,
    } = mapsRepository.get(levelNumber);

    const roadBg = new Image(this.cellSize, this.cellSize);

    roadBg.src = roadImage;
    roadBg.onload = () => {
      roadMap.forEach((map: TMapsItem) => {
        canvas.context.drawImage(
          roadBg,
          map.posX * this.cellSize,
          map.posY * this.cellSize,
          this.cellSize + 1, // plus one to hide emptiness between cells
          this.cellSize + 1, // plus one to hide emptiness between cells
        );
      });
    };
  }

  private setInteractiveCellSize(canvasWidth: number) {
    /*
      canvas have
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
