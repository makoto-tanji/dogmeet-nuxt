<template>
  <v-container>
    <v-card
      color="background"
      elevation="1"
      max-width="300"
      height="450"
    >
      <img
        :src="`${$axios.defaults.baseURL}${dogData.thumbnail_path}`"
        alt="thumbnail"
        class="card-img"
      />
      <v-card-title>{{ dogData.dog_name }}</v-card-title>
      <v-card-text>
        <div class="tag-container">
          <p>{{ dogData.breed.breed_name }}</p>
          <p>{{ dogData.birthday | convertBirthdayToAge }}</p>
          <p>{{ dogData.sex | convertNumberToSex }}</p>
        </div>
        <div class="btn-container d-flex">
          <NuxtLink :to="`/detail/${dogData.id}`">詳細ページ</NuxtLink>
          <v-spacer />
          <div>
            <FavoriteComponent :dogId="dogData.id"/>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {

  props: [
    'dogData',
  ],

  filters: {
    // 2020-01-01の形の誕生日を年齢に変える
    convertBirthdayToAge(value) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      let diffYear = year - Number(value.split('-')[0]);
      let diffMonth = month - Number(value.split('-')[1]);
      if(diffMonth < 0){
        diffYear -= 1;
        diffMonth += 12;
      }
      return `${diffYear}歳${diffMonth}ヶ月`;
    },

    // 性別(1,2)をオス,メスに変える
    convertNumberToSex(value) {
      if(value === 1) {
        return 'オス';
      } else if(value === 2) {
        return 'メス';
      } else {
        return '';
      }
    }
  }, //end filters
}
</script>

<style scoped>
.card-img {
  width:100%;
  height: 200px;
}
</style>