// Variable Declaration
const tracks = [
  { trackId: "assets/Track1.mp3", title: "ဆေးလိပ် - ကိုင်ဇာတင်မုံ" },
  { trackId: "assets/Track2.mp3", title: "Yesterday - The Beatles" },
  { trackId: "assets/Track3.mp3", title: "Silly Strangers - Floke Rose" },
  { trackId: "assets/Track4.mp3", title: "သက်ငြိမ် - ထူးအိမ်သင်" },
  { trackId: "assets/Track5.mp3", title: "လူငယ် - Antibiotics" },
  {
    trackId: "assets/Track6.mp3",
    title: "Blue Summer and The Sea - Jixk Gabby",
  },
  { trackId: "assets/Track7.mp3", title: "Come What May - Air Supply" },
];

const playListContainerTag =
  document.getElementsByClassName("playListContainer")[0];
const audioTag = document.getElementsByClassName("audio")[0];
const currentTimeTag = document.getElementsByClassName("currentTime")[0];
const durationTag = document.getElementsByClassName("duration")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const currentProgressTag = document.getElementById("currentProgress");

const currentPlayingSongTag =
  document.getElementsByClassName("currentPlayingSong")[0];
let currentPlayingIndex = 0;
let isPlaying = false;

// Adding Songs to playlist container
for (let i = 0; i < tracks.length; i++) {
  const trackTag = document.createElement("div");
  trackTag.addEventListener("click", () => {
    currentPlayingIndex = i;
    playSong();
    currentPlayingSongTag.textContent = tracks[currentPlayingIndex].title;
  });
  trackTag.classList.add("trackTagClass");
  const title = (i + 1).toString() + ") " + tracks[i].title;
  trackTag.textContent = title;
  playListContainerTag.append(trackTag);
}

// Play song function
const playSong = () => {
  const songIdToPlay = tracks[currentPlayingIndex].trackId;
  audioTag.src = songIdToPlay;
  audioTag.play();
  isPlaying = true;
  updatePlayAndPauseButton();
};

// play button
playButtonTag.addEventListener("click", () => {
  const currentTime = Math.floor(audioTag.currentTime);
  isPlaying = true;
  if (currentTime === 0) {
    playSong();
    currentPlayingSongTag.textContent = tracks[currentPlayingIndex].title;
  } else {
    audioTag.play();
    updatePlayAndPauseButton();
    currentPlayingSongTag.textContent = tracks[currentPlayingIndex].title;
  }
});

// pause button
pauseButtonTag.addEventListener("click", () => {
  isPlaying = false;
  audioTag.pause();
  updatePlayAndPauseButton();
});

// update play and pause button
const updatePlayAndPauseButton = () => {
  if (isPlaying) {
    playButtonTag.style.display = "none";
    pauseButtonTag.style.display = "inline";
  } else {
    playButtonTag.style.display = "inline";
    pauseButtonTag.style.display = "none";
  }
};

// previous button
previousButtonTag.addEventListener("click", () => {
  if (currentPlayingIndex === 0) {
    currentPlayingIndex = tracks.length;
  }
  currentPlayingIndex -= 1;
  playSong();
  currentPlayingSongTag.textContent = tracks[currentPlayingIndex].title;
});

// next button
nextButtonTag.addEventListener("click", () => {
  if (currentPlayingIndex === tracks.length - 1) {
    currentPlayingIndex = -1;
  }
  currentPlayingIndex += 1;
  playSong();
  currentPlayingSongTag.textContent = tracks[currentPlayingIndex].title;
});

// duration
let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => {
  duration = Math.floor(audioTag.duration);
  durationText = createTimeText(duration);
  durationTag.textContent = durationText;
});

// current time
audioTag.addEventListener("timeupdate", () => {
  const currentTime = Math.floor(audioTag.currentTime);
  const currentTimeText = createTimeText(currentTime);
  currentTimeTag.textContent = currentTimeText;
  updateCurrentProgress(currentTime);
});

// current progress
const updateCurrentProgress = (ct) => {
  const currentProgressWidth = (500 / duration) * ct;
  currentProgressTag.style.width = currentProgressWidth.toString() + "px";
};
// duration and current time text{
const createTimeText = (totalSecond) => {
  const minutes = Math.floor(totalSecond / 60);
  const seconds = Math.floor(totalSecond % 60);

  const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
  const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
  return minuteText + ":" + secondText;
};
