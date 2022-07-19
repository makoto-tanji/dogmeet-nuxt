<template>
  <v-container>
    <v-file-input
      accept="image/*"
      label="画像選択"
      show-size
      @change="uploadImage"
      v-model="sendImage"
    />
    {{sendImage}}
    <v-img
      :src="imageURL"
    />
    <v-btn @click="storeImage">保存</v-btn>
  </v-container>
</template>

<script>
export default {
  // middleware: 'auth'

  data() {
    return {
      sendImage: null,
      imageURL: null
    }
  }, //end data

  computed: {

  }, //end computed

  filters: {

  }, //end filters

  methods: {
    uploadImage() {
      if(this.sendImage) {
        if( this.sendImage.size > 1000000){
        alert('画像サイズを1MBにしてください')
        }
        this.imageURL = URL.createObjectURL(this.sendImage);
      } else {
        this.imageURL = null
      }
    },

    // 画像を保存する
    async storeImage() {
      try {
        const formData = new FormData();
        formData.append('imageFile', this.sendImage);
        formData.append('imageName', this.sendImage.name);
         //ContentTypeを変える
        const config = {
          header: {
            "Content-Type": "multipart/form-data",
          },
        };
        const res = await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/auth/image`,
          formData,
          config
        );
        console.log(res);
      } catch(error) {
        console.log(error)
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