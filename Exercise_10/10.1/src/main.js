import { ajax } from "rxjs/ajax";
import { map, takeUntil } from "rxjs/operators";
import { timer } from "rxjs";
import * as moment from "moment";

console.log("Hello World!");

const poll_all_warnings = () =>
  ajax
    .getJSON("http://localhost:8080/warnings")
    .pipe(map((d) => d.warnings))
    .subscribe(console.log);

const poll_warnings = (time) =>
  ajax
    .getJSON(`http://localhost:8080/warnings/since/${time}`)
    .pipe(map((d) => d.warnings));

//poll_all_warnings();

const time = 3000;

//v1 with setTimeout
let subscription = poll_warnings(moment().add(-1, "days")).subscribe(
  console.log
);
setTimeout(() => {
  subscription.unsubscribe();
}, time);

//v2 with takeUntil
const timer$ = timer(time);
poll_warnings(moment().add(-1, "days")).pipe(takeUntil(timer$));
