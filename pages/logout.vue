<template>
  <v-container>
    <v-btn
      color="primary"
      @click="logout"
    >
      ログアウト
    </v-btn>
  </v-container>
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
      try {
        await this.$auth.logout();

        this.$router.push("/login");
      } catch (error) {
        console.log(error);
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

</style>