<template>
  <v-container>
    <v-form>
      <v-text-field
        v-model="dogName"
        label="お名前"
        maxlength="191"
      />
      <BirthdayPicker
          @sendBirthday="getBirthday"
      />
      <v-radio-group v-model="sex" row mandatory>
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
      />
      <v-select
        v-model="area"
        label="公園"
        :items="areaList"
        item-text="areaName"
        item-value="id"
      />
      <v-container>
        <v-row>
          <v-col cols=6>
            <p>現在の画像</p>
            <v-img
              :src="`${$axios.defaults.baseURL}${dogData.thumbnail_path}`"
              :aspect-ratio="16/9"
              max-width="300"
            />
          </v-col>
          <v-col cols=6>
            <v-file-input
              accept="image/*"
              label="画像選択"
              show-size
              @change="uploadImg"
              v-model="uploadedImg"
            />
            <v-img
              :src="imgURL"
              :aspect-ratio="16/9"
              max-width=300px
            />
          </v-col>
        </v-row>
        <v-btn @click="storeImg">画像保存</v-btn>
      </v-container>
      <v-btn
        @click="updateDogData"
      >
        更新
      </v-btn>
      <v-row
        v-for="(schedule, index) in dogData.schedules"
        :key="schedule.id"
      >
        <v-col cols=12>予定{{ index+1 }}</v-col>
        <v-col
          sm=12
          md=6
        >
          <TimePicker
            @sendChildTime="getStartTime"
            :time="schedule.start_time"
            :index="index"
            label="到着時間"
          />
        </v-col>
        <v-col
          sm=12
          md=6
        >
          <TimePicker
            @sendChildTime="getStartTime"
            :time="schedule.end_time"
            :index="index"
            label="帰宅時間"
          />
        </v-col>
        <v-container
          class="checkboxs d-flex justify-space-between"
        >
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
        <v-btn @click="updateSchedule(schedule)">予定更新</v-btn>
        <v-btn @click="removeSchedule(scehdule.id)">予定削除</v-btn>
      </v-row>
      <v-row>
        <v-col cols=12>
          <p>新規予定</p>
        </v-col>
        <v-col
          sm=12
          md=6
        >
          <TimePicker
            @sendChildTime="getAddStartTime"
            label="到着時刻"
            :time="schedule.start_time"
          />
        </v-col>
        <v-col
          sm=12
          md=6
        >
          <TimePicker
            @sendChildTime="getAddEndTime"
            label="帰宅時刻"
            :time="schedule.end_time"
          />
        </v-col>
      </v-row>
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
      <v-btn @click="storeSchedule">
        予定追加
      </v-btn>
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
      sex: null,
      thumbnailPath: null,
      area: null,
      breed: null,
      selectColors: this.$store.state.colors.colorList.map(x => x.id),
      getColors: null,
      uploadedImg: null,
      imgURL: null,
      // スケジュール情報
      scheduleCount: null,
      schedule:{
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
        dog_id: this.$route.params.id,
      },
      // form用
      areaList: this.$store.state.areas.areaList,
      breedList: this.$store.state.breeds.breedList,
      colorList: this.$store.state.colors.colorList,
    }
  }, //end data

  computed: {

  }, //end computed

  filters: {

  }, //end filters

  watch: {
  },

  methods: {
    // BirthdayPickerコンポーネントから誕生日を受け取る
    getBirthday(birthday) {
      this.birthday = birthday
    },
    // TimePickerコンポーネントから時間を受け取る(更新用)
    getStartTime(time, i) {
      this.dogData.schedules[i].start_time = time
    },
    getEndTime(time, i) {
      this.dogData.schedules[i].end_time = time
    },
    // TimePickerコンポーネントから時間を受け取る(新規追加用)
    getAddStartTime(time) {
      this.schedule.start_time = time
    },
    getAddEndTime(time) {
      this.schedule.end_time = time
    },
    // 画像を読み込む
    uploadImg() {
      if(this.uploadedImg) {
        if(this.uploadedImg.size > 1000000) {
          aleart('画像サイズを1MB以下にしてください')
        };
        this.imgURL = URL.createObjectURL(this.uploadedImg);
      }
    },
    async storeImg() {
      try {
        const formData = new FormData();
        formData.append('imgFile', this.uploadedImg);
        formData.append('imgName', this.uploadedImg.name);
        //ContentTypeを変える
        const config = {
          header: {
            "Content-Type": "multipart/form-data",
          },
        };
        const res = await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/auth/image`,
          formData,
          config
        );
        this.thumbnailPath = `storage/images/${res.data.imgName}`;
      } catch(error) {
        console.log(eror)
      }
    },
    // スケジュールを新規登録する
    async storeSchedule() {
      try {
        await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/auth/schedule`,
          this.schedule
        );
        location.reload();
      } catch(error) {
        console.log(error)
      }
    },

    async updateDogData() {
      alert(`${this.dogName}`);
        try{
          const sendData = {
            dog_name: this.dogName,
            overview: this.overview,
            birthday: this.birthday,
            sex: this.sex,
            thumbnail_path: this.thumbnailPath,
            area_id: this.area,
            breed_id: this.breed,
            colors: this.selectColors,
          }
          await this.$axios.put(`${this.$axios.defaults.baseURL}api/auth/dog/${this.$route.params.id}`, sendData);
          alert("登録内容の変更が完了しました");
          location.reload();
        } catch(error) {
          alert('エラー');
          console.log(error);
        }
    },

    async updateSchedule(schedule) {
      alert(`${schedule.id}`);
      try{
        const sendData = {
          start_time : schedule.start_time,
          end_time : schedule.end_time,
          sunday : schedule.sunday,
          monday : schedule.monday,
          tuesday : schedule.tuesday,
          wednesday : schedule.wednesday,
          thursday : schedule.thursday,
          friday : schedule.friday,
          saturday : schedule.saturday
        }
        await this.$axios.put(`${this.$axios.defaults.baseURL}api/auth/schedule/${schedule.id}`, sendData);
        alert("予定の変更が完了しました");
        location.reload();
      } catch(error) {
        alert('エラー');
        console.log(error);
      }
    },
    // スケジュールを削除
    async removeSchedule(id) {
      try {
        await this.$axios.delete(
          `${this.axios.defaults.baseURL}api/auth/schedule/${id}`
        )
      } catch(error) {

      }
    },

  }, //end methods

  async asyncData({ app, params, store}) {
    const resData = await app.$axios.get(
      `${app.$axios.defaults.baseURL}api/dog/${params.id}`
    )
    const dogData = resData.data.dogResData[0];
    return {
      dogData: dogData,
      dogName: dogData.dog_name,
      overview: dogData.overview,
      birthday: dogData.birthday,
      sex: dogData.sex,
      thumbnailPath: dogData.thumbnail_path,
      area: dogData.area.id,
      breed: dogData.breed.id,
      getColors: dogData.colors.map(x => x.id),
      schedules: dogData.dog_schedule
    }
  },
  created() {
    if(process.browser){
      for(let i=0; i<this.selectColors.length; i++) {
        if(!this.getColors.includes(this.selectColors[i])){
          this.selectColors[i] = null;
        }
      }
    }
  }, //end created

  mounted() {

  }, //end mounted
}
</script>

<style scoped>

</style>