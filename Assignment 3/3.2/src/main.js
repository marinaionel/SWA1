import * as moment from "moment";
import { createApp } from "vue";
import model from "./model.js";
import viewmodel from "./viewModel.js";
import App from "./App.vue";
const axios = require("axios").default;
import "./main.css";
import DatePicker from "vue3-datepicker";

(async () => {
  const city = "Horsens";
  let historical = await axios
    .get(`http://localhost:8080/data`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
  let forecast = await axios
    .get(`http://localhost:8080/forecast`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  const today = moment();
  today.set("minutes", 0);
  const to = moment(today);
  const yesterday = moment(today);
  yesterday.add(-1, "d");
  to.add(12, "h");

  const theModel = model(
    city,
    historical,
    forecast,
    [today.toDate(), to.toDate()],
    [yesterday.toDate(), today.toDate()]
  );
  const vm = viewmodel(theModel);
  let app = createApp({
    template: `<App :model="model" />`,
    data: function () {
      return {
        model: vm,
      };
    },
    components: {
      App,
    },
  });

  app.component("DatePicker", DatePicker);
  app.mount("#app");
})();
