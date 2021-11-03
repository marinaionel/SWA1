import ReactDOM from "react-dom";
import "./index.css";
import model from "./model";
import view from "./view";
import store from "./store";
import dispatcher from "./dispatcher";
const axios = require("axios").default;

async function init() {
  try {
    const city = "Horsens";
    let measurements = await axios
      .get(`http://localhost:8080/data/${city}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    let predictions = await axios
      .get(`http://localhost:8080/forecast/${city}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    const theModel = model(city, measurements, predictions);
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
