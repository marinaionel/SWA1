import { ajax } from "rxjs/ajax";
import { interval, of, merge } from "rxjs";
import {
  pairwise,
  filter,
  map,
  concatMap,
  takeWhile,
  first,
  share,
} from "rxjs/operators";

console.log("Hello World!");

const poll_warnings = () =>
  ajax
    .getJSON("http://localhost:8080/warnings")
    .pipe(map((d) => d.warnings))
    .subscribe(console.log);

poll_warnings();
