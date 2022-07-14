<template>
  <v-container>
    <p>{{ dogData }}</p>
    <v-form>
      <v-btn
        @click="updateDogData"
      >
        更新
      </v-btn>
      <v-text-field
        v-model="dogName"
        label="お名前"
        maxlength="191"
      />
      <v-text-field
        v-model="overview"
        label="説明"
      />
      <v-row>
        <v-col
          cols=4
          sm=12
          md=4
        >
          <v-text-field
            v-model="year"
            label="年"
          />
        </v-col>
        <v-col
          cols=4
          sm=12
          md=4
        >
          <v-text-field
            v-model="month"
            label="月"
          />
        </v-col>
        <v-col
          cols=4
          sm=12
          md=4
        >
          <v-text-field
            v-model="day"
            label="日"
          />
        </v-col>
      </v-row>
      <p>{{ sex }}</p>
      <v-radio-group v-model="sex" row>
        <v-radio
          label="オス"
          :value=1
        />
        <v-radio
          label="メス"
          :value=2
        />
      </v-radio-group>
      <v-row
        v-for="(schedule, index) in schedules"
        :key="schedule.id"
      >
        <p>{{schedule}}</p>
        <p>{{index}}</p>
        <v-btn
          @click="updateSchedule(index)"
        >
          予定更新
        </v-btn>
        <v-col
          sm=12
          md=6
        >
          <v-text-field
            v-model="schedule.start_time"
            label="到着時刻"
          />
        </v-col>
        <v-col
          sm=12
          md=6
        >
          <v-text-field
            v-model="schedule.end_time"
            label="帰宅時刻"
          />
        </v-col>
        <v-container class="checkboxs d-flex justify-space-between">
          <v-checkbox
            v-model="schedule.sunday"
            label="日"
            :true-value=1
            :false-value=0
          />
          <v-checkbox
            v-model="schedule.monday"
            label="月"
            :true-value=1
            :false-value=0
          />
          <v-checkbox
            v-model="schedule.tuesday"
            label="火"
            :true-value=1
            :false-value=0
          />
          <v-checkbox
            v-model="schedule.wednesday"
            label="水"
            :true-value=1
            :false-value=0
          />
          <v-checkbox
            v-model="schedule.thursday"
            label="木"
            :true-value=1
            :false-value=0
          />
          <v-checkbox
            v-model="schedule.friday"
            label="金"
            :true-value=1
            :false-value=0
          />
          <v-checkbox
            v-model="schedule.saturday"
            label="土"
            :true-value=1
            :false-value=0
          />
        </v-container>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  // middleware: 'auth'

  data() {
    return {
      dogData: null,
      dogName: null,
      overview: null,
      birthday: null,
      year: null,
      month: null,
      day: null,
      sex: null,
      schedules: null,

    }
  }, //end data

  computed: {

  }, //end computed

  filters: {

  }, //end filters

  watch: {
    year() {
      this.birthday = `${this.year}-${this.month}-${this.day}`;
    },
    month() {
      this.birthday = `${this.year}-${this.month}-${this.day}`;
    },
    day() {
      this.birthday = `${this.year}-${this.month}-${this.day}`;
    },
  },

  methods: {
    async updateDogData() {
      alert(`${this.dogName}`);
        try{
          const sendData = {
            dog_name: this.dogName,
            overview: this.overview,
            birthday: this.birthday,
            sex: this.sex,
            thumbnail_path: this.dogData.thumbnail_path,
            area_id: this.dogData.area_id,
            breed_id: this.dogData.breed_id
          }
          await this.$axios.put(`${this.$axios.defaults.baseURL}api/auth/dog/${this.$route.params.id}`, sendData);
          alert("登録内容の変更が完了しました");
        } catch(error) {
          alert('エラー');
          console.log(error);
        }
    },

    async updateSchedule(index) {
      alert(`${this.schedules[index].id}`);
      try{
        const sendData = {
          start_time : this.schedules[index].start_time,
          end_time : this.schedules[index].end_time,
          sunday : this.schedules[index].sunday,
          monday : this.schedules[index].monday,
          tuesday : this.schedules[index].tuesday,
          wednesday : this.schedules[index].wednesday,
          thursday : this.schedules[index].thursday,
          friday : this.schedules[index].friday,
          saturday : this.schedules[index].saturday
        }
        await this.$axios.put(`${this.$axios.defaults.baseURL}api/auth/schedule/${this.schedules[index].id}`, sendData);
        alert("予定の変更が完了しました")
      } catch(error) {
        alert('エラー');
        console.log(error);
      }
    }

  }, //end methods

  async asyncData({ app, params }) {
    const resData = await app.$axios.get(
      `${app.$axios.defaults.baseURL}api/dog/${params.id}`
    )
    const dogData = resData.data.dogResData[0];
    return {
      dogData: dogData,
      dogName: dogData.dog_name,
      overview: dogData.overview,
      birthday: dogData.birthday,
      year: dogData.birthday.split('-')[0],
      month: dogData.birthday.split('-')[1],
      day: dogData.birthday.split('-')[2],
      sex: dogData.sex,
      schedules: dogData.dog_schedule
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