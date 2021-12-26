function highOrderFunction() {
  return function () {
      console.log('function');
  };
}

highOrderFunction()();
// expected output: function

highOrderFunction();
//ƒ () {
//    console.log('function');
//}