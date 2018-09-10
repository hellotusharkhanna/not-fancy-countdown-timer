var intervalTimer;

new Vue({
  el: '#app',
  data: {
    activeCursor: false,
    selectedTime: 0,
    timeLeft: '00:00',
    endTime: '0',
    hiddenValue: undefined,
    displayedHiddenValue: undefined,
    times: [
      {
        sec: 3,
        display: '3s'
      },
      {
        sec: 600,
        display: ' 10m'
      },
      {
        sec: 1800,
        display: '30m'
      }
    ]
  },
  methods: {
    setTime(seconds) {
      clearInterval(intervalTimer);
      this.timer(seconds);
    },
    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      // this.initialTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },
    countdown(end) {
      // this.initialTime = this.selectedTime;
      intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if(secondsLeft === 0) {
          this.endTime = 0;
        }

        if(secondsLeft < 0) {
          clearInterval(intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft)
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      this.endTime = `${hourConvert(hour)}:${zeroPadded(minutes)}`
    },
    editTimer() {
      this.$refs.timerInput.focus();
      this.activeCursor = true;
    },
    onInputKeyLeft(event) {
      const caretPos = event.target.selectionStart;
      attachBorderTo = caretPos;
    }
  },
  watch: {
    hiddenValue: function(val) {
      let re = /[^0-9]/gi;
      this.$set(this, 'hiddenValue', val.replace(re, ''));
      this.displayedHiddenValue = this.hiddenValue.split('').reverse().join('');
      if(val && val.length > 6) {
        this.hiddenValue = this.hiddenValue.substr(val.length - 6);
        this.displayedHiddenValue = this.hiddenValue;
      }
    }
  }
})

function zeroPadded(num) {
  // 4 --> 04
  return num < 10 ? `0${num}` : num;
}

function hourConvert(hour) {
  // 15 --> 3
  return (hour % 12) || 12;
}
