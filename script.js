let current = 0;
let countdownInterval;

const menu = document.getElementById("menu");
const playerScreen = document.getElementById("playerScreen");
const player = document.getElementById("player");
const episodeList = document.getElementById("episodeList");
const continueBox = document.getElementById("continueBox");
const nextCountdown = document.getElementById("nextCountdown");
const episodeTitle = document.getElementById("episodeTitle");

/* showData must be defined in JJK.js */
const episodes = showData;

/* Get unique seasons */
const seasons = [...new Set(episodes.map(e => e.season))].sort((a,b)=>a-b);

/* Create season sections */
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

/* Build UI grouped by season */
seasons.forEach(seasonNum => {
    const grid = createSeason("Season " + seasonNum);

    episodes
        .filter(ep => ep.season === seasonNum)
        .sort((a,b)=>a.episode - b.episode)
        .forEach(ep => {

            const index = episodes.indexOf(ep);

            const btn = document.createElement("button");
            btn.className = "episodeBtn";
            btn.innerText = ep.name;

            btn.onclick = () => playEpisode(index);

            grid.appendChild(btn);
        });
});

/* Continue Watching */
if(localStorage.getItem("lastEpisode")){
    let last = Number(localStorage.getItem("lastEpisode"));

    continueBox.innerHTML = `
        <button class="episodeBtn" onclick="playEpisode(${last})">
            Continue ${episodes[last].name}
        </button><br><br>
    `;
}

/* Play Episode */
function playEpisode(index){
    current = index;

    menu.style.display = "none";
    playerScreen.style.display = "block";

    player.src = episodes[current].video;

    let savedTime = localStorage.getItem("time_" + current);
    if(savedTime){
        player.currentTime = savedTime;
    }

    player.play();

    localStorage.setItem("lastEpisode", current);

    episodeTitle.innerText = episodes[current].name;
}

/* Save progress */
player.addEventListener("timeupdate", () => {
    localStorage.setItem("time_" + current, player.currentTime);
});

/* Auto next */
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

function nextEpisode(){
    current++;

    if(current >= episodes.length){
        current = 0;
    }

    playEpisode(current);
}

function goHome(){
    player.pause();

    playerScreen.style.display = "none";
    menu.style.display = "block";

    nextCountdown.style.display = "none";
    clearInterval(countdownInterval);
}
