const piano = document.getElementById('piano');

let mousedownEl

piano.addEventListener('mousedown', (e) => {
    
    if(e.target.classList.contains('piano-key')){
        mousedownEl = e.target;
        onPianoKeyPress(e)
    }
});

document.addEventListener('mouseup', (e) => {
    if (mousedownEl) {
        mousedownEl = '';
        onPianoKeyPress(e)
    }
});

piano.addEventListener('mouseout', (e) => {
    if(mousedownEl){
        onPianoKeyPress(e)
    }
});

piano.addEventListener('mouseover', (e) => {
    if(mousedownEl){
        onPianoKeyPress(e)
    }
});

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}


function onPianoKeyPress(e) {

    if(e.target.classList.contains('piano-key')){
        e.target.classList.toggle('piano-key-active');        
    }

    if(e.target.classList.contains('piano-key-active')){
        const note = e.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
      
    } 

}