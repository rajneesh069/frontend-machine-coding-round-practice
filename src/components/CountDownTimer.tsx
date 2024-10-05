import { useEffect, useState } from "react";

export default function CountDownTimer() {
  const [time, setTime] = useState({
    mins: "",
    secs: "",
  });
  const [timer, setTimer] = useState({
    mins: 0,
    secs: 0,
  });
  const [errors, setErrors] = useState({
    mins: "",
    secs: "",
  });
  useEffect(() => {
    if (timer.mins === 0 && timer.secs === 0) return;

    const tId = setTimeout(() => {
      setTimer((prev) => {
        if (prev.mins !== 0 && prev.secs === 0) {
          return { mins: prev.mins - 1, secs: 59 };
        }
        return { ...prev, secs: prev.secs - 1 };
      });
    }, 1000);

    return () => {
      clearTimeout(tId);
    };
  }, [timer.secs, timer.mins]);

  return (
    <div className="flex justify-center items-center flex-col h-[90vh] gap-3">
      <div className="flex flex-row" id="timer">
        <h1 className="text-4xl">
          {timer.mins >= 10 ? `${timer.mins}` : `0${timer.mins}`}
        </h1>
        &nbsp;
        <h1 className="text-4xl">:</h1>
        &nbsp;
        <h1 className="text-4xl">
          {timer.secs >= 10 ? `${timer.secs}` : `0${timer.secs}`}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-2" id="timer-input">
        <div className="flex flex-col gap-1">
          <input
            value={time.mins}
            id="minutes"
            placeholder="Mins"
            disabled={timer.mins === 0 && timer.secs === 0 ? false : true}
            onChange={(e) => {
              if (
                !(Number(e.target.value) >= 0 && Number(e.target.value) < 60)
              ) {
                setErrors((prev) => ({
                  ...prev,
                  mins: "Please Input the value between 00 and 59(both inclusive).",
                }));
              } else {
                setTime({ ...time, mins: e.target.value });
              }
            }}
          />
          {errors.mins && <p className="w-[250px]">{errors.mins}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <input
            id="seconds"
            value={time.secs}
            placeholder="Seconds"
            disabled={timer.mins === 0 && timer.secs === 0 ? false : true}
            onChange={(e) => {
              if (
                !(Number(e.target.value) >= 0 && Number(e.target.value) < 60)
              ) {
                setErrors((prev) => ({
                  ...prev,
                  secs: "Please Input the value between 00 and 59(both inclusive).",
                }));
              } else {
                setTime({ ...time, secs: e.target.value });
              }
            }}
          />
          {errors.secs && <p className="w-[250px]">{errors.secs}</p>}
        </div>
      </div>
      <div className="flex flex-row gap-2" id="timer-buttons">
        <button
          onClick={() => {
            setTimer({ secs: parseInt(time.secs), mins: parseInt(time.mins) });
            setTime({ mins: "", secs: "" });
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            setTime({
              mins: "",
              secs: "",
            });
            setTimer({
              mins: 0,
              secs: 0,
            });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
