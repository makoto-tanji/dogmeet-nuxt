<template>
  <v-container>
    <h4 class="text-h4">マイページ</h4>
    <v-icon>mdi-account-edit</v-icon>
    <NuxtLink :to="`/edit/user/${$store.state.auth.user.id}`">
      <v-btn color="primary">情報変更</v-btn>
    </NuxtLink>
    <v-row class="favorite-register">
      <v-col
        cols=12
        sm=12
        md=7
        class="favorite-container"
      >
        <h5 class="text-h5">お気に入り一覧</h5>
        <v-row>
          <v-col
            v-for="favorite in userData.favorites"
            :key="favorite.id"
            cols=12
            sm=6
          >
            <DogCard :dogData=favorite />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols=12
        sm=12
        md=5
        class="register-container"
      >
        <h5 class="text-h5">予約一覧</h5>
        <v-row>
          <v-col
            v-for="reservation in userData.reservations"
            :key="reservation.id"
            cols=12
            class="register-content"
          >
            <p>お名前：{{ reservation.dog_name }}</p>
            <p>場所：{{ reservation.area.area_name }}</p>
            <p>日時：{{ reservation.pivot.reservation_date | formatDate}}</p>
            <v-btn
              @click="deleteReservation(reservation.pivot.id)"
              color="warning"
            >
              取り消し
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols=12>
        <h5 class="text-h5">飼い犬一覧</h5>
      </v-col>
      <v-col
        v-for="myDog in myDogList"
        :key="myDog.id"
        cols=6
      >
        <DogCard :dogData=myDog />
        <v-col>
          <NuxtLink :to="`/edit/dog/${myDog.id}`">
            <v-btn color="primary">修正</v-btn>
          </NuxtLink>
          <v-btn
            @click="deleteDog(myDog.id)"
            color="warning"
          >
            削除
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
    <NuxtLink
      to="/edit/dog/add"
      v-show="$store.state.auth.user.role <= 5"
    >
      <v-btn color="primary">わんちゃん新規登録</v-btn>
    </NuxtLink>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      userData: {},
      myDogList: [],
    }
  }, //end data


  filters: {
    // 予約日時を整形2022-07-08 08:00:00
    formatDate(value) {
      const datePart = value.split(' ')[0].split('-');
      const timePart = value.split(' ')[1];
      return `${datePart[0]}年${datePart[1]}月${datePart[2]}日の${timePart}～`;
    }
  }, //end filters

  methods: {
    async deleteReservation(id) {
      if( !this.$store.state.auth.loggedIn ){
        alert('再度ログインしてください');
        this.$router.push("/login");
      } else {
        await this.$axios.delete(`${this.$axios.defaults.baseURL}api/auth/reservation/` + id);
        location.reload();
      }
    },

    async deleteDog(id) {
      if( !this.$store.state.auth.loggedIn ){
        alert('再度ログインしてください');
        this.$router.push("/login");
      } else {
        await this.$axios.delete(`${this.$axios.defaults.baseURL}api/auth/dog/` + id);
        location.reload();
      }
    }
  }, //end methods

  async asyncData({ app }) {
    const userData = await app.$axios.get(
      `${app.$axios.defaults.baseURL}api/auth/user`
    );
    return {
      userData: userData.data,
      myDogList: userData.data.dog
    };
  },
}
</script>

<style scoped>
.favorite-register{
  margin-bottom: 30px;
}
.favorite-container, .register-container{
  margin: 20px 0px;
}
.register-content{
  margin: 10px 0px;
  border: 2px solid #a0a0a0;
  border-radius: 10px;
}
</style>