Promise.resolve().then(() => {
  console.log(1);
  process.nextTick(() => {
      console.log(2);
  })
})
Promise.resolve().then(function () {
  setTimeout(() => {
      new Promise(function (resolve, reject) {
          console.log(3);
          reject();
      }).catch(function () {
          console.log(4);
      });
  })
});

const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
setInterval(() => {
  console.log(111);
}, 1000);