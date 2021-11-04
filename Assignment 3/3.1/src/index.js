import ReactDOM from "react-dom";
import "./index.css";
import model from "./model";
import view from "./view";
import store from "./store";
import dispatcher from "./dispatcher";
import "react-datepicker/dist/react-datepicker.css";
const axios = require("axios").default;

async function init() {
  try {
    const city = "Horsens";
    let historical = await axios
      .get(`http://localhost:8080/data`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    let forecast = await axios
      .get(`http://localhost:8080/forecast`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    const today = new Date();
    const to = new Date(today);
    to.setHours(today.getHours() + 12);
    today.setMinutes(0);
    to.setMinutes(0);
    const theModel = model(city, historical, forecast, [today, to], []);
    let renderer = (dom) =>
      ReactDOM.render(dom, document.getElementById("root"));
    let theDispatcher;
    const theView = view(() => theDispatcher);
    const theStore = store(theModel, theView, renderer);
    theDispatcher = dispatcher(theStore);
    renderer(theView(theModel));
  } catch (err) {
    console.log(err);
  }
}

init();
