<template>
  <v-container>
    <div>
      <p>登録ありがとうございます</p>
      <v-btn color="primary">
        <NuxtLink to="/login" class="btn">ログインする</NuxtLink>
      </v-btn>
    </div>
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

  }, //end methods

  created() {

  }, //end created

  mounted() {

  }, //end mounted
}
</script>

<style scoped>
.btn{
  color: white;
}
</style>