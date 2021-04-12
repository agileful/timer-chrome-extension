<template>
  <div id="x-timer-container">
    <div>{{ formattedTime }}</div>
    <img id="x-timer-logo" :src="logo" />
  </div>
</template>

<script>
export default {
  name: "Timer",
  mounted() {
    document.addEventListener("visibilitychange", this.checkFocus);
    window.addEventListener("focus", this.checkFocus);
    window.addEventListener("blur", this.checkFocus);

    chrome.extension.onMessage.addListener(
      function (request) {
        if (request && request.active) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      }.bind(this)
    );
  },
  data() {
    return {
      time: 0,
      isRunning: false,
      interval: null,
    };
  },
  methods: {
    checkFocus() {
      const hasFocus = document.hasFocus();
      if (hasFocus) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    },
    startTimer() {
      if (!this.isRunning) {
        this.interval = setInterval(this.incrementTime, 1000);
        this.isRunning = true;
      }
    },
    stopTimer() {
      if (this.isRunning) {
        clearInterval(this.interval);
        this.isRunning = false;
      }
    },
    incrementTime() {
      this.time = parseInt(this.time) + 1;
    },
  },
  computed: {
    formattedTime() {
      return new Date(this.time * 1000).toISOString().substr(11, 8);
    },
    logo() {
      return chrome.extension.getURL("image/logo.svg");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Overpass+Mono&display=swap");
#x-timer-container {
  font-family: "Overpass Mono", monospace;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  top: 10px;
  right: 10px;
  width: 100px;
  border: 1px solid #eeedf1;
  border-radius: 6px;
  flex-flow: column;
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  z-index: 9999;
}
#x-timer-logo {
  width: 80%;
}
</style>
