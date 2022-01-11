<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Provide} from 'vue-property-decorator';

@Component
export default class extends Vue {
  private isRouterAlive = true;

  @Provide('reload')
  reload(): void {
    this.isRouterAlive = false;
    this.$nextTick(() => {
      this.isRouterAlive = true;
    });
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  font-size: 16px;
  font-family: $font-hei;
  background: #f5f5f5;
}

.clearfix {
  content: '';
  display: block;
  clear: both;
}
</style>
