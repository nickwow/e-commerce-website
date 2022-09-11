function debounce(fn, time) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this);
    }, time);
  };
}
