<template>
  <div id="app">
    <canvas
      id="canvas"
      ref="canvas"
      :style="styles"
    />

    <LevelUserInterface :level-number="levelNumber" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { TCanvasStyles } from '@/types/TCanvasStyles';

import { canvas } from '@/classes/Canvas';
import { levelDesigner } from '@/classes/LevelDesigner';

import LevelUserInterface from '@/components/LevelUserInterface/LevelUserInterface.vue';

export default Vue.extend({
  components: {
    LevelUserInterface,
  },

  data() {
    return {
      levelNumber: 1,
      animRequestId: 0,
      resizeTimeoutId: 0,
    };
  },

  computed: {
    styles(): TCanvasStyles {
      return canvas.styles;
    },
  },

  mounted() {
    this.initApp();

    window.addEventListener('resize', this.onResize);
  },

  methods: {
    async initApp() {
      window.cancelAnimationFrame(this.animRequestId);

      await canvas.init();
      await levelDesigner.init(canvas.width, this.levelNumber);
      await levelDesigner.createUnit(6);

      this.drawAll();
    },

    drawAll() {
      canvas.clear();
      levelDesigner.drawRoad();
      levelDesigner.moveUnit(0);
      levelDesigner.drawUnit(0);

      this.animRequestId = window.requestAnimationFrame(this.drawAll);
    },

    onResize() {
      window.clearTimeout(this.resizeTimeoutId);

      this.resizeTimeoutId = setTimeout(this.initApp, 300);
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/reset';

#app {
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background-color: #0B1015;
}

#canvas {
  background-image: url(assets/img/grass-1.jpg);
  background-size: 10%;
  display: block;
  margin: 0 auto;
  box-shadow: 0 0 10px #2c1f34;
}
</style>
