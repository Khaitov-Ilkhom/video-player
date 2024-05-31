const video = document.querySelector("#video")
const playBtn = document.querySelector("#play-btn")
const nextBtn = document.querySelector("#next-btn")
const prevBtn = document.querySelector("#prev-btn")
const inputRange = document.querySelector("#input-range")
const time = document.querySelector("#time")
const duration = document.querySelector("#duration")
const listBtn = document.querySelector("#list-btn")
const list = document.querySelector("#list")
const shuffleBtn = document.querySelector("#shuffle-btn")
const companyName = document.querySelector("#company-name")
const  videoTitle= document.querySelector("#video-title")

const closeBtn = document.querySelector("#close")

let playingVideo = false
let currentVideoIndex = 0

let videos = [
    {
        src: "./video/1.mp4",
        title: "Drive BMW"
    },
    {
        src: "./video/2.mp4",
        title: "Drive BMW"
    },
    {
        src: "./video/3.mp4",
        title: "Drive BMW"
    },
    {
        src: "./video/4.mp4",
        title: "Drive BMW"
    },
    {
        src: "./video/5.mp4",
        title: "Drive BMW"
    },
    {
        src: "./video/6.mp4",
        title: "Drive BMW"
    },
    {
        src: "./video/7.mp4",
        title: "Drive BMW"
    },
    {
        src: "./video/8.mp4",
        title: "Drive BMW"
    },
    {
        src: "./video/9.mp4",
        title: "Drive BMW"
    },
]

const renewIndex = () => {
    video.src = videos[currentVideoIndex].src
}
renewIndex()

const checkVideoEnd = () => {
    let checkInterval = setInterval(() => {
        if (video.currentTime === video.duration) {
            playNext()
            clearInterval(checkInterval)
        }
    }, 100)
}

const playVideo = () => {
    playingVideo = !playingVideo

    if (playingVideo) {
        video.play()
        playBtn.firstElementChild.classList.add("hidden")
        playBtn.lastElementChild.classList.remove("hidden")
        document.body.classList.add("animation")
        moveVideoLine()
    } else {
        video.pause()
        playBtn.firstElementChild.classList.remove("hidden")
        playBtn.lastElementChild.classList.add("hidden")
        document.body.classList.remove("animation")
    }
    checkVideoEnd()
}

const playNext = () => {
    if (currentVideoIndex + 1 < videos.length) {
        currentVideoIndex++
    } else {
        currentVideoIndex = 0
    }
    renewIndex()
    playingVideo = false
    playVideo()
}

const playPrev = () => {
    if (currentVideoIndex > 0) {
        currentVideoIndex--
    } else {
        currentVideoIndex = videos.length - 1
    }
    renewIndex()
    playingVideo = false
    playVideo()
}

const formatTime = (s) => {
    let min = Math.floor(s / 60)
    let sec = Math.floor(s % 60)
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
}

const moveVideoLine = () => {
    let videoInterval = setInterval(() => {
        let percent = video.currentTime / video.duration * 100
        inputRange.value = percent
        time.innerText = isNaN(video.currentTime) ? "--:--" : formatTime(video.currentTime)
        duration.innerText = isNaN(video.currentTime) ? "--:--" : formatTime(video.duration - video.currentTime)
        if (video.currentTime === video.duration) {
            clearInterval(videoInterval)
        }
    }, 200)
}

const changeVideoTime = () => {
    let second = video.duration *  inputRange.value / 100
    video.currentTime = second
}

const shuffleVideo = () => {
    let randomIndex = Math.floor(Math.random() * videos.length)
    while (currentVideoIndex === randomIndex) {
        randomIndex = Math.floor(Math.random() * videos.length)
    }
    currentVideoIndex = randomIndex
    renewIndex()
    playingVideo = false
    playVideo()
}

const showListVideo = () => {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
    videos.forEach((vid, index) => {
        const vidTime = document.createElement("video")
        vidTime.src = vid.src
        vidTime.addEventListener("loadedmetadata", (e) => {
            const li = document.createElement("li")
            li.dataset.videoId = index
            li.classList.add("video-item")
            li.innerHTML = `
            <video class="p-[10px]" src="${vid.src}"></video>
            <div class="w-full title">
                <p>${vid.title}</p>
                <p>${formatTime(e.target.duration)}</p>
            </div>
        `
            list.prepend(li)
        })
    })
    listBtn.classList.add("change-icon")
    closeBtn.classList.add("change-icon")
}

const clearList = () => {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
    closeBtn.classList.add("clear-list")
    listBtn.classList.add("clear-list")
}

const playSelectedVideo = (e) => {
    if (e.target.classList.contains("video-item")) {
        currentVideoIndex = +e.target.dataset.videoId
        renewIndex()
        playingVideo = false
        playVideo()
    }
}

playBtn.addEventListener("click", playVideo)
prevBtn.addEventListener("click", playPrev)
nextBtn.addEventListener("click", playNext)
inputRange.addEventListener("input", changeVideoTime)
shuffleBtn.addEventListener("click", shuffleVideo)
listBtn.addEventListener("click", showListVideo)
list.addEventListener("click", playSelectedVideo)

closeBtn.addEventListener("click", clearList)