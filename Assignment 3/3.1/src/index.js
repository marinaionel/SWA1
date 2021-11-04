import ReactDOM from "react-dom";
import "./index.css";
import model from "./model";
import view from "./view";
import store from "./store";
import dispatcher from "./dispatcher";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
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
