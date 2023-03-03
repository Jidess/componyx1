var globalVolume = 1
const songId = 1
let stem = []
let mute = document.querySelectorAll('.mute')
for (let index = 0; index < mute.length; index++) {
    stem.push(new Audio(`public/uploads/songs/${songId}/Stem${index}.WAV`))
}
stem[0].addEventListener('loadedmetadata', () =>{
    totalMin.innerHTML = Math.floor(stem[0].duration / 60)
    totalSec.innerHTML = Math.floor(stem[0].duration % 60)

})

play.addEventListener("change", () => {
    stem.forEach(element => {
        if (element.paused) {
            element.play()
        } else {
            element.pause()
        }
    });
})
for (let index = 0; index < mute.length; index++) {
    mute[index].addEventListener("click", () => {
        if (stem[index].volume == 0) {
            stem[index].volume = globalVolume
        } else {
            stem[index].volume = 0
        }
    })
}
volume.addEventListener('change', () => {
    globalVolume = volume.value / 100
    stem.forEach(element => {
        if (element.volume != 0) {
            element.volume = globalVolume
        }
    });
})
stem[0].addEventListener('timeupdate', () =>{
    timeUpdate(stem[0].currentTime)
})
function timeUpdate(timeUpdate) {
    trackBar.value = (timeUpdate / stem[0].duration) *100  
    currentMin.innerHTML = Math.floor(stem[0].currentTime / 60)
    currentSec.innerHTML = Math.floor(stem[0].currentTime % 60)

}
trackBar.addEventListener('input', () =>{
    stem.forEach(e => {
        e.currentTime = (trackBar.value/100) * stem[0].duration
    });
})
forward.addEventListener('click', () =>{
    stem.forEach(e => {
        e.currentTime = e.currentTime + 10
    });
    
})
backward.addEventListener('click', () =>{
    stem.forEach(e => {
        e.currentTime = e.currentTime - 10
    });
    
})