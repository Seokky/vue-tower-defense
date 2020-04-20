<template>
  <div id="app">
    <canvas
      id="canvas"
      ref="canvas"
      :style="styles"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TCanvasStyles } from '@/types/TCanvasStyles';
import { canvas } from '@/classes/Canvas';
import { painter } from '@/classes/Painter';

export default Vue.extend({
  name: 'App',

  data() {
    return {
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

      this.drawAll();
    },

    drawAll() {
      canvas.clear();
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
}

#canvas {
  background: green;
  display: block;
  margin: 0 auto;
  box-shadow: 0 0 10px #2c1f34;
}
</style>
