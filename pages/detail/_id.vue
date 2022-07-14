<template>
  <v-container>
    <p>{{dogData}}</p>
    <v-row>
      <v-col>
        <v-img
          :src="`${$axios.defaults.baseURL}${dogData.thumbnail_path}`"
          alt="thumbnail"
          width="280px"
        />
      </v-col>
      <v-col>
        <table>
          <tbody>
            <tr>
              <th>お名前</th>
              <td>{{ dogData.dog_name }}</td>
            </tr>
            <tr>
              <th>年齢:</th>
              <td>{{ dogData.birthday | convertBirthdayToAge}}</td>
            </tr>
            <tr>
              <th>犬種</th>
              <td>{{ dogData.breed.breed_name }}</td>
            </tr>
            <tr>
              <th>性別</th>
              <td>{{ dogData.sex | convertNumberToSex}}</td>
            </tr>
          </tbody>
        </table>
        <p>{{ dogData.overview }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="text-md-h6">散歩の予定</p>
        <table border="1">
          <thead>
            <tr>
              <th></th>
              <th>日</th>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
              <th>土</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="schedule in dogData.dog_schedule"
              :key="schedule.id"
            >
              <th>{{ schedule.start_time | eraseZero }} - {{ schedule.end_time | eraseZero }}</th>
              <td>{{ schedule.sunday | convertNumberToCircle }}</td>
              <td>{{ schedule.monday | convertNumberToCircle }}</td>
              <td>{{ schedule.tuesday | convertNumberToCircle }}</td>
              <td>{{ schedule.wednesday | convertNumberToCircle }}</td>
              <td>{{ schedule.thursday | convertNumberToCircle }}</td>
              <td>{{ schedule.friday | convertNumberToCircle }}</td>
              <td>{{ schedule.saturday | convertNumberToCircle }}</td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <CalendarComponent :schedules=schedule :dogId="dogData.id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CalendarComponent from '../../components/CalendarComponent.vue';
export default {
  components: { CalendarComponent },

  data() {
    return {
      dogData: {},
      schedule: {},
    }
  }, //end data

  computed: {

  }, //end computed

  filters: {
     // 2020-01-01の形の誕生日を年齢に変える
    convertBirthdayToAge(value) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const diffYear = year - Number(value.split('-')[0]);
      const diffMonth = month - Number(value.split('-')[1]);
      return `${diffYear}歳${diffMonth}ヶ月`;
    },

    // 性別(1,2)をオス,メスに変える
    convertNumberToSex(value) {
      if(value === 1) {
        return 'オス';
      } else if(value === 2) {
        return 'メス';
      } else {
        return '';
      }
    },

    // スケジュールの合う曜日(1)をマルに変える
    convertNumberToCircle(value) {
      if(value === 1){
        return '○';
      } else {
        return '';
      }
    },

    // スケジュールの先頭の0と00秒を消す
    eraseZero(value) {
      const regex = /[1-9]+:[0-9]+/g;
      return value.match(regex)[0] ?? 'x';
    }
  }, //end filters

  methods: {

  }, //end methods

  async asyncData({ app, params }) {
    const resData = await app.$axios.get(
      `${app.$axios.defaults.baseURL}api/dog/${params.id}`
    )
    return {
      dogData: resData.data.dogResData[0],
      schedule: resData.data.dogResData[0].dog_schedule
    }
  },

  created() {

  }, //end created

  mounted() {

  }, //end mounted
}
</script>

<style scoped>

</style>