<template>
  <v-list-item class="logout-item">
    <v-list-item-action>
      <v-icon> mdi-logout </v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title
        class="white--text"
        @click="logout"
      >
        Logout
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  // middleware: 'auth'

  data() {
    return {

    }
  }, //end data

  computed: {

  }, //end computed

  filters: {

  }, //end filters

  methods: {
    async logout() {
      const logoutConfirmation = confirm('ログアウトしますか？');
      if(logoutConfirmation) {
        try {
          await this.$auth.logout();

          // Vuex内のデータ破棄
          this.$store.commit('removeFavoriteDog');

          this.$router.push("/login");
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('ログアウトをキャンセルしました');
      }
    }
  }, //end methods

  created() {

  }, //end created

  mounted() {

  }, //end mounted
}
</script>

<style scoped>
.logout-item{
  cursor: pointer;
}
.logout-item::before{
  background-color: currentColor;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>