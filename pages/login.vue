<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
    >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      placeholder="Email"
      maxlength="191"
      required
      dense
      prepend-icon="mdi-email"
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      placeholder="Password"
      maxlength="191"
      required
      dense
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
  // middleware: 'auth'
  // auth: false,

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

  computed: {

  }, //end computed

  filters: {

  }, //end filters

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
        this.$router.push("/");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
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