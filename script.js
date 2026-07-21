const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsEl = document.getElementById("laps");

let running = false;
let startTime = 0;
let elapsed = 0;
let rafId = null;
let lapCount = 0;

function format(ms) {
  const centiseconds = Math.floor((ms % 1000) / 10);
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (n, len = 2) => String(n).padStart(len, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function tick() {
  display.textContent = format(Date.now() - startTime + elapsed);
  rafId = requestAnimationFrame(tick);
}

function start() {
  running = true;
  startTime = Date.now();
  rafId = requestAnimationFrame(tick);
  startStopBtn.textContent = "停止";
  startStopBtn.classList.add("running");
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function stop() {
  running = false;
  elapsed += Date.now() - startTime;
  cancelAnimationFrame(rafId);
  startStopBtn.textContent = "再開";
  startStopBtn.classList.remove("running");
  lapBtn.disabled = true;
}

function reset() {
  running = false;
  cancelAnimationFrame(rafId);
  elapsed = 0;
  lapCount = 0;
  display.textContent = format(0);
  lapsEl.innerHTML = "";
  startStopBtn.textContent = "開始";
  startStopBtn.classList.remove("running");
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

function addLap() {
  lapCount += 1;
  const li = document.createElement("li");
  const num = document.createElement("span");
  num.textContent = `ラップ ${lapCount}`;
  const time = document.createElement("span");
  time.textContent = display.textContent;
  li.append(num, time);
  lapsEl.prepend(li);
}

startStopBtn.addEventListener("click", () => {
  if (running) {
    stop();
  } else {
    start();
  }
});

lapBtn.addEventListener("click", addLap);
resetBtn.addEventListener("click", reset);
