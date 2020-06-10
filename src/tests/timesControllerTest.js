const timesController = require("../controllers/timesController.js");


serialInput = [5.6, 4.5, 2.6];

console.log(serialInput);

/*serialInput.forEach((item, i) => {
  console.log(item);
});*/


timesController.saveTimes(serialInput);
