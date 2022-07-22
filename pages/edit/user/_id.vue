<template>
  <v-container>
    <h4 class="text-h4">登録内容変更</h4>
    <v-form v-model="valid" class="update-form">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="お名前"
        maxlength="191"
        required
        prepend-icon="mdi-account"
      />
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="メールアドレス"
        maxlength="191"
        required
        prepend-icon="mdi-email"
      />
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        lavel="パスワード"
        maxlength="191"
        required
        type="password"
        prepend-icon="mdi-lock"
      />
      <v-btn
        :disabled="!valid"
        color="primary"
        @click="updateUserData"
      >
        変更
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import verifyUserId from '../../../middleware/verifyUserId'
export default {
  middleware: ['auth', verifyUserId],

  data() {
    return {
      name: this.$store.state.auth.user.name,
      email: this.$store.state.auth.user.email,
      password: null,
      valid: true,

      nameRules: [
        (v) => {
          return (v) ? true : 'お名前を入力してください';
        }
      ],
      emailRules: [
        (v) => {
          return (v) ? true : 'メールアドレスを入力してください';
        },
        (v) => {
          return ( /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/.test(v) )? true : 'メールアドレス形式で入力してください'
        },
      ],
      passwordRules: [
        (v) => {
          return (v) ? true : 'パスワードを入力してください';
        }
      ],
    }
  }, //end data

  methods: {
    async updateUserData() {
      try{
        const sendData = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        await this.$axios.post(`${this.$axios.defaults.baseURL}api/auth/update/${this.$route.params.id}`, sendData);
        alert('登録内容の変更が完了しました');
      } catch(error) {
        alert('エラー');
      }
    }
  }, //end methods
}
</script>

<style scoped>
.update-form{
  margin: 20px 0px;
}
</style>