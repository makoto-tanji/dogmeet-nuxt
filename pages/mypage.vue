<template>
  <v-container>
    <p>{{userData}}</p>
    <v-row>
      <v-col
        cols=7
        sm=12
        md=7
      >
        <p>お気に入り一覧</p>
        <v-row>
          <v-col
            v-for="favorite in userData.favorites"
            :key="favorite.id"
            cols=6
          >
            <DogCard :dogData=favorite />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols=5
        sm=12
        md=5
      >
        <p>予約一覧</p>
        <v-row>
          <v-col
            v-for="reservation in userData.reservations"
            :key="reservation.id"
            cols=12
          >
            <p>お名前：{{ reservation.dog_name }}</p>
            <p>場所：{{ reservation.area.area_name }}</p>
            <p>日時：{{ reservation.pivot.reservation_date | formatDate}}</p>
            <v-btn
              @click="deleteReservation(reservation.pivot.id)"
            >
              取り消し
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // middleware: 'auth'

  data() {
    return {
      userData: {},
    }
  }, //end data

  computed: {

  }, //end computed

  filters: {
    // 予約日時を整形2022-07-08 08:00:00
    formatDate(value) {
      const datePart = value.split(' ')[0].split('-');
      const timePart = value.split(' ')[1];
      return `${datePart[0]}年${datePart[1]}月${datePart[2]}日の${timePart}～`;
    }
  }, //end filters

  methods: {
    async deleteReservation(id){
      if( !this.$store.state.auth.loggedIn ){
        alert('再度ログインしてください');
        this.$router.push("/login");
      } else {
        await this.$axios.delete(`${this.$axios.defaults.baseURL}api/auth/reservation/` + id);
        location.reload();
      }
    },
  }, //end methods

  async asyncData({ app }) {
    const userData = await app.$axios.get(
      `${app.$axios.defaults.baseURL}api/auth/user`
    );
    return {
      userData: userData.data,
    };
  },

  created() {
  }, //end created

  mounted() {

  }, //end mounted
}
</script>

<style scoped>

</style>