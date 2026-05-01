// script.js

// Loads from separate file: shows/JJK.js
// Make sure index.html loads:
// <script src="shows/JJK.js"></script>
// <script src="script.js"></script>

let current = 0;
let countdownInterval;

const menu = document.getElementById("menu");
const playerScreen = document.getElementById("playerScreen");
const player = document.getElementById("player");
const episodeList = document.getElementById("episodeList");
const continueBox = document.getElementById("continueBox");
const nextCountdown = document.getElementById("nextCountdown");

/* Create Season Sections */
function createSeason(title){
    const section = document.createElement("div");
    section.style.marginBottom = "30px";

    const label = document.createElement("h2");
    label.innerText = title;
    label.style.margin = "25px 0 10px";
    label.style.borderBottom = "1px solid #333";
    label.style.paddingBottom = "5px";

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fit,minmax(180px,1fr))";
    grid.style.gap = "12px";

    section.appendChild(label);
    section.appendChild(grid);
    episodeList.appendChild(section);

    return grid;
}

const season1 = createSeason("Season 1");
const season2 = createSeason("Season 2");
const season3 = createSeason("Season 3");

/* Build Episode Buttons */
episodes.forEach((ep, index) => {
    const btn = document.createElement("button");
    btn.className = "episodeBtn";
    btn.innerText = "Episode " + (index + 1);
    btn.onclick = () => playEpisode(index);

    if(index <= 23){
        season1.appendChild(btn);
    }else if(index <= 46){
        season2.appendChild(btn);
    }else{
        season3.appendChild(btn);
    }
});

/* Continue Watching */
if(localStorage.getItem("lastEpisode")){
    let last = Number(localStorage.getItem("lastEpisode"));

    continueBox.innerHTML = `
        <button class="episodeBtn" onclick="playEpisode(${last})">
            Continue Episode ${last + 1}
        </button><br><br>
    `;
}

/* Start Episode */
function playEpisode(index){
    current = index;

    menu.style.display = "none";
    playerScreen.style.display = "block";

    player.src = episodes[current];

    let savedTime = localStorage.getItem("time_" + current);

    if(savedTime){
        player.currentTime = savedTime;
    }

    player.play();

    localStorage.setItem("lastEpisode", current);

    document.getElementById("episodeTitle").innerText =
        "Episode " + (current + 1);
}

/* Save Progress */
player.addEventListener("timeupdate", () => {
    localStorage.setItem("time_" + current, player.currentTime);
});

/* Auto Next */
player.addEventListener("ended", () => {
    let seconds = 5;

    nextCountdown.style.display = "block";
    nextCountdown.innerText = "Next Episode in " + seconds + "...";

    countdownInterval = setInterval(() => {
        seconds--;

        nextCountdown.innerText =
            "Next Episode in " + seconds + "...";

        if(seconds < 0){
            clearInterval(countdownInterval);
            nextCountdown.style.display = "none";
            nextEpisode();
        }

    }, 1000);
});

/* Next Episode */
function nextEpisode(){
    current++;

    if(current >= episodes.length){
        current = 0;
    }

    playEpisode(current);
}

/* Home */
function goHome(){
    player.pause();

    playerScreen.style.display = "none";
    menu.style.display = "block";

    nextCountdown.style.display = "none";
    clearInterval(countdownInterval);
}
