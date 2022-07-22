<template>
  <v-container>
    <v-form>
      <v-select
        v-model="selectedUser"
        label="送り先"
        :items="userList"
        item-text="name"
        return-object
      />
      <v-container class="mail-text">
        <p>{{selectedUser.name}}さん</p>
        <p>いつもDogMeetをご利用いただきありがとうございます。</p>
        <p>_______________________________</p>
        <v-textarea
          v-model="text"
          auto-grow
          label="本文"
          outlined
        />
        <p>※本メールの送信アドレスは[送信専用]です。返信してお問い合わせいただくことはできません。</p>

        <p>《 お問い合わせ先 》</p>
        <p>===========================</p>

        <p>TEL:xxxx-xxx-xxx</p>
        <p>Email:xxx@xxx.xxx</p>
        <p>===========================</p>
      </v-container>
      <v-btn
        @click="sendMail"
        color="primary"
      >
        メール送信
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import isAdmin from '../../middleware/isAdmin'
export default {
  middleware: ['auth', isAdmin],

  data() {
    return {
      userList: [],
      selectedUser: {
        name: null
      },
      text: null,
    }
  }, //end data

  methods: {
    async sendMail() {
      try {
        const sendData = {
          name: this.selectedUser.name,
          email: this.selectedUser.email,
          text : this.text
        };
        await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/auth/mail`,
          sendData
        );
        alert('メールを送信しました')
      } catch(error) {
        alert('エラー');
        console.log(error)
      }
    }
  }, //end methods

  async asyncData( {app}) {
    const resData = await app.$axios.get(
      `${app.$axios.defaults.baseURL}api/auth/users`
    )
    return {
      userList: resData.data
    }
  },
}
</script>

<style scoped>
.mail-text{
  border: 1px solid #000;
}
</style>