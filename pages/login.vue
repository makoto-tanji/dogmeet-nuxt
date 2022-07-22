<template>
  <v-container class="login-container">
    <v-form
      ref="form"
      v-model="valid"
    >
    <v-text-field
      v-model="email"
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
      @click="login"
    >
      ログイン
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
    // ログイン
    async login() {
      try {
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        // お気に入りをvuexで保存
        const userData = await this.$axios.get(
          `${this.$axios.defaults.baseURL}api/auth/user`
        );
        const favoriteList = userData.data.favorites;
        for(let i=0; i<favoriteList.length; i++) {
          this.$store.commit('updateFavoriteDog', {
            index: favoriteList[i].id,
            boolean: true
          })
        }

        this.$router.push("/");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    }
  }, //end methods
}
</script>

<style scoped>
.login-container{
  width: 80%;
}
</style>