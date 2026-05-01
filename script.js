let current = 0;
let countdownInterval;

let episodes = []; // will be set per show

const menu = document.getElementById("menu");
const playerScreen = document.getElementById("playerScreen");
const player = document.getElementById("player");
const episodeList = document.getElementById("episodeList");
const continueBox = document.getElementById("continueBox");
const nextCountdown = document.getElementById("nextCountdown");
const episodeTitle = document.getElementById("episodeTitle");
const showList = document.getElementById("showList");


function debug(msg) {
    alert(msg);
    console.log(msg);
}


/* =========================
   LOAD SHOW DATA
========================= */

function loadShow(showData) {
    if (!showData || !showData.seasons) {
        debug("loadShow Didnt find show data");
        return;
    }

    episodes = showData.seasons.flatMap(s => s.episodes);

    if (!episodes.length) {
        debug("loadShow Didnt find any episodes");
        return;
    }

    episodes.forEach((ep, i) => ep.globalIndex = i);

    const titleEl = document.querySelector("#menu h1");
    if (!titleEl) {
        debug("loadShow Couldnt find title element");
        return;
    }

    titleEl.innerText = showData.title || "Unknown Show";

    current = 0;

    episodeList.innerHTML = "";
    continueBox.innerHTML = "";

    buildUI();
    restoreContinue();
}


/* =========================
   BUILD UI
========================= */

function buildUI() {
    if (!episodes.length) {
        debug("buildUI Didnt find episodes");
        return;
    }

    const seasons = [...new Set(episodes.map(e => e.season))].sort((a, b) => a - b);

    if (!seasons.length) {
        debug("buildUI Didnt find seasons");
        return;
    }

    seasons.forEach(seasonNum => {
        const grid = createSeason("Season " + seasonNum);

        const filtered = episodes.filter(ep => ep.season === seasonNum);

        if (!filtered.length) {
            debug("buildUI no episodes for Season " + seasonNum);
            return;
        }

        filtered
            .sort((a, b) => a.episode - b.episode)
            .forEach(ep => {

                const index = ep.globalIndex;

                const btn = document.createElement("button");
                btn.className = "episodeBtn";
                btn.innerText = ep.name || "Unnamed";

                btn.onclick = () => playEpisode(index);

                grid.appendChild(btn);
            });
    });
}


/* =========================
   SEASON UI
========================= */

function createSeason(title) {
    const section = document.createElement("div");
    section.style.marginBottom = "30px";

    const label = document.createElement("h2");
    label.innerText = title;

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(180px, 1fr))";
    grid.style.gap = "12px";

    section.appendChild(label);
    section.appendChild(grid);

    if (!episodeList) {
        debug("createSeason episodeList missing");
        return grid;
    }

    episodeList.appendChild(section);

    return grid;
}


/* =========================
   CONTINUE WATCHING
========================= */

function restoreContinue() {
    continueBox.innerHTML = "";

    let last = Number(localStorage.getItem("lastEpisode"));

    if (isNaN(last) || !episodes[last]) {
        debug("restoreContinue no saved episode found");
        return;
    }

    continueBox.innerHTML = `
        <button class="episodeBtn" onclick="playEpisode(${last})">
            Continue ${episodes[last].name}
        </button><br><br>
    `;
}


/* =========================
   PLAY EPISODE
========================= */

function playEpisode(index) {
    if (!episodes[index]) {
        debug("playEpisode invalid index: " + index);
        return;
    }

    current = index;

    menu.style.display = "none";
    playerScreen.style.display = "block";

    player.src = episodes[current].video;

    if (!player.src) {
        debug("playEpisode video missing");
        return;
    }

    let savedTime = localStorage.getItem("time_" + current);
    if (savedTime) {
        player.currentTime = savedTime;
    }

    player.play();

    localStorage.setItem("lastEpisode", current);

    episodeTitle.innerText = episodes[current].name;
}


/* =========================
   SAVE PROGRESS
========================= */

player.addEventListener("timeupdate", () => {
    localStorage.setItem("time_" + current, player.currentTime);
});


/* =========================
   AUTO NEXT
========================= */

player.addEventListener("ended", () => {
    let seconds = 5;

    nextCountdown.style.display = "block";
    nextCountdown.innerText = "Next Episode in " + seconds + "...";

    countdownInterval = setInterval(() => {
        seconds--;

        nextCountdown.innerText = "Next Episode in " + seconds + "...";

        if (seconds < 0) {
            clearInterval(countdownInterval);
            nextCountdown.style.display = "none";
            nextEpisode();
        }

    }, 1000);
});


function nextEpisode() {
    current++;

    if (current >= episodes.length) {
        debug("nextEpisode reached end, looping back");
        current = 0;
    }

    playEpisode(current);
}


/* =========================
   HOME
========================= */

function goHome() {
    if (!player) {
        debug("goHome player missing");
        return;
    }

    player.pause();

    playerScreen.style.display = "none";
    menu.style.display = "block";

    nextCountdown.style.display = "none";
    clearInterval(countdownInterval);
}


/* =========================
   INIT
========================= */

if (window.showData) {
    loadShow(window.showData);
} else {
    debug("INIT Didnt find showData (JJK.js not loaded or wrong variable)");
}
