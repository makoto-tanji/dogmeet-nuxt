<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="お誕生日"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
        locale="ja"
        :first-day-of-week="0"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      activePicker: null,
      date: null,
      menu: false,
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
      date() {
        this.$emit('sendBirthday', this.date)
      }
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
  }
</script>