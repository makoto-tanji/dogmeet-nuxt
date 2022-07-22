<template>
  <v-container>
    <h4 class="text-h4">ホーム</h4>
    <div class="card-container">
      <v-row>
        <v-col
          v-for="dog in dogList"
          :key="dog.id"
          cols=12
          sm=6
          md=3
        >
          <DogCard :dogData=dog />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dogList: [],
    }
  }, //end data

  async asyncData({ app }) {
    const resData = await app.$axios.get(
      `${app.$axios.defaults.baseURL}api/dog`
    );
    return {
      dogList: resData.data.dogData,
    };
  },
}
</script>
