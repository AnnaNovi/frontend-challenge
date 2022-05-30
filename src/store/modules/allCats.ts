import { RootState } from "../index";
import { ActionContext } from "vuex";

interface catsType {
  id: string;
  categorieName: string | null;
  url: string;
}
export interface allCatsStateType {
  allCats: catsType[];
  allCatsPage: number;
}

export const allCats = {
  state: () => ({
    allCats: [],
    allCatsPage: 0,
  }),
  getters: {
    allCats(state: allCatsStateType) {
      return state.allCats;
    },
  },
  mutations: {
    SET_CATS(state: allCatsStateType, catsArray: catsType[]) {
      return (state.allCats = [...state.allCats, ...catsArray]);
    },
    INCREASE_PAGE(state: allCatsStateType) {
      return (state.allCatsPage += 1);
    },
  },
  actions: {
    async getAllCats({
      commit,
      state,
    }: ActionContext<allCatsStateType, RootState>) {
      state.allCats.length = 0;
      const limit = 15;
      const page = state.allCatsPage;
      await fetch(
        `https://api.thecatapi.com/v1/images/search?format=json&limit=${limit}&page=${page}`,
        {
          headers: {
            ["x-api-key"]: process.env.THE_CAT_API,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const arrayOfCats = data.map((item: any) => {
            return {
              id: item.id,
              categorieName: item.categories ? item.categories[0].name : null,
              url: item.url,
            };
          });
          commit("SET_CATS", arrayOfCats);
        });
    },
    getNextPage({ commit }: ActionContext<allCatsStateType, RootState>) {
      commit("INCREASE_PAGE");
    },
  },
};
