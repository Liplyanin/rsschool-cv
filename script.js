const lettersNotesObj = {
  'KeyD': 'c',
  'KeyF': 'd',
  'KeyG': 'e',
  'KeyH': 'f',
  'KeyJ': 'g',
  'KeyK': 'a',
  'KeyL': 'b',
  'KeyR': 'c♯',
  'KeyT': 'd♯',
  'KeyU': 'f♯',
  'KeyI': 'g♯',
  'KeyO': 'a♯',
};

const piano = document.getElementById('piano');

let mousedownEl;

piano.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('piano-key')) {
    mousedownEl = e.target;
    onPianoKeyPress(e.target);
  }
});

document.addEventListener('mouseup', (e) => {
  if (mousedownEl) {
    mousedownEl = '';
    onPianoKeyPress(e.target);
  }
});

piano.addEventListener('mouseout', (e) => {
  if (mousedownEl) {
    onPianoKeyPress(e.target);
  }
});

piano.addEventListener('mouseover', (e) => {
  if (mousedownEl) {
    onPianoKeyPress(e.target);
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn') && !e.target.classList.contains('btn-active')) {
    e.target.parentElement.querySelectorAll('.btn').forEach((el) => {
      el.classList.remove('btn-active');
    });
    e.target.classList.add('btn-active');
    if (e.target.classList.contains('btn-letters')) {
      document.querySelectorAll('.piano-key').forEach((el) => el.classList.add('piano-key-letter'));
    } else {
      document.querySelectorAll('.piano-key').forEach((el) => el.classList.remove('piano-key-letter'));
    }
  }

  if (e.target.classList.contains('fullscreen')) {
    toggleFullscreen();
  }
});

document.addEventListener('keydown', (e) => {
  if (lettersNotesObj[e.code] && !e.repeat) {
    const pianoKey = document.querySelector(`.piano-key[data-note=${lettersNotesObj[e.code]}]`);
    onPianoKeyPress(pianoKey);
  }
});

document.addEventListener('keyup', (e) => {
  if (lettersNotesObj[e.code]) {
    document.querySelector(`.piano-key[data-note=${lettersNotesObj[e.code]}]`).classList.remove('piano-key-active');
  }
});

function onPianoKeyPress(el) {
  if (el.classList.contains('piano-key')) {
    el.classList.toggle('piano-key-active');
  }

  if (el.classList.contains('piano-key-active')) {
    const { note } = el.dataset;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
}

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen().catch((err) => {
      console.log((`Error attempting to enable full-screen mode: ${err.message} (${err.name})`));
    });
  } else {
    document.exitFullscreen();
  }
}
