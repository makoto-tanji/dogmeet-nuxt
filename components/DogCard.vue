<template>
  <v-container>
    <v-card
      color="background"
      elevation="1"
      max-width="350"
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
          <NuxtLink :to="`/detail/${dogData.id}`">more</NuxtLink>
          <v-spacer />
          <p>like</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  // middleware: 'auth'

  props: [
    'dogData',
  ],

  data() {
    return {

    }
  }, //end data

  computed: {

  }, //end computed

  filters: {
    // 2020-01-01の形の誕生日を年齢に変える
    convertBirthdayToAge(value) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const diffYear = year - Number(value.split('-')[0]);
      const diffMonth = month - Number(value.split('-')[1]);
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

  methods: {

  }, //end methods

  created() {

  }, //end created

  mounted() {

  }, //end mounted
}
</script>

<style scoped>
.card-img {
  width:100%;
  height: 200px;
}
</style>