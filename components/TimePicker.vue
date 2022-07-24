<template>
  <v-container>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="childTime"
          :label=label
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
          :rules="requiredRules"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu"
        v-model="childTime"
        full-width
        format="24hr"
        @click:minute="$refs.menu.save(time)"
      ></v-time-picker>
    </v-menu>
  </v-container>
</template>

<script>
export default {
  props: [
    'label', 'time', 'index'
  ],

  data() {
    return {
      menu: false,
      requiredRules: [
        (v) => {
          return (v) ? true : '入力してください';
        }
      ],
    }
  }, //end data

  computed: {
    childTime: {
      get() {
        return this.time
      },
      set(sendTime) {
        this.$emit('sendChildTime', sendTime, this.index);
      }
    }
  }, //end computed
}
</script>
