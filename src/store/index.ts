import { createStore } from "vuex";
import { favoritesCats, favoritesCatsStateType } from "./modules/favoritesCats";
import { allCats, allCatsStateType } from "./modules/allCats";

export interface RootState {
  modules: {
    favoritesCats: favoritesCatsStateType;
    allCats: allCatsStateType;
  };
}

export default createStore({
  modules: {
    favoritesCats,
    allCats,
  },
});
