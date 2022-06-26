<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
    >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Username"
      placeholder="Username"
      counter="191"
      maxlength="191"
      required
      dense
      prepend-icon="mdi-account"
    />
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
      @click="register"
    >
      登録
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

  computed: {

  }, //end computed

  filters: {

  }, //end filters

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
        this.$reuter.push('/thanks');
      } catch(error) {
        alert(
          ( (error.response.data.error.name)? `${error.response.data.error.name}\n` : '')
          + ( (error.response.data.error.email)? `${error.response.data.error.email}\n` : '')
          + ( (error.response.data.error.password)? `${error.response.data.error.password}\n` : '')
        );
      }
    },
  }, //end methods

  created() {

  }, //end created

  mounted() {

  }, //end mounted
}
</script>

<style scoped>

</style>