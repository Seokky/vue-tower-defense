<template>
  <section
    class="wrapper"
    :style="styles"
  >
    <LevelNumber :level-number="levelNumber" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { canvas } from '@/classes/Canvas';
import LevelNumber from './LevelNumber.vue';

export default Vue.extend({
  components: {
    LevelNumber,
  },

  props: {
    levelNumber: {
      type: Number,
      required: true,
    },
  },

  computed: {
    styles() {
      return {
        bottom: `${canvas.offsetTop}px`,
        width: `${canvas.width}px`,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  background: rgba(black, 0.5);
  height: 60px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;

  @media screen and (min-width: 768px) {
    height: 90px;
  }

  @media screen and (min-width: 1100px) {
    height: 130px;
  }
}
</style>
