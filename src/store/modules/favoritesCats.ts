import { RootState } from "../index";
import { ActionContext } from "vuex";

interface catsType {
  id: string;
  categorieName: string | null;
  url: string;
}
interface catsTypeShort {
  categorieName: string | null;
  url: string;
}

export interface favoritesCatsStateType {
  favoritesCats: Map<string, catsTypeShort>;
}

export const favoritesCats = {
  state: () => ({
    favoritesCats: new Map(),
  }),
  getters: {
    favoritesCats(state: favoritesCatsStateType) {
      return state.favoritesCats;
    },
  },
  mutations: {
    ADD_FAVORITE_CAT(state: favoritesCatsStateType, cat: catsType) {
      return state.favoritesCats.set(cat.id, {
        categorieName: cat.categorieName,
        url: cat.url,
      });
    },
    REMOVE_FAVORITE_CAT(state: favoritesCatsStateType, catId: string) {
      return state.favoritesCats.delete(catId);
    },
    SET_FAVORITE_CATS_FROM_LOCALSTORAGE(
      state: favoritesCatsStateType,
      cats: string
    ) {
      const catsFromLocalStorage = JSON.parse(cats);
      return (state.favoritesCats = new Map(catsFromLocalStorage));
    },
  },
  actions: {
    addFavoriteCat(
      { commit }: ActionContext<favoritesCatsStateType, RootState>,
      cat: catsType
    ) {
      commit("ADD_FAVORITE_CAT", cat);
    },
    removeFavoriteCat(
      { commit }: ActionContext<favoritesCatsStateType, RootState>,
      catId: string
    ) {
      commit("REMOVE_FAVORITE_CAT", catId);
    },
    toggleFavoriteCat(
      { state, dispatch }: ActionContext<favoritesCatsStateType, RootState>,
      cat: catsType
    ) {
      const hasCat = state.favoritesCats.has(cat.id);
      hasCat
        ? dispatch("removeFavoriteCat", cat.id)
        : dispatch("addFavoriteCat", cat);
      localStorage.setItem(
        "favoriteCatsList",
        JSON.stringify([...state.favoritesCats])
      );
    },
    checkFavoriteCat(
      { state }: ActionContext<favoritesCatsStateType, RootState>,
      catId: string
    ) {
      return state.favoritesCats.has(catId);
    },
    getFavoriteCatsFromLocalStorage({
      commit,
    }: ActionContext<favoritesCatsStateType, RootState>) {
      const cats = localStorage.getItem("favoriteCatsList");
      commit("SET_FAVORITE_CATS_FROM_LOCALSTORAGE", cats);
    },
  },
};
