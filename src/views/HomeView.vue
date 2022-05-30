<template>
  <div class="home">
    <h1>This is a home page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "HomeView",
  methods: {
    ...mapActions(["getAllCats"]),
  },
  mounted() {
    this.getAllCats();
  },
});
</script>
