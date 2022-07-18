<template>
  <v-container>
    <h1>home</h1>
    <p>{{$axios.defaults.baseURL}}</p>
    <p>{{$store.state.favoriteDogList}}</p>
    <p>{{$store.state.areas.areaList}}</p>
    <p>{{$store.state.colors.colorList}}</p>
    <p>{{$store.state.breeds.breedList}}</p>
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

  computed: {

  }, //end computed

  filters: {

  }, //end filters

  methods: {
    async getDogs() {
      const resData = await this.$axios.get(
        `${this.$axios.defaults.baseURL}api/dog`
      );
      this.dogList = resData.data.dogData;
    }
  }, //end methods

  created() {
    if(process.browser) {
      this.getDogs();
    }
  }, //end created

  mounted() {

  }, //end mounted
}
</script>

<style scoped>

</style>