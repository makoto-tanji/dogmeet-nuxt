<template>
  <v-container>
    <v-sheet height="400">
      <table>
        <thead>
          <tr>
            <th rowspan="2">
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="prev"
              >
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
            </th>
            <th :colspan=displayCount>{{ year }}年{{ month }}月</th>
            <th rowspan="2">
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="next"
              >
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
            </th>
          </tr>
          <tr>
            <th
              v-for="(count, index) in displayCount"
              :key="index"
            >
              {{ setCalendar(index) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="schedule in schedules"
            :key="schedule.id"
          >
            <th>{{ schedule.start_time | eraseZero }} - {{ schedule.end_time | eraseZero }}</th>
              <td
                v-for="(dayOfWeek, index) in dayOfWeeks"
                :key="index"
              >
              <v-btn
                v-if="setBtn(dayOfWeek, schedule)"
                @click="reserve(index, schedule)"
              >
                <v-icon color=red>
                  mdi-circle-double
                </v-icon>
              </v-btn>
              <v-icon
                v-else
              >
                mdi-close
              </v-icon>
              </td>
          </tr>
        </tbody>
      </table>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  // middleware: 'auth'

  props: [
    'schedules',
    'dogId'
  ],
  data() {
    return {
      displayCount: 8,
      year: null,
      month: null,
      today: null,
      dayOfWeeks: [],
      prevNext: 0,
    }
  }, //end data

  computed: {

  }, //end computed

  filters: {
    // スケジュールの先頭の0と00秒を消す
    eraseZero(value) {
      const regex = /[1-9]+:[0-9]+/g;
      return value.match(regex)[0] ?? 'x';
    }
  }, //end filters

  methods: {
    // 今日の日付を取得。ページ読み込み時に呼ばれる
    setToday() {
      this.year = this.today.getFullYear();
      this.month = this.today.getMonth()+1;
      // this.dayOfWeek = this.today.getDay();
    },
    // カレンダーの曜日を配列に格納する
    setDayOfWeeks() {
      const beginningDay = new Date();
      beginningDay.setDate( beginningDay.getDate() + this.prevNext );
      this.dayOfWeeks = [];
      for(let i=0; i<this.displayCount; i++) {
        this.dayOfWeeks.push( (beginningDay.getDay()+i)%7 );
      }
      return beginningDay.getDay();
    },
    // 曜日を数字から文字に
    convertNumToWeekday(num) {
      if(num === 0) {
        return '日';
      } else if(num === 1) {
        return '月';
      } else if(num === 2) {
        return '火';
      } else if(num === 3) {
        return '水';
      } else if(num === 4) {
        return '木';
      } else if(num === 5) {
        return '金';
      } else {
        return '土';
      }
    },

    // カレンダーの日付を設定
    setCalendar(index) {
      const date = new Date();
      date.setDate( date.getDate() + index + this.prevNext );
      return `${date.getDate()}(${this.convertNumToWeekday(date.getDay())})`;
    },
    // 表示日分戻る
    prev() {
      this.prevNext -= this.displayCount;
      this.today.setDate( this.today.getDate()-this.displayCount );
      this.setToday();
      this.setDayOfWeeks();
    },

    // 表示日分進む
    next() {
      this.prevNext += this.displayCount;
      this.today.setDate( this.today.getDate()+this.displayCount );
      this.setToday();
      this.setDayOfWeeks();
    },

    // カレンダーのボタンを設定する
    setBtn(day, skd) {
      if(day === 0) {
        return (skd.sunday === 1)? true : false;
      } else if(day === 1) {
        return (skd.monday === 1)? true : false;
      } else if(day === 2) {
        return (skd.tuesday === 1)? true : false;
      } else if(day === 3) {
        return (skd.wednesday === 1)? true : false;
      } else if(day === 4) {
        return (skd.thursday === 1)? true : false;
      } else if(day === 5) {
        return (skd.friday === 1)? true : false;
      } else {
        return (skd.saturday === 1)? true : false;
      }
    },

    // 予約
    async reserve(index, skd) {
      const reservationDate = new Date();
      reservationDate.setDate( reservationDate.getDate() + this.prevNext + index );
      if( !this.$store.state.auth.loggedIn ) {
        alert('ログインしてください');
      } else {
        try {
          const sendData = {
            dog_id: this.dogId,
            user_id: this.$auth.user.id,
            reservation_date: `${reservationDate.getFullYear()}-${reservationDate.getMonth()+1}-${reservationDate.getDate()} ${skd.start_time}`
          };
          await this.$axios.post(`${this.$axios.defaults.baseURL}api/auth/reservation`, sendData);
          alert(`${reservationDate.getFullYear()}年${reservationDate.getMonth()+1}月${reservationDate.getDate()}日の${skd.start_time}～で予約しました`);
        } catch(error) {
          alert(error);
        }
      }
    },

  }, //end methods

  created() {
    this.today = new Date();
    this.setToday();
    this.setDayOfWeeks();
  }, //end created

  mounted() {

  }, //end mounted
}
</script>

<style scoped>

</style>