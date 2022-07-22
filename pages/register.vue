<template>
  <v-container class="register-container">
    <h4 class="text-h4">新規登録</h4>
    <v-form
      ref="form"
      v-model="valid"
    >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="ユーザー名"
      placeholder="ユーザー名"
      counter="191"
      maxlength="191"
      required
      prepend-icon="mdi-account"
    />
    <v-text-field
      v-model="メールアドレス"
      :rules="emailRules"
      label="メールアドレス"
      placeholder="xxx@xxx.xxx"
      maxlength="191"
      required
      prepend-icon="mdi-email"
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="パスワード"
      placeholder="パスワード"
      maxlength="191"
      required
      type="password"
      prepend-icon="mdi-lock"
    />
    <v-btn
      :disabled="!valid"
      color="primary"
      @click="register"
    >
      登録
    </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  // ログイン済みユーザーのアクセスを拒否
  middleware({ store, redirect }) {
    if (store.state.auth.loggedIn) {
      return redirect('/')
    }
  },

  data() {
    return {
      name: null,
      email: null,
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
    // 新規登録
    async register() {
      console.log(this.$refs.form.validate());
      try {
        await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/auth/register`, {
            name: this.name,
            email: this.email,
            password: this.password,
          }
        );
        alert('ご登録ありがとうございます')
        this.$router.push('/login');
      } catch(error) {
        alert(
          ( (error.response.data.error.name)? `${error.response.data.error.name}\n` : '')
          + ( (error.response.data.error.email)? `${error.response.data.error.email}\n` : '')
          + ( (error.response.data.error.password)? `${error.response.data.error.password}\n` : '')
        );
      }
    },
  }, //end methods
}
</script>

<style scoped>
.register-container{
  width: 80%;
}
</style>