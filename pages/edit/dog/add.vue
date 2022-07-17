<template>
  <v-container>
    <!-- <p>{{$store.state.auth.user}}</p> -->
    <!-- <p>{{breedList}}</p> -->
    <v-form v-model="valid">
      <div>
        <v-text-field
          v-model="dogName"
          :rules="nameRules"
          label="お名前"
          maxlength="191"
          required
        />
        <BirthdayPicker
          @sendBirthday="getBirthday"
        />
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
        <v-select
          v-model="breed"
          label="犬種"
          :items="breedList"
          item-text="breedName"
          item-value="id"
        />
        <v-textarea
          v-model="overview"
          auto-grow
          background-color="gray"
          label="自己紹介・特徴など"
          outlined
        />
      </div>
      <div>
        <v-select
          v-model="area"
          label="公園"
          :items="areaList"
          item-text="areaName"
          item-value="id"
        />
        <p>count:{{scheduleCount}}</p>
        <v-row
          v-for="(count, i) in scheduleCount"
          :key="i"
          class="schedule-row"
        >
          <v-col cols=12>
            <p>{{`予定${count}`}}</p>
          </v-col>
          <v-col
            sm=12
            md=6
          >
            <TimePicker
              @sendChildTime="getStartTime"
              label="到着時刻"
              :time="schedules[i].start_time"
              :index="i"
            />
          </v-col>
          <v-col
            sm=12
            md=6
          >
            <TimePicker
              @sendChildTime="getEndTime"
              label="帰宅時刻"
              :time="schedules[i].end_time"
              :index="i"
            />
          </v-col>
          <v-container class="checkboxs d-flex justify-space-between">
            <v-checkbox
              v-model="schedules[i].sunday"
              label="日"
              :true-value=1
              :false-value=0
            />
            <v-checkbox
              v-model="schedules[i].monday"
              label="月"
              :true-value=1
              :false-value=0
            />
            <v-checkbox
              v-model="schedules[i].tuesday"
              label="火"
              :true-value=1
              :false-value=0
            />
            <v-checkbox
              v-model="schedules[i].wednesday"
              label="水"
              :true-value=1
              :false-value=0
            />
            <v-checkbox
              v-model="schedules[i].thursday"
              label="木"
              :true-value=1
              :false-value=0
            />
            <v-checkbox
              v-model="schedules[i].friday"
              label="金"
              :true-value=1
              :false-value=0
            />
            <v-checkbox
              v-model="schedules[i].saturday"
              label="土"
              :true-value=1
              :false-value=0
            />
          </v-container>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              @click="addScheduleCount"
            >
              予定追加
            </v-btn>
            <v-btn
              @click="subScheduleCount"
            >
              予定削除
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <v-btn
        @click="storeDog"
      >
        作成
      </v-btn>
    </v-form>
    <p>なまえ{{dogName}}</p>
    <p>せつめい{{overview}}</p>
    <p>誕生日{{birthday}}</p>
    <p>性別{{sex}}</p>
    <p>公園{{area}}</p>
    <p>犬種{{breed}}</p>
    <p>飼い主{{userId}}</p>
    <p>予定{{schedules}}</p>
  </v-container>
</template>

<script>
import isHigherOwner from '../../../middleware/isHigherOwner'
export default {
  middleware: ['auth', isHigherOwner],

  data() {
    return {
      dogName: null,
      overview: null,
      birthday: null,
      sex: null,
      thumbnailPath: '',
      area: null,
      breed: null,
      userId: this.$store.state.auth.user.id,
      scheduleCount: 1,
      schedules: [
        {
          start_time: null,
          end_time: null,
          sunday : 0,
          monday : 0,
          tuesday : 0,
          wednesday : 0,
          thursday : 0,
          friday : 0,
          saturday : 0,
        },
      ],

      year: null,
      month: null,
      day: null,
      areaList: this.$store.state.areas.areaList,
      breedList: this.$store.state.breeds.breedList,

      valid: true,
      nameRules: [
        (v) => {
          return (v) ? true : 'お名前を入力してください';
        }
      ],
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
    // スケジュールの表示個数を増加する
    addScheduleCount() {
      this.scheduleCount ++;
      this.schedules.push(
        {
          start_time: null,
          end_time: null,
          sunday : 0,
          monday : 0,
          tuesday : 0,
          wednesday : 0,
          thursday : 0,
          friday : 0,
          saturday : 0,
        }
      );
    },

    // スケジュールの表示個数を減らす
    subScheduleCount() {
      if(this.scheduleCount > 1){
        this.scheduleCount --;
        this.schedules.pop();
      }
    },

    // BirthdayPickerコンポーネントから誕生日を受け取る
    getBirthday(birthday) {
      this.birthday = birthday
    },
    // TimePickerコンポーネントから時間を受け取る
    getStartTime(time, i) {
      // this.startTime = time
      this.schedules[i].start_time = time
    },
    getEndTime(time, i) {
      this.schedules[i].end_time = time
    },
    test() {

    },
    // 犬情報を登録する
    async storeDog() {
      const sendData = {
        dog_name: this.dogName,
        overview: this.overview,
        birthday: this.birthday,
        sex: this.sex,
        thumbnail_path: this.thumbnailPath,
        area_id: this.area,
        breed_id: this.breed,
        user_id: this.userId
      }
      try {
        await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/auth/dog`,
          sendData
        );
      } catch(error) {
        console.log(error)
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
.schedule-row{
  border: 1px solid gray;
}
</style>