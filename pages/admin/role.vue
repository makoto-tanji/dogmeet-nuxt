<template>
  <v-container>
    <v-select
      v-model="selectedUser"
      label="ユーザー"
      :items="userList"
      :hint="`${selectedUser.name}, ${selectedUser.role}`"
      item-text="name"
      return-object
    />
    <v-btn
      @click="storeOwner"
      color="primary"
    >
      飼い主登録
    </v-btn>
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
        name: null,
        role: null,
      },
    }
  }, //end data
  methods: {
    async storeOwner(){
      if(this.selectedUser.role !== 1){
        try {
          await this.$axios.post(`${this.$axios.defaults.baseURL}api/auth/role/${this.selectedUser.id}`, {role:5});
          alert(`${this.selectedUser.name}さんを飼い主登録しました`);
        } catch(error) {
          alert('ユーザーを選択してください');
        }
      } else {
        alert('管理者を飼い主登録できません');
      }
    }
  },
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