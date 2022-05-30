<template>
  <div>
    <CatBlock>
      <CatCard
        v-for="cat in allCats"
        :key="cat.id"
        :cat="cat"
        @imageLoaded="whenImageLoaded"
      />
    </CatBlock>
    <div :class="$style.loadMore" ref="loadMoreCats" v-show="isImagesLoaded">
      ... загружаем еще котиков ...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import CatCard from "../components/CatCard.vue";
import CatBlock from "../components/CatBlock.vue";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      quantityOfLoadedImages: 0,
      isImagesLoaded: false,
    };
  },
  components: {
    CatCard,
    CatBlock,
  },
  computed: {
    ...mapGetters(["allCats", "allCatsSize", "allCatsLimit"]),
  },
  watch: {
    quantityOfLoadedImages() {
      const minLoadedImage =
        this.allCatsSize > this.allCatsLimit
          ? this.allCatsSize - (this.allCatsLimit * 2) / 3
          : this.allCatsLimit / 3;
      if (this.quantityOfLoadedImages >= Math.round(minLoadedImage)) {
        this.isImagesLoaded = true;
      } else {
        this.isImagesLoaded = false;
      }
    },
    isImagesLoaded() {
      if (this.isImagesLoaded) {
        this.loadMoreCats();
      }
    },
  },
  methods: {
    ...mapActions(["getAllCats", "getNextPage"]),
    loadMoreCats() {
      const loadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.getNextPage();
              observer.unobserve(entry.target);
            }, 1500);
          }
        });
      });
      const loadMoreCats = this.$refs["loadMoreCats"] as HTMLDivElement;
      loadObserver.observe(loadMoreCats);
    },
    whenImageLoaded() {
      this.quantityOfLoadedImages += 1;
    },
  },
  mounted() {
    this.getAllCats();
  },
});
</script>

<style lang="scss" module>
.loadMore {
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 0.25px;
  color: #000000;
  margin-bottom: 31px;
}
</style>
