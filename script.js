let current = 0;
let countdownInterval;

const menu = document.getElementById("menu");
const playerScreen = document.getElementById("playerScreen");
const player = document.getElementById("player");
const episodeList = document.getElementById("episodeList");
const continueBox = document.getElementById("continueBox");
const nextCountdown = document.getElementById("nextCountdown");

const show = showData;

/* Flatten episodes for playback */
const episodes = show.seasons.flatMap(season => season.episodes);

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

/* Build UI from showData */
let globalIndex = 0;

show.seasons.forEach(season => {
    const grid = createSeason(season.name);

    season.episodes.forEach(ep => {
        const btn = document.createElement("button");
        btn.className = "episodeBtn";

        btn.innerText = `${globalIndex + 1} - ${ep.name}`;

        const index = globalIndex;
        btn.onclick = () => playEpisode(index);

        grid.appendChild(btn);
        globalIndex++;
    });
});

/* Continue Watching */
if(localStorage.getItem("lastEpisode")){
    let last = Number(localStorage.getItem("lastEpisode"));

    continueBox.innerHTML = `
        <button class="episodeBtn" onclick="playEpisode(${last})">
            Continue ${last + 1} - ${episodes[last].name}
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

    document.getElementById("episodeTitle").innerText =
        `${current + 1} - ${episodes[current].name}`;
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
