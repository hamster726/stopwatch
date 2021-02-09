import React, { useState, useRef } from "react";
import { updateTimer, switchTimer } from "../../actions/";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Stopwatch = () => {
  const dispatch = useDispatch();

  const stopwatchTime = useSelector(
    (state) => state.stopwatchTime,
    shallowEqual
  );
  const isStopwatchActive = useSelector(
    (state) => state.isStopwatchActive,
    shallowEqual
  );

  const currentStatus = useRef(false);
  const timeAfterStart = useRef(0);

  currentStatus.current = isStopwatchActive;

  const [clocktimer, setClocktimer] = useState(0);
  let startDate = new Date();
  let delay = 16.6; // ms = 60fps/min

  const Timer = (pausedTime) => {
    let ms,   // milliseconds
      s,      // seconds
      m,      // minutes
      h = 0;  // hours
    let renderedTimer;

    const refactor = (num) => {
      if (String(num).length > 2) {
        return String(num).slice(0, 2);
      }
      if (String(num).length === 1) {
        return `0${num}`;
      }
      return num;
    };

    const time = new Date(new Date().getTime() - startDate.getTime());

    time.setTime(time.getTime() + pausedTime);

    ms = refactor(Math.floor(time.getMilliseconds() / 10));
    s = refactor(time.getSeconds());
    m = refactor(time.getMinutes());
    h = refactor(time.getHours() - 3); //minus default 3 hours

    timeAfterStart.current = time.getTime();

    renderedTimer = `${h}:${m}:${s}.${ms}`;
    dispatch(updateTimer(renderedTimer));

    if (currentStatus.current) {
      setClocktimer(setTimeout(() => Timer(pausedTime), delay));
    }
  };

  const startCounting = () => {

    if (currentStatus.current) {
      clearTimeout(clocktimer);
      dispatch(switchTimer());
    } else {
      startDate = new Date();
      dispatch(switchTimer());
      setTimeout(() => Timer(timeAfterStart.current));
    }
  };

  const clearTime = () => {
    clearTimeout(clocktimer);
    dispatch(switchTimer(false));
    dispatch(updateTimer("00:00:00.00"));
    timeAfterStart.current = 0;
  };

  return (
    <div className="stopwatch">
      <form className="stopwatch__form">
        <input className="stopwatch__input" value={stopwatchTime} readOnly />
      </form>
      <div className="stopwatch__button__wrapper">
        <button
          className="stopwatch__button-clear"
          onClick={() => {
            clearTime();
          }}
        >
          clear
        </button>
        <button
          className="stopwatch__button-start"
          onClick={() => {
            startCounting();
          }}
        >
          {currentStatus.current ? "wait" : "go!"}
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
