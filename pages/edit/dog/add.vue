<template>
  <v-container>
    <!-- <p>{{$store.state.auth.user}}</p> -->
    <!-- <p>{{breedList}}</p> -->
    <v-form v-model="valid">
      <div>
        <v-text-field
          v-model="dogName"
          :rules="requiredRules"
          label="お名前"
          maxlength="191"
          required
        />
        <BirthdayPicker
          @sendBirthday="getBirthday"
        />
        <v-radio-group
          v-model="sex"
          row
          mandatory
        >
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
          :rules="requiredRules"
          item-text="breedName"
          item-value="id"
        />
        <p>{{selectColors}}</p>
        <v-container class="checkboxs d-flex justify-space-between">
          <v-checkbox
            v-for="(color, index) in colorList"
            v-model="selectColors[index]"
            :key="color.id"
            :label="color.color"
            :true-value="color.id"
            :false-value=null
          />
        </v-container>
        <v-textarea
          v-model="overview"
          auto-grow
          background-color="gray"
          label="自己紹介・特徴など"
          outlined
          :rules="requiredRules"
        />
      </div>
      <div>
        <v-select
          v-model="area"
          label="公園"
          :items="areaList"
          :rules="requiredRules"
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
        :disabled="!valid"
      >
        登録
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import isHigherOwner from '../../../middleware/isHigherOwner'
export default {
  middleware: ['auth', isHigherOwner],

  data() {
    return {
      // 犬情報
      dogName: null,
      overview: null,
      birthday: null,
      sex: null,
      thumbnailPath: '',
      area: null,
      breed: null,
      selectColors: [],
      userId: this.$store.state.auth.user.id,
      newDogId: null,
      // スケジュール情報
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
          // 中間テーブル用
          dog_id: null,
        },
      ],

      // Form用
      areaList: this.$store.state.areas.areaList,
      breedList: this.$store.state.breeds.breedList,
      colorList: this.$store.state.colors.colorList,

      valid: true,
      requiredRules: [
        (v) => {
          return (v) ? true : '入力してください';
        }
      ],
    }
  }, //end data

  computed: {

  }, //end computed

  filters: {

  }, //end filters

  watch: {

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
          dog_id: null,
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
        colors: this.selectColors,
        user_id: this.userId
      }
      try {
        const resData = await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/auth/dog`,
          sendData
        );
        this.newDogId = resData.data.dogStoreData.id
        // 作成された犬のIDを渡す
        this.storeSchedule(this.newDogId);
      } catch(error) {
        console.log(error)
      }
    },
    // スケジュールを登録する
    async storeSchedule(dogId) {
      try{
        for(let i=0; i<this.schedules.length; i++){
          this.schedules[i].dog_id = dogId;
          const resData = await this.$axios.post(
            `${this.$axios.defaults.baseURL}api/auth/schedule`,
            this.schedules[i],
          );
        }
        alert('登録が完了しました');
        this.$router.push('/mypage');
      } catch(error) {
        console.log(error)
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
.schedule-row{
  border: 1px solid gray;
}
</style>