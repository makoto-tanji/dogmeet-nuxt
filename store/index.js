import Vue from "vue";

export const state = () => ({
  favoriteDogList: [],
});

export const mutations = {
  // お気に入りに追加した犬を以下の形で保存
  // favoriteDogList[dogId] = true
  updateFavoriteDog(state, { index, boolean }) {
    Vue.set(state.favoriteDogList, index, boolean);
  },
  // ログアウト時にお気に入りを消去
  deleteFavoriteDog(state) {
    state.favoriteDogList = [];
  }
}