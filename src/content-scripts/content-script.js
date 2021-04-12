const app = document.createElement("app");
app.id = "app";
document.body.appendChild(app);

import Vue from "vue";
import Timer from "./../components/Timer";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Timer),
}).$mount("#app");
