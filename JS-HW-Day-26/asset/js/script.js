// Tạo element
var progressBar = document.querySelector(".progress-bar");
var progress = document.querySelector(".progress");
var progressSpan = document.querySelector("span");

var progressBarWidth = progressBar.clientWidth;
var initialClientX = 0;
var isDrag = false;
var current = 0;
var currentWidth = 0;

var handleChange = function (width) {
  var value = (width * 100) / progressBarWidth;
  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }
  progress.style.width = `${value}%`;
  currentWidth = width;
};

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    handleChange(e.offsetX);
    isDrag = true;
    initialClientX = e.clientX;
    current = e.offsetX;
  }
});

progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  isDrag = true;
  initialClientX = e.clientX;
});

document.addEventListener("mouseup", function () {
  if (isDrag) {
    isDrag = false;
    current = currentWidth;
    audio.currentTime = (currentWidth / progressBarWidth) * audio.duration;
  }
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var moveWidth = e.clientX - initialClientX;
    handleChange(current + moveWidth);
  }
});

// Xây dựng trình phát nhạc

var audio = new Audio("../JS-HW-Day-26/asset/mp3/Careless-Whisper-Wham.mp3");

var playBtn = document.querySelector(".play-btn");

var currentTimeEl = progressBar.previousElementSibling;

var durationEl = progressBar.nextElementSibling;

var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var playIcon = `<i class="fa-solid fa-play"></i>`;

var getTime = function (seconds) {
  // Tính số phút
  var mins = Math.floor(seconds / 60);
  // Tính số giây còn lại
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

audio.addEventListener("loadeddata", function () {
  durationEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});

audio.addEventListener("timeupdate", function () {
  if (isDrag) {
    e.stopPropagation();
  }
  currentTimeEl.innerText = getTime(audio.currentTime);
  var value = (audio.currentTime * 100) / audio.duration;
  progress.style.width = `${value}%`;
});

audio.addEventListener("ended", function () {
  audio.currentTime = 0;
  playBtn.innerHTML = playIcon;
});
