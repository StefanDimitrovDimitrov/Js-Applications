function time() {
  let d = new Date();
  let result = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return result;
}

console.log(time());

// let d = new Date;
// console.log(d.getFullYear());
// console.log(d.getMonth());
// console.log(d.getTime())
// const timeInMiliseconds = d.getTime();

// function time() {
//     let d = new Date
//         var seconds = (d.getTime() / 1000).toFixed(0);
//         var minutes = Math.floor(seconds / 60);
//         var hours = "";
//         if (minutes > 59) {
//             hours = Math.floor(minutes / 60);
//             hours = (hours >= 10) ? hours : "0" + hours;
//             minutes = minutes - (hours * 60);
//             minutes = (minutes >= 10) ? minutes : "0" + minutes;
//         }

//         seconds = Math.floor(seconds % 60);
//         seconds = (seconds >= 10) ? seconds : "0" + seconds;
//         if (hours != "") {
//             return hours + ":" + minutes + ":" + seconds;
//         }
//         return minutes + ":" + seconds;
//     }
// console.log(time())

// d = Date.now()
// console.log(d);
// var d = new Date();
// var n = d.toJSON();
// console.log(moment().format('YYYY/MM/D hh:mm:ss SSS'));
// function time() {
//   let d = new Date();
//   let y = d.getFullYear();
//   let m = d.getMonth();
//   let h = d.getHours();
//   let m = d.getMinutes();
//   let s = d.getSeconds();

//   return (result = `${y}${m} ${h}:${m}:${s}`);
// }
// console.log(time());
