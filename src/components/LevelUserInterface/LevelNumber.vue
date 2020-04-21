<template functional>
  <div class="level-wrapper">
    <div
      class="level-value"
      v-text="props.levelNumber"
    />
    <div
      class="level-label"
      v-text="'level'"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    levelNumber: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.level-wrapper {
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 36px;
  font-weight: bold;
  font-family: monospace;
  color: white;
  text-shadow: 0 0 4px #000;
  position: relative;

  @media screen and (min-width: 1100px) {
    font-size: 50px;
    width: 120px;
  }

  .level-label {
    font-size: 0.5em;
  }
}
</style>
