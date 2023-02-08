import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    // general
    // data db
    shoes: [],
    brands: [],
    isFullied: false,
    // for sorting options
    sortBy: "asc",
  }),

  getters: {
    getProductById: (state) => {
      return (id) => state.shoes.find((product) => product.id === id);
    },
    getProductsDB: (state) => {
      return new Promise((resolve, rejected) => {
        if (state.sortBy === "asc") {
          resolve(state.shoes.sort((a, b) => a.price - b.price));
        } else {
          resolve(state.shoes.sort((a, b) => b.price - a.price));
        }
      });
    },
    getProductsStore: (state) => {
      return state.shoes;
    },
    getSortProducts: (state) => {
      return state.shoes.sort((a, b) => {
        return a.price - b.price;
      });
    },
  },
});
