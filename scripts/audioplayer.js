/* Get all elements */
const player = document.querySelector('.player');
const audio = player.querySelector('.listener');
const progress = player.querySelector('.progress_bar_ep');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let playText = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16"><path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg>';
let pauseText = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>';


const episodeTime = document.getElementById('episode_time');
const episodeDurationDiv = document.getElementById('episode_duration');
const episodeDuration = document.getElementById('episode_duration').textContent;

/*set episode playtime and duration */

episodeTime.innerHTML = audio.currentTime;


/* Build Functions */
function togglePlay() {
    if(audio.paused) {
        audio.play();
        durationLoad()
        toggle.innerHTML = pauseText;

    } else {
        audio.pause();
        toggle.innerHTML = playText;
    }
}

function skip() {
    console.log(this.dataset.skip);
    audio.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    audio['volume'] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProgress(){
    const percent = (audio.currentTime / audio.duration) * 100;

    var s = leadingZeros(parseInt(audio.currentTime % 60),2);
    var m = leadingZeros(parseInt((audio.currentTime / 60) % 60),2);
    var h = parseInt(Math.floor((audio.currentTime / 60)/60));
    //duration.innerHTML = m + ':' + s ;

    console.log(h);
    progressBar.style.flexBasis = `${percent}%`;

    if (h >= 1) {
        episodeTime.innerHTML = h+ ':' + m + ':' + s;
    } else {
        episodeTime.innerHTML = m + ':' + s;
    }
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;
    console.log(e);
}

function leadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

/* Hook up the event listeners */


audio.addEventListener('timeupdate', handleProgress);



toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => {
    if(mousedown) {
        scrub();
    }
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


function durationLoad() {
    episodeDurationDiv.innerHTML = audio.duration;
    var ds = leadingZeros(parseInt(audio.duration % 60),2);
    var dm = leadingZeros(parseInt((audio.duration / 60) % 60),2);
    var dh = parseInt(Math.floor((audio.duration / 60)/60));
    //duration.innerHTML = m + ':' + s ;

    if (dh >= 1) {
        episodeDurationDiv.innerHTML ='/ ' +dh+ ':' + dm + ':' + ds;
    } else {
        episodeDurationDiv.innerHTML = '/ ' +dm + ':' + ds;
    }
}



