export default function throttle(fn, time) {
  var flag = true;
  return function (index) {
    if (flag) {
      setTimeout(() => {
        fn.call(this, index);
        flag = true;
      }, time);
    }
    flag = false;
  };
}
