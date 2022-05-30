<template>
  <div>
    <CatBlock>
      <CatCard v-for="cat in favoritesCats" :key="cat.id" :cat="cat" />
    </CatBlock>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import CatCard from "../components/CatCard.vue";
import CatBlock from "../components/CatBlock.vue";

export default defineComponent({
  name: "FavoriteView",
  components: {
    CatCard,
    CatBlock,
  },
  computed: {
    ...mapGetters(["favoritesCats"]),
  },
  methods: {
    ...mapActions(["getFavoriteCatsFromLocalStorage"]),
  },
  mounted() {
    this.getFavoriteCatsFromLocalStorage();
  },
});
</script>

<style lang="scss" module></style>
