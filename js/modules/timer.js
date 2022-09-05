function addZero(param) {
  if (param >= 0 && param < 10) {
    return `0${param}`;
  } else {
    return param;
  }
}

function timer() {
  //Timer

  const deadline = "2022-12-31";

  function getTime(endtime) {
    let dif = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(dif / (1000 * 60 * 60 * 24)),
      hours = Math.floor((dif / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((dif / 1000 / 60) % 60),
      seconds = Math.floor((dif / 1000) % 60);

    return {
      total: dif,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setTime(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerId = setInterval(updateTime, 1000);

    updateTime();

    function updateTime() {
      const t = getTime(endtime);

      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.minutes);
      seconds.innerHTML = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timerId);
      }
    }
  }

  setTime(".timer", deadline);
}

export default timer;
export { addZero };
