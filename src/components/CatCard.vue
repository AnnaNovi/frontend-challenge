<template>
  <div :class="$style.catCard">
    <img
      :class="$style.image"
      ref="catImage"
      alt="Cat image"
      @load="$emit('imageLoaded')"
    />
    <div
      :class="[$style.favorite, { [$style.activeFavorite]: this.favorite }]"
      @click="handleFavoriteButton"
    >
      <svg viewBox="0 -6 40 50">
        <path
          d="M20 36.7L17.1 34.06C6.8 24.72 0 18.56 0 11C0 4.84 4.84 0 11 0C14.48 0 17.82 1.62 20 4.18C22.18 1.62 25.52 0 29 0C35.16 0 40 4.84 40 11C40 18.56 33.2 24.72 22.9 34.08L20 36.7Z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "@vue/runtime-core";
import { mapActions } from "vuex";

interface catsType {
  id: string;
  categorieName: string | null;
  url: string;
}

export default defineComponent({
  name: "CatCard",
  data() {
    return {
      favorite: false,
    };
  },
  props: {
    cat: {
      type: Object as PropType<catsType>,
    },
  },
  methods: {
    ...mapActions(["checkFavoriteCat", "toggleFavoriteCat"]),
    handleFavoriteButton() {
      this.toggleFavoriteCat(this.cat);
      this.favorite = !this.favorite;
    },
    lazyImageLoad() {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              //@ts-expect-error Property 'src' does not exist on type 'Element'.
              entry.target.src = this.cat?.url;
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "300px 0px 0px",
        }
      );
      const catImage = this.$refs["catImage"] as HTMLImageElement;
      imageObserver.observe(catImage);
    },
  },
  mounted() {
    this.checkFavoriteCat(this.cat?.id).then((result) => {
      this.favorite = result;
    });
    this.lazyImageLoad();
  },
});
</script>

<style lang="scss" module>
.image {
  width: 100%;
  height: 225px;
  object-fit: cover;
  position: relative;
}
.catCard {
  position: relative;
  padding: 16px;
  transition: 0.3s;
  min-height: 256px;
  &:hover {
    transition: 0.5s;
    box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.24),
      0px 9px 18px rgba(0, 0, 0, 0.18);
    svg {
      visibility: initial;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 94px;
      left: 0;
      bottom: 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        #ffffff 58.85%
      );
    }
  }
}
.favorite {
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 28px;
  right: 21px;
  z-index: 5;
  cursor: pointer;
  fill: transparent;
  stroke: #f24e1e;
  stroke-width: 4px;
  &:hover {
    fill: #f24e1e;
  }
  svg {
    width: 100%;
    height: 100%;
    visibility: hidden;
  }
  &.activeFavorite {
    fill: #ff3a00;
    stroke: #ff3a00;
  }
}
</style>
