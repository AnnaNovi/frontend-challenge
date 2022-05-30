<template>
  <div :class="$style.catsBlock">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CatBlock",
});
</script>

<style lang="scss" module>
.catsBlock {
  padding: 48px 62px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 16px;
  row-gap: 20px;
}
</style>
