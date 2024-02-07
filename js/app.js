"use strict";

let musicStorage = localStorage.getItem('musicStorage') ? JSON.parse(localStorage.getItem('musicStorage')) : [];

const container = document.querySelector('.container');
const image = document.querySelector('#music-image');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const previous = document.querySelector('#controls #previous');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');
const duration = document.querySelector('#duration');
const currentTime = document.querySelector('#current-time');
const progressBar = document.querySelector('#progress-bar');
const volume = document.querySelector('#volume-control');
const volumeBar = document.querySelector('#volume-bar');
const musicListUl = document.querySelector('#music-list-ul');

const player = new MusicPlayer(musicList);
let muteState = 'Unmute';
let isMusicPlay;

// Sets Music content when window loaded
window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
    volumeBar.value = musicStorage[0].lastVolumeValue;
    audio.volume = musicStorage[0].lastVolumeValue / 100;
    displayMusicList(player.musicList);
    isPlayingNow();
});

// Sets Music content
function displayMusic(music) {
    title.innerHTML = music.getName();
    singer.innerHTML = music.singer;
    image.src = 'img/' + music.img + '.jpg';
    audio.src = 'mp3/' + music.file + '.mp3';
}
// Play Button Funtions
play.addEventListener('click', () => {
    isMusicPlay = container.classList.contains('playing');
    isMusicPlay ? pauseMusic() : playMusic();
});

image.addEventListener('click', () => {
    isMusicPlay = container.classList.contains('playing');
    isMusicPlay ? pauseMusic() : playMusic();
})

// Pause Music If Music Playing
const pauseMusic = () => {
    container.classList.remove('playing');
    play.classList = ('fa-solid fa-play');
    audio.pause();
}

// Play Music If Music Paused
const playMusic = () => {
    container.classList.add('playing');
    play.classList = ('fa-solid fa-pause');
    audio.play();
    isPlayingNow();

}

// Previous Music Button Function
previous.addEventListener('click', () => {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();

});

// Next Music Button Function
next.addEventListener('click', () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();

});

// Sets Music Millisecond Time to Minute and Second
const calculateTime = (totalSecond) => {
    const minute = Math.floor(totalSecond / 60);
    const second = Math.floor(totalSecond % 60);
    const updatedSecond = second < 10 ? `0${second}` : `${second}`;
    const result = `${minute}:${updatedSecond}`;
    return result;
}

// Sets the ProgressBar and Duration Time When Loaded Music
audio.addEventListener('loadedmetadata', () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

// Sets the ProgressBar and CurrentTime When Music Playing
audio.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value)
});

// If Music Ended Play Next Music
audio.addEventListener('ended', () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    audio.play();
});

// Music CurrentTime Changing With Input
progressBar.addEventListener('input', () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})

// Changing Volume With Input
volumeBar.addEventListener('input', (event) => {
    const value = event.target.value;
    audio.volume = value / 100;

    musicStorage.splice(0, musicStorage.length);
    musicStorage.push({'lastVolumeValue' : value});
    localStorage.setItem('musicStorage', JSON.stringify(musicStorage));

    if(value >= 80) {
        volume.classList = 'fa-solid fa-volume-high';
    }
    else if(value >= 30 && value < 80) {
        volume.classList = 'fa-solid fa-volume-low';
    }
    else if(value > 0 && value < 30) {
        volume.classList = 'fa-solid fa-volume-off';
    }
    else {
        volume.classList = 'fa-solid fa-volume-xmark';
    }
})

// Mute Button Progress 
volume.addEventListener('click', () => {
    if(muteState === 'Unmute') {
        muteState = 'Muted';
        audio.muted = true;
        volumeBar.value = 0;
        volume.classList = 'fa-solid fa-volume-xmark';
    }
    else {
        muteState = 'Unmute';
        audio.muted = false;
        volumeBar.value = musicStorage[0].lastVolumeValue;
        volume.classList = 'fa-solid fa-volume-high';
    }
});

// Right Side Music List Display Function
const displayMusicList = (list) => {
    for(let i = 0;i < list.length; i++) {
        let liTag = `<li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center p-4">
        <span class="track-image"><img src="img/${list[i].img}.jpg" alt="Track" height="100%"></span>
        <span>${list[i].getName()}</span>
        <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
        <audio class="music-${i}" src="mp3/${list[i].file}.mp3"></audio>
        </li>`;

        musicListUl.insertAdjacentHTML('beforeend', liTag);

        let liAudioDuration = musicListUl.querySelector(`#music-${i}`);
        let liAudioTag = musicListUl.querySelector(`.music-${i}`);

        liAudioTag.addEventListener('loadeddata', () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        })

    }
}

// Select and Play Music Function
const selectedMusic = (li) => {
    player.index = li.getAttribute('li-index');
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

// Selected Music Changing Style Function
const isPlayingNow = () => {
    for(let li of musicListUl.querySelectorAll("li")) {
        if(li.classList.contains('playing')) {
            li.classList.remove('playing');
        }

        if(li.getAttribute('li-index') == player.index) {
            li.classList.add('playing');
        }
    }
}
