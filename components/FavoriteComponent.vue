<template>
  <v-container>
    <v-icon
      class="heart"
      color="red"
      v-show="$store.state.favoriteDogList[dogId]"
      title="いいね解除"
      @click="removeFavorite"
    >
      mdi-heart
    </v-icon>
    <v-icon
      class="heart"
      v-show="!$store.state.favoriteDogList[dogId]"
      title="いいね"
      @click="addFavorite"
    >
      mdi-heart-outline
    </v-icon>
  </v-container>
</template>

<script>
export default {
  props: [
    'dogId'
  ],

  methods: {
    // ハート枠をクリックした時に呼ばれる
    // お気に入りを追加する
    async addFavorite() {
      if( !this.$store.state.auth.loggedIn) {
        alert('ログイン後にお気に入りに追加できます')
      } else {
        const sendFavoriteData = {
          dog_id: this.dogId,
          user_id: this.$auth.user.id
        };
        await this.$axios.post(`${this.$axios.defaults.baseURL}api/auth/favorite`, sendFavoriteData);

        // フロント側に反映
        this.$store.commit('updateFavoriteDog', {
          index: this.dogId,
          boolean: true
        });
      }
    },
    // ハートをクリックした時に呼ばれる
    // お気に入りを削除する
    async removeFavorite() {
      if( !this.$store.state.auth.loggedIn) {
        alert('再度ログインしてください')
      } else {
        const removeFavoriteData = {
          dogId: this.dogId,
          userId: this.$auth.user.id
        };
        await this.$axios.post(`${this.$axios.defaults.baseURL}api/auth/favorite/destroy`, removeFavoriteData);

        // フロント側に反映
        this.$store.commit('updateFavoriteDog', {
          index: this.dogId,
          boolean: false
        });
      }
    }
  }, //end methods
}
</script>

<style scoped>
.heart{
  cursor: pointer;
}
</style>